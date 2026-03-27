
import {useLanguage} from "../Context/LanguageContext";
import type { I18nKey} from "../Types/I18n";


export const useI18nText = () => {
    const { t, lang, dir } = useLanguage();

    const getText = (key: I18nKey): string => {
        return t(key);
    };

    return { getText, lang, dir };
};

export default useI18nText;