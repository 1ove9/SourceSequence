import {revalidatePath} from "next/cache"
import {NextResponse, type NextRequest} from "next/server"
import {parseBody} from "next-sanity/webhook"

/**
 * Sanity webhook receiver.
 *
 * Configure in manage.sanity.io → API → Webhooks:
 *   URL:    https://<your-domain>/api/revalidate
 *   Trigger: Create, Update, Delete (published)
 *   Filter: _type in ["researchTopic", "labCapability", "application", "publication", "jobPosting", "capability", "solution", "solutionGroup", "caseStudy", "modelShowcase", "labShot", "partner", "pressMention"]
 *   Projection: {"_type": _type, "slug": slug.current}
 *   Secret: set SANITY_REVALIDATE_SECRET to the same value in your env
 *
 * Sanity signs the raw request body. `parseBody` verifies that signature and
 * waits briefly for Content Lake eventual consistency before revalidating.
 */

const TYPE_TO_PATHS: Record<string, string[]> = {
  capability: ["/[locale]", "/[locale]/capabilities"],
  solution: ["/[locale]", "/[locale]/solutions"],
  solutionGroup: ["/[locale]", "/[locale]/solutions"],
  caseStudy: ["/[locale]"],
  researchTopic: ["/[locale]/antenna", "/[locale]/research/[slug]"],
  labCapability: ["/[locale]/antenna", "/[locale]/lab/[slug]"],
  application: ["/[locale]/antenna", "/[locale]/applications/[slug]"],
  publication: ["/[locale]", "/[locale]/antenna"],
  jobPosting: ["/[locale]"],
  modelShowcase: ["/[locale]/models", "/[locale]/models/[slug]"],
  labShot: ["/[locale]/antenna"],
  partner: ["/[locale]"],
  pressMention: ["/[locale]"],
}

export async function POST(req: NextRequest) {
  const secret = process.env.SANITY_REVALIDATE_SECRET
  if (!secret) {
    return NextResponse.json(
      {ok: false, error: "revalidation is not configured"},
      {status: 503},
    )
  }

  let body: {_type?: string; slug?: string} | null = null
  let isValidSignature = false
  try {
    const parsed = await parseBody<{_type?: string; slug?: string}>(
      req,
      secret,
      true,
    )
    body = parsed.body
    isValidSignature = parsed.isValidSignature === true
  } catch (error) {
    console.error("[revalidate] invalid webhook body:", error)
    return NextResponse.json({ok: false, error: "invalid body"}, {status: 400})
  }

  if (!isValidSignature) {
    return NextResponse.json({ok: false, error: "unauthorized"}, {status: 401})
  }

  const docType = body?._type
  if (!docType || !(docType in TYPE_TO_PATHS)) {
    return NextResponse.json(
      {ok: false, error: `unknown _type: ${docType ?? "(missing)"}`},
      {status: 400},
    )
  }

  const paths = TYPE_TO_PATHS[docType]
  for (const path of paths) {
    revalidatePath(path, "page")
  }
  revalidatePath("/sitemap.xml")

  return NextResponse.json({
    ok: true,
    revalidated: {type: docType, slug: body?.slug, paths},
    at: new Date().toISOString(),
  })
}

// Allow GET for liveness check (never reveals secrets).
export async function GET() {
  return NextResponse.json({ok: true, message: "Sanity revalidate endpoint live"})
}
