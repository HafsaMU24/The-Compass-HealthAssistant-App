export type Lang = "sv" | "ar";
export type Direction = "ltr" | "rtl";

export type I18nKey =
    | "appName"
    | "home"
    | "health"
    | "quiz"
    | "login"
    | "logout"
    | "welcome"
    | "startQuiz"
    | "readAloud"
    | "stopReading"
    | "language"
    | "healthInfoTitle"
    | "healthInfoDesc";

export type I18nDict = Record<Lang, Record<I18nKey, string>>;
