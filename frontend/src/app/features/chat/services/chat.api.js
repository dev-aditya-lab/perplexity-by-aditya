import axios from 'axios';

const api = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL + '/api/chats',
    withCredentials: true,
});

// Send message (creates new chat if chatId not provided)
export const sendMessage = async ({ message, chatId }) => {
    try {
        const response = await api.post('/message', { message, chatId });
        return response.data;
    } catch (error) {
        console.error('Error sending message:', error);
        throw error;
    }
};

// Get all chats for current user
export const getChats = async () => {
    try {
        const response = await api.get('/');
        return response.data;
    } catch (error) {
        console.error('Error fetching chats:', error);
        throw error;
    }
};

// Get messages for a specific chat
export const getChatMessages = async (chatId) => {
    try {
        const response = await api.get(`/${chatId}/messages`);
        return response.data;
    } catch (error) {
        console.error('Error fetching chat messages:', error);
        throw error;
    }
};

// Delete a chat
export const deleteChat = async (chatId) => {
    try {
        const response = await api.delete(`/delete/${chatId}`);
        return response.data;
    } catch (error) {
        console.error('Error deleting chat:', error);
        throw error;
    }
};

// Create a new chat (without AI message - just initialize)
export const createNewChat = async () => {
    try {
        // For now, return a local chat object - will be created on first message
        return {
            _id: `temp-${Date.now()}`,
            title: 'New Chat',
            createdAt: new Date().toISOString(),
            messages: []
        };
    } catch (error) {
        console.error('Error creating chat:', error);
        throw error;
    }
};