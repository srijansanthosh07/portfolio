"use client";

import { useState } from "react";
import type { FormEvent } from "react";
import type { PortfolioData } from "@/data/portfolio";

type ContactPageContent = PortfolioData["site"]["contactPage"];
type ContactValues = {
  name: string;
  email: string;
  message: string;
};
type ContactField = keyof ContactValues;
type Feedback = {
  kind: "success" | "error";
  message: string;
};

const emptyValues: ContactValues = {
  name: "",
  email: "",
  message: "",
};

export function ContactForm({ content }: { content: ContactPageContent }) {
  const [values, setValues] = useState<ContactValues>(emptyValues);
  const [errors, setErrors] = useState<Partial<Record<ContactField, string>>>(
    {},
  );
  const [feedback, setFeedback] = useState<Feedback | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  function updateField(field: ContactField, value: string) {
    setValues((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: undefined }));
    setFeedback(null);
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const nextErrors: Partial<Record<ContactField, string>> = {};
    if (!values.name.trim()) {
      nextErrors.name = content.validation.nameRequired;
    }

    if (!values.email.trim()) {
      nextErrors.email = content.validation.emailRequired;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) {
      nextErrors.email = content.validation.emailInvalid;
    }

    if (!values.message.trim()) {
      nextErrors.message = content.validation.messageRequired;
    }

    setErrors(nextErrors);
    setFeedback(null);
    if (Object.keys(nextErrors).length > 0) {
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        setFeedback({ kind: "error", message: content.errorMessage });
        return;
      }

      setValues(emptyValues);
      setFeedback({ kind: "success", message: content.successMessage });
    } catch (error) {
      console.error("Contact form submission failed:", error);
      setFeedback({ kind: "error", message: content.errorMessage });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form
      className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 sm:p-8"
      noValidate
      onSubmit={handleSubmit}
    >
      <h2 className="text-xl font-semibold text-foreground">
        {content.formHeading}
      </h2>

      <div className="mt-6 grid gap-5">
        <div>
          <label
            className="text-sm font-medium text-foreground/80"
            htmlFor="contact-name"
          >
            {content.nameLabel}
          </label>
          <input
            autoComplete="name"
            className="mt-2 w-full rounded-xl border border-white/10 bg-background/80 px-4 py-3 text-sm text-foreground outline-none transition-colors placeholder:text-foreground/35 focus:border-accent-cyan/60"
            id="contact-name"
            maxLength={100}
            name="name"
            onChange={(event) => updateField("name", event.currentTarget.value)}
            required
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? "contact-name-error" : undefined}
            value={values.name}
          />
          {errors.name && (
            <p className="mt-2 text-sm text-rose-300" id="contact-name-error">
              {errors.name}
            </p>
          )}
        </div>

        <div>
          <label
            className="text-sm font-medium text-foreground/80"
            htmlFor="contact-email"
          >
            {content.emailLabel}
          </label>
          <input
            autoComplete="email"
            className="mt-2 w-full rounded-xl border border-white/10 bg-background/80 px-4 py-3 text-sm text-foreground outline-none transition-colors placeholder:text-foreground/35 focus:border-accent-cyan/60"
            id="contact-email"
            maxLength={254}
            name="email"
            onChange={(event) =>
              updateField("email", event.currentTarget.value)
            }
            required
            type="email"
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? "contact-email-error" : undefined}
            value={values.email}
          />
          {errors.email && (
            <p className="mt-2 text-sm text-rose-300" id="contact-email-error">
              {errors.email}
            </p>
          )}
        </div>

        <div>
          <label
            className="text-sm font-medium text-foreground/80"
            htmlFor="contact-message"
          >
            {content.messageLabel}
          </label>
          <textarea
            className="mt-2 min-h-36 w-full resize-y rounded-xl border border-white/10 bg-background/80 px-4 py-3 text-sm leading-6 text-foreground outline-none transition-colors placeholder:text-foreground/35 focus:border-accent-cyan/60"
            id="contact-message"
            maxLength={5000}
            name="message"
            onChange={(event) =>
              updateField("message", event.currentTarget.value)
            }
            required
            aria-invalid={Boolean(errors.message)}
            aria-describedby={
              errors.message ? "contact-message-error" : undefined
            }
            value={values.message}
          />
          {errors.message && (
            <p
              className="mt-2 text-sm text-rose-300"
              id="contact-message-error"
            >
              {errors.message}
            </p>
          )}
        </div>
      </div>

      {feedback && (
        <p
          className={`mt-5 text-sm ${
            feedback.kind === "success" ? "text-emerald-300" : "text-rose-300"
          }`}
          role={feedback.kind === "success" ? "status" : "alert"}
        >
          {feedback.message}
        </p>
      )}

      <button
        className="mt-6 inline-flex min-w-36 items-center justify-center rounded-full bg-accent-cyan px-5 py-3 text-sm font-semibold text-background transition-colors hover:bg-cyan-200 disabled:cursor-not-allowed disabled:opacity-60"
        disabled={isSubmitting}
        type="submit"
      >
        {isSubmitting ? content.sendingLabel : content.submitLabel}
      </button>
    </form>
  );
}
