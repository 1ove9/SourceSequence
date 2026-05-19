# Source Sequence

Marketing site for [Source Sequence](https://sourcesequence.cn) — a research company building the physical layer of 6G. Bilingual (English / Chinese), Sanity-driven content, R3F-powered 3D models, deployed on Vercel.

## Stack

- **Next.js 16** (App Router, Turbopack, React Server Components)
- **React 19** + **TypeScript 5**
- **next-intl** — bilingual EN / ZH routing
- **Sanity** — headless CMS for research topics, lab capabilities, applications, publications, jobs, 3D models, inquiries
- **Tailwind CSS v4** — design tokens via `@theme`
- **framer-motion** — scroll-driven reveals
- **@react-three/fiber** + **drei** + **postprocessing** — WebGL scenes (Pinching Antenna, Beamforming Array, Generative RF model)
- **Vercel** — hosting, ISR, Analytics, Speed Insights

## Local Development

```bash
npm install
npm run dev          # starts dev server on http://localhost:3000
```

Visit:
- `/` — redirects to default locale
- `/en` / `/zh` — locale-specific home
- `/en/research/<slug>` etc. — Sanity-driven detail pages
- `/en/models` — 3D scene gallery
- `/studio` — Sanity Studio (in-app editor)

## Scripts

```bash
npm run dev          # development server
npm run build        # production build
npm run start        # serve the production build
npm run lint         # ESLint (flat config)
npm run typecheck    # tsc --noEmit
```

CI on every PR / push to `main` runs `typecheck` + `lint`. See `.github/workflows/ci.yml`.

## Environment Variables

Create a local `.env.local` and the same set in Vercel for `Production` + `Preview`:

| Variable | Required | Notes |
|---|---|---|
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | yes | Sanity project ID |
| `NEXT_PUBLIC_SANITY_DATASET` | yes | typically `production` |
| `SANITY_API_TOKEN` | yes | Viewer-scoped token; needed because the dataset is private. Server-side only (guarded by `import "server-only"`) |
| `NEXT_PUBLIC_SITE_URL` | yes | Canonical site URL, e.g. `https://sourcesequence.cn`. Used by sitemap, `metadataBase`, JSON-LD, and OG URLs |
| `SANITY_REVALIDATE_SECRET` | yes (for webhook) | Shared secret for `/api/revalidate`. Configure in Sanity Studio → API → Webhooks |
| `NEXT_PUBLIC_BRAND_EMAIL_DOMAIN` | optional | Override the email domain (`lib/brand.ts`). Defaults to `yuanxu.tech` legacy; set to `sourcesequence.cn` once email infrastructure is configured |

## Content Editing

All site content lives in Sanity:

1. Visit `https://<your-domain>/studio` (or `http://localhost:3000/studio` in dev)
2. Authenticate with a member email registered on the Sanity project
3. Pick a doctype:
   - **Research Topic** — `/research/<slug>` cards + detail pages
   - **Lab Capability** — `/lab/<slug>` cards + detail pages
   - **Application** — `/applications/<slug>` cards + detail pages
   - **Publication** — Publications section list
   - **Job Posting** — Careers section list
   - **Model Showcase** — `/models` gallery, mapped to code-registered R3F scenes via `sceneKey`
   - **Inquiry** — read-only form submissions from the contact form
4. Edit & **Publish**. Site rebuilds automatically on the next visit (1-hour ISR) or instantly if the Sanity webhook is configured.

## Adding a New 3D Model

1. Drop a new scene file in `components/showcase/scenes/MyScene.tsx` (default-export a component taking `{isMobile?: boolean}`)
2. Register the key in `components/showcase/registry.ts`
3. In Studio, create a **Model Showcase** doc with `sceneKey` matching that key

Routes, gallery, SEO, sitemap all auto-update.

## Deployment

Pushes to `main` auto-deploy via Vercel. The production URL is set by `NEXT_PUBLIC_SITE_URL`. After binding a custom domain, update DNS to point at Vercel and update the env var.

For instant content updates without waiting for ISR, configure a Sanity webhook:

```
URL:        https://<your-domain>/api/revalidate
Method:     POST
Trigger:    On create / Update / Delete
Filter:     _type in ["researchTopic","labCapability","application","publication","jobPosting","modelShowcase"]
Projection: {"_type": _type, "slug": slug.current}
Secret:     same value as SANITY_REVALIDATE_SECRET env var
```

## Project Layout

```
app/
  [locale]/              localized routes
    layout.tsx           root layout, generateMetadata, JSON-LD Organization
    page.tsx             homepage (sections imported from components/)
    research/[slug]/     research topic detail
    lab/[slug]/          lab capability detail
    applications/[slug]/ application detail
    models/              3D models gallery + detail
    error.tsx            client error boundary
    not-found.tsx        404
    loading.tsx          route-transition skeleton
  api/
    revalidate/          Sanity webhook receiver
  actions/
    contact.ts           "use server" inquiry-form submit
    contact-types.ts     shared types (kept separate; "use server" can only export async functions)
  sitemap.ts             dynamic sitemap pulling slugs from Sanity
  robots.ts              robots.txt
  studio/                Sanity Studio mount

components/
  *.tsx                  section components (Hero, Research, Lab, Applications, etc.)
  three/                 R3F building blocks (Waveguide, PinchElement, Scene, generative RF, …)
  showcase/              /models gallery + scene registry
  GlassCard, RevealOnScroll, SectionHeader  — shared primitives

sanity/
  client.ts              authenticated runtime client (server-only)
  env.ts                 typed env-var loader
  lib/
    fetch.ts             sanityFetch() ISR wrapper (default revalidate: 1h)
    queries.ts           GROQ queries
    types.ts             TS shapes
    locale.ts            pick<T>() helper for EN/ZH fallback
    image.ts             urlFor() — uses only public env vars to stay bundle-safe
  schemaTypes/           document schemas

lib/
  brand.ts               single source of truth for brand emails + org metadata
  seo.ts                 detailPageMetadata() helper for hreflang + canonical
  jsonld.ts              Organization + TechArticle JSON-LD builders
  utils.ts               cn() class merger

messages/
  en.json / zh.json      next-intl translation bundles

scripts/
  migrate-to-sanity.ts   seed all content types from messages.json
  seed-models.ts         seed initial modelShowcase docs
  mark-service.ts        flag a research topic as available-as-service
  append-engagement.ts   append "How We Engage" sections to a doc
  probe-sanity.ts        diagnostic — fetch counts across perspectives
  verify-sanity.ts       diagnostic — verify card-level fields
  check-sections.ts      diagnostic — list section titles for a slug
```

## License

Proprietary. © Source Sequence Technology.
