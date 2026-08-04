'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import translations, { type Language, type Translations } from './translations';

interface LanguageContextType {
  language: Language;
  t: Translations;
  toggleLanguage: () => void;
}

const LanguageContext = createContext<LanguageContextType>({
  language: 'es',
  t: translations.es,
  toggleLanguage: () => {},
});

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  // Use a stable initial value that matches server rendering to avoid
  // hydration mismatches. Read localStorage only after mount and then
  // update the language if different.
  const [language, setLanguage] = useState<Language>('es');

  // On mount, sync from saved preference (if any) without causing
  // a server/client mismatch on first paint.
  useEffect(() => {
    const saved = window.localStorage.getItem('cdln-lang') as Language | null;
    if (saved && (saved === 'es' || saved === 'en') && saved !== language) {
      setLanguage(saved);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    window.localStorage.setItem('cdln-lang', language);
    document.documentElement.lang = language;
  }, [language]);

  const toggleLanguage = useCallback(() => {
    setLanguage((prev) => (prev === 'es' ? 'en' : 'es'));
  }, []);

  const value = {
    language,
    t: translations[language],
    toggleLanguage,
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
