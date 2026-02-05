import { useLanguage } from "../Context/LanguageContext";
import type { I18nKey } from "../Types/I18n";

function useI18nText() {
    const { t } = useLanguage();

    function getText(key: I18nKey): string {
        return t(key);
    }

    return { getText };
}

export default useI18nText;