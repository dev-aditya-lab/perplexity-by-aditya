# Architecture Graph Report

## Overview

**Corpus**: 54 files (~12,204 words)

### Architecture Summary
- **Total Nodes**: 148
- **Total Edges**: 209
- **Communities Detected**: 17
- **Main Technologies**: Node.js/Express, MongoDB, React, Redux, Socket.IO, Groq AI, Resend Email

---

## God Nodes (High-Importance Hub Components)

These are the most connected and critical nodes in your architecture:

1. **useAuth()** - Key integration point in the system
2. **forgetPasswordByEmailOtpController()** - Key integration point in the system
3. **sendEmail()** - Key integration point in the system
4. **registerController()** - Key integration point in the system
5. **verifyEmailController()** - Key integration point in the system
6. **loginController()** - Key integration point in the system
7. **chatMessageController()** - Key integration point in the system
8. **authMiddleware()** - Key integration point in the system
9. **sendMessageToAI()** - Key integration point in the system
10. **generateChatTitle()** - Key integration point in the system

---

## Surprising Connections

Unexpected relationships that reveal hidden architectural patterns:

1. forgetPasswordByEmailOtpController() calls forgetPasswordOTPTemplate()
2. App() calls useAuth()
3. Login() calls useAuth()
4. Register() calls useAuth()
5. startServer() calls connectDB()

---

## Technology Stack

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB (Mongoose ODM)
- **Authentication**: JWT + Bcrypt
- **Cache**: Redis
- **Email**: Resend
- **AI Integration**: Groq (LangChain)
- **Real-time**: Socket.IO

### Frontend
- **Framework**: React
- **Build Tool**: Vite
- **State Management**: Redux
- **Styling**: Tailwind CSS
- **Icons**: Remixicon
- **Routing**: React Router
- **Communication**: Socket.IO, Axios

---

## Key Architecture Patterns

### 1. Authentication Pipeline
User registration -> Email verification -> JWT-based sessions

### 2. Chat Messaging Pipeline  
Chat creation -> Message persistence -> AI response generation via Groq

### 3. HTTP Server Setup
Express initialization -> Route registration -> Middleware application

### 4. AI Integration Layer
Groq API integration -> System prompts -> Response generation

---

## Files Analyzed
- Backend Code: 49 files
- Documentation: 5 files

graphify complete
  graph.json      — GraphRAG-ready, queryable by MCP or CLI
  graph.html      — interactive visualization (open in browser)
  GRAPH_REPORT.md — plain-language architecture summary
