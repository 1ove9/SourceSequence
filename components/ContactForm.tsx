"use client"

import {useActionState, useState} from "react"
import {useFormStatus} from "react-dom"
import {useSearchParams, usePathname} from "next/navigation"
import {useLocale, useTranslations} from "next-intl"
import {ArrowRight, CheckCircle2} from "lucide-react"
import {cn} from "@/lib/utils"
import {submitInquiry} from "@/app/actions/contact"
import {
  initialInquiryState,
  type InquiryService,
} from "@/app/actions/contact-types"

const SERVICE_KEYS: InquiryService[] = [
  "generative-rf",
  "research",
  "press",
  "careers",
  "general",
]

const inputBase =
  "w-full rounded-lg border border-white/[0.08] bg-white/[0.04] px-3.5 py-3 text-[14px] text-foreground placeholder:text-muted-foreground/40 transition-colors focus:border-accent/50 focus:bg-white/[0.06] focus:outline-none disabled:cursor-not-allowed disabled:opacity-50"

export default function ContactForm() {
  const t = useTranslations("contact.form")
  const locale = useLocale()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const [state, formAction] = useActionState(submitInquiry, initialInquiryState)
  // Lazy init from URL ?service= — only on mount; deep-link to fresh page
  // preselects, user can still change manually. Re-navigating in-page does
  // not re-sync (rare flow; would force-reset their typing).
  const [service, setService] = useState(() => searchParams.get("service") ?? "")

  if (state.status === "success") {
    return (
      <div className="rounded-lg border border-accent/20 bg-accent/5 p-7 text-center">
        <CheckCircle2 className="mx-auto mb-4 h-8 w-8 text-accent" strokeWidth={1.5} />
        <p className="font-display text-[18px] leading-[1.4] text-foreground">
          {t("success")}
        </p>
      </div>
    )
  }

  return (
    <form action={formAction} className="space-y-4">
      {/* Hidden context fields */}
      <input type="hidden" name="locale" value={locale} />
      <input type="hidden" name="source" value={`${pathname}?${searchParams.toString()}`} />

      {/* Honeypot: hidden from humans, visible to bots */}
      <div className="absolute -left-[9999px] h-0 w-0 overflow-hidden" aria-hidden>
        <label>
          Company URL (do not fill)
          <input
            type="text"
            name="company_url"
            tabIndex={-1}
            autoComplete="off"
            defaultValue=""
          />
        </label>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <Field
          label={t("name")}
          required
          error={state.errors.name}
          errorText={t("errors.name")}
        >
          <input
            type="text"
            name="name"
            placeholder={t("namePlaceholder")}
            autoComplete="name"
            required
            className={inputBase}
          />
        </Field>

        <Field
          label={t("email")}
          required
          error={state.errors.email}
          errorText={t("errors.email")}
        >
          <input
            type="email"
            name="email"
            placeholder={t("emailPlaceholder")}
            autoComplete="email"
            required
            className={inputBase}
          />
        </Field>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <Field label={t("company")}>
          <input
            type="text"
            name="company"
            placeholder={t("companyPlaceholder")}
            autoComplete="organization"
            className={inputBase}
          />
        </Field>

        <Field label={t("service")}>
          <select
            name="service"
            value={service}
            onChange={(e) => setService(e.target.value)}
            className={cn(inputBase, "appearance-none bg-[length:0.7em] bg-[right_1rem_center] bg-no-repeat pr-10")}
            style={{
              backgroundImage:
                "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8' fill='none' stroke='%238b92a8' stroke-width='1.5'><path d='M1 1l5 5 5-5'/></svg>\")",
            }}
          >
            <option value="">{t("servicePlaceholder")}</option>
            {SERVICE_KEYS.map((s) => (
              <option key={s} value={s}>
                {t(`services.${s}`)}
              </option>
            ))}
          </select>
        </Field>
      </div>

      <Field
        label={t("message")}
        required
        error={state.errors.message}
        errorText={t("errors.message")}
      >
        <textarea
          name="message"
          placeholder={t("messagePlaceholder")}
          rows={5}
          required
          minLength={10}
          maxLength={4000}
          className={cn(inputBase, "resize-y")}
        />
      </Field>

      {state.errors.generic && (
        <p className="text-[13px] text-destructive">{t("errors.generic")}</p>
      )}

      <SubmitButton submitText={t("submit")} submittingText={t("submitting")} />
    </form>
  )
}

function Field({
  label,
  required,
  error,
  errorText,
  children,
}: {
  label: string
  required?: boolean
  error?: boolean
  errorText?: string
  children: React.ReactNode
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
        {label}
        {required && <span className="ml-1 text-accent">*</span>}
      </span>
      {children}
      {error && errorText && (
        <span className="mt-1.5 block text-[12px] text-destructive">{errorText}</span>
      )}
    </label>
  )
}

function SubmitButton({
  submitText,
  submittingText,
}: {
  submitText: string
  submittingText: string
}) {
  const {pending} = useFormStatus()
  return (
    <button
      type="submit"
      disabled={pending}
      className="btn-electric group inline-flex h-11 items-center gap-2 rounded-[12px] px-6 text-[13px] font-semibold disabled:cursor-not-allowed disabled:opacity-70"
    >
      {pending ? submittingText : submitText}
      <ArrowRight
        className={cn(
          "h-4 w-4 transition-transform duration-300",
          !pending && "group-hover:translate-x-0.5",
        )}
      />
    </button>
  )
}
