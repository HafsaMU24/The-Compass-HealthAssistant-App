import React from "react";
import { NavLink } from "react-router-dom";
import { SignedIn, SignedOut, UserButton } from "@clerk/react-router";
import LanguageButton from "./LanguageButton";
import { useLanguage } from "../Context/LanguageContext";

const base = "rounded-xl px-3 py-2 text-sm hover:bg-black/5";
const active = "bg-black/10";

const Navbar: React.FC = () => {
    const { t } = useLanguage();

    return (
        <header className="sticky top-0 z-10 border-b bg-white/80 backdrop-blur">
            <div className="mx-auto flex max-w-5xl items-center justify-between gap-3 p-3">
                <div className="flex items-center gap-2">
                    <div className="text-sm font-semibold">{t("appName")}</div>
                    <nav className="hidden gap-1 sm:flex">
                        <NavLink to="/" className={({ isActive }) => `${base} ${isActive ? active : ""}`}>
                            {t("home")}
                        </NavLink>
                        <NavLink to="/health" className={({ isActive }) => `${base} ${isActive ? active : ""}`}>
                            {t("health")}
                        </NavLink>
                        <NavLink to="/quiz" className={({ isActive }) => `${base} ${isActive ? active : ""}`}>
                            {t("quiz")}
                        </NavLink>
                    </nav>
                </div>

                <div className="flex items-center gap-2">
                    <LanguageButton />

                    <SignedOut>
                        <NavLink to="/sign-in" className="rounded-xl border px-3 py-2 text-sm">
                            {t("login")}
                        </NavLink>
                    </SignedOut>

                    <SignedIn>
                        <UserButton />
                    </SignedIn>
                </div>
            </div>
        </header>
    );
};

export default Navbar;
