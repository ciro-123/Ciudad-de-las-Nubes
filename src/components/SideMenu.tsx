'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { useLanguage } from '@/i18n/LanguageContext';
import { etapaGameLinks } from '@/i18n/translations';

/**
 * Hamburger menu button (top-left) + sliding sidebar.
 * Desktop: slides from left. Mobile: drops from top.
 * Two categories: Games (with linked items) and Comics (coming soon).
 */
export default function SideMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useLanguage();
  const menuRef = useRef<HTMLDivElement>(null);

  const close = useCallback(() => setIsOpen(false), []);
  const toggle = useCallback(() => setIsOpen((prev) => !prev), []);

  // Close on Escape
  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [isOpen, close]);

  // Close on click outside sidebar
  useEffect(() => {
    if (!isOpen) return;
    const handleClick = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        close();
      }
    };
    // Delay to avoid catching the toggle click
    const timer = setTimeout(() => {
      window.addEventListener('click', handleClick);
    }, 10);
    return () => {
      clearTimeout(timer);
      window.removeEventListener('click', handleClick);
    };
  }, [isOpen, close]);

  // Lock body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Build game list from etapas that have games
  const games = t.etapas
    .map((etapa, i) => ({
      label: etapa.gameLabel,
      link: etapaGameLinks[i],
      index: i,
    }))
    .filter((g) => g.label && g.link);

  return (
    <>
      {/* Hamburger button */}
      <button
        className={`hamburger-btn ${isOpen ? 'hamburger-btn--open' : ''}`}
        onClick={toggle}
        aria-label={isOpen ? 'Close menu' : 'Open menu'}
        aria-expanded={isOpen}
        type="button"
        id="hamburger-toggle"
      >
        <span className="hamburger-btn__line" />
        <span className="hamburger-btn__line" />
        <span className="hamburger-btn__line" />
      </button>

      {/* Overlay backdrop */}
      <div
        className={`side-menu__overlay ${isOpen ? 'side-menu__overlay--visible' : ''}`}
        aria-hidden="true"
      />

      {/* Sidebar panel */}
      <nav
        ref={menuRef}
        className={`side-menu ${isOpen ? 'side-menu--open' : ''}`}
        role="navigation"
        aria-label="Main menu"
      >
        <div className="side-menu__inner">
          {/* Games section */}
          <div className="side-menu__section">
            <h3 className="side-menu__heading">{t.menuGames}</h3>
            <ul className="side-menu__list">
              {games.map((game) => (
                <li key={game.index}>
                  <a
                    href={game.link!}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="side-menu__link"
                    onClick={close}
                  >
                    <span className="side-menu__link-dot" aria-hidden="true" />
                    {game.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Comics section */}
          <div className="side-menu__section">
            <h3 className="side-menu__heading">{t.menuComics}</h3>
            <p className="side-menu__empty">{t.comingSoon}</p>
          </div>
        </div>
      </nav>
    </>
  );
}
