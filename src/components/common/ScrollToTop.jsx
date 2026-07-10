import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Scrolls to the top of the page on every route change.
 * React Router preserves scroll position by default — this overrides that
 * behaviour so every new page starts at the top, like a traditional website.
 * Mount this once inside App.jsx, above the route outlet.
 */
export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [pathname]);

  return null;
}