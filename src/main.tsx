import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { ClerkProvider } from "@clerk/react-router";
import {LanguageProvider} from "./Context/LanguageContext.tsx";
import App from "./App";
import "./App.css";


const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;
console.log(PUBLISHABLE_KEY);

if (!PUBLISHABLE_KEY) {
    throw new Error("Clerk Publishable Key was not found");
}

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <BrowserRouter>
            <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
                <LanguageProvider>
                <App />
                </LanguageProvider>
            </ClerkProvider>
        </BrowserRouter>
    </React.StrictMode>
);




