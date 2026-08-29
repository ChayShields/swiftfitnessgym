import { Text, Title } from "@mantine/core"
import { looksLikeHtml, sanitizeCmsHtml } from "../lib/sanitize-html"

export default function CmsHtml({ children, heading = false, className, ...props }) {
    const raw = typeof children === "string" ? children : ""

    if (!raw) {
        return null
    }

    const Component = heading ? Title : Text

    if (!looksLikeHtml(raw)) {
        return (
            <Component className={className} {...props}>
                {raw}
            </Component>
        )
    }

    const html = sanitizeCmsHtml(raw)

    if (!html) {
        return null
    }

    if (!looksLikeHtml(html)) {
        return (
            <Component className={className} {...props}>
                {html}
            </Component>
        )
    }

    return (
        <Component
            className={["cms-html", className].filter(Boolean).join(" ")}
            component="div"
            {...props}
            dangerouslySetInnerHTML={{ __html: html }}
        />
    )
}
