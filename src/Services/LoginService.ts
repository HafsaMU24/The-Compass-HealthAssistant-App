import type { DemoSession, DemoUser, LoginInput } from "../Types/Domain";
import { isNewUser } from "../Types/Domain";
import StorageService from "../Services/StorageService";

type DemoDb = { users: Array<DemoUser & { password: string }> };
const readDb = (): DemoDb => StorageService.get<DemoDb>("demoUsers") ?? { users: [] };
const writeDb = (db: DemoDb) => StorageService.set("demoUsers", db);

const uid = () => crypto.randomUUID();

export class LoginError extends Error {
    constructor(message: string) {
        super(message);
        this.name = "LoginError";
    }
}

export const loginService = {
    upsertAndLogin(input: LoginInput): DemoSession {
        const db = readDb();

        if (isNewUser(input)) {
            const exists = db.users.some((u) => u.email.toLowerCase() === input.email.toLowerCase());
            if (exists) throw new LoginError("E-post finns redan. Logga in istället.");

            const user = {
                id: uid() as DemoUser["id"],
                email: input.email,
                name: input.name,
                password: input.password,
            };

            db.users.push(user);
            writeDb(db);

            const session: DemoSession = {
                id: user.id,
                email: user.email,
                name: user.name,
                issuedAt: Date.now(),
                provider: "local",
            };

            StorageService.set("demoSession", session);
            return session;
        }

        const found = db.users.find(
            (u) => u.email.toLowerCase() === input.email.toLowerCase() && u.password === input.password
        );
        if (!found) throw new LoginError("Fel e-post eller lösenord.");

        const session: DemoSession = {
            id: found.id,
            email: found.email,
            name: found.name,
            issuedAt: Date.now(),
            provider: "local",
        };

        StorageService.set("demoSession", session);
        return session;
    },

    getSession(): DemoSession | null {
        return StorageService.get<DemoSession>("demoSession");
    },

    logout(): void {
        StorageService.remove("demoSession");
    },
};
