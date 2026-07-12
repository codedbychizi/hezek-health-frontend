import logoImg from '../../assets/logo/hezek-logo.svg';

/**
 * Uses the Hezek Health logo SVG from src/assets/logo/hezek-logo.svg.
 * The SVG scales cleanly at any size, so default header and footer sizing
 * remain controlled by the `height` prop.
 *
 * `height` controls the rendered height — width scales automatically
 * to preserve the aspect ratio. Default 48px works well in the header;
 * pass a larger value for the footer or other placements if needed.
 *
 * showTagline is kept as a prop for backwards compatibility but is now
 * a no-op — the tagline is baked into the logo image itself.
 */
export default function Logo({ height = 48, className = '', showTagline = false }) {
  return (
    <img
      src={logoImg}
      alt="Hezek Health — Global care, local comfort"
      height={height}
      style={{ height: `${height}px`, width: 'auto' }}
      className={className}
    />
  );
}