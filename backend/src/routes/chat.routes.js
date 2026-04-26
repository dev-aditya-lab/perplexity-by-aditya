import {Router} from 'express';
import { chatMessageController, getChatMessages, getChats } from '../controllers/chat.controller.js';
import { authMiddleware } from '../middleware/auth.middleware.js';
const chatRoute = Router();


/**
 * @route POST /api/chats/message
 * @desc Handle incoming chat messages and respond with AI-generated replies.
 * @access Private (requires authentication)
 */
chatRoute.post("/message", authMiddleware, chatMessageController);

/**
 * @route GET /api/chats
 * @desc Retrieve all chat conversations for the authenticated user.
 * @access Private (requires authentication)
 */
chatRoute.get("/", authMiddleware, getChats);

/**
 * @route GET /api/chats/:chatId/messages
 * @desc Retrieve all messages for a specific chat conversation.
 * @access Private (requires authentication)
 */
chatRoute.get("/:chatId/messages", authMiddleware, getChatMessages);




export default chatRoute;
