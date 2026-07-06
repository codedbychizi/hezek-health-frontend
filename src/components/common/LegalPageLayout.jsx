import Container from './Container.jsx';
import FadeIn from './FadeIn.jsx';

export default function LegalPageLayout({ title, lastUpdated, children }) {
  return (
    <>
      <section className="bg-brand-mist py-16">
        <Container className="text-center">
          <FadeIn>
            <h1 className="font-display text-3xl font-bold text-brand-blue sm:text-4xl">
              {title}
            </h1>
            <p className="mt-2 text-sm text-brand-ink/50">Last updated: {lastUpdated}</p>
          </FadeIn>
        </Container>
      </section>
      <section className="py-16">
        <Container className="mx-auto max-w-3xl">
          <FadeIn className="legal-content">{children}</FadeIn>
        </Container>
      </section>
    </>
  );
}