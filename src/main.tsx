import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { ClerkProvider } from "@clerk/clerk-react";
import {LanguageProvider} from "./Context/LanguageContext";
import App from "./App";
import "./App.css";


const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;
console.log(PUBLISHABLE_KEY);


if (!PUBLISHABLE_KEY) {
    console.error("Missing Clerk Publishable Key. Please check your .env file.");
    throw new Error("Clerk Publishable Key is required to run the application.");
}


ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
            <BrowserRouter>
            <LanguageProvider>
                    <App />
            </LanguageProvider>
            </BrowserRouter>
        </ClerkProvider>
    </React.StrictMode>
);


