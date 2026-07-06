import { Link } from 'react-router-dom';

const VARIANTS = {
  primary: 'bg-brand-blue text-white hover:bg-brand-blue-dark',
  accent: 'bg-brand-teal text-brand-ink hover:bg-brand-teal-dark',
  outline: 'border border-brand-blue text-brand-blue hover:bg-brand-blue/5',
};

/**
 * Renders a <Link> when `to` is given, otherwise a real <button>.
 * Keeps every CTA in the app visually consistent without re-deciding
 * padding/radius/hover behavior each time.
 */
export default function Button({
  to,
  variant = 'primary',
  className = '',
  children,
  ...props
}) {
  const classes = `inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-semibold transition-colors duration-200 ${VARIANTS[variant]} ${className}`;

  if (to) {
    return (
      <Link to={to} className={classes} {...props}>
        {children}
      </Link>
    );
  }

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
}