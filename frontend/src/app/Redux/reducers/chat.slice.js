import { createSlice } from "@reduxjs/toolkit";

const chatSlice = createSlice({
    name: 'chat',
    initialState: {
        chats: [],  // Array of chat objects
        chatMessages: {}, // Map of chatId -> messages array
        currentChatId: null,
        isLoading: false,
        chatsLoadingForUserId: null,
        chatsLoadedForUserId: null,
        error: null,
    },
    reducers: {
        // Set all chats from backend
        setChats: (state, action) => {
            state.chats = action.payload;
        },
        // Add a new chat to the list
        addChat: (state, action) => {
            state.chats.unshift(action.payload);
        },
        // Update existing chat (e.g., title)
        updateChat: (state, action) => {
            const { chatId, updates } = action.payload;
            const chatIndex = state.chats.findIndex(c => c._id === chatId);
            if (chatIndex !== -1) {
                state.chats[chatIndex] = { ...state.chats[chatIndex], ...updates };
            }
        },
        // Delete a chat
        deleteChat: (state, action) => {
            state.chats = state.chats.filter(c => c._id !== action.payload);
            if (state.currentChatId === action.payload) {
                state.currentChatId = null;
            }
            delete state.chatMessages[action.payload];
        },
        // Rename a temporary chat id to the persisted backend id and keep its messages together.
        renameChatId: (state, action) => {
            const { oldChatId, newChatId, updates = {} } = action.payload;
            const chatIndex = state.chats.findIndex((chat) => chat._id === oldChatId);

            if (chatIndex !== -1) {
                state.chats[chatIndex] = {
                    ...state.chats[chatIndex],
                    ...updates,
                    _id: newChatId,
                };
            }

            if (state.currentChatId === oldChatId) {
                state.currentChatId = newChatId;
            }

            if (state.chatMessages[oldChatId]) {
                state.chatMessages[newChatId] = state.chatMessages[oldChatId];
                delete state.chatMessages[oldChatId];
            }
        },
        // Set messages for a specific chat
        setChatMessages: (state, action) => {
            const { chatId, messages } = action.payload;
            state.chatMessages[chatId] = messages;
        },
        // Add a message to a chat
        addMessage: (state, action) => {
            const { chatId, message } = action.payload;
            if (!state.chatMessages[chatId]) {
                state.chatMessages[chatId] = [];
            }
            state.chatMessages[chatId].push(message);
        },
        // Set current chat
        setCurrentChatId: (state, action) => {
            state.currentChatId = action.payload;
        },
        // Set loading state
        setIsLoading: (state, action) => {
            state.isLoading = action.payload;
        },
        // Track which user is currently bootstrapping chats.
        setChatsLoadingForUserId: (state, action) => {
            state.chatsLoadingForUserId = action.payload;
        },
        // Track which user already has chats loaded in this session.
        setChatsLoadedForUserId: (state, action) => {
            state.chatsLoadedForUserId = action.payload;
            state.chatsLoadingForUserId = null;
        },
        // Set error
        setError: (state, action) => {
            state.error = action.payload;
        },
        // Clear error
        clearError: (state) => {
            state.error = null;
        },
        // Reset chat state on logout or user switch.
        resetChatState: () => ({
            chats: [],
            chatMessages: {},
            currentChatId: null,
            isLoading: false,
            chatsLoadingForUserId: null,
            chatsLoadedForUserId: null,
            error: null,
        })
    }
});

export const { 
    setChats, 
    addChat, 
    updateChat, 
    deleteChat, 
    renameChatId,
    setChatMessages, 
    addMessage, 
    setCurrentChatId, 
    setIsLoading, 
    setChatsLoadingForUserId,
    setChatsLoadedForUserId,
    setError,
    clearError,
    resetChatState
} = chatSlice.actions;
export default chatSlice.reducer;
