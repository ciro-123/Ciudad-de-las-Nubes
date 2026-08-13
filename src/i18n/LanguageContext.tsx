'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import translations, { type Language, type Translations } from './translations';

interface LanguageContextType {
  language: Language;
  t: Translations;
  toggleLanguage: () => void;
  setLanguage: (lang: Language) => void;
}

const LanguageContext = createContext<LanguageContextType>({
  language: 'es',
  t: translations.es,
  toggleLanguage: () => { },
  setLanguage: () => { },
});

/**
 * Detects default language based on browser/device settings.
 * Returns 'es' if device language is Spanish ('es') or Catalan ('ca').
 * Returns 'en' for any other device language.
 */
function getDeviceDefaultLanguage(): Language {
  if (typeof window === 'undefined' || typeof navigator === 'undefined') {
    return 'en';
  }

  const langs = navigator.languages && navigator.languages.length
    ? navigator.languages
    : [navigator.language];

  for (const lang of langs) {
    if (lang) {
      const lower = lang.toLowerCase();
      if (lower.startsWith('es') || lower.startsWith('ca')) {
        return 'es';
      }
    }
  }

  return 'en';
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>('es');
  const [isInitialized, setIsInitialized] = useState(false);

  // On mount, sync from saved preference (if any) or detect device language
  useEffect(() => {
    const saved = window.localStorage.getItem('cdln-lang') as Language | null;

    if (saved && (saved === 'es' || saved === 'en')) {
      setLanguageState(saved);
    } else {
      const defaultLang = getDeviceDefaultLanguage();
      setLanguageState(defaultLang);
      window.localStorage.setItem('cdln-lang', defaultLang);
    }
    setIsInitialized(true);
  }, []);

  useEffect(() => {
    if (isInitialized) {
      window.localStorage.setItem('cdln-lang', language);
      document.documentElement.lang = language;
    }
  }, [language, isInitialized]);

  const toggleLanguage = useCallback(() => {
    setLanguageState((prev) => (prev === 'es' ? 'en' : 'es'));
  }, []);

  const setLanguage = useCallback((lang: Language) => {
    setLanguageState(lang);
  }, []);

  const value = {
    language,
    t: translations[language],
    toggleLanguage,
    setLanguage,
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
