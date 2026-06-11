import { useState } from 'react';
import { MapPin, Mail, ArrowUpRight } from 'lucide-react';
import RevealOnScroll from '../hooks/useRevealOnScroll';
import '../styles/contact.css';

const GOOGLE_FORM_ACTION =
  'https://docs.google.com/forms/d/e/1FAIpQLSfKQA0po6QKdEuTaQeVOd9sB_9C2H4kvN0pqwTYj84W1HeWDw/formResponse';

const GOOGLE_FORM_ENTRIES = {
  name: 'entry.234946105',
  email: 'entry.1270238969',
  phone: 'entry.198258421',
  message: 'entry.1779320035',
};

const FORM_FIELDS = ['name', 'company', 'email', 'phone', 'message'];

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const validateField = (field, value) => {
  const trimmed = value.trim();

  switch (field) {
    case 'name':
      if (!trimmed) return 'Please enter your full name.';
      if (trimmed.length < 2) return 'Name must be at least 2 characters.';
      return '';
    case 'company':
      if (trimmed && trimmed.length < 2) return 'Company name must be at least 2 characters.';
      return '';
    case 'email':
      if (!trimmed) return 'Please enter your email address.';
      if (!EMAIL_PATTERN.test(trimmed)) return 'Please enter a valid email address.';
      return '';
    case 'phone': {
      if (!trimmed) return 'Please enter your phone number.';
      const digits = trimmed.replace(/\D/g, '');
      if (digits.length < 10) return 'Enter a valid phone number (at least 10 digits).';
      if (digits.length > 15) return 'Phone number is too long.';
      return '';
    }
    case 'message':
      if (!trimmed) return 'Please describe your project.';
      if (trimmed.length < 10) return 'Please provide at least 10 characters.';
      return '';
    default:
      return '';
  }
};

const emptyErrors = () =>
  Object.fromEntries(FORM_FIELDS.map((field) => [field, '']));

