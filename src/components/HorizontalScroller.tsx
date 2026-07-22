'use client';

import {
  useRef,
  useState,
  useEffect,
  useCallback,
  useMemo,
} from 'react';
import etapaColors, { lerpColor, lerpCSSColor, lerpRGBA } from '@/config/etapaColors';
import VantaBackground from './VantaBackground';
import ParticleOverlay from './ParticleOverlay';
import EtapaPanel from './EtapaPanel';
import TimelineNav from './TimelineNav';
import LanguageSwitcher from './LanguageSwitcher';

const ETAPA_COUNT = 7;
/** Dead-zone fraction of panel width where color stays locked to center */
const DEAD_ZONE = 0.15;

/**
 * Core horizontal scroller with:
 * - Discrete navigation: one wheel tick = one etapa
 * - Scroll lock during transitions (prevents rapid-fire skipping)
 * - Scroll-linked color transitions with dead zone
 * - Vanta background color sync
 * - Particle overlay color sync
 * - Keyboard navigation
 */
export default function HorizontalScroller() {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [blendState, setBlendState] = useState({
    index: 0,
    t: 0,
  });

  // Scroll lock: prevents new navigation until current transition finishes
  const isScrollingRef = useRef(false);
  // The index we're navigating TO (used by wheel handler)
  const targetIndexRef = useRef(0);
  // Fallback unlock timer
  const scrollLockTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Throttle scroll handler
  const rafRef = useRef<number>(0);

  /**
   * Compute which etapa we're closest to and the blend ratio.
   * The blend includes a dead zone at center where t stays 0 or 1.
   */
  const computeBlend = useCallback(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return;

    const scrollLeft = scroller.scrollLeft;
    const panelWidth = scroller.clientWidth;
    if (panelWidth === 0) return;

    // Position as a fraction of total panels
    const rawPos = scrollLeft / panelWidth;
    const clampedPos = Math.max(0, Math.min(rawPos, ETAPA_COUNT - 1));

    // Which panel are we closest to?
    const nearest = Math.round(clampedPos);

    // Blend between current panel and next/prev
    const floor = Math.floor(clampedPos);
    const frac = clampedPos - floor;

    // Apply dead zone: within DEAD_ZONE of center, lock to 0 or 1
    let adjustedFrac = frac;
    if (frac < DEAD_ZONE) {
      adjustedFrac = 0;
    } else if (frac > 1 - DEAD_ZONE) {
      adjustedFrac = 1;
    } else {
      // Remap the remaining range to 0-1
      adjustedFrac = (frac - DEAD_ZONE) / (1 - 2 * DEAD_ZONE);
    }

    // Smooth easing for blend (ease-in-out)
    const easedT = adjustedFrac * adjustedFrac * (3 - 2 * adjustedFrac);

    setActiveIndex(nearest);
    setBlendState({
      index: floor,
      t: easedT,
    });
  }, []);

  const handleScroll = useCallback(() => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(computeBlend);
  }, [computeBlend]);

  // Navigate to a specific etapa with scroll lock
  const navigateTo = useCallback((index: number) => {
    const scroller = scrollerRef.current;
    if (!scroller) return;

    const clamped = Math.max(0, Math.min(index, ETAPA_COUNT - 1));
    targetIndexRef.current = clamped;
    isScrollingRef.current = true;

    // Clear any previous fallback timer
    if (scrollLockTimerRef.current) {
      clearTimeout(scrollLockTimerRef.current);
    }

    const panelWidth = scroller.clientWidth;
    scroller.scrollTo({
      left: panelWidth * clamped,
      behavior: 'smooth',
    });

    // Fallback: unlock after 800ms in case scrollend doesn't fire
    scrollLockTimerRef.current = setTimeout(() => {
      isScrollingRef.current = false;
    }, 800);
  }, []);

  // Unlock scroll when the smooth scroll transition finishes
  useEffect(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return;

    const handleScrollEnd = () => {
      isScrollingRef.current = false;
      if (scrollLockTimerRef.current) {
        clearTimeout(scrollLockTimerRef.current);
        scrollLockTimerRef.current = null;
      }
    };

    scroller.addEventListener('scrollend', handleScrollEnd);
    return () => scroller.removeEventListener('scrollend', handleScrollEnd);
  }, []);

  // Discrete wheel navigation: one tick = one etapa, locked during transition
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();

      // Locked — ignore all wheel events until transition finishes
      if (isScrollingRef.current) return;

      const scroller = scrollerRef.current;
      if (!scroller) return;

      // Determine direction from any non-zero delta
      let direction = 0;
      if (Math.abs(e.deltaY) >= Math.abs(e.deltaX)) {
        direction = e.deltaY > 0 ? 1 : e.deltaY < 0 ? -1 : 0;
      } else {
        direction = e.deltaX > 0 ? 1 : e.deltaX < 0 ? -1 : 0;
      }
      if (direction === 0) return;

      const current = targetIndexRef.current;
      const next = Math.max(0, Math.min(current + direction, ETAPA_COUNT - 1));

      // Already at boundary
      if (next === current) return;

      navigateTo(next);
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    return () => window.removeEventListener('wheel', handleWheel);
  }, [navigateTo]);

  // Keyboard navigation (also uses scroll lock)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isScrollingRef.current) return;

      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        e.preventDefault();
        navigateTo(targetIndexRef.current + 1);
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        e.preventDefault();
        navigateTo(targetIndexRef.current - 1);
      } else if (e.key === 'Home') {
        e.preventDefault();
        navigateTo(0);
      } else if (e.key === 'End') {
        e.preventDefault();
        navigateTo(ETAPA_COUNT - 1);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [navigateTo]);

  // Initial compute
  useEffect(() => {
    computeBlend();
  }, [computeBlend]);

  // Compute interpolated colors
  const interpolatedColors = useMemo(() => {
    const { index, t } = blendState;
    const from = etapaColors[index];
    const to = etapaColors[Math.min(index + 1, ETAPA_COUNT - 1)];

    return {
      accent: lerpCSSColor(from.accent, to.accent, t),
      bgTint: lerpRGBA(from.bgTint, to.bgTint, t),
      textPrimary: lerpCSSColor(from.textPrimary, to.textPrimary, t),
      textSecondary: lerpCSSColor(from.textSecondary, to.textSecondary, t),
      contentBg: lerpRGBA(from.contentBg, to.contentBg, t),
      particleColor: lerpRGBA(from.particleColor, to.particleColor, t),
      skyColor: lerpColor(from.skyColor, to.skyColor, t),
      cloudColor: lerpColor(from.cloudColor, to.cloudColor, t),
      cloudShadowColor: lerpColor(from.cloudShadowColor, to.cloudShadowColor, t),
      sunColor: lerpColor(from.sunColor, to.sunColor, t),
      sunGlareColor: lerpColor(from.sunGlareColor, to.sunGlareColor, t),
      sunlightColor: lerpColor(from.sunlightColor, to.sunlightColor, t),
    };
  }, [blendState]);

  // Apply CSS custom properties for color transitions
  const dynamicStyles = useMemo(
    () =>
      ({
        '--cdln-accent': interpolatedColors.accent,
        '--cdln-bg-tint': interpolatedColors.bgTint,
        '--cdln-text-primary': interpolatedColors.textPrimary,
        '--cdln-text-secondary': interpolatedColors.textSecondary,
        '--cdln-content-bg': interpolatedColors.contentBg,
        '--cdln-particle-color': interpolatedColors.particleColor,
      } as React.CSSProperties),
    [interpolatedColors]
  );

  return (
    <>
      {/* Vanta.js cloud background — synced to scroll color */}
      <VantaBackground
        skyColor={interpolatedColors.skyColor}
        cloudColor={interpolatedColors.cloudColor}
        cloudShadowColor={interpolatedColors.cloudShadowColor}
        sunColor={interpolatedColors.sunColor}
        sunGlareColor={interpolatedColors.sunGlareColor}
        sunlightColor={interpolatedColors.sunlightColor}
      />

      {/* Particle motes overlay */}
      <ParticleOverlay color={interpolatedColors.particleColor} />

      {/* Logo */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/logo.svg"
        alt="Gooblin Studio"
        className="site-logo"
      />

      {/* Language toggle */}
      <LanguageSwitcher />

      {/* Main horizontal scroller */}
      <div
        ref={scrollerRef}
        className="horizontal-scroller"
        onScroll={handleScroll}
        role="region"
        aria-roledescription="timeline"
        aria-label="Ciudad de las Nubes — Timeline"
        style={dynamicStyles}
        id="main-content"
        tabIndex={0}
      >
        <div className="horizontal-scroller__track">
          {Array.from({ length: ETAPA_COUNT }, (_, i) => (
            <EtapaPanel
              key={i}
              index={i}
              isActive={i === activeIndex}
            />
          ))}
        </div>
      </div>

      {/* Timeline dot navigation */}
      <TimelineNav activeIndex={activeIndex} onNavigate={navigateTo} />
    </>
  );
}
