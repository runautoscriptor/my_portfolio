import emailjs from '@emailjs/browser';
import { motion } from 'framer-motion';
import { Mail, MapPin, Send } from 'lucide-react';
import { useState } from 'react';
import type { ChangeEvent, FormEvent } from 'react';
import { fadeUp, staggerContainer } from '../animations/variants';
import { profile, socialLinks } from '../data/portfolio';
import { GlassPanel } from './GlassPanel';
import { SectionHeading } from './SectionHeading';
import { SocialIconButton } from './SocialIconButton';

const initialFormState = {
  name: '',
  email: '',
  message: '',
};

const EMAILJS_CONFIG = {
  serviceId: import.meta.env.VITE_EMAILJS_SERVICE_ID?.trim() ?? '',
  templateId: import.meta.env.VITE_EMAILJS_TEMPLATE_ID?.trim() ?? '',
  publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY?.trim() ?? '',
};

const MISSING_EMAILJS_KEYS = [
  ['VITE_EMAILJS_SERVICE_ID', EMAILJS_CONFIG.serviceId],
  ['VITE_EMAILJS_TEMPLATE_ID', EMAILJS_CONFIG.templateId],
  ['VITE_EMAILJS_PUBLIC_KEY', EMAILJS_CONFIG.publicKey],
]
  .filter(([, value]) => !value)
  .map(([key]) => key);

const DEFAULT_FEEDBACK =
  'Messages are delivered directly to my inbox via EmailJS.';

type ContactField = keyof typeof initialFormState;
type ContactFormState = typeof initialFormState;
type ContactErrors = Partial<Record<ContactField, string>>;

function validateContactForm(formState: ContactFormState): ContactErrors {
  const nextErrors: ContactErrors = {};
  const trimmedName = formState.name.trim();
  const trimmedEmail = formState.email.trim();
  const trimmedMessage = formState.message.trim();

  if (!trimmedName) {
    nextErrors.name = 'Please enter your name.';
  } else if (trimmedName.length < 2) {
    nextErrors.name = 'Name should be at least 2 characters.';
  }

  if (!trimmedEmail) {
    nextErrors.email = 'Please enter your email address.';
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
    nextErrors.email = 'Please enter a valid email address.';
  }

  if (!trimmedMessage) {
    nextErrors.message = 'Please share a short message.';
  } else if (trimmedMessage.length < 20) {
    nextErrors.message = 'Message should be at least 20 characters.';
  }

  return nextErrors;
}

