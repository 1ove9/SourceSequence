/**
 * Types + constants for the inquiry form. Kept in a non-"use server" file
 * because Next.js server-action modules may only export async functions —
 * exporting consts from them yields undefined on the client side.
 */

export type InquiryService =
  | "generative-rf"
  | "research"
  | "press"
  | "careers"
  | "general"

export interface InquiryFormState {
  status: "idle" | "success" | "error"
  errors: Partial<{
    name: boolean
    email: boolean
    message: boolean
    generic: boolean
  }>
}

export const initialInquiryState: InquiryFormState = {
  status: "idle",
  errors: {},
}
