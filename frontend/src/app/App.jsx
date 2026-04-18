import React from "react";
import { RouterProvider } from "react-router";
import { router } from "./Routes/App.routes";

export default function App() {
  return <RouterProvider router={router} />;
}