export function ContactSection() {
  const [formState, setFormState] = useState(initialFormState);
  const [errors, setErrors] = useState<ContactErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedbackState, setFeedbackState] = useState<'idle' | 'success' | 'error'>('idle');
  const [feedbackMessage, setFeedbackMessage] = useState(DEFAULT_FEEDBACK);

  const handleFieldChange =
    (field: ContactField) =>
    (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const nextValue = event.target.value;

      setFormState((currentState) => ({
        ...currentState,
        [field]: nextValue,
      }));

      setErrors((currentErrors) => {
        if (!currentErrors[field]) {
          return currentErrors;
        }

        const nextErrors = { ...currentErrors };
        delete nextErrors[field];
        return nextErrors;
      });

      if (feedbackState !== 'idle') {
        setFeedbackState('idle');
        setFeedbackMessage(DEFAULT_FEEDBACK);
      }
    };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const nextErrors = validateContactForm(formState);

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      setFeedbackState('error');
      setFeedbackMessage('Please correct the highlighted fields before sending.');
      return;
    }

    if (MISSING_EMAILJS_KEYS.length > 0) {
      setFeedbackState('error');
      setFeedbackMessage(
        `Email delivery is not configured yet. Missing ${MISSING_EMAILJS_KEYS.join(', ')}. If you just added them, restart npm run dev.`,
      );
      return;
    }

    setIsSubmitting(true);

    try {
      await emailjs.send(
        EMAILJS_CONFIG.serviceId,
        EMAILJS_CONFIG.templateId,
        {
          from_name: formState.name.trim(),
          from_email: formState.email.trim(),
          reply_to: formState.email.trim(),
          subject: `Portfolio inquiry from ${formState.name.trim()}`,
          message: formState.message.trim(),
          to_name: profile.name,
          to_email: profile.email,
        },
        {
          publicKey: EMAILJS_CONFIG.publicKey,
          limitRate: {
            id: 'portfolio-contact-form',
            throttle: 15000,
          },
        },
      );

      setFeedbackState('success');
      setFeedbackMessage('Message sent successfully. I will receive it by email.');
      setErrors({});
      setFormState(initialFormState);
    } catch (error) {
      console.error('EmailJS send failed', error);
      setFeedbackState('error');
      setFeedbackMessage('Something went wrong while sending your message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="section-anchor py-24 pb-16 lg:py-28 lg:pb-20">
      <div className="section-shell grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start lg:gap-14 xl:gap-16">
        <motion.div
          variants={staggerContainer(0.12)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <SectionHeading
            eyebrow="Contact"
            title="Let&apos;s build stronger quality systems together."
            description="If you&apos;re hiring for QA, test automation, or quality engineering growth, this setup is ready for quick personalization and outreach."
          />

          <motion.div variants={fadeUp} className="mt-8 space-y-4">
            <GlassPanel className="rounded-[1.8rem] p-5">
              <div className="flex items-start gap-4">
                <div className="theme-accent-icon rounded-2xl p-3">
                  <Mail size={18} />
                </div>
                <div>
                  <p className="text-sm font-semibold text-[var(--text-heading)]">Email</p>
                  <a
                    href={`mailto:${profile.email}`}
                    className="mt-2 inline-block text-sm text-[var(--text-muted)] hover:text-[var(--accent-text)]"
                  >
                    {profile.email}
                  </a>
                </div>
              </div>
            </GlassPanel>

            <GlassPanel className="rounded-[1.8rem] p-5">
              <div className="flex items-start gap-4">
                <div className="theme-accent-icon rounded-2xl p-3">
                  <MapPin size={18} />
                </div>
                <div>
                  <p className="text-sm font-semibold text-[var(--text-heading)]">Location</p>
                  <p className="mt-2 text-sm text-[var(--text-muted)]">{profile.location}</p>
                </div>
              </div>
            </GlassPanel>
          </motion.div>

          <motion.div variants={fadeUp} className="mt-8 flex flex-wrap gap-3">
            {socialLinks.map((link) => (
              <SocialIconButton key={link.label} link={link} variant="solid" />
            ))}
          </motion.div>
        </motion.div>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <GlassPanel className="rounded-[2rem] p-6 sm:p-8">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[var(--accent-muted)]">
                  Send a note
                </p>
                <h3 className="mt-3 font-display text-3xl text-[var(--text-heading)]">Start the conversation</h3>
              </div>
              <div className="theme-accent-icon rounded-full p-3">
                <Send size={18} />
              </div>
            </div>

            <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
              <div className="grid gap-5 md:grid-cols-2">
                <label className="block">
                  <span className="mb-2 block text-sm text-[var(--text-secondary)]">Name</span>
                  <input
                    required
                    type="text"
                    value={formState.name}
                    onChange={handleFieldChange('name')}
                    placeholder="Your name"
                    aria-invalid={Boolean(errors.name)}
                    className={`theme-input w-full rounded-2xl px-4 py-3 text-sm outline-none ${
                      errors.name ? 'theme-input-error' : ''
                    }`}
                  />
                  {errors.name ? (
                    <span className="theme-feedback-error mt-2 block text-xs">{errors.name}</span>
                  ) : null}
                </label>

                <label className="block">
                  <span className="mb-2 block text-sm text-[var(--text-secondary)]">Email</span>
                  <input
                    required
                    type="email"
                    value={formState.email}
                    onChange={handleFieldChange('email')}
                    placeholder="you@example.com"
                    aria-invalid={Boolean(errors.email)}
                    className={`theme-input w-full rounded-2xl px-4 py-3 text-sm outline-none ${
                      errors.email ? 'theme-input-error' : ''
                    }`}
                  />
                  {errors.email ? (
                    <span className="theme-feedback-error mt-2 block text-xs">{errors.email}</span>
                  ) : null}
                </label>
              </div>

              <label className="block">
                <span className="mb-2 block text-sm text-[var(--text-secondary)]">Message</span>
                <textarea
                  required
                  rows={6}
                  value={formState.message}
                  onChange={handleFieldChange('message')}
                  placeholder="Tell me about the role, team, or QA challenge you have in mind."
                  aria-invalid={Boolean(errors.message)}
                  className={`theme-input w-full resize-none rounded-[1.6rem] px-4 py-3 text-sm leading-7 outline-none ${
                    errors.message ? 'theme-input-error' : ''
                  }`}
                />
                {errors.message ? (
                  <span className="theme-feedback-error mt-2 block text-xs">{errors.message}</span>
                ) : null}
              </label>

              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="theme-primary-button inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition-transform duration-300 hover:-translate-y-1"
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                  <Send size={16} />
                </button>

                <p
                  className={`text-sm ${
                    feedbackState === 'success'
                      ? 'theme-feedback-success'
                      : feedbackState === 'error'
                        ? 'theme-feedback-error'
                        : 'text-[var(--text-muted)]'
                  }`}
                >
                  {feedbackMessage}
                </p>
              </div>
            </form>
          </GlassPanel>
        </motion.div>
      </div>
    </section>
  );
}
