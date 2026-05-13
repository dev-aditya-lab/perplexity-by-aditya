# Chat Backend Integration Guide

## 🎯 What Was Updated

This document outlines the integration of your chat frontend with the backend API and Redux state management.

---

## 📋 Files Modified

### 1. **Redux State Management** (`/frontend/src/app/Redux/reducers/chat.slice.js`)

**Before**: Simple object-based state
**After**: Comprehensive array-based state management

**New State Structure**:
```javascript
{
  chats: [],                    // Array of chat objects from backend
  chatMessages: {},             // Map of chatId -> messages array
  currentChatId: null,          // Currently selected chat
  isLoading: false,             // Loading state
  error: null                   // Error messages
}
```

**New Actions**:
- `setChats(chats)` - Set all chats
- `addChat(chat)` - Add new chat
- `updateChat({chatId, updates})` - Update chat properties
- `deleteChat(chatId)` - Remove chat
- `setChatMessages({chatId, messages})` - Set messages for a chat
- `addMessage({chatId, message})` - Add single message
- `setCurrentChatId(chatId)` - Set active chat
- `setIsLoading(boolean)` - Loading state
- `setError(error)` - Error state
- `clearError()` - Clear error

---

### 2. **Chat API Service** (`/frontend/src/app/features/chat/services/chat.api.js`)

**New Function**:
```javascript
export const createNewChat = async () => {
  // Creates temporary chat object (persisted to DB on first message)
  return {
    _id: `temp-${Date.now()}`,
    title: 'New Chat',
    createdAt: new Date().toISOString(),
    messages: []
  };
}
```

**Existing Functions** (now properly documented):
- `sendMessage({message, chatId})` - Send message (creates chat if needed)
- `getChats()` - Fetch all user chats
- `getChatMessages(chatId)` - Fetch messages for a chat
- `deleteChat(chatId)` - Delete a chat

---

### 3. **Socket.IO Service** (`/frontend/src/app/features/chat/services/chat.socket.js`)

**Changes**:
- Returns persistent socket instance
- Proper connect/disconnect/error handlers
- New utility functions:

```javascript
export const getSocketInstance = () => socketInstance;
export const disconnectSocket = () => { ... };
```

---

### 4. **useChat Hook** (`/frontend/src/app/features/chat/hooks/useChat.js`)

**Complete Rewrite** - Now provides full chat functionality:

```javascript
const {
  socket,                    // Socket.IO instance
  loadChats,                 // Load all chats
  createChat,                // Create new chat
  loadChatMessages,          // Load messages for a chat
  handleSendMessage,         // Send message to AI
  handleDeleteChat,          // Delete a chat
  cleanup                    // Cleanup on unmount
} = useChat();
```

**Features**:
- Auto-initializes socket connection
- Listens to `ai_response` events
- Dispatches Redux actions
- Proper error handling
- Cleanup on unmount

---

### 5. **Dashboard Component** (`/frontend/src/app/features/chat/pages/Dashboard.jsx`)

**Major Changes**:

**Before**: Local state, demo data, socket emission
**After**: Redux state, backend API, proper lifecycle

**Key Updates**:
- ✅ Removed all demo/mock data
- ✅ Connected to Redux state
- ✅ Load chats on mount
- ✅ Proper chat creation flow
- ✅ Message loading on chat selection
- ✅ Real API integration
- ✅ Error handling display

**New Lifecycle**:
```
Mount
  ↓
Load User ID
  ↓
Load All Chats
  ↓
User Selects/Creates Chat
  ↓
Load Chat Messages
  ↓
User Sends Message
  ↓
API Call + Socket Response
  ↓
Add Message to Redux
```

---

### 6. **Sidebar Component** (`/frontend/src/app/features/chat/components/Sidebar.jsx`)

**Updates**:
- Added `onSelectChat` handler
- Added `onDeleteChat` handler
- Added `isLoading` prop
- Changed from `chat.id` to `chat._id`
- Added delete button with hover effect
- Proper click handlers for selecting chats

---

### 7. **ChatInterface Component** (`/frontend/src/app/features/chat/components/ChatInterface.jsx`)

**Updates**:
- Accept `isLoading` from parent
- Accept `error` prop
- Display error messages
- Merge parent loading state with local state

---

## 🔄 Data Flow

### 1. **Loading Chats**
```
Dashboard Mount
  ↓
useChat.loadChats()
  ↓
chat.api.getChats()
  ↓
Redux: setChats([...])
  ↓
Sidebar renders chat list
```

### 2. **Creating New Chat**
```
User clicks "New Chat"
  ↓
useChat.createChat()
  ↓
Redux: addChat(tempChat)
  ↓
setCurrentChatId(tempId)
  ↓
Sidebar selects new chat
```

