import logoImg from '../../assets/logo/hezek-logo.png';

/**
 * Uses the real Hezek Health logo PNG provided by Geotech Media.
 * The file lives at src/assets/logo/hezek-logo.png.
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