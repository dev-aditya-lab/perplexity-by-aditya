export const forgetPasswordOTPTemplate = (otp) => {
    return `
        <div style="font-family: Arial, sans-serif; text-align: center; padding: 20px;">
            <h2 style="color: #333;">Password Reset OTP</h2>
            <p style="font-size: 16px; color: #555;">Use the following OTP to reset your password:</p>
            <div style="font-size: 24px; font-weight: bold; color: #007BFF; margin: 20px 0;">
                ${otp}
            </div>
            <p style="font-size: 14px; color: #999;">This OTP is valid for 10 minutes.</p>
            <p style="font-size: 14px; color: #999;">If you did not request a password reset, please ignore this email.</p>
            <p style="font-size: 14px; color: #999;">Best regards,<br>The Perplexity Team</p>
        </div>
    `;
}