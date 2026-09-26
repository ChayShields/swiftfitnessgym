import { NextResponse } from "next/server";

function buildCsp(nonce) {
  return [
    "default-src 'self'",
    `script-src 'self' 'nonce-${nonce}' 'unsafe-eval' https://www.googletagmanager.com`,
    "connect-src 'self' https://*.google-analytics.com https://*.analytics.google.com https://*.googletagmanager.com",
    "img-src 'self' data: https://*.supabase.co https://*.google-analytics.com https://*.googletagmanager.com",
    "style-src 'self' 'unsafe-inline'",
    "font-src 'self'",
    // The "Inside SwiftFitness" YouTube video, loaded only after a click
    // (components/HomeDemoVideo.jsx), privacy-enhanced domain only.
    "frame-src https://www.youtube-nocookie.com",
    "frame-ancestors 'none'",
    "base-uri 'self'",
    "form-action 'self'",
    "object-src 'none'",
  ].join("; ");
}

export default function proxy(request) {
  const nonce = Buffer.from(crypto.randomUUID()).toString("base64");
  const csp = buildCsp(nonce);

  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-nonce", nonce);

  const response = NextResponse.next({
    request: { headers: requestHeaders },
  });
  response.headers.set("Content-Security-Policy", csp);
  return response;
}

export const config = {
  matcher: ["/((?!api|_next|.*\\..*).*)"],
};
