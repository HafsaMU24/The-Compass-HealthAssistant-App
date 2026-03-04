import React from "react";
import  useI18nText   from "../Utils/useI18nText.ts";


const SearchBar: React.FC = () => {
    const { getText } = useI18nText();

    return (
        <input
            type="text"
            className="w-full rounded-xl border px-3 py-2 text-sm"
            placeholder={getText("health")}
        />
    );
};

export default SearchBar;
