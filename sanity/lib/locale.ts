import type {Locale} from "./types"

export function pick<T>(en: T | undefined, zh: T | undefined, locale: Locale): T | undefined {
  return locale === "zh" ? zh ?? en : en ?? zh
}
