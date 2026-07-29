import type {ReactNode} from "react"
import {
  NextIntlClientProvider,
  type AbstractIntlMessages,
} from "next-intl"
import {getMessages} from "next-intl/server"

/**
 * Sends only the requested top-level namespaces across the RSC boundary.
 * Server Components still have access to the complete catalog through
 * i18n/request.ts; this component is only for interactive leaf components.
 */
export default async function ClientMessages({
  namespaces,
  children,
}: {
  namespaces: readonly string[]
  children: ReactNode
}) {
  const allMessages = (await getMessages()) as AbstractIntlMessages
  const messages = Object.fromEntries(
    namespaces.flatMap((namespace) =>
      namespace in allMessages ? [[namespace, allMessages[namespace]]] : [],
    ),
  ) as AbstractIntlMessages

  return (
    <NextIntlClientProvider messages={messages}>
      {children}
    </NextIntlClientProvider>
  )
}
