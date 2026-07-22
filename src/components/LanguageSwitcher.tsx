'use client';

import { useLanguage } from '@/i18n/LanguageContext';

/**
 * Fixed top-right language toggle (ES / EN).
 * Two-button segmented control.
 */
export default function LanguageSwitcher() {
  const { language, toggleLanguage, t } = useLanguage();

  return (
    <div className="language-switcher" role="group" aria-label={t.languageToggle}>
      <button
        className={`language-switcher__btn ${language === 'es' ? 'language-switcher__btn--active' : ''}`}
        onClick={() => language !== 'es' && toggleLanguage()}
        aria-pressed={language === 'es'}
        type="button"
      >
        ES
      </button>
      <button
        className={`language-switcher__btn ${language === 'en' ? 'language-switcher__btn--active' : ''}`}
        onClick={() => language !== 'en' && toggleLanguage()}
        aria-pressed={language === 'en'}
        type="button"
      >
        EN
      </button>
    </div>
  );
}
