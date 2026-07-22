/**
 * Color configuration for each etapa (phase) of the timeline.
 * Each etapa defines colors for:
 * - UI elements (CSS custom properties)
 * - Vanta.js cloud background
 */

export interface EtapaColors {
  /** Primary accent color for UI text, borders, highlights */
  accent: string;
  /** Background tint overlaid on content areas */
  bgTint: string;
  /** Foreground text color */
  textPrimary: string;
  /** Secondary/body text color */
  textSecondary: string;
  /** Semi-transparent backdrop behind content for readability */
  contentBg: string;
  /** Vanta.js skyColor */
  skyColor: number;
  /** Vanta.js cloudColor */
  cloudColor: number;
  /** Vanta.js cloudShadowColor */
  cloudShadowColor: number;
  /** Vanta.js sunColor */
  sunColor: number;
  /** Vanta.js sunGlareColor */
  sunGlareColor: number;
  /** Vanta.js sunlightColor */
  sunlightColor: number;
  /** Particle overlay color */
  particleColor: string;
}

const etapaColors: EtapaColors[] = [
  // 0 — Leyendas: Warm ivory/gold — creation, the sun (LIGHT bg)
  {
    accent: '#7A6020',
    bgTint: 'rgba(201, 168, 76, 0.06)',
    textPrimary: '#2C2416',
    textSecondary: '#5A4A2A',
    contentBg: 'rgba(245, 240, 230, 0.55)',
    skyColor: 0xF5E6C8,
    cloudColor: 0xE8D5B0,
    cloudShadowColor: 0x8B7355,
    sunColor: 0xC9A84C,
    sunGlareColor: 0xD4A843,
    sunlightColor: 0xE8C870,
    particleColor: 'rgba(201, 168, 76, 0.4)',
  },
  // 1 — Conquista: Deep crimson — war, ambition (DARK bg)
  {
    accent: '#E8A090',
    bgTint: 'rgba(139, 37, 0, 0.06)',
    textPrimary: '#F5E8E4',
    textSecondary: '#D4B0A0',
    contentBg: 'rgba(30, 8, 4, 0.50)',
    skyColor: 0x6A3030,
    cloudColor: 0x8B4A4A,
    cloudShadowColor: 0x2A0808,
    sunColor: 0x8B2500,
    sunGlareColor: 0xA03020,
    sunlightColor: 0xC04030,
    particleColor: 'rgba(200, 80, 50, 0.4)',
  },
  // 2 — Dominio: Royal purple — power, empire (DARK bg)
  {
    accent: '#C0A0E0',
    bgTint: 'rgba(74, 45, 107, 0.06)',
    textPrimary: '#EDE4F5',
    textSecondary: '#C0B0D4',
    contentBg: 'rgba(20, 10, 40, 0.50)',
    skyColor: 0x4A3A6A,
    cloudColor: 0x6A5A8B,
    cloudShadowColor: 0x1A0D30,
    sunColor: 0x6B3FA0,
    sunGlareColor: 0x7B4FB0,
    sunlightColor: 0x8B5FC0,
    particleColor: 'rgba(140, 90, 200, 0.4)',
  },
  // 3 — Decadencia: Tarnished bronze/olive — decay, forgotten glory (DARK bg)
  {
    accent: '#C8B080',
    bgTint: 'rgba(107, 91, 58, 0.06)',
    textPrimary: '#F0E8D8',
    textSecondary: '#D0C0A0',
    contentBg: 'rgba(20, 16, 6, 0.50)',
    skyColor: 0x5A5040,
    cloudColor: 0x8B7B5A,
    cloudShadowColor: 0x1A1508,
    sunColor: 0x8B7340,
    sunGlareColor: 0x7B6830,
    sunlightColor: 0x9B8350,
    particleColor: 'rgba(180, 150, 90, 0.35)',
  },
  // 4 — Liberación: Sky blue/cerulean — freedom, breath (DARK bg)
  {
    accent: '#8ECAE6',
    bgTint: 'rgba(46, 125, 175, 0.06)',
    textPrimary: '#E4F0F8',
    textSecondary: '#B0D0E8',
    contentBg: 'rgba(6, 24, 40, 0.50)',
    skyColor: 0x4A8ABB,
    cloudColor: 0x7AAAD0,
    cloudShadowColor: 0x0A2A40,
    sunColor: 0x2E7DAF,
    sunGlareColor: 0x3E8DBF,
    sunlightColor: 0x5EADDF,
    particleColor: 'rgba(80, 160, 220, 0.4)',
  },
  // 5 — Guerra Total: Charred ember/dark red-black — destruction (DARK bg)
  {
    accent: '#D06050',
    bgTint: 'rgba(61, 12, 12, 0.06)',
    textPrimary: '#F0E0DC',
    textSecondary: '#D0A8A0',
    contentBg: 'rgba(10, 2, 2, 0.55)',
    skyColor: 0x3A1515,
    cloudColor: 0x5A2020,
    cloudShadowColor: 0x0A0202,
    sunColor: 0x6B1010,
    sunGlareColor: 0x8B2020,
    sunlightColor: 0x4B0808,
    particleColor: 'rgba(160, 40, 30, 0.4)',
  },
  // 6 — Torres Celestiales: Ethereal silver-white — reconciliation (LIGHT bg)
  {
    accent: '#506880',
    bgTint: 'rgba(184, 198, 214, 0.06)',
    textPrimary: '#1A2A3A',
    textSecondary: '#3A4A5A',
    contentBg: 'rgba(220, 230, 240, 0.50)',
    skyColor: 0xC8D4E0,
    cloudColor: 0xB8C6D6,
    cloudShadowColor: 0x8090A0,
    sunColor: 0xD0D8E0,
    sunGlareColor: 0xE0E8F0,
    sunlightColor: 0xF0F4F8,
    particleColor: 'rgba(176, 196, 216, 0.4)',
  },
];

