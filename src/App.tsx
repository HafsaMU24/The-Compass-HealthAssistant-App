import { Routes, Route, Navigate } from "react-router-dom";
import { SignedIn } from "@clerk/react-router";
import Navbar from "./Components/Navbar";
import { LanguageProvider } from "./Context/LanguageContext";
import HomePage from "./Pages/HomePage";
import HealthPage from "./Pages/HealthPage";
import QuizPage from "./Pages/QuizPage";
import CareTeamPage from "./Pages/CareTeamPage.tsx";
import MedicationPage from "./Pages/MedicationPage.tsx";


function App() {
    return (
        <LanguageProvider>
            <div className="flex flex-col min-h-screen bg-slate-100 items-center justify-center p-4">

                <Navbar>
                    <Routes>
                        <Route path="/" element={<HomePage />} />
                        <Route path="/assessment" element={<SignedIn><QuizPage /></SignedIn>} />
                        <Route path="/health" element={<SignedIn><HealthPage /></SignedIn>} />
                        <Route path="/health/medications" element={<SignedIn><MedicationPage /></SignedIn>} />
                        <Route path="/health/care-team" element={<SignedIn><CareTeamPage /></SignedIn>} />

                        <Route path="*" element={<Navigate to="/" replace />} />
                    </Routes>
                </Navbar>

            </div>
        </LanguageProvider>
    );
}

export default App;