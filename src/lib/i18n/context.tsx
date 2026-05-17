"use client";

import React, {
  createContext,
  useContext,
  useState,
  useLayoutEffect,
  useCallback,
} from "react";
import fa from "./translations/fa";
import en from "./translations/en";
import type { Translations } from "./translations/fa";

export type Locale = "fa" | "en";

const translations: Record<Locale, Translations> = { fa, en };

interface LocaleContextValue {
  locale: Locale;
  dir: "rtl" | "ltr";
  t: Translations;
  setLocale: (locale: Locale) => void;
}

const LocaleContext = createContext<LocaleContextValue>({
  locale: "fa",
  dir: "rtl",
  t: fa,
  setLocale: () => {},
});

const LOCALE_COOKIE = "NEXT_LOCALE";
const DEFAULT_LOCALE: Locale = "fa";

function getCookieLocale(): Locale {
  if (typeof document === "undefined") return DEFAULT_LOCALE;
  const match = document.cookie
    .split("; ")
    .find((row) => row.startsWith(`${LOCALE_COOKIE}=`));
  const val = match?.split("=")[1];
  return val === "fa" || val === "en" ? val : DEFAULT_LOCALE;
}

function setCookie(name: string, value: string) {
  if (typeof document === "undefined") return;
  document.cookie = `${name}=${value}; path=/; max-age=31536000; SameSite=Lax`;
}

function applyDir(locale: Locale) {
  const html = document.documentElement;
  const dir = locale === "fa" ? "rtl" : "ltr";
  html.setAttribute("dir", dir);
  html.setAttribute("lang", locale);
}

export function LocaleProvider({
  children,
  initialLocale,
}: {
  children: React.ReactNode;
  initialLocale?: Locale;
}) {
  const [locale, setLocaleState] = useState<Locale>(
    initialLocale ?? DEFAULT_LOCALE,
  );

  // useLayoutEffect runs synchronously after DOM mutations, before browser paint
  // This ensures dir/lang are correct before user sees anything
  useLayoutEffect(() => {
    const saved = getCookieLocale();
    if (saved !== locale) {
      setLocaleState(saved);
    }
    applyDir(saved);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const setLocale = useCallback((newLocale: Locale) => {
    setLocaleState(newLocale);
    setCookie(LOCALE_COOKIE, newLocale);
    applyDir(newLocale);
  }, []);

  const dir: "rtl" | "ltr" = locale === "fa" ? "rtl" : "ltr";

  return (
    <LocaleContext.Provider
      value={{
        locale,
        dir,
        t: translations[locale],
        setLocale,
      }}
    >
      {children}
    </LocaleContext.Provider>
  );
}

export function useLocale() {
  return useContext(LocaleContext);
}

export { fa, en, translations };
