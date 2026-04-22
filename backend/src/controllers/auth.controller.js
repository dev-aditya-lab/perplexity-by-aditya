import userModel from "../models/user.model.js";
import { sendEmail } from "../services/mail/mail.service.js";
import { emailAlreadyVerifiedTemplate, emailVerificationTemplate, emailVerifiedTemplate } from "../utils/mailTemplates/emailVerifyHTMLtemplate.js";
import { accountLoginMailTemplate } from "../utils/mailTemplates/accountLoginMailTemplate.js";

import jwt from "jsonwebtoken";
import { generateOTP } from "../utils/OtpSystem/generateOTP.js";


export async function registerController(req, res) {
    const { username, email, password } = req.body;
    // is user already exists
    const user = await userModel.findOne({
        $or: [{ username }, { email }]
    });
    if (user) {
        return res.status(400).json({
            success: false,
            message: "User already exists with this username or email",
            err: "User already exists with this username or email"
        });
    }
    // create new user
    const newUser = await userModel.create({
        username,
        email,
        password
    });

    //create email verification token
    const emailVerificationToken = jwt.sign(
        { userId: newUser._id },
        process.env.JWT_SECRET,
        { expiresIn: "1d" }
    );
    const verificationLink = `http://localhost:5000/api/auth/verify-email?token=${emailVerificationToken}`;

    // send welcome email to user
    await sendEmail(
        email,
        "Welcome to Perplexity!",
        `Hello ${username},\n\nThank you for registering at Perplexity. We're excited to have you on board! If you have any questions or need assistance, feel free to reach out to our support team.\n\nBest regards,\nThe Perplexity Team`,
        emailVerificationTemplate(username, verificationLink)
    )
    res.status(201).json({
        success: true,
        message: "User registered successfully",
        data: {
            username: newUser.username,
            email: newUser.email,
        }
    });
}

export const verifyEmailController = async (req, res) => {
    const { token } = req.query;
    try {
        if (!token) {
            return res.status(400).json({
                success: false,
                message: "Verification token is required",
                err: "Verification token is required"
            });
        }
    } catch (error) {
        console.error("Error verifying email:", error);
        return res.status(400).json({
            success: false,
            message: "Invalid verification token",
            err: "Invalid verification token"
        });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const userId = decoded.userId;
        const user = await userModel.findById(userId);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
                err: "User not found"
            });
        }
        if (user.verified) {
            const htmlContent = emailAlreadyVerifiedTemplate(user.username);
            res.send(htmlContent);
            return;
        }
        user.verified = true;
        await user.save();
        const htmlContent = emailVerifiedTemplate(user.username);
        res.send(htmlContent);
    } catch (error) {
        console.error("Error verifying email:", error);
        res.status(400).json({
            success: false,
            message: "Invalid or expired verification token",
            err: "Invalid or expired verification token"
        });
    }

}

export const loginController = async (req, res) => {
    const { emailOrUsername, password } = req.body;
    const user = await userModel.findOne({
        $or: [{ email: emailOrUsername }, { username: emailOrUsername }]
    }).select("+password");

    if (!user) {
        return res.status(404).json({
            success: false,
            message: "User not found with this email or username",
            err: "User not found with this email or username"
        });
    }

    const removeUserPasswrodForResponse = user.toObject();
    delete removeUserPasswrodForResponse.password;

    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
        return res.status(401).json({
            success: false,
            message: "Invalid password",
            err: "Invalid password"
        });
    }
    if (!user.verified) {
        return res.status(403).json({
            success: false,
            message: "Email not verified. Please verify your email before logging in.",
            err: "Email not verified. Please verify your email before logging in."
        });
    }
    const token = jwt.sign(
        { userId: user._id },
        process.env.JWT_SECRET,
        { expiresIn: "7d" }
    );
    res.cookie("token", token)

    await sendEmail(
        user.email,
        "New Login Alert",
        `Hello ${user.username},\n\nWe noticed a new login to your account. If this was you, you can safely ignore this email. If you did not log in, please secure your account immediately by changing your password .\n\nBest regards,\nThe Perplexity Team`,
        accountLoginMailTemplate(user.username)
    )

    res.status(200).json({
        success: true,
        message: "Login successful",
        user: removeUserPasswrodForResponse
    });
}

export const getMeController = async (req, res) => {
    const userId = req.user.userId;
    const user = await userModel.findById(userId).select("-password");
    if (!user) {
        return res.status(404).json({
            success: false,
            message: "User not found",
            err: "User not found"
        });
    }
    res.status(200).json({
        success: true,
        message: "User get successfully",
        user
    });
}

export const forgetPasswordByEmailOtpController = async (req, res) => {
    const { email } = req.body;
    const user = await userModel.findOne({ email });
    if (!user) {
        return res.status(404).json({
            success: false,
            message: "User not found with this email",
            err: "User not found with this email"
        });
    }
    const otp = generateOTP();
    await redisClient.set(`forgetPasswordOTP:${user._id}`, otp, "EX", 600); // set otp in redis with 10 minutes expiry 600sec

    await sendEmail(
        user.email,
        "Password Reset OTP",
        `Hello ${user.username},\n\nYou requested a password reset. Use the following OTP to reset your password: ${otp}\n\nThis OTP is valid for 10 minutes.\n\nIf you did not request a password reset, please ignore this email.\n\nBest regards,\nThe Perplexity Team`,
        forgetPasswordOTPTemplate(otp)
    )

    res.status(200).json({
        success: true,
        message: "Password reset OTP sent to email",
    });
}

export const verifyForgetPasswordOtpController = async (req, res) => {
    const email = req.params.email;
    const { otp } = req.body;
    const user = await userModel.findOne({ email });
    if (!user) {
        return res.status(404).json({
            success: false,
            message: "User not found with this email",
            err: "User not found with this email"
        });
    }
    const storedOtp = await redisClient.get(`forgetPasswordOTP:${user._id}`);
    if (!storedOtp) {
        return res.status(400).json({
            success: false,
            message: "OTP expired or not found. Please request a new one.",
            err: "OTP expired or not found. Please request a new one."
        });
    }
    if (storedOtp !== otp) {
        return res.status(400).json({
            success: false,
            message: "Invalid OTP. Please try again.",
            err: "Invalid OTP. Please try again."
        });
    }
    // delete storedOtp; // OTP is valid, delete it from redis
    await redisClient.del(`forgetPasswordOTP:${user._id}`);
    // OTP is valid, allow user to reset password
    res.status(200).json({
        success: true,
        message: "OTP verified successfully. You can now reset your password.",
    });
    
}

export const chnagePasswordController = async (req, res) => {
    const userId = req.user.userId;
    const { oldPassword, newPassword } = req.body;
    const user = await userModel.findById(userId).select("+password");
    if (!user) {
        return res.status(404).json({
            success: false,
            message: "User not found",
            err: "User not found"
        });
    }
    const isPasswordValid = await user.comparePassword(oldPassword);
    if (!isPasswordValid) {
        return res.status(401).json({
            success: false,
            message: "Invalid old password",
            err: "Invalid old password"
        });
    }
    await userModel.findByIdAndUpdate(userId, { password: newPassword })

    res.status(200).json({
        success: true,
        message: "Password changed successfully",
    });
}

export const logoutController = async (req, res) => {
    res.clearCookie("token");
    res.status(200).json({
        success: true,
        message: "Logout successful",
    });
}   