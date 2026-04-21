// get otp not using math.random() because it is not secure
import crypto from "crypto";

export const generateOTP = (length = 6) => {
    const otp = crypto.randomInt(0, Math.pow(10, length)).toString().padStart(length, "0");
    return otp;
}