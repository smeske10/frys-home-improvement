import { useState, useEffect } from 'react';

const CONSENT_KEY = 'cookie_consent';

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

function grantConsent() {
  window.gtag?.('consent', 'update', {
    analytics_storage: 'granted',
    ad_storage: 'granted',
    ad_user_data: 'granted',
    ad_personalization: 'granted',
  });
}

export default function ConsentBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(CONSENT_KEY);
    if (!stored) {
      setVisible(true);
    } else if (stored === 'accepted') {
      grantConsent();
    }
  }, []);

  const accept = () => {
    localStorage.setItem(CONSENT_KEY, 'accepted');
    grantConsent();
    setVisible(false);
  };

  const decline = () => {
    localStorage.setItem(CONSENT_KEY, 'declined');
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-live="polite"
      aria-label="Cookie consent"
      className="fixed bottom-0 left-0 right-0 z-[200] bg-slate-900 border-t border-slate-700 px-6 py-4 md:py-5"
    >
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6">
        <p className="text-slate-300 text-sm flex-1">
          We use cookies and tracking technologies to improve your experience and understand how
          visitors use our site. By accepting, you consent to our use of analytics and advertising
          cookies.{' '}
          <a
            href="https://www.google.com/policies/privacy/"
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-white transition-colors"
          >
            Learn more
          </a>
          .
        </p>
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={decline}
            className="text-sm text-slate-400 hover:text-white transition-colors px-4 py-2 rounded-lg border border-slate-600 hover:border-slate-400"
          >
            Decline
          </button>
          <button
            onClick={accept}
            className="text-sm font-semibold bg-primary text-white px-5 py-2 rounded-lg hover:opacity-90 transition-opacity"
            style={{ backgroundColor: '#00b91f9f' }}
          >
            Accept All
          </button>
        </div>
      </div>
    </div>
  );
}
