import logoImg from '../../assets/logo/hezek-logo.svg';
import logoFooterImg from '../../assets/logo/hezek-logo-footer.svg';

/**
 * Uses the Hezek Health logo SVG from src/assets/logo/hezek-logo.svg.
 * A footer-specific white version is available for dark backgrounds.
 *
 * `height` controls the rendered height — width scales automatically
 * to preserve the aspect ratio.
 *
 * showTagline is kept as a prop for backwards compatibility but is now
 * a no-op — the tagline is baked into the logo image itself.
 */
export default function Logo({ height = 48, className = '', showTagline = false, variant = 'default' }) {
  const logoSrc = variant === 'footer' ? logoFooterImg : logoImg;

  return (
    <img
      src={logoSrc}
      alt="Hezek Health — Global care, local comfort"
      height={height}
      style={{ height: `${height}px`, width: 'auto' }}
      className={className}
    />
  );
}