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
  url: 'https://gooblinstudio.com/banner.jpg',
  width: 1200,
  height: 630,
  alt: 'Ciudad de las Nubes — Gooblin Studio',
};

export const metadata: Metadata = {
  title: 'Ciudad de las Nubes — Gooblin Studio',
  description:
    'Descubre la cronología del universo de Ciudad de las Nubes, el mundo donde Gooblin Studio crea sus juegos. Desde las Leyendas hasta las Torres Celestiales.',
  keywords: [
    'Gooblin Studio',
    'Ciudad de las Nubes',
    'juegos indie',
    'universo de fantasía',
    'ficción fantástica',
    'lore',
    'timeline',
    'cronología',
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
      'El universo donde Gooblin Studio crea sus juegos. Explora la cronología desde las Leyendas hasta las Torres Celestiales.',
    url: 'https://gooblinstudio.com',
    siteName: 'Gooblin Studio',
    type: 'website',
    locale: 'es_ES',
    images: [socialImage],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ciudad de las Nubes — Gooblin Studio',
    description:
      'El universo donde Gooblin Studio crea sus juegos.',
    images: [socialImage.url],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${cormorant.variable} ${alegreya.variable}`}
    >
      <head>
        <meta name="theme-color" content="#F5F2ED" />
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
