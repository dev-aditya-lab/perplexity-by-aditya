# Chats API Documentation

This document covers chat endpoints mounted under `/api/chats`.

## Base URL

- Local: `http://localhost:3000`
- Chats base path: `/api/chats`

## Authentication

- All chat routes are protected.
- A valid JWT must be present in cookie `token`.
- Send requests with credentials enabled from frontend apps.

Example (fetch):

```js
fetch("http://localhost:3000/api/chats", {
	method: "GET",
	credentials: "include",
});
```

### Axios Setup

```js
import axios from "axios";

export const api = axios.create({
	baseURL: "http://localhost:3000",
	withCredentials: true,
	headers: {
		"Content-Type": "application/json",
	},
});
```

---

## Axios Examples (Chats)

### Send Message (Create New Chat)

```js
const res = await api.post("/api/chats/message", {
	message: "Explain transformers in simple words",
});

console.log(res.data);
```

### Send Message (Existing Chat)

```js
const res = await api.post("/api/chats/message", {
	chatId: "680c0fca2a8d76f6d4a13d3e",
	message: "Give me a 3-point summary",
});

console.log(res.data.aiMessage);
```

### Get All Chats

```js
const res = await api.get("/api/chats");
console.log(res.data.chats);
```

### Get Messages by Chat ID

```js
const chatId = "680c0fca2a8d76f6d4a13d3e";
const res = await api.get(`/api/chats/${chatId}/messages`);

console.log(res.data.messages);
```

## Data Models (API-Level)

### Chat

```json
{
	"_id": "chatId",
	"user": "userId",
	"title": "Chat title",
	"createdAt": "2026-04-26T10:00:00.000Z",
	"updatedAt": "2026-04-26T10:00:00.000Z"
}
```

### Message

```json
{
	"_id": "messageId",
	"chat": "chatId",
	"content": "Hello",
	"role": "user",
	"createdAt": "2026-04-26T10:00:00.000Z",
	"updatedAt": "2026-04-26T10:00:00.000Z"
}
```

---

## 1) Send Message / Generate AI Reply

- Method: `POST`
- Path: `/api/chats/message`
- Auth required: `Yes`

### Request Body

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `message` | `string` | Yes | User prompt/content |
| `chatId` | `string` | No | Existing chat ID; if omitted, a new chat is created |

### Example Request (new chat)

```json
{
	"message": "Explain transformers in simple words"
}
```

### Example Request (existing chat)

```json
{
	"chatId": "680c0fca2a8d76f6d4a13d3e",
	"message": "Give me a 3-point summary"
}
```

### Success Response

- Status: `201 Created`

```json
{
	"title": "Transformers simplified",
	"message": "AI generated response...",
	"chatDetails": {
		"_id": "680c0fca2a8d76f6d4a13d3e",
		"user": "680c0e7a2a8d76f6d4a13d11",
		"title": "Transformers simplified",
		"createdAt": "2026-04-26T10:00:00.000Z",
		"updatedAt": "2026-04-26T10:00:00.000Z"
	},
	"aiMessage": {
		"_id": "680c102e2a8d76f6d4a13d48",
		"chat": "680c0fca2a8d76f6d4a13d3e",
		"content": "AI generated response...",
		"role": "ai",
		"createdAt": "2026-04-26T10:00:30.000Z",
		"updatedAt": "2026-04-26T10:00:30.000Z"
	}
}
```

### Possible Errors

- `400 Bad Request`: Message is required
- `401 Unauthorized`: No/invalid token
- `500 Internal Server Error`: Failed to get response from AI

---

## 2) Get User Chats

- Method: `GET`
- Path: `/api/chats`
- Auth required: `Yes`

### Success Response

- Status: `200 OK`

```json
{
	"message": "Chat history retrieved successfully",
	"chats": [
		{
			"_id": "680c0fca2a8d76f6d4a13d3e",
			"user": "680c0e7a2a8d76f6d4a13d11",
			"title": "Transformers simplified",
			"createdAt": "2026-04-26T10:00:00.000Z",
			"updatedAt": "2026-04-26T10:00:00.000Z"
		}
	]
}
```

### Possible Errors

- `401 Unauthorized`: No/invalid token
- `500 Internal Server Error`: Failed to retrieve chat history

---

## 3) Get Messages for a Chat

- Method: `GET`
- Path: `/api/chats/:chatId/messages`
- Auth required: `Yes`

### Path Parameters

| Param | Type | Required | Description |
| --- | --- | --- | --- |
| `chatId` | `string` | Yes | Chat ID to fetch messages for |

### Success Response

- Status: `200 OK`

```json
{
	"message": "Chat messages retrieved successfully",
	"chatTitle": "Transformers simplified",
	"messages": [
		{
			"_id": "680c10012a8d76f6d4a13d42",
			"chat": "680c0fca2a8d76f6d4a13d3e",
			"content": "Explain transformers in simple words",
			"role": "user",
			"createdAt": "2026-04-26T10:00:05.000Z",
			"updatedAt": "2026-04-26T10:00:05.000Z"
		},
		{
			"_id": "680c102e2a8d76f6d4a13d48",
			"chat": "680c0fca2a8d76f6d4a13d3e",
			"content": "AI generated response...",
			"role": "ai",
			"createdAt": "2026-04-26T10:00:30.000Z",
			"updatedAt": "2026-04-26T10:00:30.000Z"
		}
	]
}
```

### Possible Errors

- `401 Unauthorized`: No/invalid token
- `404 Not Found`: Chat not found (or does not belong to user)
- `500 Internal Server Error`: Failed to retrieve chat messages

---

## Common Auth Error Responses

### No Token

```json
{
	"success": false,
	"message": "Unauthorized. No token provided.",
	"err": "Unauthorized. No token provided."
}
```

### Invalid Token

```json
{
	"success": false,
	"message": "Unauthorized. Invalid token.",
	"err": "Unauthorized. Invalid token."
}
```