const emptyTouched = () =>
  Object.fromEntries(FORM_FIELDS.map((field) => [field, false]));

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    message: '',
  });

  const [errors, setErrors] = useState(emptyErrors);
  const [touched, setTouched] = useState(emptyTouched);

  const [status, setStatus] = useState({
    type: '',
    message: '',
    visible: false,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const fieldClass = (field) =>
    touched[field] && errors[field] ? 'form-control is-invalid' : 'form-control';

  const showAlert = (type, message) => {
    setStatus({ type, message, visible: true });

    window.setTimeout(() => {
      setStatus((prev) => ({ ...prev, visible: false }));
    }, 4000);
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;

    setFormData((prev) => ({ ...prev, [id]: value }));

    if (touched[id]) {
      setErrors((prev) => ({ ...prev, [id]: validateField(id, value) }));
    }
  };

  const handleBlur = (e) => {
    const { id, value } = e.target;

    setTouched((prev) => ({ ...prev, [id]: true }));
    setErrors((prev) => ({ ...prev, [id]: validateField(id, value) }));
  };

  const validateForm = () => {
    const nextErrors = Object.fromEntries(
      FORM_FIELDS.map((field) => [field, validateField(field, formData[field])])
    );

    setErrors(nextErrors);
    setTouched(Object.fromEntries(FORM_FIELDS.map((field) => [field, true])));

    return !Object.values(nextErrors).some(Boolean);
  };

  const submitToGoogleForm = async ({ name, email, company, phone, message }) => {
    const body = new URLSearchParams();

    body.append(GOOGLE_FORM_ENTRIES.name, name.trim());
    body.append(GOOGLE_FORM_ENTRIES.email, email.trim());
    body.append(GOOGLE_FORM_ENTRIES.phone, phone.trim());

    const messageBody = company.trim()
      ? `Company: ${company.trim()}\n\n${message.trim()}`
      : message.trim();

    body.append(GOOGLE_FORM_ENTRIES.message, messageBody);

    await fetch(GOOGLE_FORM_ACTION, {
      method: 'POST',
      mode: 'no-cors',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: body.toString(),
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      showAlert('error', 'Please fix the highlighted fields before submitting.');
      return;
    }

    const { name, email, company, phone, message } = formData;

    setIsSubmitting(true);

    try {
      await submitToGoogleForm({ name, email, company, phone, message });
      showAlert('success', 'Your message has been sent successfully!');

      setFormData({
        name: '',
        company: '',
        email: '',
        phone: '',
        message: '',
      });

      setErrors(emptyErrors());
      setTouched(emptyTouched());
    } catch (error) {
      console.error('Google Form submit error:', error);
      showAlert('error', 'Failed to send message. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="contact-section section-padding">
      <div className="container">
        {/* Form status notification overlay */}
        {status.visible && (
          <div className={`alert-banner ${status.type}`}>
            <span>{status.message}</span>
          </div>
        )}

        <div className="contact-grid">
          {/* Left Column: Info */}
          <RevealOnScroll className="contact-info-column" delay={100}>
            <span className="section-label">Talk to us</span>

            <h2 className="section-title-h2 gold-gradient-text">
              Ready to crystallize your next landmark?
            </h2>

            <p className="lead-text contact-lead">
              Send a note and we&apos;ll reply within one business day with a tailored project pathway.
            </p>

            <div className="contact-details-list">
              <div className="contact-detail-item">
                <div className="detail-icon-box">
                  <MapPin size={20} />
                </div>

                <div>
                  <h4>Location</h4>
                  <p>Wayanad, Kerala, India</p>
                </div>
              </div>

              <div className="contact-detail-item">
                <div className="detail-icon-box">
                  <Mail size={20} />
                </div>

                <div>
                  <h4>General Inquiries</h4>
                  <a href="mailto:info@crystallinebuilders.com">
                    info@crestlineconstruction.com
                  </a>
                </div>
              </div>
            </div>
          </RevealOnScroll>

          {/* Right Column: Glassmorphic Form Card */}
          <RevealOnScroll className="contact-form-column" delay={220}>
            <div className="contact-form-card glass-panel">
              <form onSubmit={handleSubmit} className="contact-form">
                <div className="form-row-two">
                  <div className="form-group">
                    <label htmlFor="name">Full Name</label>
                    <input
                      type="text" 
                      id="name"
                      className={fieldClass('name')}
                      placeholder="Enter Name"
                      value={formData.name}
                      onChange={handleInputChange}
                      onBlur={handleBlur}
                      aria-invalid={touched.name && !!errors.name}
                      aria-describedby={errors.name ? 'name-error' : undefined}
                    />

                    {touched.name && errors.name && (
                      <p id="name-error" className="field-error" role="alert">
                        {errors.name}
                      </p>
                    )}
                  </div>

                  <div className="form-group">
                    <label htmlFor="company">Company (optional)</label>
                    <input
                      type="text"
                      id="company"
                      className={fieldClass('company')}
                      placeholder="Your firm"
                      value={formData.company}
                      onChange={handleInputChange}
                      onBlur={handleBlur}
                      aria-invalid={touched.company && !!errors.company}
                      aria-describedby={errors.company ? 'company-error' : undefined}
                    />

                    {touched.company && errors.company && (
                      <p id="company-error" className="field-error" role="alert">
                        {errors.company}
                      </p>
                    )}
                  </div>
                </div>

                <div className="form-row-two">
                  <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                      type="email"
                      id="email"
                      className={fieldClass('email')}
                      placeholder="you@example.com"
                      value={formData.email}
                      onChange={handleInputChange}
                      onBlur={handleBlur}
                      aria-invalid={touched.email && !!errors.email}
                      aria-describedby={errors.email ? 'email-error' : undefined}
                    />

                    {touched.email && errors.email && (
                      <p id="email-error" className="field-error" role="alert">
                        {errors.email}
                      </p>
                    )}
                  </div>

                  <div className="form-group">
                    <label htmlFor="phone">Phone</label>
                    <input
                      type="tel"
                      id="phone"
                      className={fieldClass('phone')}
                      placeholder="+91 9751 7777 77"
                      value={formData.phone}
                      onChange={handleInputChange}
                      onBlur={handleBlur}
                      aria-invalid={touched.phone && !!errors.phone}
                      aria-describedby={errors.phone ? 'phone-error' : undefined}
                    />

                    {touched.phone && errors.phone && (
                      <p id="phone-error" className="field-error" role="alert">
                        {errors.phone}
                      </p>
                    )}
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="message">Project Brief</label>
                  <textarea
                    id="message"
                    rows="4"
                    className={fieldClass('message')}
                    placeholder="Tell us about your scope"
                    value={formData.message}
                    onChange={handleInputChange}
                    onBlur={handleBlur}
                    aria-invalid={touched.message && !!errors.message}
                    aria-describedby={errors.message ? 'message-error' : undefined}
                  />

                  {touched.message && errors.message && (
                    <p id="message-error" className="field-error" role="alert">
                      {errors.message}
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  className="btn-primary form-submit-btn"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Sending Request...' : 'Submit Request'}
                  <ArrowUpRight size={18} />
                </button>
              </form>
            </div>
          </RevealOnScroll>
        </div>
      </div>
    </section>
  );
}