'use client';

import { useLanguage } from '@/i18n/LanguageContext';

interface TimelineNavProps {
  activeIndex: number;
  onNavigate: (index: number) => void;
}

/**
 * Fixed bottom navigation with 7 dots connected by lines.
 * Shows tooltip on hover with etapa title.
 * Keyboard navigable.
 */
export default function TimelineNav({ activeIndex, onNavigate }: TimelineNavProps) {
  const { t } = useLanguage();

  return (
    <nav
      className="timeline-nav"
      role="navigation"
      aria-label={t.timelineNav}
    >
      {t.etapas.map((etapa, i) => (
        <span key={i} style={{ display: 'contents' }}>
          <button
            className={`timeline-nav__dot ${i === activeIndex ? 'timeline-nav__dot--active' : ''}`}
            onClick={() => onNavigate(i)}
            aria-label={etapa.title}
            aria-current={i === activeIndex ? 'step' : undefined}
            title={etapa.title}
            type="button"
          >
            <span className="timeline-nav__tooltip">{etapa.title}</span>
          </button>
          {i < t.etapas.length - 1 && (
            <span className="timeline-nav__line" aria-hidden="true" />
          )}
        </span>
      ))}
    </nav>
  );
}
