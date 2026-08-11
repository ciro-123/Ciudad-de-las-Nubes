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

  // 6 — Torres Celestiales
  { games: [
    { label: 'The Tower', url: 'https://2high2work.itch.io/the-tower' },
  ], comics: [] },
];

export default etapaMedia;
