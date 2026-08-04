/**
 * Per-etapa media items (games and comics).
 * Each etapa has arrays of games and comics with labels and URLs.
 * Items with url '#' are placeholders for testing.
 */

export interface MediaItem {
  label: string;
  url: string;
}

export interface EtapaMedia {
  games: MediaItem[];
  comics: MediaItem[];
}

const etapaMedia: EtapaMedia[] = [
  // 0 — Leyendas
  { games: [], comics: [] },

  // 1 — Conquista
  {
    games: [
      { label: 'Pong in Caroteo', url: 'https://2high2work.itch.io/pong-in-caroteo' },
    ],
    comics: [],
  },

  // 2 — Dominio
  { games: [], comics: [] },

  // 3 — Decadencia
  { games: [], comics: [] },

  // 4 — Liberación
  {
    games: [
      { label: 'Night of Wolves', url: 'https://store.steampowered.com/app/2393490/Night_of_Wolves/' },
    ],
    comics: [],
  },

  // 5 — Guerra Total
  { games: [], comics: [] },

  // 6 — Torres Celestiales (placeholders for scroll testing)
  {
    games: [
      { label: 'Siege of Adrahan', url: '#' },
      { label: 'The Last Tower', url: '#' },
      { label: 'Celestial Clash', url: '#' },
      { label: 'Bohemundo\'s Trial', url: '#' },
      { label: 'Skyborn Arena', url: '#' },
      { label: 'Angels & Mortals', url: '#' },
      { label: 'Fractured Heavens', url: '#' },
      { label: 'Dawn of Adrahan', url: '#' },
    ],
    comics: [
      { label: 'The Council — Vol. 1', url: '#' },
      { label: 'The Council — Vol. 2', url: '#' },
      { label: 'Shattered Sky', url: '#' },
      { label: 'United Destiny', url: '#' },
    ],
  },
];

export default etapaMedia;
