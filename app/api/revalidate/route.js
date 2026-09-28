import { createHash, timingSafeEqual } from "crypto"
import { revalidateTag } from "next/cache"
import { CMS_CACHE_TAG } from "../../../lib/cms"

// Called by the CMS the moment content is saved, so pages show the change
// straight away instead of waiting out the fallback in lib/cms.js. The CMS
// sends CMS_REVALIDATE_SECRET as a Bearer token. Anything else, including a
// missing or too-short secret on this side, gets a bare 401 so the route
// gives nothing away. The body is ignored: one call refreshes every
// CMS-backed page, membership plans included.
export const dynamic = "force-dynamic"

const MIN_SECRET_LENGTH = 32
const noStore = { "Cache-Control": "no-store" }

function digest(value) {
  return createHash("sha256").update(value).digest()
}

function isAuthorised(request) {
  // Trimmed so a stray space or newline pasted into the env var can't
  // silently lock out every request.
  const secret = process.env.CMS_REVALIDATE_SECRET?.trim()

  if (!secret || secret.length < MIN_SECRET_LENGTH) {
    return false
  }

  const header = request.headers.get("authorization")

  if (!header || !header.startsWith("Bearer ")) {
    return false
  }

  const token = header.slice("Bearer ".length)

  if (!token) {
    return false
  }

  // Equal-length digests, so the comparison time says nothing about the secret.
  return timingSafeEqual(digest(token), digest(secret))
}

export function POST(request) {
  if (!isAuthorised(request)) {
    return new Response(null, { status: 401, headers: noStore })
  }

  revalidateTag(CMS_CACHE_TAG, { expire: 0 })

  return Response.json({ ok: true }, { headers: noStore })
}
