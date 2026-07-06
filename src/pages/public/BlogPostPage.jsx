import { useParams, Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import SEO from '../../seo/SEO.jsx';
import Container from '../../components/common/Container.jsx';
import FadeIn from '../../components/common/FadeIn.jsx';
import Skeleton from '../../components/common/Skeleton.jsx';
import PostCard from '../../components/blog/PostCard.jsx';
import { useSupabaseQuery } from '../../hooks/useSupabaseQuery.js';
import { getPostBySlug, getRelatedPosts, getPublishedPosts } from '../../lib/queries.js';

function formatDate(iso) {
  if (!iso) return '';
  return new Date(iso).toLocaleDateString('en-GB', {
    day: 'numeric', month: 'long', year: 'numeric',
  });
}

export default function BlogPostPage() {
  const { slug } = useParams();

  const { data: post, loading: postLoading } = useSupabaseQuery(
    () => getPostBySlug(slug),
    [slug]
  );

  const { data: related } = useSupabaseQuery(
    () => post ? getRelatedPosts(post.category_id, slug, 3) : Promise.resolve([]),
    [post?.id]
  );

  const { data: recent } = useSupabaseQuery(() => getPublishedPosts(4));

  if (postLoading) {
    return (
      <Container className="py-20">
        <Skeleton className="mb-4 h-12 max-w-2xl" />
        <Skeleton className="mb-8 h-6 max-w-xs" />
        <Skeleton className="h-96" />
      </Container>
    );
  }

  if (!post) {
    return (
      <Container className="py-20 text-center">
        <h1 className="font-display text-2xl font-bold text-brand-blue">Article not found</h1>
        <p className="mt-2 text-brand-ink/60">
          This article may have been removed or the link is incorrect.
        </p>
        <Link to="/blog" className="mt-6 inline-block text-sm font-semibold text-brand-teal hover:underline">
          ← Back to blog
        </Link>
      </Container>
    );
  }

  return (
    <>
      <SEO
        title={post.meta_title || post.title}
        description={post.meta_description || post.excerpt}
        image={post.featured_image_url}
      />

      {/* Article header */}
      <section className="bg-brand-mist py-16">
        <Container className="max-w-3xl">
          <FadeIn>
            {post.blog_categories?.name && (
              <Link
                to={`/blog?category=${post.blog_categories.slug}`}
                className="text-sm font-semibold uppercase tracking-wide text-brand-teal hover:underline"
              >
                {post.blog_categories.name}
              </Link>
            )}
            <h1 className="mt-3 font-display text-3xl font-bold text-brand-blue sm:text-4xl">
              {post.title}
            </h1>
            <div className="mt-4 flex items-center gap-3 text-sm text-brand-ink/50">
              <span>{post.author_name || 'Hezek Health Team'}</span>
              <span>·</span>
              <span>{formatDate(post.published_at)}</span>
            </div>
          </FadeIn>
        </Container>
      </section>

      {/* Featured image */}
      {post.featured_image_url && (
        <div className="bg-brand-mist">
          <Container className="max-w-3xl pb-0">
            <img
              src={post.featured_image_url}
              alt={post.title}
              className="w-full rounded-t-card object-cover"
              style={{ maxHeight: '420px' }}
            />
          </Container>
        </div>
      )}

      {/* Content + sidebar */}
      <section className="py-16">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[1fr_300px]">

            {/* Markdown content */}
            <article className="prose-custom max-w-none">
              <ReactMarkdown>{post.content}</ReactMarkdown>
            </article>

            {/* Sidebar */}
            <aside className="space-y-10">
              {recent?.length > 0 && (
                <div>
                  <h3 className="mb-4 font-display text-base font-bold text-brand-blue">
                    Recent Posts
                  </h3>
                  <div className="space-y-4">
                    {recent
                      .filter((r) => r.slug !== slug)
                      .slice(0, 3)
                      .map((r) => (
                        <PostCard key={r.id} post={r} compact />
                      ))}
                  </div>
                </div>
              )}

              <div className="rounded-card bg-brand-mist p-6 text-center">
                <h3 className="font-display text-base font-bold text-brand-blue">
                  Ready to get started?
                </h3>
                <p className="mt-2 text-sm text-brand-ink/70">
                  Submit your medical request and our team will match you with the right hospital.
                </p>
                <Link
                  to="/medical-request"
                  className="mt-4 inline-block rounded-full bg-brand-teal px-5 py-2.5 text-sm font-semibold text-white hover:bg-brand-teal-dark"
                >
                  Request Appointment
                </Link>
              </div>
            </aside>
          </div>

          {/* Related posts */}
          {related?.length > 0 && (
            <div className="mt-16 border-t border-brand-blue/10 pt-12">
              <h2 className="mb-8 font-display text-xl font-bold text-brand-blue">
                Related Articles
              </h2>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {related.map((r) => (
                  <FadeIn key={r.id}>
                    <PostCard post={r} />
                  </FadeIn>
                ))}
              </div>
            </div>
          )}
        </Container>
      </section>
    </>
  );
}