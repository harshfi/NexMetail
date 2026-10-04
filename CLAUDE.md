@AGENTS.md

# NexMetal website — project guide

Marketing site for **NexMetal Recycling Private Limited** (B2B copper scrap supplier, Kundli, Sonipat, Haryana). Goal: bulk enquiries (call / WhatsApp / form) + local & product SEO. Full brief: [docs/BRIEF.md](docs/BRIEF.md) — it is the source of truth for business facts. Owner answers, product specs and accessibility tweaks to the tokens are in [docs/DECISIONS.md](docs/DECISIONS.md), which overrides the brief where they conflict.

## Stack

- Next.js (App Router, RSC by default), TypeScript strict
- Tailwind CSS v4 — tokens via `@theme` in `src/app/globals.css`
- `next/font` (Bebas Neue display, Oswald fallback; DM Sans body), `next/image` for every image
- `motion` for animation (small client components only, honour reduced motion)
- `lucide-react` icons, `embla-carousel-react` product carousels
- `react-hook-form` + `zod` enquiry form → Server Action → Resend (`RESEND_API_KEY`, `ENQUIRY_TO_EMAIL`, `ENQUIRY_FROM_EMAIL`)
- `@next/third-parties` GA4 (`NEXT_PUBLIC_GA_ID`; render nothing if unset)
- ESLint + Prettier (`prettier-plugin-tailwindcss`)
- Vercel; all pages static (SSG) except the form action. Site URL always from `NEXT_PUBLIC_SITE_URL` — never hard-code the domain.

## Design tokens

Palette: midnight navy + cool steel neutrals with a copper accent (changed from the brief's warm beige/brown-black on 2026-10-04 so the site looks distinct from glorax.in). `src/app/globals.css` is the source of truth.

| Token                 | Value     | Use                   |
| --------------------- | --------- | --------------------- |
| `--color-bg`          | `#F3F5F8` | page background       |
| `--color-surface`     | `#FFFFFF` | cards                 |
| `--color-ink`         | `#0D1726` | headings              |
| `--color-body`        | `#3B4657` | body text             |
| `--color-muted`       | `#5C6878` | secondary text        |
| `--color-line`        | `#DDE3EB` | borders/dividers      |
| `--color-copper`      | `#B5763F` | accent / buttons      |
| `--color-copper-dark` | `#8F5A2C` | hover, chip text      |
| `--color-copper-soft` | `#F7E9DC` | chip bg               |
| `--color-night`       | `#0A1322` | dark sections, footer |
| `--color-night-2`     | `#111D31` | dark surfaces         |

- Copper gradient: `linear-gradient(135deg, #E0A36A 0%, #B5763F 45%, #7A4A22 100%)`
- Radius: 14px cards, 10px buttons, 999px pills. Shadow: `0 10px 30px -12px rgb(0 0 0 / .15)`
- Display type: Bebas Neue, uppercase, tight tracking (H1/H2, product names). Body: DM Sans 16–18px / 1.6.
- Eyebrow chip: DM Sans 12–13px semibold uppercase, tracking .08em, copper-dark on copper-soft, 1px copper border @ 40%.
- Product row: image card (white frame, 24px pad, carousel dots bottom-centre) + content (chip → name → 2-line desc → "PRODUCT SPECIFICATIONS" card with 2-col copper-dot grid → "ENQUIRE NOW →"). Alternate sides on desktop; image first on mobile.
- Motion: subtle — fade/slide-up once, hover lift, arrow nudge, slow hero ken-burns, stat count-up. No parallax / scroll-jacking.
- Mobile-first; check 360 / 768 / 1024 / 1440. Mobile sticky bottom bar: Call + WhatsApp.

## Folder conventions

```
src/
  app/              root layout (header/footer/sticky bar), globals.css, not-found, error,
                    sitemap/robots/manifest, icon/apple-icon, root opengraph-image
  app/(site)/       routes; each main route has its own opengraph-image.tsx (uses lib/og.tsx)
  components/ui/    primitives — Button/ButtonLink, Chip, Container, Section/SectionHeading,
                    Card, SpecList, PageHero (dark title band), Logo, Icon, CopperPlaceholder
  components/layout/ Header (+ HeaderShell, NavLink, ProductsMenu, MobileNav), Footer, StickyContactBar
  components/sections/ home + shared page sections (HomeHero, StatsStrip, CtaBand, FaqList…)
  components/product/  ProductRow, ProductMedia (placeholder → image → carousel), ProductGallery, ProductCard
  components/motion/   MotionProvider (LazyMotion), Reveal, CountUp — "use client"
  components/forms/    EnquiryForm — "use client"
  config/site.ts    ALL business facts + nav + link helpers (telLink, whatsappLink, mapsLink…)
  content/          products.ts, faqs.ts, process.ts, industries.ts, why-us.ts
  lib/              utils (cn), seo.ts, jsonld.ts, og.tsx, images.ts (server-only), validators.ts,
                    actions/enquiry.ts (Server Action → Resend)
public/images/{brand,products,hero,process}
```

Patterns:
- Every page starts with a dark band (HomeHero or PageHero); the fixed header is transparent over it and turns solid on scroll. New pages must start with a dark band too.
- Header children style the scrolled state with `group-data-[scrolled=true]:` so they stay server components.
- Buttons use `copper-dark` (hover `copper-deep`) — plain `copper` fails AA with white text. Use `copper` for icons/decoration only.
- `Icon` (lucide by name) is server-only; client components import lucide icons directly.
- Don't import `content/*` into client components (bundle size) — pass data as props.

Scripts: `npm run dev | build | lint | typecheck | format | check:images`. Product images resolve via `src/lib/images.ts` (server-only); missing files render the copper placeholder. Owner unknowns: `// TODO(owner):` comments, collected in `docs/OWNER_TODO.md` — keep both in sync. Env vars documented in `.env.example`.

## Rules

- Work phase by phase. End of each phase: `npm run lint`, `npm run typecheck` (= `next typegen && tsc --noEmit`; plain `npx tsc --noEmit` also works once types are generated), `npm run build`; fix all errors; then stop with a short summary + what to check in the browser. Never start the next phase unprompted.
- Server Components by default; `"use client"` only where interactivity is needed, and keep those components small.
- All business data from `src/config/site.ts`; all product data from `src/content/products.ts`. No duplicated hard-coded contact details anywhere.
- Every image via `next/image` with meaningful alt, width/height or `fill` + `sizes`. Hero image gets `priority`.
- One H1 per page. Logical heading order. Semantic landmarks (header, nav, main, footer).
- Never invent facts, certifications, numbers, testimonials, or client logos. Use TODO placeholders.
- Never copy text or images from glorax.in or any other website.
- WCAG 2.1 AA: contrast, focus-visible rings, keyboard nav, aria-labels on icon buttons, reduced motion.
- Commit after each phase with a clear message.
