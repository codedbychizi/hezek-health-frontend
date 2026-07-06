import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';

const SITE_URL = 'https://hezekhealth.com'; // update to real domain before launch
const DEFAULT_OG_IMAGE = `${SITE_URL}/og-image.png`; // place a 1200x630 branded image in /public

export default function SEO({ title, description, image }) {
  const { pathname } = useLocation();
  const fullTitle = title === 'Home'
    ? 'Hezek Health — Global Care, Local Comfort'
    : `${title} · Hezek Health`;
  const canonicalUrl = `${SITE_URL}${pathname}`;
  const ogImage = image || DEFAULT_OG_IMAGE;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      {description && <meta name="description" content={description} />}

      {/* Canonical — tells Google which URL is authoritative */}
      <link rel="canonical" href={canonicalUrl} />

      {/* Open Graph */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:type" content="website" />
      {description && <meta property="og:description" content={description} />}

      {/* Twitter card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:image" content={ogImage} />
      {description && <meta name="twitter:description" content={description} />}
    </Helmet>
  );
}