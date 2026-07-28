# Animation boundaries

This project uses **two** animation libraries on purpose, with a hard, non-overlapping
split. Read this before touching any motion code.

## The rule

| Concern | Library | Where |
| --- | --- | --- |
| **P1** — first-fold hero `<h1>` masked line reveal | **GSAP** | `components/useHeroReveal.ts` (used by `HomeHero`, `Hero`) |
| **P2** — Vision manifesto scroll-scrub reveal | **GSAP** (planned) | `components/Vision.tsx` |
| Everything else: section/card entrances, staggers, nav, contact, showcase | **Framer Motion** | `RevealOnScroll`, inline `whileInView`, etc. |

**GSAP is allowed in P1 and P2 only.** Do not add GSAP anywhere else. Do not migrate the
existing Framer Motion / `RevealOnScroll` reveals to GSAP — they are correct as-is and
re-doing them buys nothing.

### Never mix the two libraries on the same element

A given DOM node is owned by exactly one library. Example: in `Hero.tsx` the **text block**
(pill / h1 / body / cta) is driven by GSAP via `useHeroReveal`, while the **3D showcase**
(right column) keeps its Framer Motion entrance. Different elements, no overlap — that's fine.
What's forbidden is two libraries animating the *same* node's opacity/transform.

## GSAP conventions (enforced)

- React: always `@gsap/react`'s `useGSAP` with a `scope` ref; cleanup is automatic. Never
  raw `useEffect` without `ctx.revert()`.
- Register each plugin **once**, at module top of the hook/component that uses it
  (`useGSAP`, `SplitText`, `CustomEase`). Never inside a re-rendering body.
- SSR-safe: all DOM work lives inside `useGSAP` (client only). No `gsap.*` / `SplitText.*`
  DOM calls during render.
- Animate transform aliases (`x`/`y`/`xPercent`/`yPercent`/`scale`) and `autoAlpha` only —
  never layout props (`width`/`top`/...). Keep it 60fps.
- Accessibility: every GSAP entry point branches on `gsap.matchMedia()` with
  `(prefers-reduced-motion: reduce)` → no motion, static final state.
- Custom text easing reuses the site's signature curve `cubic-bezier(0.2, 0.8, 0.2, 1)` via
  `CustomEase.create("apple", "0.2,0.8,0.2,1")` so GSAP and Framer feel identical. Keep this
  value in sync with `--ease-apple` (globals.css) and `APPLE_EASE` (RevealOnScroll.tsx).

## SplitText notes

- Imported from the public `gsap/SplitText` (free since GSAP 3.13; no Club license needed).
- The hero `<h1>` must **not** use `text-balance` / `text-wrap: balance` — it interferes with
  line splitting. Removed from the GSAP-owned headings.
- `autoSplit: true` + `onSplit()` returning the timeline handles font-load and resize
  re-splits, syncing a completed entrance to its final state (no replay on resize).
- CJK (zh) headings have no spaces, so SplitText collapses them to a single line → the whole
  headline wipes up as one masked block. EN headings get per-line stagger. Both are intended.
