// Served at /robots.txt. Everything public is crawlable; the API routes and
// Stripe's post-payment screen are not pages and stay out of search.
const SITE = "https://www.swiftfitnessgym.co.uk"

export default function robots() {
    return {
        rules: [{ userAgent: "*", allow: "/", disallow: ["/api/", "/gym-membership/success"] }],
        sitemap: `${SITE}/sitemap.xml`,
        host: SITE,
    }
}
