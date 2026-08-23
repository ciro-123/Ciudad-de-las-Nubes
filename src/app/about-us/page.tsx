'use client';

import Image from 'next/image';
import Link from 'next/link';
import { LanguageProvider, useLanguage } from '@/i18n/LanguageContext';
import LanguageSwitcher from '@/components/LanguageSwitcher';

const projects = [
  {
    title: 'Fishheads',
    image: '/images/projects/fishheads.webp',
    href: 'https://2high2work.itch.io/fisheads',
  },
  {
    title: 'Night of Wolves',
    image: '/images/projects/night-of-wolves.webp',
    href: 'https://store.steampowered.com/app/2393490/Night_of_Wolves',
  },
];

function AboutUsContent() {
  const { t } = useLanguage();

  return (
    <>
      <LanguageSwitcher />
      <main id="main-content" className="about-page">
        <Link href="/" className="about-page__back-link">
          <span aria-hidden="true">←</span>
          {t.back}
        </Link>

        <header className="about-page__hero">
          <Image
            src="/lienzo.webp"
            alt="Ciudad de las Nubes"
            fill
            priority
            sizes="100vw"
            className="about-page__hero-image"
          />
        </header>

        <article className="about-page__content">
          <h1>Ciudad de las Nubes</h1>
          <div className="about-page__copy">
            {t.aboutCopy.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>

          <div className="about-page__projects">
            {projects.map((project) => (
              <a
                key={project.title}
                href={project.href}
                target="_blank"
                rel="noopener noreferrer"
                className="about-page__project-link"
              >
                <Image
                  src={project.image}
                  alt={project.title}
                  width={640}
                  height={360}
                  className="about-page__project-image"
                />
              </a>
            ))}
          </div>
        </article>
      </main>
    </>
  );
}

export default function AboutUsPage() {
  return (
    <LanguageProvider>
      <AboutUsContent />
    </LanguageProvider>
  );
}