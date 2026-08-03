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
  comingSoon: string;
  enterTimeline: string;
  landingTitle: string;
  landingSubtitle: string;
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
    comingSoon: 'Próximamente...',
    enterTimeline: 'Explorar la Cronología',
    landingTitle: 'Ciudad de las Nubes',
    landingSubtitle: 'El universo de Gooblin Studio',
    etapas: [
      {
        title: 'Leyendas',
        body: 'Bohemundo ha creado para vosotros el Sol. Sólo, frente al Abismo, alejó a las estrellas de nuestra tierra. Julia, Helión, Apopino; vuestro es este nuevo mundo esculpido lejos de la oscuridad abismal.',
      },
      {
        title: 'Conquista',
        body: 'Tras la guerra contra los ángeles, los descendientes de Helión han reclamado su derecho ancestral sobre la humanidad. Enock y sus hijos lideran la conquista con la bendición de los cielos, pues todo ha de ser suyo.',
        gameLabel: 'Pong in Caroteo',
      },
      {
        title: 'Dominio',
        body: 'Los Heliones se marchitan en la Ciudad de las Nubes, con la tierra conquistada a sus pies. Ahora, la revolución científica de los Gathai, las monedas de los Medicit, y las fraguas de los Lennox amenazan la hegemonía de los descendientes directos del Titán.',
      },
      {
        title: 'Decadencia',
        body: 'El Alto Mando Imperial ha renunciado. Las costuras del vasto Imperio, que fue el sueño de Enock, se deshace mientras sus descendientes yacen olvidados en los lejanos campos de batalla. Ya no quedan Heliones en la Ciudad de las Nubes, y en las cámaras de los grandiosos palacios se sueñan mundos mejores.',
      },
      {
        title: 'Liberación',
        body: 'La Ciudad de las Nubes ha caído. Julia, liberada de su prisión, se ha lanzado a la conquista de las antiguas tierras de su difunto hermano. La humanidad respira de nuevo, liberada una vez más de la maldición del Alma Doblegada impuesta por los crueles cielos.',
        gameLabel: 'Night of Wolves',
      },
      {
        title: 'Guerra Total',
        body: 'Tras siglos de reinado, han asesinado a la Hija de Bohemundo en su trono. El cielo se ha partido, y la tierra ruge por la sangre derramada. ¿Acaso la humanidad se ha condenado? ¿Perdieron el favor de los cielos? ¿Les abandonó la gracia del Sol?',
      },
      {
        title: 'Torres Celestiales',
        body: 'Bajo la sombra del cielo fracturado, ángeles y humanos fueron perdonados en el Concilio de Adrahan. Unidos por el mismo destino, deben sostener el cielo con fuerza; con la misma fuerza que Bohemundo sostiene el Sol; con la misma fuerza que Helión sostiene sobre nuestras cabezas la Luna.',
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
    comingSoon: 'Coming soon...',
    enterTimeline: 'Explore the Timeline',
    landingTitle: 'Ciudad de las Nubes',
    landingSubtitle: 'The Gooblin Studio Universe',
    etapas: [
      {
        title: 'Legends',
        body: 'Bohemundo has created the Sun for you. Alone, facing the Abyss, he drove the stars away from our land. Julia, Helion, Apopino; this new world, carved far from the abysmal darkness, is yours.',
      },
      {
        title: 'Conquest',
        body: 'After the war against the angels, the descendants of Helion have claimed their ancestral right over humanity. Enock and his children lead the conquest with the blessing of the heavens, for all must be theirs.',
        gameLabel: 'Pong in Caroteo',
      },
      {
        title: 'Dominion',
        body: 'The Heliones wither in the Ciudad de las Nubes, with the conquered lands at their feet. Now, the scientific revolution of the Gathai, the gold of the Medicit, and the forges of the Lennox threaten the hegemony of the Titan\'s direct descendants.',
      },
      {
        title: 'Decline',
        body: 'The Imperial High Command has surrendered. The seams of the vast Empire, once Enock\'s dream, unravel as his descendants lie forgotten on distant battlefields. No Helions remain in the City of Clouds, and in the chambers of grand palaces, visions of better worlds are dreamed.',
      },
      {
        title: 'Liberation',
        body: 'The Ciudad de las Nubes has fallen. Julia, freed from her prison, has begun the conquest of her late brother\'s ancient lands. Humanity breathes again, once more liberated from the curse of The Shackled Soul imposed by the cruel heavens.',
        gameLabel: 'Night of Wolves',
      },
      {
        title: 'Total War',
        body: 'After centuries of reign, the Daughter of Bohemundo has been slain upon her throne. The sky has shattered, and the earth roars for the blood spilled. Has humanity condemned itself? Have they lost the favor of the heavens? Has the grace of the Sun abandoned them?',
      },
      {
        title: 'Celestial Towers',
        body: 'Under the shadow of the fractured sky, angels and humans were pardoned in the Council of Adrahan. United by the same destiny, they must hold the heavens strong; with the same strength that Bohemundo holds the Sun; with the same strength that Helion holds the Moon above our heads.',
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
  null, // Torres Celestiales
];

export default translations;
