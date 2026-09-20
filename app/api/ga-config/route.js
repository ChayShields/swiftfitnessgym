import { GA_MEASUREMENT_ID } from "../../../lib/analytics"

// Served as an external script so the site's nonce-based CSP never needs an
// inline <script> for GA's config. The ID comes from the constant in
// lib/analytics.js and nothing from the request is ever interpolated into
// the response, so there is no query-string input to inject through.
const body =
  "window.dataLayer=window.dataLayer||[];" +
  "function gtag(){dataLayer.push(arguments);}" +
  "gtag('js',new Date());" +
  `gtag('config','${GA_MEASUREMENT_ID}');`

export function GET() {
  return new Response(body, {
    status: 200,
    headers: {
      "Content-Type": "application/javascript; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  })
}
