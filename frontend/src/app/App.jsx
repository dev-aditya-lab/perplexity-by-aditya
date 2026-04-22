import React, { useEffect } from "react";
import { RouterProvider } from "react-router";
import { router } from "./Routes/App.routes";
import { useAuth } from "./features/auth/hook/useAuth";


export default function App() {
  const {handleGetMe} = useAuth(); // Initialize authentication state and listeners
  useEffect(() => {
    handleGetMe();
  }, [handleGetMe]);  
  return <RouterProvider router={router} />;
}
