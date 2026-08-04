'use client';

import { useRef, useEffect, useState } from 'react';
import { useLanguage } from '@/i18n/LanguageContext';
import etapaMedia from '@/config/etapaMedia';

interface EtapaPanelProps {
  index: number;
  isActive: boolean;
}

const ETAPA_IMAGES = [
  '/imgs/1.LEYENDAS.png',
  '/imgs/2.CONQUISTA.png',
  '/imgs/3.DOMINIO.png',
  '/imgs/4.DECADENCIA.png',
  '/imgs/5.LIBERACIÓN.png',
  '/imgs/6.GUERRA TOTAL.png',
  '/imgs/7.TORRES CELESTIALES.png',
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
  const [flipped, setFlipped] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (isActive) {
      // Slight delay for entrance animation
      timerRef.current = setTimeout(() => setVisible(true), 120);
    } else {
      setVisible(false);
      // Reset flip when leaving this panel
      setFlipped(false);
    }
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
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
      {/* Large background text for depth */}
      <span className="etapa-panel__bg-text" aria-hidden="true">
        {etapa.title}
      </span>

      <div
        className={`etapa-panel__content ${visible ? 'etapa-panel__content--visible' : ''}`}
      >
        {/* Slider wrapper — slides left when flipped */}
        <div
          className={`etapa-panel__slider ${flipped ? 'etapa-panel__slider--flipped' : ''}`}
        >
          {/* ===== FRONT FACE ===== */}
          <div className="etapa-panel__front">
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

            {/* Arrow to reveal back panel */}
            <button
              className="etapa-panel__arrow-btn etapa-panel__arrow-btn--right"
              onClick={() => setFlipped(true)}
              aria-label={`${t.menuGames} & ${t.menuComics}`}
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                <path d="M7 4l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>

          {/* ===== BACK FACE ===== */}
          <div className="etapa-panel__back">
            {/* Arrow to go back */}
            <button
              className="etapa-panel__arrow-btn etapa-panel__arrow-btn--left"
              onClick={() => setFlipped(false)}
              aria-label="Back"
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                <path d="M13 4l-6 6 6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>

            {/* Scrollable inner content */}
            <div className="etapa-panel__back-inner">
              {/* Games section */}
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
                        <span className="etapa-panel__media-item-icon" aria-hidden="true">🎮</span>
                        <span className="etapa-panel__media-item-label">{game.label}</span>
                        <span className="etapa-panel__media-item-arrow" aria-hidden="true">→</span>
                      </a>
                    ))}
                  </div>
                ) : (
                  <p className="etapa-panel__media-empty">{t.noGamesYet}</p>
                )}
              </div>

              {/* Divider between Games and Comics */}
              <div className="etapa-panel__media-divider" aria-hidden="true" />

              {/* Comics section */}
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
                        <span className="etapa-panel__media-item-icon" aria-hidden="true">📖</span>
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
          </div>
        </div>
      </div>
    </section>
  );
}
