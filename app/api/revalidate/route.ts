import {revalidatePath} from "next/cache"
import {NextResponse, type NextRequest} from "next/server"

/**
 * Sanity webhook receiver.
 *
 * Configure in manage.sanity.io → API → Webhooks:
 *   URL:    https://<your-domain>/api/revalidate
 *   Trigger: Create, Update, Delete (published)
 *   Filter: _type in ["researchTopic", "labCapability", "application", "publication", "jobPosting"]
 *   Projection: {"_type": _type, "slug": slug.current}
 *   Secret: set SANITY_REVALIDATE_SECRET to the same value in your env
 *
 * The webhook signs requests; we verify the secret via Bearer header or
 * `secret` query param. Either form works depending on how the webhook is
 * configured.
 */

const TYPE_TO_SECTION: Record<string, string | null> = {
  researchTopic: "research",
  labCapability: "lab",
  application: "applications",
  publication: null,
  jobPosting: null,
}

function verifySecret(req: NextRequest): boolean {
  const expected = process.env.SANITY_REVALIDATE_SECRET
  if (!expected) return false

  const authHeader = req.headers.get("authorization") ?? ""
  if (authHeader === `Bearer ${expected}`) return true

  const querySecret = req.nextUrl.searchParams.get("secret")
  if (querySecret === expected) return true

  return false
}

export async function POST(req: NextRequest) {
  if (!verifySecret(req)) {
    return NextResponse.json({ok: false, error: "unauthorized"}, {status: 401})
  }

  let body: {_type?: string; slug?: string} = {}
  try {
    body = (await req.json()) as typeof body
  } catch {
    return NextResponse.json({ok: false, error: "invalid body"}, {status: 400})
  }

  const docType = body._type
  if (!docType || !(docType in TYPE_TO_SECTION)) {
    return NextResponse.json(
      {ok: false, error: `unknown _type: ${docType ?? "(missing)"}`},
      {status: 400},
    )
  }

  // Always nuke the home pages — they aggregate all content types.
  revalidatePath("/[locale]", "layout")

  // If the doc has a detail page, revalidate that route too.
  const section = TYPE_TO_SECTION[docType]
  if (section && body.slug) {
    revalidatePath(`/[locale]/${section}/[slug]`, "page")
  }

  return NextResponse.json({
    ok: true,
    revalidated: {type: docType, slug: body.slug, section},
    at: new Date().toISOString(),
  })
}

// Allow GET for liveness check (never reveals secrets).
export async function GET() {
  return NextResponse.json({ok: true, message: "Sanity revalidate endpoint live"})
}
