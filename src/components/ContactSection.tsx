import { motion } from 'framer-motion';
import { Mail, MapPin, Send } from 'lucide-react';
import { useState } from 'react';
import type { FormEvent } from 'react';
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

export function ContactSection() {
  const [formState, setFormState] = useState(initialFormState);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const subject = encodeURIComponent(`Portfolio inquiry from ${formState.name}`);
    const body = encodeURIComponent(
      `Name: ${formState.name}\nEmail: ${formState.email}\n\nMessage:\n${formState.message}`,
    );

    window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`;
    setIsSubmitted(true);
    setFormState(initialFormState);
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
                    onChange={(event) =>
                      setFormState((currentState) => ({
                        ...currentState,
                        name: event.target.value,
                      }))
                    }
                    placeholder="Your name"
                    className="theme-input w-full rounded-2xl px-4 py-3 text-sm outline-none"
                  />
                </label>

                <label className="block">
                  <span className="mb-2 block text-sm text-[var(--text-secondary)]">Email</span>
                  <input
                    required
                    type="email"
                    value={formState.email}
                    onChange={(event) =>
                      setFormState((currentState) => ({
                        ...currentState,
                        email: event.target.value,
                      }))
                    }
                    placeholder="you@example.com"
                    className="theme-input w-full rounded-2xl px-4 py-3 text-sm outline-none"
                  />
                </label>
              </div>

              <label className="block">
                <span className="mb-2 block text-sm text-[var(--text-secondary)]">Message</span>
                <textarea
                  required
                  rows={6}
                  value={formState.message}
                  onChange={(event) =>
                    setFormState((currentState) => ({
                      ...currentState,
                      message: event.target.value,
                    }))
                  }
                  placeholder="Tell me about the role, team, or QA challenge you have in mind."
                  className="theme-input w-full resize-none rounded-[1.6rem] px-4 py-3 text-sm leading-7 outline-none"
                />
              </label>

              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <button
                  type="submit"
                  className="theme-primary-button inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition-transform duration-300 hover:-translate-y-1"
                >
                  Send Message
                  <Send size={16} />
                </button>

                <p className="text-sm text-[var(--text-muted)]">
                  {isSubmitted
                    ? 'Your email client should open with a prefilled message.'
                    : 'This form uses a mailto flow for quick demo handoff.'}
                </p>
              </div>
            </form>
          </GlassPanel>
        </motion.div>
      </div>
    </section>
  );
}
