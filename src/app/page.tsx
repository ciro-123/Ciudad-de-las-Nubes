'use client';

import { LanguageProvider } from '@/i18n/LanguageContext';
import HorizontalScroller from '@/components/HorizontalScroller';

/**
 * Main page — assembles the entire Ciudad de las Nubes experience.
 * Client component to enable the language context and scroll interactivity.
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
