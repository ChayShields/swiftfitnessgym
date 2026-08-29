import Stripe from "stripe"

export function getStripe() {
    const key = process.env.STRIPE_SECRET_KEY
    if (!key) {
        throw new Error("Missing STRIPE_SECRET_KEY")
    }

    return new Stripe(key, {
        apiVersion: "2026-06-24.dahlia",
    })
}

export function getSiteUrl(req) {
    if (process.env.NEXT_PUBLIC_SITE_URL) {
        return process.env.NEXT_PUBLIC_SITE_URL.replace(/\/$/, "")
    }

    const host = req.headers.get("x-forwarded-host") || req.headers.get("host")
    const proto = req.headers.get("x-forwarded-proto") || "http"
    return `${proto}://${host}`
}
