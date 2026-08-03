'use client';

import { LanguageProvider } from '@/i18n/LanguageContext';
import HorizontalScroller from '@/components/HorizontalScroller';

/**
 * Main page — assembles the entire Ciudad de las Nubes experience.
 * Directly renders the horizontal timeline scroller with side menu.
 */
export default function Home() {
  return (
    <LanguageProvider>
      <main>
        <HorizontalScroller />
      </main>
    </LanguageProvider>
  );
}
