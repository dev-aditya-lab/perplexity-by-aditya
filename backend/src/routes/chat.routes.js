import {Router} from 'express';
import { chatMessageController } from '../controllers/chat.controller.js';
import { authMiddleware } from '../middleware/auth.middleware.js';
const chatRoute = Router();


/**
 * @route POST /api/chats/message
 * @desc Handle incoming chat messages and respond with AI-generated replies.
 * @access Private (requires authentication)
 */
chatRoute.post("/message",authMiddleware, chatMessageController);


export default chatRoute;
