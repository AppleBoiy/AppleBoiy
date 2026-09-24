import './globals.css';

// Fallback for requests that never reach a locale (the proxy normally redirects first).
export default function RootNotFound() {
  return (
    <html lang="en">
      <body>
        <main className="scene scene-night not-found">
          <p className="mono">404</p>
          <h1 className="title" style={{ marginTop: 20 }}>Page not found</h1>
          <a href="/" className="text-link">← Return home</a>
        </main>
      </body>
    </html>
  );
}
