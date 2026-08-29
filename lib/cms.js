import { cache } from "react"
import { membershipPlans } from "../data/membership-plans"
import { isBlankCmsHtml, sanitizeCmsTree, stripCmsHtml } from "./sanitize-html"

export function pickText(value, fallback = "") {
    return typeof value === "string" && value.trim() !== "" ? value : fallback
}

export function pickLink(value, fallback = { text: "", url: "" }) {
    return {
        text: pickText(value?.text, fallback.text),
        url: pickText(value?.url, fallback.url),
    }
}

export function pickItems(value, fallback = []) {
    return Array.isArray(value) && value.length > 0 ? value : fallback
}

export function pickNumber(value, fallback = null) {
    return typeof value === "number" && !Number.isNaN(value) ? value : fallback
}

export function mergeSection(section, fallback) {
    const result = { ...fallback }

    if (!section || typeof section !== "object") {
        return result
    }

    for (const [key, value] of Object.entries(section)) {
        if (value === "" || value === null || value === undefined || isBlankCmsHtml(value)) {
            continue
        }

        if (Array.isArray(value) && value.length === 0) {
            continue
        }

        const current = result[key]

        if (
            value
            && typeof value === "object"
            && !Array.isArray(value)
            && current
            && typeof current === "object"
            && !Array.isArray(current)
        ) {
            result[key] = mergeSection(value, current)
            continue
        }

        result[key] = value
    }

    return result
}

export function cmsMetadata(content, fallback, extra = {}) {
    const title = stripCmsHtml(pickText(content?.seo?.seo_title, fallback.title))
    const description = stripCmsHtml(pickText(content?.seo?.seo_description, fallback.description))

    return {
        title,
        description,
        openGraph: {
            title,
            description,
            ...extra,
        },
    }
}

function unwrapFieldKeys(slug, content) {
    if (!content || typeof content !== "object") {
        return null
    }

    return Object.fromEntries(
        Object.entries(content).map(([sectionKey, fields]) => {
            const prefix = `${slug}_${sectionKey}_`

            return [
                sectionKey,
                Object.fromEntries(
                    Object.entries(fields || {}).map(([key, value]) => [
                        key.startsWith(prefix) ? key.slice(prefix.length) : key,
                        value,
                    ]),
                ),
            ]
        }),
    )
}

export const getCmsPage = cache(async (slug) => {
    const base = process.env.CMS_API_URL
    const key = process.env.CMS_API_KEY

    if (!base || !key) {
        return null
    }

    try {
        const response = await fetch(`${base.replace(/\/$/, "")}/api/v1/pages/${slug}`, {
            headers: {
                "x-api-key": key,
            },
            next: {
                revalidate: 60,
            },
        })

        if (!response.ok) {
            return null
        }

        const data = await response.json()
        return sanitizeCmsTree(unwrapFieldKeys(slug, data.content))
    } catch {
        return null
    }
})

export function getCmsMembershipPlans(content) {
    const items = pickItems(content?.plans?.items, membershipPlans)

    return items.map((plan, index) => {
        const fallback = membershipPlans.find((item) => item.id === plan.id) || membershipPlans[index] || membershipPlans[0]

        return {
            id: pickText(plan.id, fallback.id),
            title: pickText(plan.title, fallback.title),
            note: typeof plan.note === "string" ? plan.note : fallback.note,
            price: pickText(plan.price, fallback.price),
            signup_fee: pickText(plan.signup_fee, fallback.signup_fee),
            url: pickText(plan.url, fallback.url),
            image: pickText(plan.image, fallback.image),
        }
    })
}

export async function getCmsMembershipPlan(id) {
    const content = await getCmsPage("gym-membership")
    return getCmsMembershipPlans(content).find((plan) => plan.id === id) || null
}
