// One fixed policy for every response, so pages can be built once and served
// from Vercel's CDN. A per-request nonce would force every page to render on
// each visit. 'unsafe-inline' in script-src covers Mantine's colour-scheme
// script and Next's inline hydration data. 'unsafe-eval' is kept to match the
// previous production policy exactly. The only
// third-party script is Google's gtag.js (loaded only after cookie consent);
// frame-src is the click-to-play YouTube embed on the home page.
const csp = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com",
  "connect-src 'self' https://*.google-analytics.com https://*.analytics.google.com https://*.googletagmanager.com",
  "img-src 'self' data: https://*.supabase.co https://*.google-analytics.com https://*.googletagmanager.com",
  "style-src 'self' 'unsafe-inline'",
  "font-src 'self'",
  "frame-src https://www.youtube-nocookie.com",
  "frame-ancestors 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "object-src 'none'",
].join('; ')

const securityHeaders = [
  { key: 'Content-Security-Policy', value: csp },
  { key: 'X-Frame-Options', value: 'DENY' },
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
]

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    // Optimized copies are kept for a year. Every CMS upload is written under
    // a fresh random file name and never overwritten, so a CMS image URL never
    // changes; with the default 60s (or Supabase's 1h header) every picture
    // was re-transformed and re-written to Vercel's image cache all day long.
    // The few files in /public keep fixed names - rename one if it is ever
    // replaced, or the old version can be served for up to a year.
    minimumCacheTTL: 31536000,
    // Default list runs up to 3840, which nothing on this site needs: the
    // content container is 1200px wide, and 2560 (the size of the source
    // photos) keeps full-bleed heroes sharp on high-res desktop screens.
    deviceSizes: [640, 828, 1080, 1440, 1920, 2560],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*.supabase.co",
        pathname: "/storage/v1/object/public/**",
      },
    ],
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: securityHeaders,
      },
    ]
  },
};

export default nextConfig;
