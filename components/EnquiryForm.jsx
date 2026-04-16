"use client";
import { Loader2, Send } from 'lucide-react';
import { useState } from 'react';
import { submitEnquiry } from '../lib/api';

const initialValues = {
  name: '',
  phone: '',
  email: '',
  targetExam: '',
  preferredBatch: '',
  message: ''
};

export default function EnquiryForm({
  source,
  submitLabel = 'Submit Enquiry',
  showEmail = true,
  showTargetExam = true,
  showBatch = false,
  showMessage = false,
  layout = 'stacked',
  onSuccess
}) {
  const [values, setValues] = useState(initialValues);
  const [status, setStatus] = useState({ type: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues((previous) => ({ ...previous, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    setStatus({ type: '', message: '' });

    try {
      await submitEnquiry({
        source,
        ...values
      });

      setStatus({
        type: 'success',
        message: 'Your enquiry has been sent successfully. Our team will contact you soon.'
      });
      setValues(initialValues);
      onSuccess?.();
    } catch (error) {
      setStatus({
        type: 'error',
        message: error.message || 'Unable to send your enquiry right now.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const gridClass = layout === 'grid' ? 'grid gap-4 sm:grid-cols-2' : 'space-y-4';

  return (
    <form className={gridClass} onSubmit={handleSubmit}>
      <input
        className={`input-shell ${layout === 'grid' ? 'sm:col-span-1' : ''}`}
        name="name"
        value={values.name}
        onChange={handleChange}
        placeholder="Full name"
        required
      />
      <input
        className={`input-shell ${layout === 'grid' ? 'sm:col-span-1' : ''}`}
        name="phone"
        value={values.phone}
        onChange={handleChange}
        placeholder="Phone number"
        required
      />

      {showEmail ? (
        <input
          className={`input-shell ${layout === 'grid' ? 'sm:col-span-2' : ''}`}
          name="email"
          type="email"
          value={values.email}
          onChange={handleChange}
          placeholder="Email address"
        />
      ) : null}

      {showTargetExam ? (
        <select
          className={`input-shell ${layout === 'grid' ? 'sm:col-span-1' : ''} text-slate-500`}
          name="targetExam"
          value={values.targetExam}
          onChange={handleChange}
        >
          <option value="">Target exam</option>
          <option value="PTE">PTE</option>
          <option value="IELTS">IELTS</option>
          <option value="NAATI">NAATI</option>
          <option value="LanguageCert">LanguageCert</option>
        </select>
      ) : null}

      {showBatch ? (
        <select
          className={`input-shell ${layout === 'grid' ? 'sm:col-span-1' : ''} text-slate-500`}
          name="preferredBatch"
          value={values.preferredBatch}
          onChange={handleChange}
        >
          <option value="">Preferred batch</option>
          <option value="Morning">Morning</option>
          <option value="Evening">Evening</option>
          <option value="Weekend">Weekend</option>
          <option value="1-on-1">1-on-1</option>
        </select>
      ) : null}

      {showMessage ? (
        <textarea
          className={`input-shell min-h-36 ${layout === 'grid' ? 'sm:col-span-2' : ''}`}
          name="message"
          value={values.message}
          onChange={handleChange}
          placeholder="Tell us about your target score or timeline"
        />
      ) : null}

      <button
        className={`cta-primary rounded-2xl ${layout === 'grid' ? 'sm:col-span-2' : 'w-full'}`}
        disabled={isSubmitting}
        type="submit"
      >
        {isSubmitting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Send className="mr-2 h-4 w-4" />}
        {submitLabel}
      </button>

      {status.message ? (
        <p
          className={`text-sm ${layout === 'grid' ? 'sm:col-span-2' : ''} ${
            status.type === 'success' ? 'text-emerald-600' : 'text-rose-500'
          }`}
        >
          {status.message}
        </p>
      ) : null}
    </form>
  );
}
