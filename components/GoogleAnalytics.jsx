'use client'

import Script from "next/script"
import { GA_MEASUREMENT_ID } from "../lib/analytics"
import { useCookieConsent } from "./CookieConsent"

// Renders nothing (so no request to Google at all) until the visitor has
// explicitly accepted. Rejecting, or never choosing, keeps GA off entirely.
export default function GoogleAnalytics() {
    const consent = useCookieConsent()

    if (consent !== "accepted") return null

    return (
        <>
            <Script
                src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
                strategy="afterInteractive"
            />
            <Script src="/api/ga-config" strategy="afterInteractive" />
        </>
    )
}
