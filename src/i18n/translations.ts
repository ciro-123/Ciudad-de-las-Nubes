export type Language = 'es' | 'en';

export interface EtapaContent {
  title: string;
  body: string;
  gameLabel?: string;
}

export interface Translations {
  siteTitle: string;
  siteSubtitle: string;
  skipToContent: string;
  timelineNav: string;
  languageToggle: string;
  switchToLanguage: string;
  visitGame: string;
  menuGames: string;
  menuComics: string;
  aboutUs: string;
  back: string;
  aboutCopy: string[];
  comingSoon: string;
  noGamesYet: string;
  noComicsYet: string;
  copyEmailAria: string;
  copiedClipboard: string;
  etapas: EtapaContent[];
}

const translations: Record<Language, Translations> = {
  es: {
    siteTitle: 'Ciudad de las Nubes',
    siteSubtitle: 'El universo de Gooblin Studio',
    skipToContent: 'Saltar al contenido',
    timelineNav: 'Navegación de la cronología',
    languageToggle: 'Cambiar idioma',
    switchToLanguage: 'English',
    visitGame: 'Ver juego',
    menuGames: 'Juegos',
    menuComics: 'Cómics',
    aboutUs: 'Sobre Nosotros',
    back: 'Volver',
    aboutCopy: [
      'Ciudad de las Nubes es un universo de fantasía desarrollado por Gooblin Studio.',
      'En él, encontraréis una gran historia que se extiende a lo largo de siete edades, cada una marcada por sus propias intrigas, grandes batallas, personajes memorables y oscuros misterios.',
      'Trabajamos en distintos proyectos para explorar y dar a conocer las historias que pueblan este universo, desde videojuegos, relatos o cómics. Con cada proyecto, buscamos explorar una parte diferente de la extensa historia de Ciudad de las Nubes.',
      'Actualmente, estamos trabajando en...',
    ],
    comingSoon: 'Próximamente...',
    noGamesYet: 'Aún no hay juegos en esta etapa',
    noComicsYet: 'Aún no hay cómics en esta etapa',
    copyEmailAria: 'Copiar correo al portapapeles',
    copiedClipboard: 'Copiado en el portapapeles',
    etapas: [
      {
        title: 'Leyendas',
        body: 'Bohemundo sostiene sobre vosotros el Sol. Sólo, frente al Abismo, su fuerza mantiene a las estrellas lejos de nuestra tierra. Giulia, Helión, Apopino; vuestro es este nuevo mundo esculpido lejos de la oscuridad abismal.',
      },
      {
        title: 'Conquista',
        body: 'Tras la derrota de los ángeles, los descendientes de Helión han reclamado su derecho ancestral sobre este mundo. Enock y sus hijos lideran la conquista con la bendición de los cielos, pues todo ha de ser suyo.',
        gameLabel: 'Pong in Caroteo',
      },
      {
        title: 'Dominio',
        body: 'Los Heliones se marchitan en la Ciudad de las Nubes, con la tierra conquistada a sus pies. Ahora, la revolución científica de los Gathai, las monedas de los Medicit, y las fraguas de los Lennox amenazan la hegemonía de los descendientes directos del Titán.',
      },
      {
        title: 'Decadencia',
        body: 'El Alto Mando Imperial ha renunciado. Las costuras del Imperio, que fue el sueño de Enock, se deshacen mientras sus descendientes yacen olvidados en los lejanos campos de batalla. Ya no quedan Heliones en la Ciudad de las Nubes, y en las cámaras de sus grandiosos palacios se sueñan mundos mejores.',
      },
      {
        title: 'Liberación',
        body: 'La Ciudad de las Nubes ha caído. Giulia, liberada de su prisión, se ha lanzado a la conquista de las antiguas tierras de su difunto hermano. La humanidad respira de nuevo, liberada de la maldición del Alma Doblegada impuesta por los crueles cielos.',
        gameLabel: 'Night of Wolves',
      },
      {
        title: 'Guerra Total',
        body: 'Tras siglos de reinado, han asesinado a la Hija de Bohemundo en su trono. El cielo se ha partido, y la tierra ruge por la sangre derramada. ¿Acaso la humanidad se ha condenado? ¿Perdieron el favor de los cielos? ¿Les ha abandonado la gracia del Sol?',
      },
      {
        title: 'Torres Celestiales',
        body: 'Bajo la sombra del cielo fracturado, ángeles y humanos fueron perdonados. Unidos por el mismo destino, deben sostener el cielo con fuerza; con la misma fuerza que Bohemundo sostiene el Sol; con la misma fuerza que Helión sostiene sobre nuestras cabezas la Luna.',
        gameLabel: 'The Tower',
      },
    ],
  },
  en: {
    siteTitle: 'Ciudad de las Nubes',
    siteSubtitle: 'The Gooblin Studio Universe',
    skipToContent: 'Skip to content',
    timelineNav: 'Timeline navigation',
    languageToggle: 'Switch language',
    switchToLanguage: 'Español',
    visitGame: 'View game',
    menuGames: 'Games',
    menuComics: 'Comics',
    aboutUs: 'About Us',
    back: 'Back',
    aboutCopy: [
      'Ciudad de las Nubes is a fantasy universe developed by Gooblin Studio.',
      'Within it, you will find a great story spanning seven ages, each marked by its own intrigues, great battles, memorable characters, and dark mysteries.',
      'We work on different projects to explore and share the stories that inhabit this universe, from video games and written tales to comics. With each project, we seek to explore a different part of the extensive history of Ciudad de las Nubes.',
      'Currently, we are working on...',
    ],
    comingSoon: 'Coming soon...',
    noGamesYet: 'No games in this stage yet',
    noComicsYet: 'No comics in this stage yet',
    copyEmailAria: 'Copy email to clipboard',
    copiedClipboard: 'Copied to clipboard',
    etapas: [
      {
        title: 'Legends',
        body: 'Bohemundo holds the Sun above you. Alone, facing the Abyss, his strength keeps the stars away from our land. Giulia, Helion, Apopino; this new world, carved far from the abyssal darkness, is yours.',
      },
      {
        title: 'Conquest',
        body: 'After the defeat of the angels, the descendants of Helion have claimed their ancestral right over this world. Enock and his children lead the conquest with the blessing of the heavens, for all things are meant to belong to them.',
        gameLabel: 'Pong in Caroteo',
      },
      {
        title: 'Dominion',
        body: 'The Helions wither away in the City of Clouds, with the conquered earth at their feet. Now, the scientific revolution of the Gathai, the coins of the Medicit, and the forges of the Lennox threaten the hegemony of the Titan’s direct descendants.',
      },
      {
        title: 'Decline',
        body: 'The Imperial High Command has surrendered. The seams of the Empire, once Enock’s dream, unravel while his descendants lie forgotten on distant battlefields. No Helions remain in the City of Clouds, and within the chambers of its grand palaces, dreams of better worlds are dreamed.',
      },
      {
        title: 'Liberation',
        body: 'The City of Clouds has fallen. Giulia, freed from her prison, has set out to conquer the ancient lands of her deceased brother. Humanity breathes again, freed from the curse of the Bent Soul imposed by the cruel heavens.',
        gameLabel: 'Night of Wolves',
      },
      {
        title: 'Total War',
        body: 'After centuries of reign, the Daughter of Bohemundo has been murdered upon her throne. The sky has split apart, and the earth roars for the blood that has been spilled. Has humanity condemned itself? Have they lost the favor of the heavens? Has the grace of the Sun abandoned them?',
      },
      {
        title: 'Celestial Towers',
        body: 'Beneath the shadow of the fractured sky, angels and humans were forgiven. United by the same fate, they must hold up the heavens with strength; with the same strength with which Bohemundo holds the Sun; with the same strength with which Helion holds the Moon above our heads.',
        gameLabel: 'The Tower',
      },
    ],
  },
};

// Game links associated with each etapa (by index)
// null means no game for that etapa yet
export const etapaGameLinks: (string | null)[] = [
  null, // Leyendas
  'https://2high2work.itch.io/pong-in-caroteo', // Conquista
  null, // Dominio
  null, // Decadencia
  'https://store.steampowered.com/app/2393490/Night_of_Wolves/', // Liberación
  null, // Guerra Total
  'https://2high2work.itch.io/the-tower'
];

export default translations;
