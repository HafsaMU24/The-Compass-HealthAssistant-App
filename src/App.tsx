import { Routes, Route, Navigate } from "react-router-dom";
import { SignedIn, SignedOut, RedirectToSignIn } from "@clerk/react-router";

import Navbar from "./Components/Navbar";
import { LanguageProvider } from "./Context/LanguageContext";

import HomePage from "./Pages/HomePage";
import HealthPage from "./Pages/HealthPage";
import TopicPage from "./Pages/TopicPage";
import QuizPage from "./Pages/QuizPage";
import SignInPage from "./Pages/SignInPage";
import SignUpPage from "./Pages/SignUpPage";

function App() {
    return (
        <LanguageProvider>
            {/* IF user is not Logged in, the login page is displayed */}
            <SignedOut>
                <RedirectToSignIn />
            </SignedOut>

            {/* IF the user is logged in, the app opens  */}
            <SignedIn>
                <div className="min-h-dvh">
                    <Navbar />

                    <main className="mx-auto max-w-5xl p-4">
                        <Routes>
                            <Route path="/" element={<HomePage />} />
                            <Route path="/health" element={<HealthPage />} />
                            <Route path="/health/:slug" element={<TopicPage />} />
                            <Route path="/quiz" element={<QuizPage />} />

                            {/* Clerk sidor - Login flow */}
                            <Route path="/sign-in/*" element={<SignInPage />} />
                            <Route path="/sign-up/*" element={<SignUpPage />} />

                            {/* Catch-all:  URL */}
                            <Route path="*" element={<Navigate to="/" replace />} />
                        </Routes>
                    </main>
                </div>
            </SignedIn>
        </LanguageProvider>
    );
}

export default App;