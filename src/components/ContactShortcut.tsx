'use client';

import { useEffect, useState } from 'react';
import { useLanguage } from '@/i18n/LanguageContext';

const EMAIL = 'info@gooblinstudio.com';
const X_URL = 'https://x.com/GooblinStudio';

function ContactShortcut() {
  const { t } = useLanguage();
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;

    const timeout = window.setTimeout(() => {
      setCopied(false);
    }, 1800);

    return () => window.clearTimeout(timeout);
  }, [copied]);

  const handleCopy = async () => {
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(EMAIL);
      } else {
        const textarea = document.createElement('textarea');
        textarea.value = EMAIL;
        textarea.setAttribute('readonly', '');
        textarea.style.position = 'absolute';
        textarea.style.left = '-9999px';
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
      }
      setCopied(true);
    } catch {
      setCopied(true);
    }
  };

  return (
    <div className="contact-shortcut" aria-live="polite">
      <button
        type="button"
        className="contact-shortcut__button"
        onClick={handleCopy}
        aria-label={t.copyEmailAria || 'Copy email to clipboard'}
      >
        <span className="contact-shortcut__email">{EMAIL}</span>
      </button>
      <a
        className="contact-shortcut__link"
        href={X_URL}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Gooblin Studio X"
      >
        X
      </a>
      <div
        className={`contact-shortcut__toast ${copied ? 'contact-shortcut__toast--visible' : ''}`}
      >
        {t.copiedClipboard}
      </div>
    </div>
  );
}

export default ContactShortcut;
