'use client';

import { useEffect, useRef, useCallback } from 'react';

interface VantaBackgroundProps {
  skyColor: number;
  cloudColor: number;
  cloudShadowColor: number;
  sunColor: number;
  sunGlareColor: number;
  sunlightColor: number;
}

/**
 * Full-viewport Vanta.js CLOUDS background.
 * Colors are updated dynamically via setOptions() as the user scrolls.
 * Decorative — hidden from screen readers.
 */
export default function VantaBackground({
  skyColor,
  cloudColor,
  cloudShadowColor,
  sunColor,
  sunGlareColor,
  sunlightColor,
}: VantaBackgroundProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const effectRef = useRef<any>(null);

  // Initialize Vanta on mount
  useEffect(() => {
    let cancelled = false;

    // Detect touch / mobile / small-screen devices and reduced-motion preference
    const isMobileOrTouch =
      typeof window !== 'undefined' &&
      (window.innerWidth <= 768 ||
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ||
        ('ontouchstart' in window && window.innerWidth <= 1024));

    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // In Vanta.js, scale and scaleMobile act as DIVISORS for canvas pixel ratio.
    // A scale of 1.0 renders at native resolution (up to 3x DPR on mobile = ~3M pixels x 115 raymarch loops/frame!).
    // Setting desktop scale = 3.0 and mobile scale = 10.0 downscales rendering resolution while CSS bilinearly
    // upscales it, giving soft, smooth cloud textures with 98%+ GPU power savings.
    const desktopScale = 3.0;
    const mobileScale = 10.0;
    const activeScale = isMobileOrTouch ? mobileScale : desktopScale;
    const activeSpeed = prefersReducedMotion ? 0 : isMobileOrTouch ? 0.25 : 0.4;

    async function init() {
      try {
        // Dynamic imports to avoid SSR issues. Be tolerant of different
        // module shapes (some bundlers expose a `.default` export).
        const THREEmod = await import('three');
        const CLOUDSmod = await import('vanta/dist/vanta.clouds.min');

        const THREElib = (THREEmod as any).default || THREEmod;
        const CLOUDSfn = (CLOUDSmod as any).default || CLOUDSmod;

        if (cancelled || !containerRef.current) return;

        effectRef.current = CLOUDSfn({
          el: containerRef.current,
          THREE: THREElib,
          mouseControls: false,
          touchControls: false,
          gyroControls: false,
          minHeight: 200.0,
          minWidth: 200.0,
          scale: activeScale,
          scaleMobile: mobileScale,
          skyColor,
          cloudColor,
          cloudShadowColor,
          sunColor,
          sunGlareColor,
          sunlightColor,
          speed: activeSpeed,
        });
      } catch (err) {
        console.warn('Vanta.js failed to initialize:', err);
      }
    }

    init();

    // Restore the WebGL canvas when the browser brings the page back from its history cache.
    const handlePageShow = (event: PageTransitionEvent) => {
      if (!event.persisted && effectRef.current) return;

      if (effectRef.current) {
        effectRef.current.destroy();
        effectRef.current = null;
      }
      cancelled = false;
      init();
    };

    // Pause animation calculations when tab is inactive or low power to save battery/GPU
    const handleVisibilityChange = () => {
      if (!effectRef.current) return;
      if (document.hidden) {
        effectRef.current.setOptions({ speed: 0 });
      } else {
        effectRef.current.setOptions({ speed: activeSpeed });
      }
    };

    window.addEventListener('pageshow', handlePageShow);
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      cancelled = true;
      window.removeEventListener('pageshow', handlePageShow);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      if (effectRef.current) {
        effectRef.current.destroy();
        effectRef.current = null;
      }
    };
    // Only run on mount — colors are updated via setOptions below
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Update colors dynamically without re-initializing
  const prevColorsRef = useRef({ skyColor, cloudColor, cloudShadowColor, sunColor, sunGlareColor, sunlightColor });

  const updateColors = useCallback(() => {
    if (!effectRef.current) return;
    effectRef.current.setOptions({
      skyColor,
      cloudColor,
      cloudShadowColor,
      sunColor,
      sunGlareColor,
      sunlightColor,
    });
  }, [skyColor, cloudColor, cloudShadowColor, sunColor, sunGlareColor, sunlightColor]);

  useEffect(() => {
    const prev = prevColorsRef.current;
    if (
      prev.skyColor !== skyColor ||
      prev.cloudColor !== cloudColor ||
      prev.cloudShadowColor !== cloudShadowColor ||
      prev.sunColor !== sunColor ||
      prev.sunGlareColor !== sunGlareColor ||
      prev.sunlightColor !== sunlightColor
    ) {
      updateColors();
      prevColorsRef.current = { skyColor, cloudColor, cloudShadowColor, sunColor, sunGlareColor, sunlightColor };
    }
  }, [skyColor, cloudColor, cloudShadowColor, sunColor, sunGlareColor, sunlightColor, updateColors]);

  return (
    <div
      ref={containerRef}
      className="vanta-bg"
      aria-hidden="true"
      role="presentation"
    />
  );
}
