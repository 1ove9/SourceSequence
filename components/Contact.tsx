import Script from "next/script"
import {getLocale, getTranslations} from "next-intl/server"
import ContactView, {type ContactCopy} from "./ContactView"

export default async function Contact() {
  const t = await getTranslations("contact")
  const locale = await getLocale()
  const turnstileEnabled = Boolean(process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY)

  const copy: ContactCopy = {
    label: t("label"),
    heading: t("heading"),
    intro: t("intro"),
    address: t("address"),
    directLabel: t("directLabel"),
    direct: t.raw("direct") as ContactCopy["direct"],
    form: t.raw("form") as ContactCopy["form"],
  }

  return (
    <>
      {turnstileEnabled && (
        <Script
          src="https://challenges.cloudflare.com/turnstile/v0/api.js"
          strategy="afterInteractive"
        />
      )}
      <ContactView copy={copy} locale={locale} />
    </>
  )
}
