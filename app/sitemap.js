// Served at /sitemap.xml. www is the primary domain on Vercel (the bare
// domain 308-redirects to it), so every URL here uses www - a sitemap that
// lists redirecting URLs is what Search Console flags as "redirect error".
// Left out on purpose: /cookie-policy-uk (only redirects to /cookie-policy)
// and /gym-membership/success (Stripe's post-payment screen, not a page
// anyone should land on from a search).
const SITE = "https://www.swiftfitnessgym.co.uk"

const PAGES = [
    { path: "/", priority: 1.0, changeFrequency: "weekly" },
    { path: "/gym-membership", priority: 0.9, changeFrequency: "monthly" },
    { path: "/about", priority: 0.8, changeFrequency: "monthly" },
    { path: "/sunbeds-services", priority: 0.8, changeFrequency: "monthly" },
    { path: "/swift-ink-tattoo", priority: 0.7, changeFrequency: "monthly" },
    { path: "/reviews", priority: 0.6, changeFrequency: "monthly" },
    { path: "/contact", priority: 0.7, changeFrequency: "yearly" },
    { path: "/terms", priority: 0.2, changeFrequency: "yearly" },
    { path: "/privacy-policy", priority: 0.2, changeFrequency: "yearly" },
    { path: "/cookie-policy", priority: 0.2, changeFrequency: "yearly" },
]

export default function sitemap() {
    return PAGES.map(({ path, priority, changeFrequency }) => ({
        url: `${SITE}${path === "/" ? "" : path}`,
        changeFrequency,
        priority,
    }))
}