### 3. **Sending Message**
```
User sends message
  ↓
handleSendMessage(message, currentChatId)
  ↓
Redux: addMessage(userMessage)
  ↓
chat.api.sendMessage({message, chatId})
  ↓
Backend creates chat if temp ID
  ↓
AI generates response
  ↓
Socket emits 'ai_response'
  ↓
Redux: addMessage(aiMessage)
```

### 4. **Selecting Chat**
```
User clicks chat in sidebar
  ↓
handleSelectChat(chatId)
  ↓
useChat.loadChatMessages(chatId)
  ↓
chat.api.getChatMessages(chatId)
  ↓
Redux: setChatMessages({chatId, messages})
  ↓
Redux: setCurrentChatId(chatId)
  ↓
ChatInterface renders messages
```

---

## 📊 Message Structure

**Backend Message Format**:
```json
{
  "_id": "messageId",
  "content": "Message text",
  "role": "user|assistant",
  "createdAt": "2026-05-12T10:00:00.000Z",
  "updatedAt": "2026-05-12T10:00:00.000Z"
}
```

**Chat Structure**:
```json
{
  "_id": "chatId",
  "user": "userId",
  "title": "Chat Title",
  "createdAt": "2026-05-12T10:00:00.000Z",
  "updatedAt": "2026-05-12T10:00:00.000Z"
}
```

---

## 🔧 Backend API Endpoints Used

All endpoints are prefixed with `/api/chats`

| Endpoint | Method | Purpose |
|----------|--------|---------|
| `/` | GET | Get all chats for user |
| `/{chatId}/messages` | GET | Get messages for a chat |
| `/message` | POST | Send message (creates chat if needed) |
| `/delete/{chatId}` | DELETE | Delete a chat |

---

## 🧪 Testing Checklist

- [ ] Load chats on dashboard mount
- [ ] Create new chat works
- [ ] Chat appears in sidebar
- [ ] Select chat loads messages
- [ ] Send message works
- [ ] AI response appears
- [ ] Delete chat removes from list
- [ ] Error messages display correctly
- [ ] Loading states show properly
- [ ] Socket connection established

---

## 🚨 Common Issues & Solutions

### **Messages Not Loading**
- Check Redux state in DevTools
- Verify backend endpoint returns correct format
- Check browser console for errors

### **Chat Not Creating**
- Ensure API_BASE_URL environment variable is set
- Check backend CORS settings
- Verify authentication token is present

### **Socket Not Receiving Messages**
- Check SOCKET_URL environment variable
- Verify backend Socket.IO server is running
- Check browser DevTools Network tab for WebSocket

### **Redux State Not Updating**
- Use Redux DevTools browser extension
- Check that actions are being dispatched
- Verify reducers are handling actions

---

## 📝 Environment Variables

Make sure these are set in `/frontend/.env`:

```
VITE_API_BASE_URL=http://localhost:5000
VITE_SOCKET_URL=http://localhost:5000
```

---

## 🚀 Running the Application

### Backend
```bash
cd backend
npm run dev
# or
npm start
```

### Frontend
```bash
cd frontend
npm run dev
```

---

## 📚 Redux State Selectors

```javascript
// In any component:
const { chats, currentChatId, chatMessages, isLoading, error } = useSelector(state => state.chat);

// Get current chat messages:
const messages = chatMessages[currentChatId] || [];

// Get specific chat:
const currentChat = chats.find(c => c._id === currentChatId);
```

---

## 🎨 Component Props

### Dashboard
- No required props (uses Redux)

### Sidebar
```javascript
<Sidebar
  onNewChat={handleNewChat}
  chatHistory={chats}
  onSelectChat={handleSelectChat}
  onDeleteChat={handleDeleteChat}
  activeChatId={currentChatId}
  isLoading={isLoading}
/>
```

### ChatInterface
```javascript
<ChatInterface
  onSendMessage={handleSendMessage}
  messages={formattedMessages}
  user={user}
  isLoading={isLoading}
  error={error}
/>
```

---

## 🔍 Debugging Tips

1. **Redux DevTools Extension** - Monitor state changes
2. **Browser Network Tab** - Check API calls
3. **Console Logs** - Already added in key places
4. **React DevTools** - Inspect component props/state
5. **Socket.IO DevTools** - Monitor socket events

---

## 📖 Related Documentation

- [Backend API Docs](../backend/Docs/API/chats.api.md)
- [Redux Documentation](https://redux.js.org/)
- [Socket.IO Client Docs](https://socket.io/docs/v4/client-api/)
- [React Hooks](https://react.dev/reference/react)

---

**Integration Status**: ✅ Complete  
**Last Updated**: May 12, 2026  
**Version**: 1.0
