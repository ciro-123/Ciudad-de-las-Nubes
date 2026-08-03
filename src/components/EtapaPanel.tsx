'use client';

import { useRef, useEffect, useState } from 'react';
import { useLanguage } from '@/i18n/LanguageContext';
import { etapaGameLinks } from '@/i18n/translations';

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
 * Shows title, body text, and optional game link.
 * Content fades in when active.
 */
export default function EtapaPanel({ index, isActive }: EtapaPanelProps) {
  const { t } = useLanguage();
  const etapa = t.etapas[index];
  const gameLink = etapaGameLinks[index];
  const [visible, setVisible] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (isActive) {
      // Slight delay for entrance animation
      timerRef.current = setTimeout(() => setVisible(true), 120);
    } else {
      setVisible(false);
    }
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [isActive]);

  const romanNumerals = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII'];

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

          {gameLink && etapa.gameLabel && (
            <a
              href={gameLink}
              target="_blank"
              rel="noopener noreferrer"
              className="etapa-panel__game-link"
              aria-label={`${t.visitGame}: ${etapa.gameLabel}`}
            >
              {etapa.gameLabel}
              <span className="etapa-panel__game-link-arrow" aria-hidden="true">
                →
              </span>
            </a>
          )}
        </div>
      </div>
    </section>
  );
}
