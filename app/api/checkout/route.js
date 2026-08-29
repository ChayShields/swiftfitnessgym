import { NextResponse } from "next/server"
import { getCmsMembershipPlan } from "../../../lib/cms"
import { stripCmsHtml } from "../../../lib/sanitize-html"
import { getSiteUrl, getStripe } from "../../../lib/stripe"

export async function POST(req) {
    const { planId } = await req.json()
    const plan = await getCmsMembershipPlan(planId)

    if (!plan || !Number.isInteger(plan.amount) || plan.amount < 1) {
        return NextResponse.json({ error: "Please choose a membership plan" }, { status: 400 })
    }

    if (!process.env.STRIPE_SECRET_KEY) {
        return NextResponse.json({ error: "Online payments are not available just now. Please email us or use the membership form." }, { status: 503 })
    }

    const origin = getSiteUrl(req)
    const stripe = getStripe()
    const note = stripCmsHtml(plan.note)
    const description = note
        ? `${note}. First month. Sign-up fee taken separately once you are on our system.`
        : "First month. Sign-up fee taken separately once you are on our system."

    try {
        const session = await stripe.checkout.sessions.create({
            mode: "payment",
            locale: "en-GB",
            customer_creation: "always",
            billing_address_collection: "required",
            phone_number_collection: { enabled: true },
            submit_type: "pay",
            line_items: [
                {
                    price_data: {
                        currency: "gbp",
                        unit_amount: plan.amount,
                        product_data: {
                            name: stripCmsHtml(plan.title),
                            description,
                        },
                    },
                    quantity: 1,
                },
            ],
            success_url: `${origin}/gym-membership/success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${origin}/gym-membership`,
            metadata: {
                plan_id: plan.id,
                plan_title: stripCmsHtml(plan.title),
            },
            custom_text: {
                submit: {
                    message: "The sign-up fee is taken separately once you are on our system.",
                },
            },
            integration_identifier: "gym_membership_pay_swftjoin",
        })

        return NextResponse.json({ url: session.url })
    } catch {
        return NextResponse.json({ error: "Online payments are not available just now. Please email us or use the membership form." }, { status: 502 })
    }
}
