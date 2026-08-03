'use client';

import { useState } from 'react';
import { LanguageProvider } from '@/i18n/LanguageContext';
import LandingPage from '@/components/LandingPage';
import HorizontalScroller from '@/components/HorizontalScroller';

/**
 * Main page — assembles the entire Ciudad de las Nubes experience.
 * Shows the landing page first, then transitions to the timeline.
 */
export default function Home() {
  const [showTimeline, setShowTimeline] = useState(false);

  return (
    <LanguageProvider>
      <main>
        {!showTimeline ? (
          <LandingPage onEnter={() => setShowTimeline(true)} />
        ) : (
          <HorizontalScroller />
        )}
      </main>
    </LanguageProvider>
  );
}
