import SEO from '../../seo/SEO.jsx';
import Container from '../../components/common/Container.jsx';
import FadeIn from '../../components/common/FadeIn.jsx';
import Skeleton from '../../components/common/Skeleton.jsx';
import { AccordionItem } from '../../components/common/Accordion.jsx';
import ContactCTA from '../../components/common/ContactCTA.jsx';
import { useSupabaseQuery } from '../../hooks/useSupabaseQuery.js';
import { getActiveFaqs } from '../../lib/queries.js';

export default function FAQPage() {
  const { data: faqs, loading } = useSupabaseQuery(getActiveFaqs);

  return (
    <>
      <SEO
        title="FAQ"
        description="Answers to common questions about Hezek Health's medical tourism process."
      />

      <section className="bg-brand-mist py-20">
        <Container className="text-center">
          <FadeIn>
            <span className="text-sm font-semibold uppercase tracking-wide text-brand-teal">
              Questions
            </span>
            <h1 className="mt-3 font-display text-4xl font-bold text-brand-blue sm:text-5xl">
              Frequently Asked Questions
            </h1>
          </FadeIn>
        </Container>
      </section>

      <section className="py-20">
        <Container>
          <div className="mx-auto max-w-2xl space-y-3">
            {loading
              ? Array.from({ length: 6 }).map((_, i) => <Skeleton key={i} className="h-16" />)
              : faqs?.map((faq) => (
                  <FadeIn key={faq.id}>
                    <AccordionItem question={faq.question} answer={faq.answer} />
                  </FadeIn>
                ))}
          </div>
        </Container>
      </section>

      <ContactCTA />
    </>
  );
}