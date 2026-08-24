import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Sobre Nosotros — Gooblin Studio | Ciudad de las Nubes',
  description:
    'Conoce a Gooblin Studio, el equipo indie detrás de Ciudad de las Nubes, Bohemundo y sus proyectos Fishheads y Night of Wolves.',
  keywords: [
    'Gooblin Studio',
    'Ciudad de las Nubes',
    'Bohemundo',
    'sobre nosotros',
    'equipo indie',
    'desarrolladores de videojuegos',
    'Fishheads',
    'Night of Wolves',
  ],
  alternates: {
    canonical: 'https://gooblinstudio.com/about-us',
  },
  openGraph: {
    title: 'Sobre Nosotros — Gooblin Studio | Ciudad de las Nubes',
    description:
      'Conoce a Gooblin Studio, el equipo indie detrás de Ciudad de las Nubes y Bohemundo.',
    url: 'https://gooblinstudio.com/about-us',
    siteName: 'Gooblin Studio',
    type: 'website',
    locale: 'es_ES',
    images: [
      {
        url: 'https://gooblinstudio.com/lienzo.webp',
        width: 1200,
        height: 630,
        alt: 'Ciudad de las Nubes — Gooblin Studio',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sobre Nosotros — Gooblin Studio | Ciudad de las Nubes',
    description:
      'Conoce a Gooblin Studio, el equipo indie detrás de Ciudad de las Nubes y Bohemundo.',
    images: ['https://gooblinstudio.com/lienzo.webp'],
  },
};

export default function AboutUsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
