import React from "react";
import { NavLink } from "react-router-dom";
import { UserButton } from "@clerk/react-router";
import LanguageButton from "./LanguageButton";
import { useLanguage } from "../Context/LanguageContext";


interface NavbarProps {
    children?: React.ReactNode;
}

const baseLink = "relative z-10 flex items-center justify-center rounded-2xl px-4 py-4 text-sm font-bold transition-all duration-300 border border-white/10 active:scale-95 select-none";
const activeLink = "bg-white text-blue-900 shadow-xl border-white scale-105";
const inactiveLink = "bg-white/5 text-white hover:bg-white/15 backdrop-blur-md";

const Navbar: React.FC<NavbarProps> = ({ children }) => {
    const { t } = useLanguage();

    return (
        <nav className="relative flex flex-col h-[700px] w-full max-w-sm mx-auto p-3 bg-[#0a192f] rounded-[3rem] shadow-2xl border border-white/5 overflow-hidden">

            <div className="flex justify-between items-start w-full mb-4">
                <div className="flex flex-col">
                    <span className="text-[10px] uppercase tracking-widest text-blue-400 font-bold opacity-70">Health Assistant</span>
                    <h1 className="text-xl font-black text-white italic">{t("appName")}</h1>
                </div>
                <LanguageButton />
            </div>


            <div className="flex-1 overflow-y-auto px-1 py-1 custom-scrollbar relative z-20">
                {children}
            </div>


            <div className="flex flex-col gap-3 mt-4 w-full border-t border-white/10 pt-4">
                <div className="grid grid-cols-2 gap-3">
                    <NavLink to="/" className={({ isActive }) => `${baseLink} ${isActive ? activeLink : inactiveLink}`}>
                        {t("home")}
                    </NavLink>
                    <NavLink to="/assessment" className={({ isActive }) => `${baseLink} ${isActive ? activeLink : inactiveLink}`}>
                        {t("assessment")}
                    </NavLink>
                </div>
                <NavLink to="/health/" className={({ isActive }) => `${baseLink} ${isActive ? activeLink : inactiveLink} w-full`}>
                    {t("health")}
                </NavLink>
                <div className="flex justify-center pt-2">
                    <UserButton afterSignOutUrl="/" />
                </div>
            </div>
        </nav>
    );
};

export default Navbar;