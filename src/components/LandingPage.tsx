'use client';

import { useLanguage } from '@/i18n/LanguageContext';
import { etapaGameLinks } from '@/i18n/translations';
import etapaColors from '@/config/etapaColors';

interface LandingPageProps {
  onEnter: () => void;
}

/**
 * Landing page — "Ciudad de las Nubes"
 * White clouds, blue sky background (uses Liberación palette).
 * Displays all games (and comics in future) as cards colored
 * by their parent etapa's palette.
 */
export default function LandingPage({ onEnter }: LandingPageProps) {
  const { t } = useLanguage();

  // Collect all games with their etapa info
  const gameCards = t.etapas
    .map((etapa, i) => ({
      label: etapa.gameLabel,
      link: etapaGameLinks[i],
      etapaTitle: etapa.title,
      index: i,
      colors: etapaColors[i],
    }))
    .filter((g) => g.label && g.link);

  return (
    <section className="landing-page" id="landing-page">
      {/* Title */}
      <div className="landing-page__hero">
        <h1 className="landing-page__title">{t.landingTitle}</h1>
        <p className="landing-page__subtitle">{t.landingSubtitle}</p>
      </div>

      {/* Game catalog */}
      {gameCards.length > 0 && (
        <div className="landing-page__catalog">
          {gameCards.map((game) => {
            const bg = game.colors.accent;
            const textColor = game.colors.textPrimary;
            // Use the contentBg for a softer card background
            const cardBg = game.colors.contentBg;

            return (
              <a
                key={game.index}
                href={game.link!}
                target="_blank"
                rel="noopener noreferrer"
                className="landing-page__card"
                style={
                  {
                    '--card-accent': bg,
                    '--card-text': textColor,
                    '--card-bg': cardBg,
                  } as React.CSSProperties
                }
              >
                <span className="landing-page__card-etapa">
                  {game.etapaTitle}
                </span>
                <span className="landing-page__card-title">
                  {game.label}
                </span>
                <span className="landing-page__card-arrow" aria-hidden="true">
                  →
                </span>
              </a>
            );
          })}
        </div>
      )}

      {/* Enter timeline CTA */}
      <button
        className="landing-page__cta"
        onClick={onEnter}
        type="button"
      >
        {t.enterTimeline}
        <span className="landing-page__cta-chevron" aria-hidden="true">
          ↓
        </span>
      </button>
    </section>
  );
}
