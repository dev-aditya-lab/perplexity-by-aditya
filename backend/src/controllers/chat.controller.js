import chatModel from "../models/chat.model.js";
import messageModel from "../models/message.model.js";
import { sendMessageToAI, generateChatTitle } from "../services/AI/ai.service.js";



export async function chatMessageController(req, res) {
    const { message, chatId } = req.body;
    if (!message) {
        return res.status(400).json({ error: "Message is required" });
    }
    try {

        let chatDetails = null, chatTitle = null;
        if (!chatId) {
            chatTitle = await generateChatTitle(message);
            chatDetails = await chatModel.create({
                user: req.user.userId,
                title: chatTitle,
            });
        }

        const userMessage = await messageModel.create({
            chat: chatId || chatDetails._id,
            content: message,
            role: "user",
        });

        const allMessages = await messageModel.find({ chat: chatId })
        const aiResponse = await sendMessageToAI(allMessages);

        const aiMessage = await messageModel.create({
            chat: chatId || chatDetails._id,
            content: aiResponse,
            role: "ai",
        });

        console.log(chatId)

        res.status(201).json({
            title: chatTitle,
            message: aiResponse,
            chatDetails,
            aiMessage,
            // allMessages
        });
    } catch (error) {
        console.error("Error in chatMessageController:", error);
        res.status(500).json({ error: "Failed to get response from AI" });
    }
}

export async function getChats(req, res) {
    const user = req.user.userId;
    const { chatId } = req.params;
    try {
        const chats = await chatModel.find({ user });
        if (!chats) {
            return res.status(404).json({ error: "Chat not found" });
        }
        res.status(200).json({
            message: "Chat history retrieved successfully",
            chats,  
        });
    } catch (error) {
        console.error("Error in getChats:", error);
        res.status(500).json({ error: "Failed to retrieve chat history" });
    }
}

export async function getChatMessages(req, res) {
    const { chatId } = req.params;
    try {
        const chat = await chatModel.findOne({ _id: chatId, user: req.user.userId });
        if (!chat) {
            return res.status(404).json({ error: "Chat not found" });
        }
        const messages = await messageModel.find({ chat: chatId })
        res.status(200).json({
            message: "Chat messages retrieved successfully",
            chatTitle: chat.title,
            messages,
        });
    } catch (error) {
        console.error("Error in getChatMessages:", error);
        res.status(500).json({ error: "Failed to retrieve chat messages" });
    }
}