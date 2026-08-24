import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Us — Gooblin Studio | Ciudad de las Nubes',
  description:
    'Meet Gooblin Studio, the indie team behind Ciudad de las Nubes, Bohemundo, Fishheads and Night of Wolves.',
  keywords: [
    'Gooblin Studio',
    'Ciudad de las Nubes',
    'Bohemundo',
    'about us',
    'indie team',
    'game developers',
    'Fishheads',
    'Night of Wolves',
  ],
  alternates: {
    canonical: 'https://gooblinstudio.com/about-us',
  },
  openGraph: {
    title: 'About Us — Gooblin Studio | Ciudad de las Nubes',
    description:
      'Meet Gooblin Studio, the indie team behind Ciudad de las Nubes and Bohemundo.',
    url: 'https://gooblinstudio.com/about-us',
    siteName: 'Gooblin Studio',
    type: 'website',
    locale: 'en_US',
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
    title: 'About Us — Gooblin Studio | Ciudad de las Nubes',
    description:
      'Meet Gooblin Studio, the indie team behind Ciudad de las Nubes and Bohemundo.',
    images: ['https://gooblinstudio.com/lienzo.webp'],
  },
};

export default function AboutUsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'AboutPage',
    name: 'About Us — Gooblin Studio',
    url: 'https://gooblinstudio.com/about-us',
    about: { '@id': 'https://gooblinstudio.com/#organization' },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {children}
    </>
  );
}
  return children;
}
