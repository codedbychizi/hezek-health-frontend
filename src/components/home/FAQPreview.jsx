import Container from '../common/Container.jsx';
import FadeIn from '../common/FadeIn.jsx';
import SectionHeading from '../common/SectionHeading.jsx';
import { AccordionItem } from '../common/Accordion.jsx';
import { useSupabaseQuery } from '../../hooks/useSupabaseQuery.js';
import { getActiveFaqs } from '../../lib/queries.js';

export default function FAQPreview() {
  const { data: faqs, loading } = useSupabaseQuery(getActiveFaqs);

  if (loading || !faqs?.length) return null;

  return (
    <section className="bg-brand-mist py-20">
      <Container>
        <SectionHeading
          eyebrow="Questions"
          title="Frequently asked questions"
          linkTo="/faq"
        />
        <div className="mx-auto max-w-2xl space-y-3">
          {faqs.slice(0, 5).map((faq) => (
            <FadeIn key={faq.id}>
              <AccordionItem question={faq.question} answer={faq.answer} />
            </FadeIn>
          ))}
        </div>
      </Container>
    </section>
  );
}