/**
 * Linearly interpolate between two hex color numbers (0xRRGGBB).
 */
export function lerpColor(a: number, b: number, t: number): number {
  const ar = (a >> 16) & 0xff;
  const ag = (a >> 8) & 0xff;
  const ab = a & 0xff;
  const br = (b >> 16) & 0xff;
  const bg = (b >> 8) & 0xff;
  const bb = b & 0xff;
  const rr = Math.round(ar + (br - ar) * t);
  const rg = Math.round(ag + (bg - ag) * t);
  const rb = Math.round(ab + (bb - ab) * t);
  return (rr << 16) | (rg << 8) | rb;
}

/**
 * Linearly interpolate between two CSS color strings (hex format #RRGGBB).
 */
export function lerpCSSColor(a: string, b: string, t: number): string {
  const parseHex = (c: string) => {
    const hex = c.replace('#', '');
    return {
      r: parseInt(hex.substring(0, 2), 16),
      g: parseInt(hex.substring(2, 4), 16),
      b: parseInt(hex.substring(4, 6), 16),
    };
  };
  const ca = parseHex(a);
  const cb = parseHex(b);
  const r = Math.round(ca.r + (cb.r - ca.r) * t);
  const g = Math.round(ca.g + (cb.g - ca.g) * t);
  const b_ = Math.round(ca.b + (cb.b - ca.b) * t);
  return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b_.toString(16).padStart(2, '0')}`;
}

/**
 * Parse an rgba string and interpolate alpha + RGB.
 */
export function lerpRGBA(a: string, b: string, t: number): string {
  const parse = (s: string) => {
    const m = s.match(/rgba?\((\d+),\s*(\d+),\s*(\d+),?\s*([\d.]+)?\)/);
    if (!m) return { r: 0, g: 0, b: 0, a: 1 };
    return { r: +m[1], g: +m[2], b: +m[3], a: m[4] !== undefined ? +m[4] : 1 };
  };
  const ca = parse(a);
  const cb = parse(b);
  const r = Math.round(ca.r + (cb.r - ca.r) * t);
  const g = Math.round(ca.g + (cb.g - ca.g) * t);
  const bl = Math.round(ca.b + (cb.b - ca.b) * t);
  const al = ca.a + (cb.a - ca.a) * t;
  return `rgba(${r}, ${g}, ${bl}, ${al.toFixed(2)})`;
}

export default etapaColors;
