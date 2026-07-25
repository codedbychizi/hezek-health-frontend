import SEO from '../../seo/SEO.jsx';
import Hero from '../../components/home/Hero.jsx';
import WhyChooseUs from '../../components/home/WhyChooseUs.jsx';
import HowItWorksFull from '../../components/home/HowItWorksFull.jsx';
import CountriesPreview from '../../components/home/CountriesPreview.jsx';
import HospitalsPreview from '../../components/home/HospitalsPreview.jsx';
import ServicesPreview from '../../components/home/ServicesPreview.jsx';
import AdvancedTreatments from '../../components/home/AdvancedTreatments.jsx';
import SpecialtiesSection from '../../components/home/SpecialtiesSection.jsx';
import TestimonialsPreview from '../../components/home/TestimonialsPreview.jsx';
import BlogPreview from '../../components/home/BlogPreview.jsx';
import FAQPreview from '../../components/home/FAQPreview.jsx';
import ContactCTA from '../../components/common/ContactCTA.jsx';

export default function HomePage() {
  return (
    <>
      <SEO
        title="Home"
        description="HezekHealth connects Nigerian patients with trusted hospitals abroad — personalised healthcare and treatment coordination from case review to recovery."
      />
      <Hero />
      <WhyChooseUs />
      <HowItWorksFull />
      <CountriesPreview />
      <HospitalsPreview />
      <ServicesPreview />
      <AdvancedTreatments />
      <SpecialtiesSection />
      <TestimonialsPreview />
      <BlogPreview />
      <FAQPreview />
      <ContactCTA />
    </>
  );
}