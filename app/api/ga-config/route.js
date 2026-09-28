import { GA_MEASUREMENT_ID } from "../../../lib/analytics"

// Served as an external script so GA's config never needs its own inline
// <script>. The ID comes from the constant in lib/analytics.js and nothing
// from the request is ever interpolated into the response, so there is no
// query-string input to inject through.
const body =
  "window.dataLayer=window.dataLayer||[];" +
  "function gtag(){dataLayer.push(arguments);}" +
  "gtag('js',new Date());" +
  `gtag('config','${GA_MEASUREMENT_ID}');`

// Built once at deploy time and served from Vercel's CDN, so a page view
// never runs a function for it. The body only changes when the code does.
export const dynamic = "force-static"

export function GET() {
  return new Response(body, {
    status: 200,
    headers: {
      "Content-Type": "application/javascript; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  })
}
