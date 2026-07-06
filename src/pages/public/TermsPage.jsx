import SEO from '../../seo/SEO.jsx';
import LegalPageLayout from '../../components/common/LegalPageLayout.jsx';
import { useSupabaseQuery } from '../../hooks/useSupabaseQuery.js';
import { getPublicSettings } from '../../lib/queries.js';

// TODO: update once these terms have been reviewed by a lawyer and a real
// launch date is set.
const LAST_UPDATED = 'June 2026';

export default function TermsPage() {
  const { data: settings } = useSupabaseQuery(getPublicSettings);
  const email = settings?.company_email || 'hello@hezekhealth.com';
  const phone = settings?.company_phone || '+2347046502462';

  return (
    <>
      <SEO
        title="Terms & Conditions"
        description="The terms governing your use of the Hezek Health website and services."
      />

      <LegalPageLayout title="Terms & Conditions" lastUpdated={LAST_UPDATED}>
        <p>
          Please read these Terms and Conditions ("Terms") carefully before using the Hezek
          Health website or submitting a medical request. By using our website, you agree
          to be bound by these Terms.
        </p>

        <h2>1. About Our Service</h2>
        <p>
          Hezek Health is a medical tourism facilitation company. We help patients in
          Nigeria connect with hospitals and specialists abroad. We review medical
          requests, identify suitable hospitals, and assist with case coordination,
          treatment planning, and travel logistics.
        </p>

        <h2>2. We Are Not a Healthcare Provider</h2>
        <p>
          Hezek Health does not provide medical advice, diagnosis, or treatment. We are not
          a hospital, clinic, or medical practice. All medical advice, diagnosis, and
          treatment are provided directly by the independent hospitals and specialists you
          are referred to. Any information on this website is for general informational
          purposes only and is not a substitute for professional medical advice.
        </p>

        <h2>3. No Guarantee of Outcomes</h2>
        <p>
          While we make every effort to connect you with reputable hospitals and qualified
          specialists, we cannot and do not guarantee any specific medical outcome,
          treatment result, or visa approval. Decisions regarding diagnosis, treatment, and
          care remain solely those of the treating hospital and its medical staff.
        </p>

        <h2>4. Your Responsibilities</h2>
        <p>When using our service, you agree to:</p>
        <ul>
          <li>Provide accurate and complete information in your medical request</li>
          <li>
            Provide consent for us to process and share your information as described in
            our Privacy Policy
          </li>
          <li>Communicate promptly with our team regarding your case</li>
        </ul>

        <h2>5. Third-Party Hospitals and Providers</h2>
        <p>
          Hospitals, specialists, and other third-party providers we refer you to are
          independent of Hezek Health. We are not liable for the actions, treatment
          decisions, fees, or quality of care provided by any third-party hospital or
          specialist.
        </p>

        <h2>6. Visa and Travel</h2>
        <p>
          We may assist with guidance on documentation for medical visas and travel
          arrangements. However, final approval of any visa application is solely at the
          discretion of the relevant embassy or immigration authority, and we are not
          responsible for visa denials or travel disruptions.
        </p>

        <h2>7. Intellectual Property</h2>
        <p>
          All content on this website, including text, graphics, and logos, is the property
          of Hezek Health unless otherwise stated, and may not be copied or used without our
          permission.
        </p>

        <h2>8. Limitation of Liability</h2>
        <p>
          To the fullest extent permitted by law, Hezek Health shall not be liable for any
          indirect, incidental, or consequential damages arising from your use of our
          website or services, including but not limited to outcomes of medical treatment
          provided by third parties.
        </p>

        <h2>9. Governing Law</h2>
        <p>These Terms are governed by the laws of the Federal Republic of Nigeria.</p>

        <h2>10. Changes to These Terms</h2>
        <p>
          We may update these Terms from time to time. Continued use of our website after
          changes are posted constitutes acceptance of the updated Terms.
        </p>

        <h2>11. Contact Us</h2>
        <p>
          If you have questions about these Terms, please contact us at {email} or {phone}.
        </p>
      </LegalPageLayout>
    </>
  );
}