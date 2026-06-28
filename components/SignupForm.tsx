'use client';

import { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { motion } from 'framer-motion';
import {
  LANGUAGE_PILLS,
  SIGNUP_FORM_ID,
  type PageCopy,
} from '@/lib/copy';
import { LANGUAGE_LABELS } from '@/lib/languages';
import {
  MOTHER_TONGUE_OPTIONS,
  signupSchema,
  type SignupFormValues,
} from '@/lib/signup-schema';
import { fadeUp, viewportOnce } from '@/lib/motion';
import { trackEvent } from '@/lib/analytics';

type SignupFormProps = {
  signup: PageCopy['signup'];
};

export default function SignupForm({ signup }: SignupFormProps) {
  const [submitted, setSubmitted] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const formStartTracked = useRef(false);

  function handleFormStart() {
    if (!formStartTracked.current) {
      formStartTracked.current = true;
      trackEvent('form_start');
    }
  }

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      email: '',
      target_languages: [],
      message: '',
    },
  });

  async function onSubmit(data: SignupFormValues) {
    setServerError(null);

    const params = new URLSearchParams(window.location.search);
    const source = params.get('utm_source') ?? undefined;

    const res = await fetch('/api/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...data, source }),
    });

    const json = (await res.json()) as { error?: string };

    if (!res.ok) {
      setServerError(json.error ?? '登録に失敗しました');
      trackEvent('form_error', { reason: json.error ?? 'unknown' });
      return;
    }

    trackEvent('form_submit');
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <section
        id={SIGNUP_FORM_ID}
        aria-labelledby="signup-title"
        className="section scroll-mt-20 bg-navy text-white"
      >
        <div className="container-content mx-auto max-w-xl text-center">
          <div className="rounded-2xl bg-white/10 p-10 backdrop-blur-sm">
            <p className="text-4xl" aria-hidden="true">
              ✓
            </p>
            <h2 id="signup-title" className="mt-4 font-title">
              登録完了
            </h2>
            <p className="mt-4 text-lightblue">{signup.successMessage}</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      id={SIGNUP_FORM_ID}
      aria-labelledby="signup-title"
      className="section scroll-mt-20 bg-navy text-white"
    >
      <div className="container-content mx-auto max-w-xl">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={fadeUp}
          className="text-center"
        >
          <h2 id="signup-title" className="font-title">
            {signup.title}
          </h2>
          <p className="mt-4 text-lightblue">{signup.subtitle}</p>
        </motion.div>

        <motion.form
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={fadeUp}
          onSubmit={handleSubmit(onSubmit)}
          onFocus={handleFormStart}
          className="mt-10 space-y-6"
          noValidate
        >
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-semibold text-lightblue"
            >
              {signup.fields.email}
              <span className="ml-1 text-amber">*</span>
            </label>
            <input
              id="email"
              type="email"
              autoComplete="email"
              aria-describedby={errors.email ? 'email-error' : undefined}
              aria-invalid={errors.email ? true : undefined}
              className="mt-2 w-full min-h-[48px] rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-white placeholder-white/40 backdrop-blur-sm focus:border-white focus:outline-none focus:ring-2 focus:ring-white/50"
              placeholder="you@example.com"
              {...register('email')}
            />
            {errors.email && (
              <p id="email-error" className="mt-1 text-sm text-fire" role="alert">
                {errors.email.message}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="mother_tongue"
              className="block text-sm font-semibold text-lightblue"
            >
              {signup.fields.motherTongue}
              <span className="ml-1 text-amber">*</span>
            </label>
            <select
              id="mother_tongue"
              aria-describedby={
                errors.mother_tongue ? 'mother-tongue-error' : undefined
              }
              aria-invalid={errors.mother_tongue ? true : undefined}
              defaultValue=""
              className="mt-2 w-full min-h-[48px] rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-white backdrop-blur-sm focus:border-white focus:outline-none focus:ring-2 focus:ring-white/50"
              {...register('mother_tongue')}
            >
              <option value="" disabled className="text-text">
                選択してください
              </option>
              {MOTHER_TONGUE_OPTIONS.map((option) => (
                <option key={option} value={option} className="text-text">
                  {option}
                </option>
              ))}
            </select>
            {errors.mother_tongue && (
              <p
                id="mother-tongue-error"
                className="mt-1 text-sm text-fire"
                role="alert"
              >
                {errors.mother_tongue.message}
              </p>
            )}
          </div>

          <fieldset>
            <legend className="text-sm font-semibold text-lightblue">
              {signup.fields.targetLanguages}
            </legend>
            <div className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-4">
              {LANGUAGE_PILLS.map(({ code, label }) => (
                <label
                  key={code}
                  className="flex cursor-pointer items-center gap-2 rounded-lg border border-white/20 bg-white/5 px-3 py-2 text-sm transition hover:bg-white/10 has-[:checked]:border-amber has-[:checked]:bg-amber/20"
                >
                  <input
                    type="checkbox"
                    value={code}
                    className="accent-amber"
                    {...register('target_languages')}
                  />
                  <span>
                    {label}{' '}
                    <span className="text-white/60">
                      {LANGUAGE_LABELS[code]}
                    </span>
                  </span>
                </label>
              ))}
            </div>
          </fieldset>

          <div>
            <label
              htmlFor="message"
              className="block text-sm font-semibold text-lightblue"
            >
              {signup.fields.message}
            </label>
            <textarea
              id="message"
              rows={3}
              maxLength={200}
              aria-describedby={errors.message ? 'message-error' : undefined}
              className="mt-2 w-full resize-none rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-white placeholder-white/40 backdrop-blur-sm focus:border-white focus:outline-none focus:ring-2 focus:ring-white/50"
              placeholder="PolyLingo に期待すること、学習中の言語など"
              {...register('message')}
            />
            {errors.message && (
              <p id="message-error" className="mt-1 text-sm text-fire" role="alert">
                {errors.message.message}
              </p>
            )}
          </div>

          {serverError && (
            <p className="rounded-lg bg-fire/20 px-4 py-3 text-sm text-white" role="alert">
              {serverError}
            </p>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="btn-primary w-full !bg-white !text-navy disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSubmitting ? '送信中…' : signup.submitLabel}
          </button>

          <p className="text-center text-xs text-white/60">{signup.privacyNote}</p>
        </motion.form>
      </div>
    </section>
  );
}
