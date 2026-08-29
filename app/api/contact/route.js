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

export async function POST(req) {
    const { form_type, first_name, last_name, email, phone, ...rest } = await req.json()

    if (!first_name || !last_name || !email || !phone) {
        return NextResponse.json({ error: "Please fill in all required fields" }, { status: 400 })
    }

    const subject = form_type ? `New ${form_type}: ${first_name} ${last_name}` : `New Contact Form: ${first_name} ${last_name}`

    const rows = [
        `<p><strong>Name:</strong> ${first_name} ${last_name}</p>`,
        `<p><strong>Email:</strong> ${email}</p>`,
        `<p><strong>Phone:</strong> ${phone}</p>`,
        ...Object.entries(rest)
            .filter(([, value]) => value)
            .map(([key, value]) => `<p><strong>${fieldLabels[key] || key}:</strong></p><p>${value}</p>`),
    ]

    try {
        await sendGymEmail({
            subject,
            replyTo: email,
            htmlContent: `
            <h2>${form_type || "New Contact Form Submission"}</h2>
            ${rows.join("\n")}
        `,
        })
    } catch (error) {
        console.error("Error sending email:", error)
        return NextResponse.json({ error: "The enquiry form is not currently available" }, { status: 500 })
    }

    return NextResponse.json({ message: "Email sent successfully" }, { status: 200 })
}
