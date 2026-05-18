"use server"

import {client} from "@/sanity/client"
import type {InquiryFormState, InquiryService} from "./contact-types"

const VALID_SERVICES: ReadonlySet<InquiryService> = new Set([
  "generative-rf",
  "research",
  "press",
  "careers",
  "general",
])

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function asString(value: FormDataEntryValue | null, max: number): string {
  if (typeof value !== "string") return ""
  return value.trim().slice(0, max)
}

export async function submitInquiry(
  _prev: InquiryFormState,
  formData: FormData,
): Promise<InquiryFormState> {
  // Honeypot — bots fill this hidden field; humans never see it
  const honeypot = formData.get("company_url")
  if (typeof honeypot === "string" && honeypot.length > 0) {
    // Silently succeed (don't tell bots they were caught)
    return {status: "success", errors: {}}
  }

  const name = asString(formData.get("name"), 120)
  const email = asString(formData.get("email"), 254)
  const company = asString(formData.get("company"), 200)
  const serviceRaw = asString(formData.get("service"), 64)
  const message = asString(formData.get("message"), 4000)
  const locale = asString(formData.get("locale"), 8)
  const source = asString(formData.get("source"), 500)

  const errors: InquiryFormState["errors"] = {}
  if (!name) errors.name = true
  if (!email || !EMAIL_RE.test(email)) errors.email = true
  if (message.length < 10) errors.message = true

  if (Object.keys(errors).length > 0) {
    return {status: "error", errors}
  }

  const service = (VALID_SERVICES.has(serviceRaw as InquiryService)
    ? serviceRaw
    : undefined) as InquiryService | undefined

  try {
    await client.create({
      _type: "inquiry",
      name,
      email,
      company: company || undefined,
      service,
      message,
      submittedAt: new Date().toISOString(),
      source: source || undefined,
      locale: locale || undefined,
      status: "new",
    })
    return {status: "success", errors: {}}
  } catch (e) {
    console.error("[inquiry] failed to write to Sanity:", e)
    return {status: "error", errors: {generic: true}}
  }
}
