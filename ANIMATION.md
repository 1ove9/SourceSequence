# Animation boundaries

The site uses one interaction animation engine: **Framer Motion**.

| Concern | Implementation |
| --- | --- |
| First-fold hero copy | CSS `hero-reveal` keyframes in `app/globals.css` |
| Section and card entrances | `components/RevealOnScroll.tsx` |
| Nav, contact, and 3D showcase transitions | Framer Motion |
| Smooth scrolling | Lenis, driven by `requestAnimationFrame` |

## Rules

- Do not add a second general-purpose animation engine.
- Keep static copy in Server Components. Prefer CSS for deterministic,
  first-paint entrances that do not need gesture state.
- Use `RevealOnScroll` instead of repeating the same `whileInView` settings.
- Animate opacity and transforms, not layout properties.
- Every animation must have a static `prefers-reduced-motion` path.
- Keep the shared easing aligned with `--ease-apple` in `globals.css` and
  `APPLE_EASE` in `RevealOnScroll.tsx`.
