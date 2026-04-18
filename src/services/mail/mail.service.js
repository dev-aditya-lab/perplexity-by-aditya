
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_MAIL_API_KEY);

export const sendEmail = async (to, subject,text, html) => {
    try {
        const data = await resend.emails.send({
            from: "Perplexity by Adity <perplexity@devaditya.dev>",
            to,
            subject,
            html,
        });
        console.log("Email sent successfully:", text);
    } catch (error) {
        console.error("Error sending email:", error);
    }
}