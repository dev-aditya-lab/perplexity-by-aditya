import { Router } from "express";
import { getMeController, loginController, registerController, verifyEmailController } from "../controllers/auth.controller.js";
import { loginValidator, registerValidator } from "../validators/auth.validator.js";
import { authMiddleware } from "../middleware/auth.middleware.js";
const authRouter = Router();

/**
 * @Api {Post} /api/auth/register
 * @Description Register a new user
 * @Body {String} username - The username of the user
 * @Body {String} email - The email of the user
 * @Body {String} password - The password of the user
 */
authRouter.post("/register", registerValidator, registerController);

/**
 * @Api {Get} /api/auth/verify-email
 * @Description Verify user's email address
 * @Query {String} token - The email verification token sent to user's email
 */
authRouter.get("/verify-email", verifyEmailController);

/**
 * @Api {Post} /api/auth/login
 * @Description Login a user
 * @Body {string} -> {email or username} - The email or username of the user
 * @Body {String} password - The password of the user
 */
authRouter.post("/login", loginValidator, loginController);

/**
 * @Api {Get} /api/auth/getMe
 * @Description Get the currently logged in user's information
 * @Header {String} Authorization - The JWT token of the logged in user
 */
authRouter.get("/getMe",authMiddleware, getMeController);

export default authRouter;