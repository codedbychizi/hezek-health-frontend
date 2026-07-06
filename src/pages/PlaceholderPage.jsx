/**
 * Stand-in for pages that exist in the route map but get their real content
 * in a later phase (per the roadmap). Keeping every route live from Phase 1
 * means navigation, links, and the nav bar can all be tested end-to-end
 * before the content is built.
 */
export default function PlaceholderPage({ title }) {
  return (
    <div className="mx-auto flex min-h-[50vh] max-w-3xl flex-col items-center justify-center px-6 py-24 text-center">
      <span className="mb-3 text-sm font-semibold uppercase tracking-wide text-brand-teal">
        Coming soon
      </span>
      <h1 className="font-display text-3xl font-bold text-brand-blue sm:text-4xl">
        {title}
      </h1>
      <p className="mt-4 text-brand-ink/70">
        This page is being built. Check back soon, or get in touch if you have a question.
      </p>
    </div>
  );
}
