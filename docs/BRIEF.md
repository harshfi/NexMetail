You are building the production marketing website for NexMetal Recycling Private Limited, a B2B copper scrap supplier. Read this whole brief first. Save it verbatim to docs/BRIEF.md, and create a concise CLAUDE.md at the repo root that summarises the stack, design tokens, folder conventions, and the "Rules" section below, so future sessions follow them.

Do NOT start building yet. After saving the files, reply with: (1) a one-paragraph summary of what you understood, (2) any questions or conflicts you see, (3) the planned folder structure. Then wait for "Phase 1".

==================================================
1. BUSINESS FACTS (source of truth — never invent others)
==================================================
- Brand name: NexMetal  (display wordmark "NEXMETAL"; legal name "NexMetal Recycling Private Limited")
- Constitution: Private Limited Company
- GSTIN: 06AAFCI0854G1ZR (GST registered, regular, valid since 13 Aug 2019)
- Registered address: Plot No. 1698, Rai, HSIIDC Industrial Estate, Kundli, District Sonipat, Haryana – 131029, India
- Location advantage: Kundli industrial belt on NH-44, at the Delhi–Haryana border — fast dispatch to Delhi NCR, Punjab, Haryana, UP, Rajasthan, and pan-India by road.
- Business: sourcing, sorting, grading and supplying non-ferrous (copper) scrap to wire-drawing units, foundries, secondary smelters, cable and motor manufacturers.
- Phone: [PLACEHOLDER +91-XXXXXXXXXX]
- WhatsApp: [PLACEHOLDER +91XXXXXXXXXX]
- Email: [PLACEHOLDER sales@nexmetal.in]
- Domain: [PLACEHOLDER https://www.nexmetal.in]  → use env var NEXT_PUBLIC_SITE_URL everywhere, never hard-code.
- Business hours: [PLACEHOLDER Mon–Sat, 9:30 AM – 7:00 PM IST]
- Google Maps pin / lat-long: [PLACEHOLDER — owner to supply]
Anything not listed here (founding story, tonnage, client names, certifications like ISO, years of experience beyond "since 2019") must NOT be invented. Use clearly marked TODO placeholders in src/config/site.ts instead.

==================================================
2. GOAL OF THE SITE
==================================================
Primary: generate qualified bulk enquiries (phone call, WhatsApp, enquiry form).
Secondary: rank on Google for local + product searches, e.g.
  "copper scrap supplier Sonipat", "copper scrap Kundli", "copper scrap dealer Delhi NCR",
  "copper patti scrap", "copper rassa scrap", "copper dori scrap", "copper tally",
  "AC copper pipe scrap buyer/seller", "millberry copper scrap India", "copper scrap Haryana".
Audience: purchase managers and owners at wire-drawing units, foundries, smelters, cable/motor makers. They want: grade, purity, form, availability, dispatch speed, GST invoice, trust. Copy should be crisp, factual, and confident — not flowery.

==================================================
3. TECH STACK (use latest stable versions)
==================================================
- Next.js (latest stable, App Router, React Server Components by default), TypeScript strict mode
- Tailwind CSS v4 with design tokens defined via @theme in globals.css
- next/font (self-hosted Google fonts), next/image for every image
- motion (Framer Motion) for animations — only in small client components, respect prefers-reduced-motion
- lucide-react for icons
- embla-carousel-react for the product image carousels
- react-hook-form + zod for the enquiry form; Server Action to submit
- Resend for transactional email (env: RESEND_API_KEY, ENQUIRY_TO_EMAIL, ENQUIRY_FROM_EMAIL)
- @next/third-parties for GA4 (env: NEXT_PUBLIC_GA_ID; render nothing if unset)
- ESLint + Prettier (with prettier-plugin-tailwindcss)
- Deploy target: Vercel. All pages statically generated except the form action.
No CMS for now — content lives in typed TS files so it can be swapped to a CMS later.

==================================================
4. DESIGN DIRECTION
==================================================
Mood: industrial, premium, warm copper. Clean B2B, lots of breathing room, big condensed headlines, real material photography. Think "precision metals trader", not "junkyard".
Inspiration: glorax.in (same industry and region) — borrow the general feel only (warm off-white background, condensed uppercase headings, copper accent, alternating product rows with spec cards). Do NOT copy its copy, images, logo, or layout one-to-one. NexMetal must look distinct and more polished.

Design tokens (put in @theme):
  --color-bg:          #F4F1EC   (warm off-white page background)
  --color-surface:     #FFFFFF   (cards)
  --color-ink:         #161412   (headings)
  --color-body:        #4A4642   (body text)
  --color-muted:       #7A746D
  --color-line:        #E7E1D8   (dividers/borders)
  --color-copper:      #B5763F   (primary accent / buttons)
  --color-copper-dark: #8F5A2C   (hover, text on light chip)
  --color-copper-soft: #F2E4D6   (chip background)
  --color-night:       #121110   (dark sections, footer)
  --color-night-2:     #1C1A18
  Copper gradient for highlights: linear-gradient(135deg, #E0A36A 0%, #B5763F 45%, #7A4A22 100%)
  Radius: 14px cards, 10px buttons, 999px pills. Shadows: soft, low (0 10px 30px -12px rgb(0 0 0 / .15)).
Typography:
  Display: "Bebas Neue" (fallback "Oswald") — uppercase, tight tracking, for H1/H2 and product names
  Body/UI: "DM Sans" — 16–18px body, 1.6 line-height
  Eyebrow chips: DM Sans 12–13px, semibold, uppercase, letter-spacing .08em, copper-dark text on copper-soft bg with a 1px copper border at 40% opacity (e.g. "COPPER | NON-FERROUS")
Component signature (from the existing catalogue design — keep this pattern):
  Product row = image card (white frame, 24px padding, rounded inner image, carousel dots overlaid bottom-centre) + content column (eyebrow chip → big condensed product name → 2-line description → white "PRODUCT SPECIFICATIONS" card with a 2-column bullet grid using copper dots → copper "ENQUIRE NOW →" button). Rows alternate image-left / image-right on desktop, stack on mobile (image first).
Motion: subtle. Fade/slide-up on scroll (once), hover lift on cards, arrow nudge on buttons, slow ken-burns on hero image, number count-up on stats. No parallax jank, no scroll-jacking.
Responsive: mobile-first; test 360px, 768px, 1024px, 1440px. Mobile gets a sticky bottom bar with "Call" and "WhatsApp".

==================================================
5. INFORMATION ARCHITECTURE
==================================================
/                      Home
/products              All products (catalogue, alternating rows)
/products/[slug]       Product detail (one per product, SSG via generateStaticParams)
/about                 About NexMetal
/quality               Our process & quality (sourcing → sorting → grading → packing → dispatch)
/contact               Contact + enquiry form + map
/privacy-policy, /terms
not-found (custom 404), error boundary
Plus: sitemap.ts, robots.ts, manifest.ts, opengraph-image per route, icon/apple-icon.

Header: logo left; nav: Home, Products (dropdown listing all products), Quality, About, Contact; right: phone number + "Get a Quote" copper button. Sticky, transparent over hero then solid with blur on scroll. Mobile: full-screen sheet menu.
Footer (dark): logo + one-line pitch, quick links, product links, contact block (address, phone, email, hours), GSTIN line, map link, © year NexMetal Recycling Pvt. Ltd.

==================================================
6. RULES (put these in CLAUDE.md)
==================================================
- Work phase by phase. At the end of each phase: run `npm run lint`, `npx tsc --noEmit`, `npm run build`; fix all errors; then stop and give a short summary + what to check in the browser. Never start the next phase unprompted.
- Server Components by default; add "use client" only where interactivity is needed, and keep those components small.
- All business data comes from src/config/site.ts; all product data from src/content/products.ts. No duplicated hard-coded contact details anywhere.
- Every image via next/image with meaningful alt text, width/height or fill + sizes. Hero image gets priority.
- One H1 per page. Logical heading order. Semantic landmarks (header, nav, main, footer).
- Never invent facts, certifications, numbers, testimonials, or client logos. Use TODO placeholders.
- Never copy text or images from glorax.in or any other website.
- Keep accessibility at WCAG 2.1 AA: contrast, focus-visible rings, keyboard nav, aria labels on icon buttons, reduced motion.
- Commit after each phase with a clear message (git init in Phase 1).
