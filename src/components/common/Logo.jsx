import logoImg from '../../assets/logo/hezek-logo.svg';
import logoFooterImg from '../../assets/logo/hezek-logo-footer.svg';

/**
 * Uses the Hezek Health logo SVG from src/assets/logo/hezek-logo.svg.
 * A footer-specific version is available for dark backgrounds.
 *
 * `height` controls the rendered height — width scales automatically
 * to preserve the aspect ratio.
 *
 * showTagline is kept as a prop for backwards compatibility but is now
 * a no-op — the tagline is baked into the logo image itself.
 */
export default function Logo({ height = 48, width, className = '', showTagline = false, variant = 'default' }) {
  const logoSrc = variant === 'footer' ? logoFooterImg : logoImg;
  const baseStyle = className
  ? {}
  : width
  ? { width: `${width}px`, height: height ? `${height}px` : 'auto' }
  : { height: `${height}px`, width: 'auto' };

  // For footer we keep the original SVG but add a subtle drop-shadow
  // to increase contrast against the dark background without changing fills.
  const extraStyle =
    variant === 'footer'
      ? { filter: 'drop-shadow(0 2px 2px rgba(0,0,0,0.6)) drop-shadow(0 0 6px rgba(0,0,0,0.45))' }
      : {};

  const style = { ...baseStyle, ...extraStyle };

  return (
    <img src={logoSrc} alt="Hezek Health — Global care, local comfort" height={height} style={style} className={className} />
  );
}