import nodemailer from "nodemailer"

function getTransporter() {
    return nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: Number(process.env.SMTP_PORT || 587),
        secure: false,
        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS,
        },
        tls: {
            rejectUnauthorized: false,
        },
    })
}

export async function sendGymEmail({ subject, htmlContent, replyTo }) {
    const to = process.env.CONTACT_EMAIL

    if (!to) {
        throw new Error("CONTACT_EMAIL is not set")
    }

    const fromEmail = process.env.SMTP_FROM || process.env.SMTP_USER

    await getTransporter().sendMail({
        from: `"SwiftFitness Website" <${fromEmail}>`,
        to,
        replyTo,
        subject,
        html: htmlContent,
    })
}
