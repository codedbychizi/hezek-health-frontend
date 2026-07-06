import { useState, useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { CheckCircle, UploadCloud, X } from 'lucide-react';
import SEO from '../../seo/SEO.jsx';
import Container from '../../components/common/Container.jsx';
import FadeIn from '../../components/common/FadeIn.jsx';
import Button from '../../components/common/Button.jsx';
import { useSupabaseQuery } from '../../hooks/useSupabaseQuery.js';
import { getActiveCountries, getHospitalsByCountryId } from '../../lib/queries.js';
import { api } from '../../lib/api.js';

const INPUT = 'w-full rounded-xl border border-brand-blue/20 bg-white px-4 py-3 text-sm text-brand-ink placeholder:text-brand-ink/40 focus:border-brand-teal focus:outline-none transition-colors';
const ERROR_MSG = 'mt-1 text-xs text-red-500';
const LABEL = 'mb-1 block text-sm font-medium text-brand-ink';

function SuccessScreen({ reference }) {
  return (
    <div className="flex flex-col items-center py-24 text-center">
      <CheckCircle className="h-16 w-16 text-brand-teal" strokeWidth={1.5} />
      <h2 className="mt-6 font-display text-2xl font-bold text-brand-blue">
        Request Received
      </h2>
      <p className="mt-3 max-w-sm text-brand-ink/70">
        Thank you for reaching out. A member of our care coordination team will review
        your case and contact you shortly.
      </p>
      <div className="mt-6 rounded-xl bg-brand-mist px-6 py-4 text-center">
        <p className="text-xs text-brand-ink/50">Your reference number</p>
        <p className="mt-1 font-display text-sm font-bold text-brand-blue">{reference}</p>
      </div>
      <p className="mt-6 text-sm text-brand-ink/60">
        A confirmation email is on its way. You can also reach us directly on WhatsApp:{' '}
        <a
          href="https://wa.me/2347046502462"
          className="font-semibold text-brand-teal hover:underline"
          target="_blank"
          rel="noreferrer"
        >
          +2347046502462
        </a>
      </p>
    </div>
  );
}

function FileUploader({ files, setFiles }) {
  const [dragging, setDragging] = useState(false);
  const ALLOWED = ['application/pdf', 'image/jpeg', 'image/png', 'image/webp'];
  const MAX_SIZE = 10 * 1024 * 1024;
  const MAX_FILES = 5;

  function addFiles(incoming) {
    const valid = Array.from(incoming).filter((f) => {
      if (!ALLOWED.includes(f.type)) {
        alert(f.name + ' is not allowed. Please upload PDF, JPG, PNG, or WEBP files only.');
        return false;
      }
      if (f.size > MAX_SIZE) {
        alert(f.name + ' exceeds the 10 MB size limit.');
        return false;
      }
      return true;
    });
    setFiles((prev) => [...prev, ...valid].slice(0, MAX_FILES));
  }

  const onDrop = useCallback((e) => {
    e.preventDefault();
    setDragging(false);
    addFiles(e.dataTransfer.files);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <p className={LABEL}>Medical Reports (optional — PDF or image, max 5 files, 10 MB each)</p>
      <div
        onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
        onDragLeave={() => setDragging(false)}
        onDrop={onDrop}
        className={'flex flex-col items-center justify-center rounded-xl border-2 border-dashed p-8 transition-colors ' + (dragging ? 'border-brand-teal bg-brand-teal/5' : 'border-brand-blue/20 hover:border-brand-teal/50')}
      >
        <UploadCloud className="h-8 w-8 text-brand-blue/40" strokeWidth={1.5} />
        <p className="mt-2 text-sm text-brand-ink/60">
          Drag and drop files here, or{' '}
          <label className="cursor-pointer font-semibold text-brand-blue hover:underline">
            browse
            <input
              type="file"
              multiple
              accept=".pdf,.jpg,.jpeg,.png,.webp"
              className="sr-only"
              onChange={(e) => addFiles(e.target.files)}
            />
          </label>
        </p>
      </div>
      {files.length > 0 && (
        <ul className="mt-3 space-y-2">
          {files.map((file, i) => (
            <li key={i} className="flex items-center justify-between rounded-lg bg-brand-mist px-4 py-2 text-sm">
              <span className="truncate text-brand-ink/80">{file.name}</span>
              <button
                type="button"
                onClick={() => setFiles((prev) => prev.filter((_, idx) => idx !== i))}
                className="ml-4 shrink-0 text-brand-ink/40 hover:text-red-500"
                aria-label={'Remove ' + file.name}
              >
                <X className="h-4 w-4" />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default function MedicalRequestPage() {
  const [files, setFiles] = useState([]);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  const [successRef, setSuccessRef] = useState(null);

  const { data: countries } = useSupabaseQuery(getActiveCountries);

  const { register, handleSubmit, watch, formState: { errors } } = useForm({ mode: 'onBlur' });

  const selectedCountryId = watch('country_id');

  const { data: hospitals } = useSupabaseQuery(
    () => selectedCountryId ? getHospitalsByCountryId(selectedCountryId) : Promise.resolve([]),
    [selectedCountryId]
  );

  async function onSubmit(data) {
    setSubmitting(true);
    setSubmitError(null);
    try {
      const formData = new FormData();
      Object.entries(data).forEach(([key, val]) => { if (val) formData.append(key, val); });
      files.forEach((file) => formData.append('files', file));

      const response = await api.post('/medical-requests', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setSuccessRef(response.data.reference);
    } catch (err) {
      setSubmitError(
        err.response?.data?.error || 'Something went wrong. Please try again or contact us directly.'
      );
    } finally {
      setSubmitting(false);
    }
  }

  if (successRef) {
    return (
      <>
        <SEO title="Request Received" />
        <Container><SuccessScreen reference={successRef} /></Container>
      </>
    );
  }

  return (
    <>
      <SEO
        title="Medical Request"
        description="Submit your medical request to Hezek Health and our team will match you with the right hospital abroad."
      />

      <section className="bg-brand-mist py-20">
        <Container className="text-center">
          <FadeIn>
            <span className="text-sm font-semibold uppercase tracking-wide text-brand-teal">
              Get Started
            </span>
            <h1 className="mt-3 font-display text-4xl font-bold text-brand-blue sm:text-5xl">
              Medical Request Form
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-brand-ink/70">
              Fill in your details and our care coordination team will review your case,
              match you with the right hospital, and contact you with a treatment proposal.
            </p>
          </FadeIn>
        </Container>
      </section>

      <section className="py-16">
        <Container>
          <FadeIn className="mx-auto max-w-2xl">
            <form onSubmit={handleSubmit(onSubmit)} noValidate>
              <div className="space-y-6 rounded-card bg-white p-8 shadow-card">

                <div>
                  <label className={LABEL}>Full Name *</label>
                  <input
                    {...register('full_name', { required: 'Full name is required.' })}
                    className={INPUT}
                    placeholder="e.g. Amaka Johnson"
                  />
                  {errors.full_name && <p className={ERROR_MSG}>{errors.full_name.message}</p>}
                </div>

                <div className="grid gap-6 sm:grid-cols-2">
                  <div>
                    <label className={LABEL}>Email Address *</label>
                    <input
                      {...register('email', {
                        required: 'Email is required.',
                        pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Please enter a valid email address.' },
                      })}
                      type="email"
                      className={INPUT}
                      placeholder="you@example.com"
                    />
                    {errors.email && <p className={ERROR_MSG}>{errors.email.message}</p>}
                  </div>
                  <div>
                    <label className={LABEL}>Phone Number *</label>
                    <input
                      {...register('phone', { required: 'Phone number is required.' })}
                      type="tel"
                      className={INPUT}
                      placeholder="+234 000 000 0000"
                    />
                    {errors.phone && <p className={ERROR_MSG}>{errors.phone.message}</p>}
                  </div>
                </div>

                <div className="grid gap-6 sm:grid-cols-2">
                  <div>
                    <label className={LABEL}>Preferred Country</label>
                    <select {...register('country_id')} className={INPUT}>
                      <option value="">Select a country</option>
                      {countries?.map((c) => (
                        <option key={c.id} value={c.id}>{c.name}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className={LABEL}>Preferred Hospital</label>
                    <select {...register('hospital_id')} className={INPUT} disabled={!hospitals?.length}>
                      <option value="">
                        {selectedCountryId && !hospitals?.length ? 'No hospitals listed yet' : 'Select a hospital (optional)'}
                      </option>
                      {hospitals?.map((h) => (
                        <option key={h.id} value={h.id}>{h.name}</option>
                      ))}
                    </select>
                    {selectedCountryId && !hospitals?.length && (
                      <p className="mt-1 text-xs text-brand-ink/50">Our team will match you with a hospital in this country.</p>
                    )}
                  </div>
                </div>

                <div>
                  <label className={LABEL}>Medical Condition / Reason for Request *</label>
                  <textarea
                    {...register('medical_condition', {
                      required: 'Please describe your medical condition.',
                      minLength: { value: 10, message: 'Please provide a little more detail (at least 10 characters).' },
                    })}
                    rows={4}
                    className={INPUT}
                    placeholder="Briefly describe your diagnosis, symptoms, or the treatment you are seeking..."
                  />
                  {errors.medical_condition && <p className={ERROR_MSG}>{errors.medical_condition.message}</p>}
                </div>

                <div>
                  <label className={LABEL}>Additional Notes</label>
                  <textarea
                    {...register('additional_notes')}
                    rows={3}
                    className={INPUT}
                    placeholder="Anything else you'd like us to know — previous treatments, budget range, travel constraints..."
                  />
                </div>

                <FileUploader files={files} setFiles={setFiles} />

                <div className="flex items-start gap-3">
                  <input
                    {...register('consent_given', { required: 'You must agree before submitting.' })}
                    type="checkbox"
                    id="consent"
                    className="mt-1 h-4 w-4 accent-brand-teal"
                  />
                  <label htmlFor="consent" className="text-sm text-brand-ink/70">
                    I consent to Hezek Health collecting, processing, and sharing my personal
                    and medical information with partner hospitals abroad for the purpose of
                    case review and treatment coordination, as described in the{' '}
                    <a href="/privacy-policy" target="_blank" className="text-brand-blue underline">
                      Privacy Policy
                    </a>. *
                  </label>
                </div>
                {errors.consent_given && <p className={ERROR_MSG}>{errors.consent_given.message}</p>}

                {submitError && (
                  <div className="rounded-xl bg-red-50 p-4 text-sm text-red-600">{submitError}</div>
                )}

                <Button type="submit" variant="accent" className="w-full" disabled={submitting}>
                  {submitting ? 'Submitting...' : 'Submit Medical Request'}
                </Button>

                <p className="text-center text-xs text-brand-ink/50">
                  Your information is kept confidential and used only to coordinate your treatment.
                </p>
              </div>
            </form>
          </FadeIn>
        </Container>
      </section>
    </>
  );
}