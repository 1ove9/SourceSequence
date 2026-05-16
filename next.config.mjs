import createNextIntlPlugin from "next-intl/plugin"

const withNextIntl = createNextIntlPlugin("./i18n/request.ts")

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {protocol: "https", hostname: "cdn.sanity.io"},
    ],
    formats: ["image/avif", "image/webp"],
  },
}

export default withNextIntl(nextConfig)
