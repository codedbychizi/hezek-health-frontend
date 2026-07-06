import { Link } from 'react-router-dom';
import Container from '../common/Container.jsx';
import FadeIn from '../common/FadeIn.jsx';
import SectionHeading from '../common/SectionHeading.jsx';
import { useSupabaseQuery } from '../../hooks/useSupabaseQuery.js';
import { getPublishedPosts } from '../../lib/queries.js';

export default function BlogPreview() {
  const { data: posts, loading } = useSupabaseQuery(() => getPublishedPosts(3));

  // Same instinct as Hospitals: no published posts yet (the blog CMS isn't
  // built until Phase 5), so hide rather than show an empty section.
  if (loading || !posts?.length) return null;

  return (
    <section className="py-20">
      <Container>
        <SectionHeading eyebrow="From the Blog" title="Latest articles" linkTo="/blog" />
        <div className="grid gap-6 sm:grid-cols-3">
          {posts.map((post) => (
            <FadeIn key={post.id} className="overflow-hidden rounded-card bg-white shadow-card">
              {post.featured_image_url && (
                <img
                  src={post.featured_image_url}
                  alt={post.title}
                  className="h-40 w-full object-cover"
                />
              )}
              <div className="p-6">
                <h3 className="font-display text-base font-bold text-brand-blue">
                  {post.title}
                </h3>
                <p className="mt-2 text-sm text-brand-ink/70">{post.excerpt}</p>
                <Link
                  to={`/blog/${post.slug}`}
                  className="mt-4 inline-block text-sm font-semibold text-brand-teal hover:underline"
                >
                  Read more →
                </Link>
              </div>
            </FadeIn>
          ))}
        </div>
      </Container>
    </section>
  );
}