import React from "react";
import { loginService, LoginError } from "../Services/LoginService";
import type { LoginInput } from "../Types/Domain";

const LoginForm: React.FC = () => {
    const [mode, setMode] = React.useState<"existing" | "new">("existing");
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [name, setName] = React.useState("");
    const [error, setError] = React.useState<string | null>(null);

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);

        const input: LoginInput =
            mode === "new"
                ? { kind: "new", email, password, name: name || "Demo User" }
                : { kind: "existing", email, password };

        try {
            loginService.upsertAndLogin(input);
        } catch (e: unknown) {
            if (e instanceof LoginError) setError(e.message);
            else setError("Okänt fel vid inloggning.");
        }
    };

    return (
        <div className="mx-auto max-w-md space-y-3">
            <div className="flex gap-2">
                <button
                    type="button"
                    className={`rounded-xl border px-3 py-2 text-sm ${mode === "existing" ? "bg-black/10" : ""}`}
                    onClick={() => setMode("existing")}
                >
                    Logga in
                </button>
                <button
                    type="button"
                    className={`rounded-xl border px-3 py-2 text-sm ${mode === "new" ? "bg-black/10" : ""}`}
                    onClick={() => setMode("new")}
                >
                    Skapa konto
                </button>
            </div>

            <form onSubmit={submit} className="space-y-3">
                {mode === "new" && (
                    <label className="block">
                        <div className="text-xs text-black/70">Namn</div>
                        <input className="mt-1 w-full rounded-xl border p-2" value={name} onChange={(e) => setName(e.target.value)} />
                    </label>
                )}

                <label className="block">
                    <div className="text-xs text-black/70">E-post</div>
                    <input className="mt-1 w-full rounded-xl border p-2" value={email} onChange={(e) => setEmail(e.target.value)} />
                </label>

                <label className="block">
                    <div className="text-xs text-black/70">Lösenord</div>
                    <input
                        className="mt-1 w-full rounded-xl border p-2"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </label>

                {error && <div className="rounded-xl border border-red-300 bg-red-50 p-2 text-sm">{error}</div>}

                <button type="submit" className="w-full rounded-xl bg-black px-3 py-2 text-sm text-white">
                    Fortsätt
                </button>
            </form>
        </div>
    );
};

export default LoginForm;
