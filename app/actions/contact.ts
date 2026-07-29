"use server"

import {headers} from "next/headers"
import {getInquiryWriteClient} from "@/sanity/client"
import type {InquiryFormState, InquiryService} from "./contact-types"

const VALID_SERVICES: ReadonlySet<InquiryService> = new Set([
  "generative-rf",
  "research",
  "press",
  "careers",
  "general",
])

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000
const RATE_LIMIT_MAX = 3

const RECENT_INQUIRY_COUNT_QUERY = `
  count(*[
    _type == "inquiry" &&
    lower(email) == $email &&
    submittedAt >= $since
  ])
`

interface TurnstileResult {
  success?: boolean
  action?: string
  "error-codes"?: string[]
}

function asString(value: FormDataEntryValue | null, max: number): string {
  if (typeof value !== "string") return ""
  return value.trim().slice(0, max)
}

async function verifyTurnstile(formData: FormData): Promise<boolean> {
  const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY
  const secret = process.env.TURNSTILE_SECRET_KEY

  if (!siteKey && !secret) return true
  if (!siteKey || !secret) {
    console.error("[inquiry] Turnstile is only partially configured")
    return false
  }

  const token = asString(formData.get("cf-turnstile-response"), 2048)
  if (!token) return false

  const requestHeaders = await headers()
  const forwardedFor = requestHeaders.get("x-forwarded-for")
  const remoteip = forwardedFor?.split(",")[0]?.trim()

  try {
    const response = await fetch(
      "https://challenges.cloudflare.com/turnstile/v0/siteverify",
      {
        method: "POST",
        headers: {"content-type": "application/json"},
        body: JSON.stringify({
          secret,
          response: token,
          remoteip: remoteip || undefined,
        }),
        cache: "no-store",
        signal: AbortSignal.timeout(8000),
      },
    )
    if (!response.ok) return false

    const result = (await response.json()) as TurnstileResult
    if (!result.success || result.action !== "contact") {
      console.warn("[inquiry] Turnstile rejected submission:", result["error-codes"])
      return false
    }
    return true
  } catch (error) {
    console.error("[inquiry] Turnstile verification failed:", error)
    return false
  }
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
  const email = asString(formData.get("email"), 254).toLowerCase()
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

  if (!(await verifyTurnstile(formData))) {
    return {status: "error", errors: {verification: true}}
  }

  const service = (VALID_SERVICES.has(serviceRaw as InquiryService)
    ? serviceRaw
    : undefined) as InquiryService | undefined

  try {
    const writeClient = getInquiryWriteClient()
    const since = new Date(Date.now() - RATE_LIMIT_WINDOW_MS).toISOString()
    const recentCount = await writeClient.fetch<number>(
      RECENT_INQUIRY_COUNT_QUERY,
      {email, since},
      {cache: "no-store"},
    )

    if (recentCount >= RATE_LIMIT_MAX) {
      return {status: "error", errors: {rateLimit: true}}
    }

    await writeClient.create({
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
