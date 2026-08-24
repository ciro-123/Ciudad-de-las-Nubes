'use client';

import { LanguageProvider } from '@/i18n/LanguageContext';
import HorizontalScroller from '@/components/HorizontalScroller';
import ContactShortcut from '@/components/ContactShortcut';

/**
 * Main page — assembles the entire Ciudad de las Nubes experience.
 * Directly renders the horizontal timeline scroller with side menu.
 */
export default function Home() {
  return (
    <LanguageProvider>
      <main id="main-content">
        <h1 className="sr-only">Ciudad de las Nubes — Gooblin Studio</h1>
        <HorizontalScroller />
        <ContactShortcut />
      </main>
    </LanguageProvider>
  );
}
