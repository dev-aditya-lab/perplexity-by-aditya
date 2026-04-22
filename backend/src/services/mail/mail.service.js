
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_MAIL_API_KEY);

export const sendEmail = async (to, subject,text, html) => {
    try {
        const data = await resend.emails.send({
            from: process.env.RESEND_MAIL_FROM,
            to,
            subject,
            html,
        });
        console.log("Email sent successfully:");
    } catch (error) {
        console.error("Error sending email:", error);
    }
}