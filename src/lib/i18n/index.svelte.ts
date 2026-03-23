import {
  translations,
  locales,
  type Locale,
  type TranslationKey,
} from "./translations";

const LOCALE_STORAGE_KEY = "noppa-locale";

function detectLocale(): Locale {
  const saved = localStorage.getItem(LOCALE_STORAGE_KEY);
  if (saved && locales.includes(saved as Locale)) {
    return saved as Locale;
  }
  const browserLang = navigator.language.split("-")[0];
  if (locales.includes(browserLang as Locale)) {
    return browserLang as Locale;
  }
  return "en";
}

let currentLocale: Locale = $state(detectLocale());

export function getLocale(): Locale {
  return currentLocale;
}

export function setLocale(locale: Locale) {
  currentLocale = locale;
  localStorage.setItem(LOCALE_STORAGE_KEY, locale);
  document.documentElement.lang = locale;
}

export function t(
  key: TranslationKey,
  params?: Record<string, string>,
): string {
  let value = translations[currentLocale][key];
  if (params) {
    for (const [k, v] of Object.entries(params)) {
      value = value.replace(`{${k}}`, v);
    }
  }
  return value;
}

// Initialize lang attribute
document.documentElement.lang = currentLocale;

export { locales, type Locale, localeNames } from "./translations";
