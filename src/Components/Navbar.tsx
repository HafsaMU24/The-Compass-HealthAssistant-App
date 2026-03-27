import React from "react";
import { NavLink } from "react-router-dom";
import { SignedIn, useClerk } from "@clerk/clerk-react";
import LanguageButton from "./LanguageButton";
import {useLanguage} from "../Context/LanguageContext";

interface NavbarProps {
    children?: React.ReactNode;
}

const baseLink = "relative z-10 flex items-center justify-center rounded-2xl px-4 py-4 text-sm font-bold transition-all duration-300 border border-white/10 active:scale-95 select-none";
const activeLink = "bg-sky text-blue-900 shadow-xl  border-white scale-105";
const inactiveLink = "bg-white/5 text-white hover:bg-white/15 backdrop-blur-md";

const Navbar: React.FC<NavbarProps> = ({ children }) => {
    const { t } = useLanguage();
    const { signOut } = useClerk();

    return (
        <nav className="relative flex flex-col h-175 w-full max-w-sm mx-auto p-2 bg-[#0a192f] rounded-[3rem] shadow-2xl border border-white/10 overflow-hidden">

            <div className="flex justify-between items-start w-full mb-2">
                <div className="flex flex-col">
                    <span className="text-[10px] uppercase tracking-widest text-blue-500 font-blod opacity-50">Health Assistant</span>
                    <h2 className="text-l font-black text-blue-500 italic">{t("appName")}</h2>
                </div>
                <LanguageButton />
            </div>

            <div className="flex-1 overflow-y-auto px-1 py-1 custom-scrollbar relative z-20">
                {children}
            </div>

            <div className="flex flex-col gap-3 mt-4 w-full border-t border-white/10 pt-4">
                <div className="grid grid-cols-2 gap-3">
                    <NavLink to="/dashboard" className={({ isActive }) => `${baseLink} ${isActive ? activeLink : inactiveLink}`}>
                        {t("home")}
                    </NavLink>
                    <NavLink to="/assessment" className={({ isActive }) => `${baseLink} ${isActive ? activeLink : inactiveLink}`}>
                        {t("assessment")}
                    </NavLink>
                </div>

                <div className="flex gap-6">
                    <NavLink to="/health" className={({ isActive }) => `${baseLink} ${isActive ? activeLink : inactiveLink} flex-1`}>
                        {t("health")}
                    </NavLink>

                    <SignedIn>
                        <button

                            onClick={() => signOut({ redirectUrl: "/sign-in" })}
                            className="w-14 h-14 rounded-2xl bg-red-500/10 border border-fushia-50/20 text-red-500 flex items-center justify-center hover:bg-red-500 hover:text-white transition-all active:scale-90"
                            title={t("logout")}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15m3 0 3-3m0 0-3-3m3 3H9" />
                            </svg>
                        </button>
                    </SignedIn>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;