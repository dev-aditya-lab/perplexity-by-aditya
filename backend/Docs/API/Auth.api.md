# Auth API Documentation

This document covers all authentication-related endpoints mounted under `/api/auth`.

## Base URL

- Local: `http://localhost:3000`
- Auth base path: `/api/auth`

## Authentication Model

- The server uses a JWT stored in an HTTP cookie named `token`.
- Protected routes require this cookie.
- Frontend clients should send requests with credentials enabled.

Example (fetch):

```js
fetch("http://localhost:3000/api/auth/getMe", {
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

## Axios Examples (Auth)

### Register

```js
const res = await api.post("/api/auth/register", {
	username: "aditya_gupta",
	email: "aditya@example.com",
	password: "strongpass123",
});

console.log(res.data);
```

### Verify Email

```js
const token = "<verification-token>";
const res = await api.get(`/api/auth/verify-email?token=${token}`);

// This endpoint returns HTML content.
console.log(res.data);
```

### Login

```js
const res = await api.post("/api/auth/login", {
	emailOrUsername: "aditya@example.com",
	password: "strongpass123",
});

// Cookie token is set by server.
console.log(res.data.user);
```

### Get Current User

```js
const res = await api.get("/api/auth/getMe");
console.log(res.data.user);
```

### Send Forgot Password OTP

```js
const res = await api.post("/api/auth/forget-password", {
	email: "aditya@example.com",
});

console.log(res.data.message);
```

### Verify Forgot Password OTP

```js
const email = "aditya@example.com";
const res = await api.post(`/api/auth/verify-forget-password-otp/${email}`, {
	otp: "123456",
});

console.log(res.data.message);
```

## Standard Response Shape

Most successful responses follow this pattern:

```json
{
	"success": true,
	"message": "...",
	"data": {}
}
```

Validation failures from `express-validator` return:

```json
{
	"errors": [
		{
			"type": "field",
			"msg": "...",
			"path": "...",
			"location": "body"
		}
	]
}
```

---

## 1) Register User

- Method: `POST`
- Path: `/api/auth/register`
- Auth required: `No`

### Request Body

| Field | Type | Required | Rules |
| --- | --- | --- | --- |
| `username` | `string` | Yes | 3-30 chars, letters/numbers/underscore only |
| `email` | `string` | Yes | Must be valid email |
| `password` | `string` | Yes | Minimum 6 chars |

### Example Request

```json
{
	"username": "aditya_gupta",
	"email": "aditya@example.com",
	"password": "strongpass123"
}
```

### Success Response

- Status: `201 Created`

```json
{
	"success": true,
	"message": "User registered successfully",
	"data": {
		"username": "aditya_gupta",
		"email": "aditya@example.com"
	}
}
```

### Possible Errors

- `400 Bad Request`: User already exists
- `400 Bad Request`: Validation errors

---

## 2) Verify Email

- Method: `GET`
- Path: `/api/auth/verify-email`
- Auth required: `No`

### Query Parameters

| Param | Type | Required | Description |
| --- | --- | --- | --- |
| `token` | `string` | Yes | Email verification JWT from email link |

### Example Request

`GET /api/auth/verify-email?token=eyJ...`

### Success Response

- Status: `200 OK`
- Returns an HTML page (`email verified` / `already verified` template)

### Possible Errors

- `400 Bad Request`: Missing token
- `400 Bad Request`: Invalid or expired token
- `404 Not Found`: User not found

---

## 3) Login

- Method: `POST`
- Path: `/api/auth/login`
- Auth required: `No`

### Request Body

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `emailOrUsername` | `string` | Yes | User email or username |
| `password` | `string` | Yes | Account password |

### Example Request

```json
{
	"emailOrUsername": "aditya@example.com",
	"password": "strongpass123"
}
```

### Success Response

- Status: `200 OK`
- Sets cookie: `token=<jwt>`

```json
{
	"success": true,
	"message": "Login successful",
	"user": {
		"_id": "...",
		"username": "aditya_gupta",
		"email": "aditya@example.com",
		"verified": true,
		"createdAt": "...",
		"updatedAt": "..."
	}
}
```

### Possible Errors

- `404 Not Found`: User not found with this email or username
- `401 Unauthorized`: Invalid password
- `403 Forbidden`: Email not verified
- `400 Bad Request`: Validation errors

---

## 4) Get Current User

- Method: `GET`
- Path: `/api/auth/getMe`
- Auth required: `Yes` (cookie `token`)

### Success Response

- Status: `200 OK`

```json
{
	"success": true,
	"message": "User get successfully",
	"user": {
		"_id": "...",
		"username": "aditya_gupta",
		"email": "aditya@example.com",
		"verified": true,
		"createdAt": "...",
		"updatedAt": "..."
	}
}
```

### Possible Errors

- `401 Unauthorized`: No token provided
- `401 Unauthorized`: Invalid token
- `404 Not Found`: User not found

---

## 5) Send Forgot Password OTP

- Method: `POST`
- Path: `/api/auth/forget-password`
- Auth required: `No`

### Request Body

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `email` | `string` | Yes | Registered user email |

### Example Request

```json
{
	"email": "aditya@example.com"
}
```

### Success Response

- Status: `200 OK`

```json
{
	"success": true,
	"message": "Password reset OTP sent to email"
}
```

### Notes

- OTP is stored in Redis with 10-minute expiry.

### Possible Errors

- `404 Not Found`: User not found with this email

---

## 6) Verify Forgot Password OTP

- Method: `POST`
- Path: `/api/auth/verify-forget-password-otp/:email`
- Auth required: `No`

### Path Parameters

| Param | Type | Required | Description |
| --- | --- | --- | --- |
| `email` | `string` | Yes | User email to verify OTP against |

### Request Body

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `otp` | `string` | Yes | OTP sent to email |

### Example Request

`POST /api/auth/verify-forget-password-otp/aditya@example.com`

```json
{
	"otp": "123456"
}
```

### Success Response

- Status: `200 OK`

```json
{
	"success": true,
	"message": "OTP verified successfully. You can now reset your password."
}
```

### Possible Errors

- `404 Not Found`: User not found with this email
- `400 Bad Request`: OTP expired or not found
- `400 Bad Request`: Invalid OTP

---

## Common Auth Errors

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

