'use client';

import { useRef, useEffect, useState } from 'react';
import { useLanguage } from '@/i18n/LanguageContext';
import etapaMedia from '@/config/etapaMedia';

interface EtapaPanelProps {
  index: number;
  isActive: boolean;
}

const ETAPA_IMAGES = [
  '/imgs/1.LEYENDAS.webp',
  '/imgs/2.CONQUISTA.webp',
  '/imgs/3.DOMINIO.webp',
  '/imgs/4.DECADENCIA.webp',
  '/imgs/5.LIBERACIÓN.webp',
  '/imgs/6.GUERRA TOTAL.webp',
  '/imgs/7.TORRES CELESTIALES.webp',
];

const ETAPA_IMAGE_POSITIONS = [
  'center 25%',   // 0 — Leyendas
  'center 15%',   // 1 — Conquista (15%)
  'center 25%',   // 2 — Dominio
  'center top',  // 3 — Decadencia (starts from top)
  'center center',// 4 — Liberación (centered)
  'center 25%',   // 5 — Guerra Total
  'center 25%',   // 6 — Torres Celestiales
];

/**
 * Individual etapa (phase) panel — full viewport, scroll-snap aligned.
 * Shows title, body text. An arrow on the right edge slides the card
 * left to reveal a Games & Comics panel.
 * Content fades in when active.
 */
export default function EtapaPanel({ index, isActive }: EtapaPanelProps) {
  const { t } = useLanguage();
  const etapa = t.etapas[index];
  const media = etapaMedia[index];
  const [visible, setVisible] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    if (!isActive) {
      const resetFrame = window.requestAnimationFrame(() => {
        setVisible(false);
        setIsDrawerOpen(false);
      });

      return () => {
        window.cancelAnimationFrame(resetFrame);
        if (timerRef.current) {
          clearTimeout(timerRef.current);
          timerRef.current = null;
        }
      };
    }

    // Slight delay for entrance animation
    timerRef.current = window.setTimeout(() => setVisible(true), 120);

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [isActive]);

  const romanNumerals = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII'];

  const hasGames = media.games.length > 0;
  const hasComics = media.comics.length > 0;

  return (
    <section
      className="etapa-panel"
      id={`etapa-${index}`}
      aria-label={etapa.title}
      role="region"
    >
      <div
        className={`etapa-panel__content ${visible ? 'etapa-panel__content--visible' : ''} ${isDrawerOpen ? 'etapa-panel__content--drawer-open' : ''}`}
      >
        <div className="etapa-panel__content-inner">
          <div className="etapa-panel__main">
            <div className="etapa-panel__image-container">
              <img
                src={ETAPA_IMAGES[index]}
                alt={etapa.title}
                className="etapa-panel__image"
                style={{ objectPosition: ETAPA_IMAGE_POSITIONS[index] }}
              />
            </div>

            <div className="etapa-panel__text-container">
              <span className="etapa-panel__number" aria-hidden="true">
                {romanNumerals[index]}
              </span>

              <h2 className="etapa-panel__title">{etapa.title}</h2>

              <div className="etapa-panel__divider" aria-hidden="true" />

              <p className="etapa-panel__body">{etapa.body}</p>
            </div>

            <button
              className={`etapa-panel__arrow-btn etapa-panel__arrow-btn--toggle ${isDrawerOpen ? 'etapa-panel__arrow-btn--open' : ''}`}
              onClick={() => setIsDrawerOpen((prev) => !prev)}
              aria-label={isDrawerOpen ? 'Close media menu' : `${t.menuGames} & ${t.menuComics}`}
              aria-expanded={isDrawerOpen}
              type="button"
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                {isDrawerOpen ? (
                  <path d="M13 4l-6 6 6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                ) : (
                  <path d="M7 4l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                )}
              </svg>
            </button>
          </div>

          <aside
            className={`etapa-panel__drawer ${isDrawerOpen ? 'etapa-panel__drawer--open' : ''}`}
            aria-label={`${etapa.title} media menu`}
          >
            <div className="etapa-panel__drawer-inner">
              <div className="etapa-panel__media-section">
                <h3 className="etapa-panel__media-heading">{t.menuGames}</h3>
                {hasGames ? (
                  <div className="etapa-panel__media-grid">
                    {media.games.map((game, i) => (
                      <a
                        key={i}
                        href={game.url}
                        target={game.url !== '#' ? '_blank' : undefined}
                        rel={game.url !== '#' ? 'noopener noreferrer' : undefined}
                        className="etapa-panel__media-item"
                      >
                        <span className="etapa-panel__media-item-label">{game.label}</span>
                        <span className="etapa-panel__media-item-arrow" aria-hidden="true">→</span>
                      </a>
                    ))}
                  </div>
                ) : (
                  <p className="etapa-panel__media-empty">{t.noGamesYet}</p>
                )}
              </div>

              <div className="etapa-panel__media-divider" aria-hidden="true" />

              <div className="etapa-panel__media-section">
                <h3 className="etapa-panel__media-heading">{t.menuComics}</h3>
                {hasComics ? (
                  <div className="etapa-panel__media-grid">
                    {media.comics.map((comic, i) => (
                      <a
                        key={i}
                        href={comic.url}
                        target={comic.url !== '#' ? '_blank' : undefined}
                        rel={comic.url !== '#' ? 'noopener noreferrer' : undefined}
                        className="etapa-panel__media-item"
                      >
                        <span className="etapa-panel__media-item-label">{comic.label}</span>
                        <span className="etapa-panel__media-item-arrow" aria-hidden="true">→</span>
                      </a>
                    ))}
                  </div>
                ) : (
                  <p className="etapa-panel__media-empty">{t.noComicsYet}</p>
                )}
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
