import { Link } from 'react-router-dom';

export default function SectionHeading({ eyebrow, title, linkTo, linkLabel }) {
  return (
    <div className="mb-10 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
      <div>
        {eyebrow && (
          <span className="text-sm font-semibold uppercase tracking-wide text-brand-teal">
            {eyebrow}
          </span>
        )}
        <h2 className="mt-2 font-display text-2xl font-bold text-brand-blue sm:text-3xl">
          {title}
        </h2>
      </div>
      {linkTo && (
        <Link to={linkTo} className="text-sm font-semibold text-brand-blue hover:underline">
          {linkLabel || 'See all →'}
        </Link>
      )}
    </div>
  );
}