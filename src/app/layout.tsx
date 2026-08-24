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
          'https://store.steampowered.com/app/2393490/Night_of_Wolves',
        ],
      },
      {
        '@type': 'WebSite',
        '@id': 'https://gooblinstudio.com/#website',
        url: 'https://gooblinstudio.com',
        name: 'Ciudad de las Nubes — Gooblin Studio',
        publisher: { '@id': 'https://gooblinstudio.com/#organization' },
        inLanguage: 'en',
      },
      {
        '@type': 'CreativeWork',
        '@id': 'https://gooblinstudio.com/#creativework',
        name: 'Ciudad de las Nubes',
        description:
          "Ciudad de las Nubes is Gooblin Studio's fantasy universe: an epic story spanning seven ages of intrigue, great battles, memorable characters and dark mysteries.",
        creator: { '@id': 'https://gooblinstudio.com/#organization' },
        about: 'Bohemundo',
        url: 'https://gooblinstudio.com',
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

