export type Lang = "sv" | "ar";
export type Direction = "ltr" | "rtl";

export type I18nKey =
    | "appName"
    | "home"
    | "health"
    | "assessment"
    | "login"
    | "logout"
    | "startQuiz"
    | "readAloud"
    | "stopReading"
    | "language"
    | "healthInfoDesc";

export type I18nDict = Record<Lang, Record<I18nKey, string>>;
