import React from "react";
import type { DemoSession, LoginInput } from "../Types/Domain";
import { loginService, LoginError } from "../Services/LoginService";

type AuthState = {
    session: DemoSession | null;
    login: (input: LoginInput) => Promise<{ ok: true } | { ok: false; message: string }>;
    logout: () => void;
};

const AuthContext = React.createContext<AuthState | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [session, setSession] = React.useState<DemoSession | null>(() => loginService.getSession());

    const login: AuthState["login"] = async (input) => {
        try {
            const s = loginService.upsertAndLogin(input);
            setSession(s);
            return { ok: true };
        } catch (e: unknown) {
            if (e instanceof LoginError) return { ok: false, message: e.message };
            return { ok: false, message: "Okänt fel vid inloggning." };
        }
    };

    const logout = () => {
        loginService.logout();
        setSession(null);
    };

    return <AuthContext.Provider value={{ session, login, logout }}>{children}</AuthContext.Provider>;
}

export function useAuth() {
    const ctx = React.useContext(AuthContext);
    if (!ctx) throw new Error("useAuth måste användas inom AuthProvider");
    return ctx;
}
