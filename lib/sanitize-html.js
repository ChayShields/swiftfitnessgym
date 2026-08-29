import sanitizeHtml from "sanitize-html"

const HTML_TAG = /<\/?[a-z][a-z0-9]*\b[^>]*>/i

const richTextOptions = {
    allowedTags: [
        "p",
        "br",
        "strong",
        "em",
        "u",
        "s",
        "ul",
        "ol",
        "li",
        "blockquote",
        "h2",
        "h3",
        "h4",
        "a",
    ],
    allowedAttributes: {
        a: ["href", "target", "rel"],
    },
    allowedSchemes: ["http", "https", "mailto", "tel"],
    allowProtocolRelative: false,
    disallowedTagsMode: "discard",
    transformTags: {
        a: sanitizeHtml.simpleTransform("a", {
            rel: "noopener noreferrer",
            target: "_blank",
        }),
    },
}

export function looksLikeHtml(value) {
    return typeof value === "string" && HTML_TAG.test(value)
}

export function sanitizeCmsHtml(value) {
    return sanitizeHtml(String(value || ""), richTextOptions).trim()
}

export function stripCmsHtml(value) {
    return sanitizeHtml(String(value || ""), {
        allowedTags: [],
        allowedAttributes: {},
    }).trim()
}

export function isBlankCmsHtml(value) {
    return looksLikeHtml(value) && stripCmsHtml(value) === ""
}

export function escapeHtml(value) {
    return String(value ?? "")
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#39;")
}

export function interpolateCms(template, key, value) {
    const token = `{${key}}`
    const source = String(template || "")

    if (looksLikeHtml(source)) {
        return source.replaceAll(token, escapeHtml(value))
    }

    return source.replaceAll(token, String(value ?? ""))
}

export function sanitizeCmsTree(value) {
    if (typeof value === "string") {
        return looksLikeHtml(value) ? sanitizeCmsHtml(value) : value
    }

    if (Array.isArray(value)) {
        return value.map(sanitizeCmsTree)
    }

    if (value && typeof value === "object") {
        return Object.fromEntries(
            Object.entries(value).map(([key, child]) => [key, sanitizeCmsTree(child)]),
        )
    }

    return value
}
