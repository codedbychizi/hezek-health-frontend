import { Link } from 'react-router-dom';

function formatDate(iso) {
  if (!iso) return '';
  return new Date(iso).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

export default function PostCard({ post, compact = false }) {
  return (
    <Link
      to={`/blog/${post.slug}`}
      className="group block overflow-hidden rounded-card bg-white shadow-card transition-shadow hover:shadow-card-hover"
    >
      {post.featured_image_url ? (
        <img
          src={post.featured_image_url}
          alt={post.title}
          className={`w-full object-cover ${compact ? 'h-32' : 'h-44'}`}
        />
      ) : (
        <div className={`flex items-center justify-center bg-brand-mist text-xs text-brand-blue/30 ${compact ? 'h-32' : 'h-44'}`}>
          No image
        </div>
      )}
      <div className="p-5">
        {post.blog_categories?.name && (
          <span className="text-xs font-semibold uppercase tracking-wide text-brand-teal">
            {post.blog_categories.name}
          </span>
        )}
        <h3 className={`mt-1 font-display font-bold text-brand-blue group-hover:text-brand-teal transition-colors ${compact ? 'text-sm' : 'text-base'}`}>
          {post.title}
        </h3>
        {!compact && post.excerpt && (
          <p className="mt-2 text-sm text-brand-ink/70 line-clamp-2">{post.excerpt}</p>
        )}
        <p className="mt-3 text-xs text-brand-ink/40">{formatDate(post.published_at)}</p>
      </div>
    </Link>
  );
}