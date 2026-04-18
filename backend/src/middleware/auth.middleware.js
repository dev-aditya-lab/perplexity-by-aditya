import jwt from "jsonwebtoken";


export const authMiddleware = (req, res, next) => {
    const token = req.cookies.token ;

    if (!token) {
        return res.status(401).json({
            success: false,
            message: "Unauthorized. No token provided.",
            err: "Unauthorized. No token provided."
        });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // Attach decoded user info to request object
        next();
    } catch (err) {
        return res.status(401).json({
            success: false,
            message: "Unauthorized. Invalid token.",
            err: "Unauthorized. Invalid token."
        });
    }
}