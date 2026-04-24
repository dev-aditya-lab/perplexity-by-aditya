import { createBrowserRouter, Navigate } from "react-router";
import Login from "../features/auth/pages/Login";
import Register from "../features/auth/pages/Register";
import Dashboard from "../features/chat/pages/Dashboard.jsx";
import AuthProtected from "../features/auth/components/AuthProtected";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <AuthProtected><Dashboard /></AuthProtected>,
    },
    {
        path: "/login",
        element: <Login />,
    },
    {
        path: "/register",
        element: <Register />,
    },
]);