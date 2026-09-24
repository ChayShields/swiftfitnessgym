import { NextResponse } from "next/server"
import { sendGymEmail } from "../../../lib/send-gym-email"

const fieldLabels = {
    first_name: "First Name",
    last_name: "Last Name",
    email: "Email",
    phone: "Phone",
    message: "Message",
    complaints: "Current Complaints",
    when_occurred: "How and when did the issue occur?",
    preferred_time: "Preferred time and day for appointment",
    additional_info: "Additional Information",
}

// Everything a visitor types ends up inside the gym's notification email,
// so it is escaped before it goes in: otherwise "<a href=...>" or an image
// tag typed into the form would arrive as real HTML (fake links that look
// like they came from the site). Only the fields the site's forms send are
// used, each capped in length.
const MAX_SHORT = 200
const MAX_LONG = 5000
const LONG_FIELDS = new Set(["message", "complaints", "when_occurred", "additional_info"])

function asText(value, max) {
    return (typeof value === "string" ? value : value == null ? "" : String(value)).trim().slice(0, max)
}

function escapeHtml(text) {
    return text
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#39;")
}

// Escaped, with the visitor's own line breaks kept.
function html(text) {
    return escapeHtml(text).replace(/\r\n|\r|\n/g, "<br>")
}

// Subject lines are single-line: no line breaks or control characters.
function oneLine(text) {
    return text.replace(/[\u0000-\u001f\u007f]+/g, " ").replace(/\s+/g, " ").trim()
}

const EMAIL_PATTERN = /^[^\s@<>(),;:"\[\]\\]+@[^\s@<>(),;:"\[\]\\]+\.[^\s@<>(),;:"\[\]\\]+$/

export async function POST(req) {
    let body
    try {
        body = await req.json()
    } catch {
        return NextResponse.json({ error: "Please fill in all required fields" }, { status: 400 })
    }
    if (!body || typeof body !== "object") {
        return NextResponse.json({ error: "Please fill in all required fields" }, { status: 400 })
    }

    const form_type = oneLine(asText(body.form_type, 100))
    const first_name = asText(body.first_name, MAX_SHORT)
    const last_name = asText(body.last_name, MAX_SHORT)
    const email = asText(body.email, 254)
    const phone = asText(body.phone, 50)

    if (!first_name || !last_name || !email || !phone) {
        return NextResponse.json({ error: "Please fill in all required fields" }, { status: 400 })
    }
    if (!EMAIL_PATTERN.test(email)) {
        return NextResponse.json({ error: "Please enter a valid email address" }, { status: 400 })
    }

    const name = oneLine(`${first_name} ${last_name}`)
    const subject = form_type ? `New ${form_type}: ${name}` : `New Contact Form: ${name}`

    const extra = Object.keys(fieldLabels)
        .filter((key) => !["first_name", "last_name", "email", "phone"].includes(key))
        .map((key) => [key, asText(body[key], LONG_FIELDS.has(key) ? MAX_LONG : MAX_SHORT)])
        .filter(([, value]) => value)

    const rows = [
        `<p><strong>Name:</strong> ${html(name)}</p>`,
        `<p><strong>Email:</strong> ${html(email)}</p>`,
        `<p><strong>Phone:</strong> ${html(phone)}</p>`,
        ...extra.map(([key, value]) => `<p><strong>${fieldLabels[key]}:</strong></p><p>${html(value)}</p>`),
    ]

    try {
        await sendGymEmail({
            subject,
            replyTo: email,
            htmlContent: `
            <h2>${html(form_type || "New Contact Form Submission")}</h2>
            ${rows.join("\n")}
        `,
        })
    } catch (error) {
        console.error("Error sending email:", error)
        return NextResponse.json({ error: "The enquiry form is not currently available" }, { status: 500 })
    }

    return NextResponse.json({ message: "Email sent successfully" }, { status: 200 })
}
