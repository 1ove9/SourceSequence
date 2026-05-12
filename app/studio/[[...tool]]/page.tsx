/**
 * Sanity Studio mounted at /studio
 * NOTE: This page is intentionally outside [locale]/ — Studio has its own UI
 * and should not be wrapped by the next-intl provider.
 */
"use client"

import {NextStudio} from "next-sanity/studio"
import config from "@/sanity.config"

export const dynamic = "force-static"

export default function StudioPage() {
  return <NextStudio config={config} />
}
