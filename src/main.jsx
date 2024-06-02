import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { dark } from "@clerk/themes";
import { ClerkProvider } from "@clerk/clerk-react";
// import router from "./router";
import { RouterProvider } from "react-router-dom";
import router from "./router";

// Import your publishable key
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key");
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ClerkProvider
      publishableKey={PUBLISHABLE_KEY}
      appearance={{
        baseTheme: dark,
      }}
    >
      <RouterProvider router={router} />
    </ClerkProvider>
  </React.StrictMode>
);
