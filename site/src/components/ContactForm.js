'use client';

import { useState } from 'react';

/**
 * No backend: the form composes an email in the visitor's mail app, addressed to `email`.
 */
export default function ContactForm({ email, labels }) {
  const [copied, setCopied] = useState(false);

  const onSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const name = String(data.get('name') || '').trim();
    const message = String(data.get('message') || '').trim();
    const subject = name ? `${labels.subject} — ${name}` : labels.subject;
    window.location.href = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(message)}`;
  };

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      window.location.href = `mailto:${email}`;
    }
  };

  return (
    <form className="contact-form" onSubmit={onSubmit}>
      <div className="field">
        <label htmlFor="cf-name">{labels.name}</label>
        <input id="cf-name" name="name" autoComplete="name" placeholder={labels.namePlaceholder} />
      </div>
      <div className="field">
        <label htmlFor="cf-message">{labels.message}</label>
        <textarea id="cf-message" name="message" rows={5} required placeholder={labels.messagePlaceholder} />
      </div>
      <div className="contact-actions">
        <button type="submit" className="btn">{labels.send} <span aria-hidden="true">✉</span></button>
        <button type="button" className="text-link" onClick={copy} style={{ border: 0, background: 'none', padding: 0 }}>
          {copied ? labels.copied : email}
        </button>
      </div>
      <p className="contact-note">{labels.note}</p>
    </form>
  );
}
