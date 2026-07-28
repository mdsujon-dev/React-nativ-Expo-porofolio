import { ScrollViewStyleReset } from 'expo-router/html';
import { type PropsWithChildren } from 'react';

/** Registers the service worker so the web build is installable as a PWA. */
const registerSW = `
if ('serviceWorker' in navigator) {
  window.addEventListener('load', function () {
    navigator.serviceWorker.register('/sw.js').catch(function () {});
  });
}
`;

/**
 * Root HTML document for every web page. Adds the PWA manifest, theme color and
 * Apple home-screen meta so the site installs and opens like a native app.
 */
export default function Root({ children }: PropsWithChildren) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no, viewport-fit=cover"
        />
        <title>Sujon — Full Stack Developer</title>
        <meta name="description" content="Sujon Ahmed — Full Stack Developer portfolio." />

        {/* PWA */}
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#043d2e" />
        <link rel="apple-touch-icon" href="/icon.png" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="Sujon.dev" />

        {/* Keep react-native-web's scroll behaviour consistent on web. */}
        <ScrollViewStyleReset />
        <script dangerouslySetInnerHTML={{ __html: registerSW }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
