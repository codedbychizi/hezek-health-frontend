import SEO from '../../seo/SEO.jsx';
import LegalPageLayout from '../../components/common/LegalPageLayout.jsx';
import { useSupabaseQuery } from '../../hooks/useSupabaseQuery.js';
import { getPublicSettings } from '../../lib/queries.js';

// TODO: update once this policy has been reviewed by a lawyer familiar
// with Nigerian data protection law and a real launch date is set.
const LAST_UPDATED = 'June 2026';

export default function PrivacyPolicyPage() {
  const { data: settings } = useSupabaseQuery(getPublicSettings);
  const email = settings?.company_email || 'hello@hezekhealth.com';
  const phone = settings?.company_phone || '+2347046502462';

  return (
    <>
      <SEO
        title="Privacy Policy"
        description="How Hezek Health collects, uses, and protects your personal and health information."
      />

      <LegalPageLayout title="Privacy Policy" lastUpdated={LAST_UPDATED}>
        <p>
          Hezek Health ("we," "us," or "our") respects your privacy and is committed to
          protecting the personal information you share with us. This Privacy Policy
          explains what information we collect, how we use it, and the choices you have.
        </p>

        <h2>1. Information We Collect</h2>
        <ul>
          <li>
            Personal details you provide directly, such as your name, email address, and
            phone number.
          </li>
          <li>
            Health-related information you choose to share as part of a medical request,
            including your medical condition, treatment history, and any medical reports,
            scans, or laboratory results you upload.
          </li>
          <li>
            Basic technical information about how you use our website, such as browser
            type and pages visited.
          </li>
        </ul>

        <h2>2. How We Use Your Information</h2>
        <p>We use the information you provide to:</p>
        <ul>
          <li>Review your medical request and identify suitable hospitals and specialists</li>
          <li>
            Contact you regarding your request, including acknowledgements, updates, and
            treatment proposals
          </li>
          <li>Coordinate with hospitals and specialists on your behalf</li>
          <li>Improve our website and services</li>
          <li>Send newsletter updates, if you choose to subscribe</li>
        </ul>

        <h2>3. How We Share Your Information</h2>
        <p>
          To facilitate your treatment, we may share relevant parts of your medical
          request — including your medical reports — with hospitals and specialists in our
          partner countries. We only share what is necessary for them to assess and provide
          your care. We do not sell your personal information to third parties.
        </p>

        <h2>4. International Transfer of Information</h2>
        <p>
          Because Hezek Health facilitates treatment abroad, your information may be
          transferred to and processed in countries outside Nigeria, including India and
          Turkey, where data protection laws may differ from those in Nigeria. We take
          reasonable steps to share information only with reputable hospitals and only for
          the purpose of coordinating your treatment.
        </p>

        <h2>5. Data Storage and Security</h2>
        <p>
          Your information is stored using Supabase, a secure cloud database and storage
          provider. We apply access controls so that medical requests, uploaded files, and
          contact details are only accessible to authorized members of our team.
        </p>

        <h2>6. Data Retention</h2>
        <p>
          We retain your information for as long as necessary to provide our services and
          meet legal or administrative requirements. You may request that we delete your
          information at any time, subject to any legal obligations to retain certain
          records.
        </p>

        <h2>7. Your Rights</h2>
        <p>You have the right to:</p>
        <ul>
          <li>Request access to the personal information we hold about you</li>
          <li>Request correction of inaccurate information</li>
          <li>Request deletion of your information, subject to legal limitations</li>
          <li>Withdraw consent for us to process your information at any time</li>
        </ul>
        <p>To exercise any of these rights, please contact us using the details below.</p>

        <h2>8. Cookies</h2>
        <p>
          Our website may use basic cookies to support core functionality and understand
          how visitors use our site. We do not use cookies for third-party advertising.
        </p>

        <h2>9. Changes to This Policy</h2>
        <p>
          We may update this Privacy Policy from time to time. Any changes will be posted
          on this page with an updated revision date.
        </p>

        <h2>10. Contact Us</h2>
        <p>
          If you have questions about this Privacy Policy or how your information is
          handled, please contact us at {email} or {phone}.
        </p>
      </LegalPageLayout>
    </>
  );
}