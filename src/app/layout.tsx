import type { Metadata } from 'next';
import { Cormorant_Garamond, Alegreya } from 'next/font/google';
import './globals.css';

const cormorant = Cormorant_Garamond({
  variable: '--font-cormorant',
  subsets: ['latin', 'latin-ext'],
  weight: ['400', '600', '700'],
  display: 'swap',
});

const alegreya = Alegreya({
  variable: '--font-alegreya',
  subsets: ['latin', 'latin-ext'],
  weight: ['400', '500', '700'],
  display: 'swap',
});

const socialImage = {
  url: 'https://gooblinstudio.com/lienzo.webp',
  width: 1200,
  height: 630,
  alt: 'Ciudad de las Nubes — Gooblin Studio',
};

export const metadata: Metadata = {
  title: 'Ciudad de las Nubes — Gooblin Studio',
  description:
    'Ciudad de las Nubes is a fantasy universe by Gooblin Studio: an epic story spanning seven ages of intrigue, great battles, memorable characters and dark mysteries.',
  keywords: [
    'Gooblin Studio',
    'Ciudad de las Nubes',
    'Bohemundo',
    'indiegames',
    'fantasy universe',
    'lore',
    'timeline',
  ],
  authors: [{ name: 'Gooblin Studio' }],
  metadataBase: new URL('https://gooblinstudio.com'),
  icons: {
    icon: '/favicon.png',
  },
  alternates: {
    canonical: 'https://gooblinstudio.com/',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    title: 'Ciudad de las Nubes — Gooblin Studio',
    description:
      'Ciudad de las Nubes is a fantasy universe by Gooblin Studio: an epic story spanning seven ages of intrigue, great battles, memorable characters and dark mysteries.',
    url: 'https://gooblinstudio.com',
    siteName: 'Gooblin Studio',
    type: 'website',
    locale: 'en_US',
    images: [socialImage],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ciudad de las Nubes — Gooblin Studio',
    description:
      'Ciudad de las Nubes is a fantasy universe by Gooblin Studio: an epic story spanning seven ages of intrigue, great battles, memorable characters and dark mysteries.',
    images: [socialImage.url],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': 'https://gooblinstudio.com/#organization',
        name: 'Gooblin Studio',
        url: 'https://gooblinstudio.com',
        logo: 'https://gooblinstudio.com/favicon.png',
        sameAs: [
          'https://2high2work.itch.io',
          'https://www.instagram.com/gooblinstudio',
          'https://twitter.com/gooblinstudio',
        ],
        creatorOf: [
          { '@id': 'https://gooblinstudio.com/#ciudad-de-las-nubes' },
          { '@id': 'https://gooblinstudio.com/#pong-in-caroteo' },
          { '@id': 'https://gooblinstudio.com/#night-of-wolves' },
          { '@id': 'https://gooblinstudio.com/#the-tower' },
        ],
      },
      {
        '@type': 'WebSite',
        '@id': 'https://gooblinstudio.com/#website',
        url: 'https://gooblinstudio.com',
        name: 'Ciudad de las Nubes — Gooblin Studio',
        description:
          'Ciudad de las Nubes is a fantasy universe by Gooblin Studio: an epic story spanning seven ages of intrigue, great battles, memorable characters and dark mysteries.',
        publisher: { '@id': 'https://gooblinstudio.com/#organization' },
        creator: { '@id': 'https://gooblinstudio.com/#organization' },
        about: { '@id': 'https://gooblinstudio.com/#ciudad-de-las-nubes' },
        inLanguage: ['es', 'en'],
      },
      {
        '@type': 'CreativeWork',
        '@id': 'https://gooblinstudio.com/#ciudad-de-las-nubes',
        name: 'Ciudad de las Nubes',
        description:
          'Ciudad de las Nubes is a fantasy universe by Gooblin Studio: an epic story spanning seven ages of intrigue, great battles, memorable characters and dark mysteries.',
        creator: { '@id': 'https://gooblinstudio.com/#organization' },
        publisher: { '@id': 'https://gooblinstudio.com/#organization' },
        url: 'https://gooblinstudio.com',
        about: { '@id': 'https://gooblinstudio.com/#bohemundo' },
        hasPart: [
          { '@id': 'https://gooblinstudio.com/#etapa-leyendas' },
          { '@id': 'https://gooblinstudio.com/#etapa-conquista' },
          { '@id': 'https://gooblinstudio.com/#etapa-dominio' },
          { '@id': 'https://gooblinstudio.com/#etapa-decadencia' },
          { '@id': 'https://gooblinstudio.com/#etapa-liberacion' },
          { '@id': 'https://gooblinstudio.com/#etapa-guerra-total' },
          { '@id': 'https://gooblinstudio.com/#etapa-torres-celestiales' },
        ],
      },
      {
        '@type': 'Person',
        '@id': 'https://gooblinstudio.com/#bohemundo',
        name: 'Bohemundo',
        description:
          'Bohemundo is an important character within the universe of Ciudad de las Nubes.',
      },
      {
        '@type': 'CreativeWork',
        '@id': 'https://gooblinstudio.com/#etapa-leyendas',
        name: 'I. Leyendas',
        isPartOf: { '@id': 'https://gooblinstudio.com/#ciudad-de-las-nubes' },
        creator: { '@id': 'https://gooblinstudio.com/#organization' },
      },
      {
        '@type': 'CreativeWork',
        '@id': 'https://gooblinstudio.com/#etapa-conquista',
        name: 'II. Conquista',
        isPartOf: { '@id': 'https://gooblinstudio.com/#ciudad-de-las-nubes' },
        creator: { '@id': 'https://gooblinstudio.com/#organization' },
        hasPart: { '@id': 'https://gooblinstudio.com/#pong-in-caroteo' },
      },
      {
        '@type': 'CreativeWork',
        '@id': 'https://gooblinstudio.com/#etapa-dominio',
        name: 'III. Dominio',
        isPartOf: { '@id': 'https://gooblinstudio.com/#ciudad-de-las-nubes' },
        creator: { '@id': 'https://gooblinstudio.com/#organization' },
      },
      {
        '@type': 'CreativeWork',
        '@id': 'https://gooblinstudio.com/#etapa-decadencia',
        name: 'IV. Decadencia',
        isPartOf: { '@id': 'https://gooblinstudio.com/#ciudad-de-las-nubes' },
        creator: { '@id': 'https://gooblinstudio.com/#organization' },
      },
      {
        '@type': 'CreativeWork',
        '@id': 'https://gooblinstudio.com/#etapa-liberacion',
        name: 'V. Liberación',
        isPartOf: { '@id': 'https://gooblinstudio.com/#ciudad-de-las-nubes' },
        creator: { '@id': 'https://gooblinstudio.com/#organization' },
        hasPart: { '@id': 'https://gooblinstudio.com/#night-of-wolves' },
      },
      {
        '@type': 'CreativeWork',
        '@id': 'https://gooblinstudio.com/#etapa-guerra-total',
        name: 'VI. Guerra Total',
        isPartOf: { '@id': 'https://gooblinstudio.com/#ciudad-de-las-nubes' },
        creator: { '@id': 'https://gooblinstudio.com/#organization' },
      },
      {
        '@type': 'CreativeWork',
        '@id': 'https://gooblinstudio.com/#etapa-torres-celestiales',
        name: 'VII. Torres Celestiales',
        isPartOf: { '@id': 'https://gooblinstudio.com/#ciudad-de-las-nubes' },
        creator: { '@id': 'https://gooblinstudio.com/#organization' },
        hasPart: { '@id': 'https://gooblinstudio.com/#the-tower' },
      },
      {
        '@type': 'VideoGame',
        '@id': 'https://gooblinstudio.com/#pong-in-caroteo',
        name: 'Pong in Caroteo',
        url: 'https://2high2work.itch.io/pong-in-caroteo',
        creator: { '@id': 'https://gooblinstudio.com/#organization' },
        isPartOf: { '@id': 'https://gooblinstudio.com/#etapa-conquista' },
      },
      {
        '@type': 'VideoGame',
        '@id': 'https://gooblinstudio.com/#night-of-wolves',
        name: 'Night of Wolves',
        url: 'https://store.steampowered.com/app/2393490/Night_of_Wolves/',
        creator: { '@id': 'https://gooblinstudio.com/#organization' },
        isPartOf: { '@id': 'https://gooblinstudio.com/#etapa-liberacion' },
      },
      {
        '@type': 'VideoGame',
        '@id': 'https://gooblinstudio.com/#the-tower',
        name: 'The Tower',
        url: 'https://2high2work.itch.io/the-tower',
        creator: { '@id': 'https://gooblinstudio.com/#organization' },
        isPartOf: { '@id': 'https://gooblinstudio.com/#etapa-torres-celestiales' },
      },
    ],
  };

  return (
    <html
      lang="es"
      className={`${cormorant.variable} ${alegreya.variable}`}
    >
      <head>
        <meta name="theme-color" content="#F5F2ED" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body suppressHydrationWarning>
        {/* Skip to content link for accessibility */}
        <a href="#main-content" className="skip-link">
          Saltar al contenido
        </a>
        {children}
      </body>
    </html>
  );
}

