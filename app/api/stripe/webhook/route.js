import { NextResponse } from "next/server"
import { sendGymEmail } from "../../../../lib/send-gym-email"
import { getStripe } from "../../../../lib/stripe"

export async function POST(req) {
    const stripe = getStripe()
    const body = await req.text()
    const signature = req.headers.get("stripe-signature")

    if (!signature || !process.env.STRIPE_WEBHOOK_SECRET) {
        return NextResponse.json({ error: "Webhook is not configured" }, { status: 400 })
    }

    let event
    try {
        event = stripe.webhooks.constructEvent(body, signature, process.env.STRIPE_WEBHOOK_SECRET)
    } catch {
        return NextResponse.json({ error: "Invalid signature" }, { status: 400 })
    }

    if (event.type === "checkout.session.completed") {
        const session = event.data.object
        const details = session.customer_details || {}
        const address = details.address || {}
        const planTitle = session.metadata?.plan_title || "Gym membership"
        const amount = session.amount_total != null ? `£${(session.amount_total / 100).toFixed(2)}` : ""

        await sendGymEmail({
            subject: `New membership payment: ${planTitle}`,
            htmlContent: `
                <h2>New membership payment</h2>
                <p><strong>Plan:</strong> ${planTitle}</p>
                <p><strong>Amount paid:</strong> ${amount}</p>
                <p><strong>Name:</strong> ${details.name || ""}</p>
                <p><strong>Email:</strong> ${details.email || ""}</p>
                <p><strong>Phone:</strong> ${details.phone || ""}</p>
                <p><strong>Address:</strong> ${[address.line1, address.line2, address.city, address.postal_code, address.country].filter(Boolean).join(", ")}</p>
                <p><strong>Stripe session:</strong> ${session.id}</p>
            `,
        })
    }

    return NextResponse.json({ received: true })
}
