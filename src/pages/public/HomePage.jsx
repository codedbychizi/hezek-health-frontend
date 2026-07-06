import SEO from '../../seo/SEO.jsx';
import Hero from '../../components/home/Hero.jsx';
import WhyChooseUs from '../../components/home/WhyChooseUs.jsx';
import ProcessStepsPreview from '../../components/home/ProcessStepsPreview.jsx';
import CountriesPreview from '../../components/home/CountriesPreview.jsx';
import HospitalsPreview from '../../components/home/HospitalsPreview.jsx';
import ServicesPreview from '../../components/home/ServicesPreview.jsx';
import TestimonialsPreview from '../../components/home/TestimonialsPreview.jsx';
import BlogPreview from '../../components/home/BlogPreview.jsx';
import FAQPreview from '../../components/home/FAQPreview.jsx';
import ContactCTA from '../../components/common/ContactCTA.jsx';

export default function HomePage() {
  return (
    <>
      <SEO
        title="Home"
        description="Hezek Health connects Nigerian patients with trusted hospitals abroad, from case review to recovery."
      />
      <Hero />
      <WhyChooseUs />
      <ProcessStepsPreview />
      <CountriesPreview />
      <HospitalsPreview />
      <ServicesPreview />
      <TestimonialsPreview />
      <BlogPreview />
      <FAQPreview />
      <ContactCTA />
    </>
  );
}