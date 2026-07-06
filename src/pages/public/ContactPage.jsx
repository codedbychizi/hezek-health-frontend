import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Phone, Mail, MessageCircle, Instagram, CheckCircle } from 'lucide-react';
import SEO from '../../seo/SEO.jsx';
import Container from '../../components/common/Container.jsx';
import FadeIn from '../../components/common/FadeIn.jsx';
import Button from '../../components/common/Button.jsx';
import { useSupabaseQuery } from '../../hooks/useSupabaseQuery.js';
import { getPublicSettings } from '../../lib/queries.js';
import { api } from '../../lib/api.js';

const INPUT = 'w-full rounded-xl border border-brand-blue/20 bg-white px-4 py-3 text-sm text-brand-ink placeholder:text-brand-ink/40 focus:border-brand-teal focus:outline-none transition-colors';
const LABEL = 'mb-1 block text-sm font-medium text-brand-ink';
const ERROR = 'mt-1 text-xs text-red-500';

function ContactInfo({ settings }) {
  const phone = settings?.company_phone || '+2347046502462';
  const whatsapp = settings?.company_whatsapp || '2347046502462';
  const email = settings?.company_email || 'hello@hezekhealth.com';

  const items = [
    {
      icon: Phone,
      label: 'Phone',
      value: phone,
      href: `tel:${phone}`,
    },
    {
      icon: MessageCircle,
      label: 'WhatsApp',
      value: 'Chat with us on WhatsApp',
      href: `https://wa.me/${whatsapp}`,
      external: true,
    },
    {
      icon: Mail,
      label: 'Email',
      value: email,
      href: `mailto:${email}`,
    },
    {
      icon: Instagram,
      label: 'Instagram',
      value: '@hezekhealth',
      href: 'https://instagram.com/hezekhealth',
      external: true,
    },
  ];

  return (
    <div className="space-y-4">
      {items.map(({ icon: Icon, label, value, href, external }) => (
        <a
          key={label}
          href={href}
          target={external ? '_blank' : undefined}
          rel={external ? 'noreferrer' : undefined}
          className="flex items-start gap-4 rounded-card bg-white p-5 shadow-card transition-shadow hover:shadow-card-hover"
        >
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-teal/10">
            <Icon className="h-5 w-5 text-brand-teal" strokeWidth={1.75} />
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-brand-ink/40">
              {label}
            </p>
            <p className="mt-0.5 text-sm font-medium text-brand-blue">{value}</p>
          </div>
        </a>
      ))}

      <div className="rounded-card bg-brand-mist p-5">
        <p className="text-sm text-brand-ink/70">
          Our care coordinators are available to answer your questions and guide you
          through the next steps. For urgent cases, WhatsApp is the fastest way to
          reach us.
        </p>
      </div>
    </div>
  );
}

export default function ContactPage() {
  const { data: settings } = useSupabaseQuery(getPublicSettings);
  const [sent, setSent] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);

  const { register, handleSubmit, formState: { errors } } = useForm({ mode: 'onBlur' });

  async function onSubmit(data) {
    setSubmitting(true);
    setSubmitError(null);
    try {
      await api.post('/contact', data);
      setSent(true);
    } catch (err) {
      setSubmitError(
        err.response?.data?.error ||
        'Something went wrong. Please try emailing or calling us directly.'
      );
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <>
      <SEO
        title="Contact Us"
        description="Get in touch with the Hezek Health care coordination team for a confidential case review."
      />

      <section className="bg-brand-mist py-20">
        <Container className="text-center">
          <FadeIn>
            <span className="text-sm font-semibold uppercase tracking-wide text-brand-teal">
              Get in Touch
            </span>
            <h1 className="mt-3 font-display text-4xl font-bold text-brand-blue sm:text-5xl">
              Contact Us
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-brand-ink/70">
              Speak with a HezekHealth Care Coordinator today for a confidential case
              review and personalized guidance on your treatment options.
            </p>
          </FadeIn>
        </Container>
      </section>

      <section className="py-20">
        <Container>
          <div className="grid gap-12 lg:grid-cols-2">

            {/* Contact info */}
            <FadeIn>
              <h2 className="mb-6 font-display text-xl font-bold text-brand-blue">
                Reach us directly
              </h2>
              <ContactInfo settings={settings} />
            </FadeIn>

            {/* Contact form */}
            <FadeIn delay={0.1}>
              <h2 className="mb-6 font-display text-xl font-bold text-brand-blue">
                Send us a message
              </h2>

              {sent ? (
                <div className="flex flex-col items-center rounded-card bg-white py-16 text-center shadow-card">
                  <CheckCircle className="h-12 w-12 text-brand-teal" strokeWidth={1.5} />
                  <h3 className="mt-4 font-display text-lg font-bold text-brand-blue">
                    Message sent
                  </h3>
                  <p className="mt-2 max-w-xs text-sm text-brand-ink/70">
                    Thank you for reaching out. We'll get back to you as soon as possible.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit(onSubmit)} noValidate>
                  <div className="space-y-5 rounded-card bg-white p-8 shadow-card">
                    <div className="grid gap-5 sm:grid-cols-2">
                      <div>
                        <label className={LABEL}>Full Name *</label>
                        <input
                          {...register('name', { required: 'Name is required.' })}
                          className={INPUT}
                          placeholder="Your name"
                        />
                        {errors.name && <p className={ERROR}>{errors.name.message}</p>}
                      </div>
                      <div>
                        <label className={LABEL}>Email *</label>
                        <input
                          {...register('email', {
                            required: 'Email is required.',
                            pattern: {
                              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                              message: 'Please enter a valid email.',
                            },
                          })}
                          type="email"
                          className={INPUT}
                          placeholder="you@example.com"
                        />
                        {errors.email && <p className={ERROR}>{errors.email.message}</p>}
                      </div>
                    </div>

                    <div>
                      <label className={LABEL}>Phone</label>
                      <input
                        {...register('phone')}
                        type="tel"
                        className={INPUT}
                        placeholder="+234 000 000 0000"
                      />
                    </div>

                    <div>
                      <label className={LABEL}>Subject</label>
                      <input
                        {...register('subject')}
                        className={INPUT}
                        placeholder="How can we help?"
                      />
                    </div>

                    <div>
                      <label className={LABEL}>Message *</label>
                      <textarea
                        {...register('message', { required: 'Please write a message.' })}
                        rows={5}
                        className={INPUT}
                        placeholder="Tell us what you need..."
                      />
                      {errors.message && <p className={ERROR}>{errors.message.message}</p>}
                    </div>

                    {submitError && (
                      <div className="rounded-xl bg-red-50 p-4 text-sm text-red-600">
                        {submitError}
                      </div>
                    )}

                    <Button
                      type="submit"
                      variant="primary"
                      className="w-full"
                      disabled={submitting}
                    >
                      {submitting ? 'Sending...' : 'Send Message'}
                    </Button>
                  </div>
                </form>
              )}
            </FadeIn>
          </div>
        </Container>
      </section>
    </>
  );
}