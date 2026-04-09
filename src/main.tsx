import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import config from './siteConfig';
import './index.css';

// Apply theme colors from siteConfig as CSS custom properties
const root = document.documentElement;
root.style.setProperty('--color-primary', config.theme.primary);
root.style.setProperty('--color-primary-hover', config.theme.primaryHover);
root.style.setProperty('--color-dark', config.theme.dark);
root.style.setProperty('--color-dark-accent', config.theme.darkAccent);

// Apply business identity to the browser tab
document.title = config.business.pageTitle;

const metaDesc = document.querySelector('meta[name="description"]');
if (metaDesc) metaDesc.setAttribute('content', config.business.metaDescription);

if (config.business.logoUrl) {
  let favicon = document.querySelector<HTMLLinkElement>('link[rel="icon"]');
  if (!favicon) {
    favicon = document.createElement('link');
    favicon.rel = 'icon';
    document.head.appendChild(favicon);
  }
  favicon.href = config.business.logoUrl;
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
