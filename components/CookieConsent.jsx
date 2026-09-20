'use client'

import { useSyncExternalStore } from "react"
import { Anchor, Box, Button, Container, Group, Text } from "@mantine/core"
import Link from "next/link"
import { GA_MEASUREMENT_ID } from "../lib/analytics"

const CONSENT_KEY = "swiftfitness-cookie-consent"
const CONSENT_EVENT = "cookie-consent-change"

// Browsers throw a SecurityError on any localStorage access when site data
// is blocked (e.g. "block all cookies"). That must never take the whole
// site down, so every read/write is guarded: a failed read counts as "no
// choice made" (banner shown, analytics off) and a failed write is ignored.
// Only used when storage throws: keeps the banner responsive for the current
// page view (the choice just won't persist to the next page load).
let memoryConsent = null

function readStoredConsent() {
    let stored = null
    try {
        const value = window.localStorage.getItem(CONSENT_KEY)
        stored = value === "accepted" || value === "rejected" ? value : null
    } catch {
        return memoryConsent
    }
    // If setItem is what fails (e.g. storage full), the read above still works
    // but returns null, so fall back to the choice made in this page view.
    return stored ?? memoryConsent
}

function writeStoredConsent(value) {
    memoryConsent = value
    try {
        if (value === null) window.localStorage.removeItem(CONSENT_KEY)
        else window.localStorage.setItem(CONSENT_KEY, value)
    } catch {
        // Storage unavailable: memoryConsent above still reflects the click.
    }
}

// GA4 sets `_ga` and `_ga_<ID>` on the highest domain it can (e.g.
// .swiftfitnessgym.co.uk), so expiring them means trying the host and every
// parent suffix. Withdrawing consent has to actually remove what was set
// while the visitor had accepted, not just stop new cookies appearing.
function clearAnalyticsCookies() {
    const parts = window.location.hostname.split(".")
    const domains = [undefined]
    for (let i = 0; i < parts.length - 1; i++) {
        domains.push(parts.slice(i).join("."), "." + parts.slice(i).join("."))
    }

    document.cookie
        .split(";")
        .map((entry) => entry.trim().split("=")[0])
        .filter((name) => name === "_ga" || name.startsWith("_ga_"))
        .forEach((name) => {
            domains.forEach((domain) => {
                document.cookie =
                    `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/` +
                    (domain ? `; domain=${domain}` : "")
            })
        })
}

// Google's documented switch: while this window flag is true, gtag sends
// nothing, so a page that already loaded GA stops tracking the moment the
// visitor rejects, without waiting for a reload.
function setAnalyticsDisabled(disabled) {
    window[`ga-disable-${GA_MEASUREMENT_ID}`] = disabled
}

// Runs in every tab whenever the stored choice changes (the `storage` event
// fires in the *other* tabs), so rejecting or re-opening settings in one tab
// also stops tracking and clears cookies in a sibling tab that already had
// GA loaded.
function applyConsentSideEffects() {
    if (readStoredConsent() === "accepted") {
        setAnalyticsDisabled(false)
        return
    }
    setAnalyticsDisabled(true)
    clearAnalyticsCookies()
    // GA4 queues some events (e.g. the 90% scroll hit) and sends them a few
    // seconds later, and the disable flag does not stop ones already queued.
    // If GA has already run in this page, reload so nothing queued can leave
    // after consent was withdrawn. gtag is only defined once GA has loaded, so
    // this never loops: after the reload GA is not loaded.
    if (typeof window.gtag === "function") {
        window.location.reload()
    }
}

function subscribe(callback) {
    const onChange = () => {
        applyConsentSideEffects()
        callback()
    }
    // A `storage` event means storage works and another tab changed it, so
    // that is now the truth and any in-memory fallback is stale.
    const onStorage = () => {
        memoryConsent = null
        onChange()
    }
    window.addEventListener("storage", onStorage)
    window.addEventListener(CONSENT_EVENT, onChange)
    return () => {
        window.removeEventListener("storage", onStorage)
        window.removeEventListener(CONSENT_EVENT, onChange)
    }
}

function getSnapshot() {
    return readStoredConsent()
}

// "pending" on the server and during hydration means neither the banner nor
// GA renders in the server HTML. Otherwise a returning visitor who already
// chose would see the banner flash until hydration, and a visitor with
// JavaScript off would get a banner whose buttons do nothing.
function getServerSnapshot() {
    return "pending"
}

// "accepted" | "rejected" | null (no choice yet) | "pending" (not known yet)
export function useCookieConsent() {
    return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)
}

function setConsent(value) {
    writeStoredConsent(value)
    // The dispatched event runs applyConsentSideEffects (disable/clear on
    // reject, enable on accept) and re-renders the banner and GA.
    window.dispatchEvent(new Event(CONSENT_EVENT))
}

// Clearing the stored choice re-opens the banner, which is how the footer's
// "Cookie settings" link lets a visitor change their mind later. Tracking is
// paused and analytics cookies cleared until they choose again.
export function openCookieSettings() {
    writeStoredConsent(null)
    window.dispatchEvent(new Event(CONSENT_EVENT))
}

export default function CookieConsent() {
    const consent = useCookieConsent()

    if (consent !== null) return null

    return (
        <Box
            role="dialog"
            aria-label="Cookie consent"
            bg="#121212"
            py={{ base: "1rem", sm: "1.2rem" }}
            style={{
                position: "fixed",
                left: 0,
                right: 0,
                bottom: 0,
                zIndex: 350,
                borderTop: "1px solid rgba(255,255,255,0.14)",
                boxShadow: "0 -6px 24px rgba(0,0,0,0.28)",
            }}
        >
            <Container>
                <Group justify="space-between" align="center" gap="1rem" wrap="wrap">
                    <Text c="#e6e6e6" fz="0.95rem" lh={1.5} maw="46rem" style={{ flex: "1 1 20rem" }}>
                        We use Google Analytics cookies to see which pages are useful. They are
                        only set if you accept. We do not use them for advertising. See our{" "}
                        <Anchor component={Link} href="/cookie-policy" c="#8fd0f0" underline="always">
                            cookie policy
                        </Anchor>
                        .
                    </Text>
                    <Group gap="0.7rem" wrap="nowrap" style={{ flex: "0 0 auto" }}>
                        <Button
                            variant="outline"
                            color="gray.4"
                            c="#fff"
                            size="md"
                            mih={44}
                            onClick={() => setConsent("rejected")}
                        >
                            Reject
                        </Button>
                        <Button size="md" mih={44} onClick={() => setConsent("accepted")}>
                            Accept
                        </Button>
                    </Group>
                </Group>
            </Container>
        </Box>
    )
}
