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
  /** Customizable thin card border color surrounding stage card */
  cardBorder: string;
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
  // 0 — Leyendas: Deep ocean teal sky with radiant golden solar energy & ivory clouds
  {
    accent: '#B8860B',
    bgTint: 'rgba(42, 77, 96, 0.06)',
    textPrimary: '#2C2416',
    textSecondary: '#5A4A2A',
    contentBg: 'rgba(245, 240, 230, 0.55)',
    cardBorder: '#D4AF37',
    skyColor: 0x2A4D60,
    cloudColor: 0xD8C29D,
    cloudShadowColor: 0x182B36,
    sunColor: 0xF2C94C,
    sunGlareColor: 0xFFE082,
    sunlightColor: 0xFFF3D0,
    particleColor: 'rgba(242, 201, 76, 0.45)',
  },
  // 1 — Conquista: Stormy charcoal blue clouds with salmon sunset glow & crimson red general cape
  {
    accent: '#C84B31',
    bgTint: 'rgba(200, 75, 49, 0.06)',
    textPrimary: '#F5E8E4',
    textSecondary: '#D4B0A0',
    contentBg: 'rgba(30, 12, 10, 0.50)',
    cardBorder: '#D4AF37',
    skyColor: 0x2A353D,
    cloudColor: 0xD48C7B,
    cloudShadowColor: 0x151C22,
    sunColor: 0xA8322D,
    sunGlareColor: 0xC84B31,
    sunlightColor: 0xE06D53,
    particleColor: 'rgba(200, 75, 49, 0.45)',
  },
  // 2 — Dominio: Mediterranean sky blue background, warm cream architecture & azure tunics
  {
    accent: '#2B6CB0',
    bgTint: 'rgba(43, 108, 176, 0.06)',
    textPrimary: '#1A2B3C',
    textSecondary: '#3B4D5E',
    contentBg: 'rgba(240, 244, 248, 0.60)',
    cardBorder: '#D4AF37',
    skyColor: 0x7BA4C7,
    cloudColor: 0xE5D9C5,
    cloudShadowColor: 0x3B5266,
    sunColor: 0x2B6CB0,
    sunGlareColor: 0x3182CE,
    sunlightColor: 0x63B3ED,
    particleColor: 'rgba(43, 108, 176, 0.4)',
  },
  // 3 — Decadencia: Dramatic overcast storm grey sky, silver clouds & golden imperial domes
  {
    accent: '#C5A046',
    bgTint: 'rgba(197, 160, 70, 0.06)',
    textPrimary: '#F0E8D8',
    textSecondary: '#D0C0A0',
    contentBg: 'rgba(20, 22, 24, 0.55)',
    cardBorder: '#D4AF37',
    skyColor: 0x2E343A,
    cloudColor: 0x9DA7B1,
    cloudShadowColor: 0x121619,
    sunColor: 0xC5A046,
    sunGlareColor: 0xD4AF37,
    sunlightColor: 0xE6C665,
    particleColor: 'rgba(197, 160, 70, 0.45)',
  },
  // 4 — Liberación: Dark obsidian bronze backdrop with a brilliant warm golden divine halo
  {
    accent: '#E6B800',
    bgTint: 'rgba(218, 165, 32, 0.06)',
    textPrimary: '#F8F4EC',
    textSecondary: '#D8CEB8',
    contentBg: 'rgba(16, 21, 18, 0.55)',
    cardBorder: '#D4AF37',
    skyColor: 0x101512,
    cloudColor: 0xB8860B,
    cloudShadowColor: 0x050806,
    sunColor: 0xDAA520,
    sunGlareColor: 0xF0C040,
    sunlightColor: 0xFFE080,
    particleColor: 'rgba(218, 165, 32, 0.5)',
  },
  // 5 — Guerra Total: Clear steel blue sky with red army banners & scarlet blood-stained path
  {
    accent: '#C53030',
    bgTint: 'rgba(197, 48, 48, 0.06)',
    textPrimary: '#1A2A3A',
    textSecondary: '#3A4A5A',
    contentBg: 'rgba(235, 240, 245, 0.55)',
    cardBorder: '#D4AF37',
    skyColor: 0x4A7C9D,
    cloudColor: 0x9BBBD0,
    cloudShadowColor: 0x1E3242,
    sunColor: 0xC53030,
    sunGlareColor: 0xE53E3E,
    sunlightColor: 0xF56565,
    particleColor: 'rgba(197, 48, 48, 0.45)',
  },
  // 6 — Torres Celestiales: Deep celestial night blue space with blue nebula clouds & golden tower light
  {
    accent: '#E5B83A',
    bgTint: 'rgba(11, 27, 54, 0.06)',
    textPrimary: '#EBF8FF',
    textSecondary: '#C3DAFE',
    contentBg: 'rgba(6, 14, 28, 0.55)',
    cardBorder: '#D4AF37',
    skyColor: 0x0B1B36,
    cloudColor: 0x2D4A77,
    cloudShadowColor: 0x040B18,
    sunColor: 0xC69214,
    sunGlareColor: 0xE5B83A,
    sunlightColor: 0xF7D070,
    particleColor: 'rgba(229, 184, 58, 0.5)',
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
