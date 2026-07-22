'use client';

import { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  baseAlpha: number;
  phase: number;
  phaseSpeed: number;
}

interface ParticleOverlayProps {
  color: string; // CSS rgba color
}

/**
 * Subtle floating luminous particle overlay.
 * Particles drift, pulse with sine waves, and gently react to mouse.
 * Decorative — hidden from screen readers.
 */
export default function ParticleOverlay({ color }: ParticleOverlayProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -1000, y: -1000 });
  const particlesRef = useRef<Particle[]>([]);
  const colorRef = useRef(color);
  const animRef = useRef<number>(0);
  const reducedMotionRef = useRef(false);

  // Update color ref without re-initializing
  useEffect(() => {
    colorRef.current = color;
  }, [color]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Check for reduced motion
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    reducedMotionRef.current = mq.matches;
    if (mq.matches) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Canvas sizing
    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.scale(dpr, dpr);
    };
    resize();
    window.addEventListener('resize', resize);

    // Initialize particles
    const PARTICLE_COUNT = 50;
    const particles: Particle[] = [];
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      particles.push({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.2 - 0.1, // Slight upward drift
        radius: Math.random() * 2.5 + 1,
        baseAlpha: Math.random() * 0.3 + 0.1,
        phase: Math.random() * Math.PI * 2,
        phaseSpeed: Math.random() * 0.01 + 0.005,
      });
    }
    particlesRef.current = particles;

    // Mouse tracking
    const handleMouse = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener('mousemove', handleMouse);

    // Parse RGBA color
    const parseColor = (c: string) => {
      const m = c.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);
      if (!m) return { r: 200, g: 200, b: 200 };
      return { r: +m[1], g: +m[2], b: +m[3] };
    };

    // Animation loop
    const animate = () => {
      if (reducedMotionRef.current) return;

      const w = window.innerWidth;
      const h = window.innerHeight;
      ctx.clearRect(0, 0, w, h);

      const { r, g, b } = parseColor(colorRef.current);
      const mouse = mouseRef.current;

      for (const p of particles) {
        // Update phase for pulsing
        p.phase += p.phaseSpeed;

        // Mouse repulsion (subtle)
        const dx = p.x - mouse.x;
        const dy = p.y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const mouseInfluence = 150;
        if (dist < mouseInfluence && dist > 0) {
          const force = (mouseInfluence - dist) / mouseInfluence * 0.4;
          p.vx += (dx / dist) * force;
          p.vy += (dy / dist) * force;
        }

        // Dampen velocity
        p.vx *= 0.98;
        p.vy *= 0.98;

        // Add base drift back
        p.vx += (Math.random() - 0.5) * 0.02;
        p.vy += (Math.random() - 0.5) * 0.02 - 0.005;

        // Update position
        p.x += p.vx;
        p.y += p.vy;

        // Wrap around edges
        if (p.x < -20) p.x = w + 20;
        if (p.x > w + 20) p.x = -20;
        if (p.y < -20) p.y = h + 20;
        if (p.y > h + 20) p.y = -20;

        // Pulsing alpha
        const alpha = p.baseAlpha * (0.6 + 0.4 * Math.sin(p.phase));

        // Draw particle with glow
        ctx.beginPath();
        const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.radius * 4);
        gradient.addColorStop(0, `rgba(${r}, ${g}, ${b}, ${alpha})`);
        gradient.addColorStop(0.4, `rgba(${r}, ${g}, ${b}, ${alpha * 0.4})`);
        gradient.addColorStop(1, `rgba(${r}, ${g}, ${b}, 0)`);
        ctx.fillStyle = gradient;
        ctx.arc(p.x, p.y, p.radius * 4, 0, Math.PI * 2);
        ctx.fill();

        // Bright core
        ctx.beginPath();
        ctx.fillStyle = `rgba(${Math.min(r + 60, 255)}, ${Math.min(g + 60, 255)}, ${Math.min(b + 60, 255)}, ${alpha * 0.8})`;
        ctx.arc(p.x, p.y, p.radius * 0.6, 0, Math.PI * 2);
        ctx.fill();
      }

      animRef.current = requestAnimationFrame(animate);
    };

    animRef.current = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouse);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="particle-overlay"
      aria-hidden="true"
      role="presentation"
    />
  );
}
