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
  const [language, setLanguage] = useState<Language>('es');

  useEffect(() => {
    const saved = localStorage.getItem('cdln-lang') as Language | null;
    if (saved && (saved === 'es' || saved === 'en')) {
      setLanguage(saved);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('cdln-lang', language);
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
