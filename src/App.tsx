import React from "react";
import { useLanguage } from "./Context/LanguageContext.tsx";
import { SignedIn, SignedOut, RedirectToSignIn } from "@clerk/clerk-react";
import { Navigate, Route, Routes } from "react-router-dom";


import SignInPage from "./Pages/SignInPage.tsx";
import SignUpPage from "./Pages/SignUpPage.tsx";
import Navbar from "./Components/Navbar.tsx";
import QuizPage from "./Pages/QuizPage.tsx";
import HealthPage from "./Pages/HealthPage.tsx";
import MedicationPage from "./Pages/MedicationPage.tsx";
import CareTeamPage from "./Pages/CareTeamPage.tsx";
import DashboardPage from "./Pages/DashboardPage.tsx";
import KidsPage from "./Pages/KidsPage.tsx";
import PregnancyPage from "./Pages/PregnancyPage.tsx";

const App: React.FC = () => {
    const { lang, isAuthLoaded } = useLanguage();

    if (!isAuthLoaded) {
        return (
            <div className="flex h-screen items-center justify-center bg-[#0a192f] text-white">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    return (
        <div
            dir={lang === "ar" ? "rtl" : "ltr"}
            className="min-h-screen bg-white text-slate-200"
        >
            <Routes>

                <Route path="/*" element={
                    <>
                        <SignedOut>
                            <Routes>
                                <Route path="/sign-in/*" element={<SignInPage />} />
                                <Route path="/sign-up/*" element={<SignUpPage />} />
                                <Route path="*" element={<RedirectToSignIn />} />
                            </Routes>
                        </SignedOut>

                            <SignedIn>
                                <Navbar>
                                    <Routes>
                                        <Route path="/dashboard" element={<DashboardPage />} />
                                        <Route path="/assessment" element={<QuizPage />} />
                                        <Route path="/health" element={<HealthPage />} />
                                        <Route path="/health/medication" element={<MedicationPage />} />
                                        <Route path="/health/care-team" element={<CareTeamPage />} />
                                        <Route path="/health/kids" element={<KidsPage />} />
                                        <Route path="/health/pregnancy" element={<PregnancyPage />} />
                                        <Route path="/" element={<Navigate to="/dashboard" replace />} />
                                        <Route path="*" element={<Navigate to="/dashboard" replace />} />

                                    </Routes>
                                </Navbar>
                            </SignedIn>

                            <SignedOut>
                                <RedirectToSignIn />
                            </SignedOut>
                        </>
                    }
                />
            </Routes>
        </div>
    );
};

export default App;