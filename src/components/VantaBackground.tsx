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
  const mountedRef = useRef(false);

  // Initialize Vanta on mount
  useEffect(() => {
    if (mountedRef.current) return;
    mountedRef.current = true;

    let cancelled = false;

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
          skyColor,
          cloudColor,
          cloudShadowColor,
          sunColor,
          sunGlareColor,
          sunlightColor,
          speed: 0.7,
        });
      } catch (err) {
        console.warn('Vanta.js failed to initialize:', err);
      }
    }

    init();

    return () => {
      cancelled = true;
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
