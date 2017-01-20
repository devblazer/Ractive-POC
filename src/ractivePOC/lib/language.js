const ERRORS_COMBINATIONS_LOGGED = {};
let currentLanguage = 'unknown';
const LANGUAGE_STRINGS = {};
let stringsAdded = false;

export default class Language {
    constructor() {
        throw new Error('static class: Language, is not instantiable');
    }

    static setLanguage(language) {
        currentLanguage = language;
    }

    static addStrings(strings, language=null) {
        language = language || currentLanguage;
        if (!LANGUAGE_STRINGS[language])
            LANGUAGE_STRINGS[language] = {};

        for (let p in strings){
            LANGUAGE_STRINGS[language][p] = strings[p];
        }
        stringsAdded = true;
    }

    static getString(key, language=null) {
        language = language || currentLanguage;

        if (LANGUAGE_STRINGS[language] && typeof LANGUAGE_STRINGS[language][key]!='undefined')
            return LANGUAGE_STRINGS[language][key];

        if (stringsAdded && (!ERRORS_COMBINATIONS_LOGGED[language] || !ERRORS_COMBINATIONS_LOGGED[language][key])) {
            if (!ERRORS_COMBINATIONS_LOGGED[language])
                ERRORS_COMBINATIONS_LOGGED[language]={};

            console.warn(`Language string:${key} not found for language:${language}`);
            ERRORS_COMBINATIONS_LOGGED[language][key] = true;
        }

        return key;
    }
}