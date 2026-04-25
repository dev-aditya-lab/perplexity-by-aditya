import chatModel from "../models/chat.model.js";
import messageModel from "../models/message.model.js";
import { sendMessageToAI, generateChatTitle } from "../services/AI/ai.service.js";


export async function chatMessageController(req, res) {
    const { message } = req.body;
    if (!message) {
        return res.status(400).json({ error: "Message is required" });
    }
    try {
        const aiResponse = await sendMessageToAI(message);
        const chatTitle = await generateChatTitle(message);
        const chatDetails = chatModel.create({
            user: req.user._id,
            title: chatTitle,
        });
        const aiMessage = await messageModel.create({
            chat: chatDetails._id,
            content: message,
            role: "ai",
        });
        res.json({
            message: aiResponse,
            title: chatTitle,
            chatDetails,
            aiMessage,
        });
    } catch (error) {
        console.error("Error in chatMessageController:", error);
        res.status(500).json({ error: "Failed to get response from AI" });
    }
}

