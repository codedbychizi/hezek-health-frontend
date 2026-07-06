import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search } from 'lucide-react';
import SEO from '../../seo/SEO.jsx';
import Container from '../../components/common/Container.jsx';
import FadeIn from '../../components/common/FadeIn.jsx';
import Skeleton from '../../components/common/Skeleton.jsx';
import EmptyState from '../../components/common/EmptyState.jsx';
import PostCard from '../../components/blog/PostCard.jsx';
import { useSupabaseQuery } from '../../hooks/useSupabaseQuery.js';
import { getPaginatedPosts, getBlogCategories } from '../../lib/queries.js';

const PAGE_SIZE = 6;

export default function BlogListPage() {
  // useSearchParams reads and writes the URL query string — ?page=2&category=xyz
  // This means back/forward and shareable URLs work for free.
  const [searchParams, setSearchParams] = useSearchParams();
  const page = parseInt(searchParams.get('page') || '1', 10);
  const categoryId = searchParams.get('category') || null;

  // Search is local state — we don't want the URL updating on every keystroke,
  // only when the user submits.
  const [searchInput, setSearchInput] = useState(searchParams.get('search') || '');
  const [activeSearch, setActiveSearch] = useState(searchParams.get('search') || '');

  const { data: categories } = useSupabaseQuery(getBlogCategories);

  const { data, loading } = useSupabaseQuery(
    () => getPaginatedPosts({ page, pageSize: PAGE_SIZE, categoryId, search: activeSearch }),
    [page, categoryId, activeSearch]
  );

  const posts = data?.posts || [];
  const total = data?.total || 0;
  const totalPages = Math.ceil(total / PAGE_SIZE);

  function setPage(p) {
    setSearchParams((prev) => { prev.set('page', p); return prev; });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function setCategory(id) {
    setSearchParams((prev) => {
      if (id) prev.set('category', id); else prev.delete('category');
      prev.set('page', '1');
      return prev;
    });
  }

  function handleSearch(e) {
    e.preventDefault();
    setActiveSearch(searchInput);
    setSearchParams((prev) => {
      if (searchInput.trim()) prev.set('search', searchInput.trim()); else prev.delete('search');
      prev.set('page', '1');
      return prev;
    });
  }

  return (
    <>
      <SEO
        title="Blog"
        description="Articles and insights from the Hezek Health team on medical tourism, health, and treatment abroad."
      />

      <section className="bg-brand-mist py-20">
        <Container className="text-center">
          <FadeIn>
            <span className="text-sm font-semibold uppercase tracking-wide text-brand-teal">
              Insights
            </span>
            <h1 className="mt-3 font-display text-4xl font-bold text-brand-blue sm:text-5xl">
              Our Blog
            </h1>
          </FadeIn>
        </Container>
      </section>

      <section className="py-12">
        <Container>
          {/* Search */}
          <form onSubmit={handleSearch} className="mb-8 flex gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-brand-ink/30" />
              <input
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                placeholder="Search articles..."
                className="w-full rounded-full border border-brand-blue/20 bg-white py-3 pl-11 pr-4 text-sm focus:border-brand-teal focus:outline-none"
              />
            </div>
            <button
              type="submit"
              className="rounded-full bg-brand-blue px-6 py-3 text-sm font-semibold text-white hover:bg-brand-blue-dark"
            >
              Search
            </button>
          </form>

          {/* Category pills */}
          {categories?.length > 0 && (
            <div className="mb-8 flex flex-wrap gap-2">
              <button
                onClick={() => setCategory(null)}
                className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
                  !categoryId
                    ? 'bg-brand-blue text-white'
                    : 'bg-brand-mist text-brand-ink/70 hover:bg-brand-blue/10'
                }`}
              >
                All
              </button>
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setCategory(cat.id)}
                  className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
                    categoryId === cat.id
                      ? 'bg-brand-blue text-white'
                      : 'bg-brand-mist text-brand-ink/70 hover:bg-brand-blue/10'
                  }`}
                >
                  {cat.name}
                </button>
              ))}
            </div>
          )}

          {/* Posts grid */}
          {loading ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {Array.from({ length: 6 }).map((_, i) => (
                <Skeleton key={i} className="h-64" />
              ))}
            </div>
          ) : posts.length ? (
            <>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {posts.map((post) => (
                  <FadeIn key={post.id}>
                    <PostCard post={post} />
                  </FadeIn>
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="mt-12 flex items-center justify-center gap-3">
                  <button
                    onClick={() => setPage(page - 1)}
                    disabled={page <= 1}
                    className="rounded-full border border-brand-blue/20 px-5 py-2 text-sm font-medium text-brand-blue disabled:opacity-40 hover:bg-brand-mist"
                  >
                    ← Previous
                  </button>
                  <span className="text-sm text-brand-ink/60">
                    Page {page} of {totalPages}
                  </span>
                  <button
                    onClick={() => setPage(page + 1)}
                    disabled={page >= totalPages}
                    className="rounded-full border border-brand-blue/20 px-5 py-2 text-sm font-medium text-brand-blue disabled:opacity-40 hover:bg-brand-mist"
                  >
                    Next →
                  </button>
                </div>
              )}
            </>
          ) : (
            <EmptyState
              title="No articles yet"
              description="Check back soon — we're working on our first posts."
            />
          )}
        </Container>
      </section>
    </>
  );
}