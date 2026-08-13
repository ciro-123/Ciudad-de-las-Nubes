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
import EtapaPanel from './EtapaPanel';
import TimelineNav from './TimelineNav';
import LanguageSwitcher from './LanguageSwitcher';
import SideMenu from './SideMenu';

const ETAPA_COUNT = 7;
/** Dead-zone fraction of panel width where color stays locked to center */
const DEAD_ZONE = 0.15;

/**
 * Core horizontal scroller with:
 * - Discrete navigation: one wheel tick = one etapa
 * - Scroll lock during transitions (prevents rapid-fire skipping)
 * - Scroll-linked color transitions with dead zone
 * - Vanta background color sync
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
  // Timestamp of last triggered stage transition (absorbs trackpad momentum & touch spam)
  const lastNavTimeRef = useRef(0);
  // The index we're navigating TO (used by wheel/touch/keyboard handlers)
  const targetIndexRef = useRef(0);
  // Fallback unlock timer
  const scrollLockTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Touch tracking
  const touchStartXRef = useRef(0);
  const touchStartYRef = useRef(0);

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
    const firstPanel = scroller.querySelector('.etapa-panel') as HTMLElement;
    const stepWidth = firstPanel ? firstPanel.offsetWidth : scroller.clientWidth;
    if (stepWidth === 0) return;

    // Position as a fraction of total panels
    const rawPos = scrollLeft / stepWidth;
    const clampedPos = Math.max(0, Math.min(rawPos, ETAPA_COUNT - 1));

    // Which panel are we closest to?
    const nearest = Math.round(clampedPos);

    // If not mid-animation, keep targetIndex synced to closest panel
    if (!isScrollingRef.current) {
      targetIndexRef.current = nearest;
    }

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
    lastNavTimeRef.current = Date.now();

    // Clear any previous fallback timer
    if (scrollLockTimerRef.current) {
      clearTimeout(scrollLockTimerRef.current);
    }

    const firstPanel = scroller.querySelector('.etapa-panel') as HTMLElement;
    const stepWidth = firstPanel ? firstPanel.offsetWidth : scroller.clientWidth;
    scroller.scrollTo({
      left: stepWidth * clamped,
      behavior: 'smooth',
    });

    // Fallback: unlock after 600ms in case scrollend doesn't fire
    scrollLockTimerRef.current = setTimeout(() => {
      isScrollingRef.current = false;
      setActiveIndex(clamped);
    }, 600);
  }, []);

  // Unlock scroll and re-sync target index when smooth scroll finishes
  useEffect(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return;

    const handleScrollEnd = () => {
      isScrollingRef.current = false;
      if (scrollLockTimerRef.current) {
        clearTimeout(scrollLockTimerRef.current);
        scrollLockTimerRef.current = null;
      }
      const firstPanel = scroller.querySelector('.etapa-panel') as HTMLElement;
      const stepWidth = firstPanel ? firstPanel.offsetWidth : scroller.clientWidth;
      if (stepWidth > 0) {
        const nearest = Math.round(scroller.scrollLeft / stepWidth);
        targetIndexRef.current = Math.max(0, Math.min(nearest, ETAPA_COUNT - 1));
        setActiveIndex(targetIndexRef.current);
      }
    };

    scroller.addEventListener('scrollend', handleScrollEnd);
    return () => scroller.removeEventListener('scrollend', handleScrollEnd);
  }, []);

  // Strict Touch Swipe Navigation for phones/tablets (1 stage at a time, re-centers if short)
  useEffect(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return;

    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length !== 1) return;
      touchStartXRef.current = e.touches[0].clientX;
      touchStartYRef.current = e.touches[0].clientY;
    };

    const handleTouchEnd = (e: TouchEvent) => {
      if (e.changedTouches.length === 0) return;

      const touchEndX = e.changedTouches[0].clientX;
      const touchEndY = e.changedTouches[0].clientY;
      const deltaX = touchEndX - touchStartXRef.current;
      const deltaY = touchEndY - touchStartYRef.current;

      // Ignore if transition is in progress or if vertical scroll dominates
      if (isScrollingRef.current) return;
      if (Math.abs(deltaY) > Math.abs(deltaX)) return;

      const current = targetIndexRef.current;

      // Swipe threshold: 30px
      if (Math.abs(deltaX) >= 30) {
        // Swipe Left (finger moved left) -> Next stage (+1)
        // Swipe Right (finger moved right) -> Prev stage (-1)
        const direction = deltaX < 0 ? 1 : -1;
        navigateTo(current + direction);
      } else {
        // Short swipe: re-center to current stage so it NEVER stays broken in the middle!
        navigateTo(current);
      }
    };

    scroller.addEventListener('touchstart', handleTouchStart, { passive: true });
    scroller.addEventListener('touchend', handleTouchEnd, { passive: true });

    return () => {
      scroller.removeEventListener('touchstart', handleTouchStart);
      scroller.removeEventListener('touchend', handleTouchEnd);
    };
  }, [navigateTo]);

  // Discrete wheel & trackpad navigation: strictly 1 stage at a time with momentum filter
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();

      const now = Date.now();
      // Ignore wheel events if currently animating or within 450ms of last transition (absorbs trackpad momentum)
      if (isScrollingRef.current || now - lastNavTimeRef.current < 450) return;

      let delta = 0;
      if (Math.abs(e.deltaY) >= Math.abs(e.deltaX)) {
        delta = e.deltaY;
      } else {
        delta = e.deltaX;
      }

      // Ignore tiny inertia ticks below threshold
      if (Math.abs(delta) < 8) return;

      const direction = delta > 0 ? 1 : -1;
      const current = targetIndexRef.current;
      const next = Math.max(0, Math.min(current + direction, ETAPA_COUNT - 1));

      if (next !== current) {
        navigateTo(next);
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    return () => window.removeEventListener('wheel', handleWheel);
  }, [navigateTo]);

  // Keyboard navigation (ArrowRight, ArrowLeft, etc.)
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
      cardBorder: lerpCSSColor(from.cardBorder, to.cardBorder, t),
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
        '--cdln-card-border': interpolatedColors.cardBorder,
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

      {/* Hamburger sidebar menu */}
      <SideMenu />

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
              onSelect={navigateTo}
            />
          ))}
        </div>
      </div>

      {/* Timeline dot navigation */}
      <TimelineNav activeIndex={activeIndex} onNavigate={navigateTo} />
    </>
  );
}
