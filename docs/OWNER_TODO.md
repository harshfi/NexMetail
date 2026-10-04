# Owner TODO — information needed before launch

Each item matches a `// TODO(owner):` comment in the code. Find them all with `grep -rn "TODO(owner)" src`.

## Contact details (`src/config/site.ts`)
- [ ] **Sales phone number.** Needed in full international format, e.g. `+919812345678`, plus how it should be displayed, e.g. `+91-98123-45678`.
- [ ] **WhatsApp number.** Digits only, with the country code, e.g. `919812345678`.
- [ ] **Sales email.** Confirm `sales@nexmetal.in`, or give the correct address.
- [ ] **Business hours.** Confirm "Mon–Sat, 9:30 AM – 7:00 PM IST".
- [ ] **Google Maps pin.** The exact latitude/longitude of the yard. Until then, map links search by the address.
- [ ] **Social media links.** LinkedIn, Facebook, Instagram and YouTube, if you have them. Empty ones are not shown.
- [ ] **Domain.** Set `NEXT_PUBLIC_SITE_URL` to the live domain, e.g. `https://www.nexmetal.in`.

## Clients (`src/config/site.ts`)
- [ ] **Client names.** Which Adani entity you supply, plus any other clients, and confirmation that you have **written permission** to name them. Without this, no client names or logos will appear on the site.

## FAQs (`src/content/faqs.ts`)
- [ ] **Minimum order quantity.** Per grade, in kg or tonnes.
- [ ] **Purity checks.** How purity is actually checked: visual, spark test, XRF analyser, lab report, or other.
- [ ] **Payment terms.** E.g. advance, payment against delivery, or credit for regular buyers.
- [ ] **Samples and visits.** Do you send samples? Are yard visits by appointment allowed?
- [ ] **Transport.** Who arranges and pays for it? Is pricing ex-yard or delivered?

## Process (`src/content/process.ts`)
- [ ] **Samples and visits on the Quality page.** The closing banner offers samples and yard visits (`src/app/(site)/quality/page.tsx`). Confirm, or remove it.
- [ ] **Process steps.** Confirm the 5 steps (sourcing → sorting → grading → packing → weighment/invoice/dispatch) match how the yard works. Name any equipment that can be mentioned truthfully, e.g. weighbridge, baling press, analyser.

## Photos (`public/images/products/<slug>/<n>.jpg`)
Run `npm run check:images` for the current list. A copper placeholder is shown until each file is added.
The current `1.jpg` for Patti, Rassa, Tally and Dori are cropped from your catalogue screenshots (only ~280 px wide) — replace them with full-size originals.
- [ ] **Copper Strips (Patti):** 4 photos
- [ ] **Copper Rassa (Wire):** 2 photos
- [ ] **Copper Tally:** 3 photos. The catalogue photo shows fine tangled wire rather than "cut plates and segment blocks" — please confirm it is the right photo.
- [ ] **AC Pipes (Copper Tubes):** 1 photo. There is no real photo yet.
- [ ] **Copper Dori:** 2 photos
- [ ] **Hero, yard and process photos:** for `public/images/hero` and `public/images/process`.
- [ ] **Logo.** A vector logo (SVG) if one exists. The site currently uses a placeholder copper "N" mark plus the "NEXMETAL" wordmark (`src/components/ui/logo.tsx`), which is also used for the favicon and social images.

Photo guidance: at least 1600 px on the long side, JPG, real NexMetal material, no watermarks.

## Still to confirm
- [ ] **Catalogue screenshots.** Do they come from your own catalogue, so their copy and photos can be reused? Or from a third-party site?
- [ ] **Stock photos.** Is it OK to use free-licence stock photos (Unsplash/Pexels) as stand-ins until real ones arrive?

## Before launch
- [ ] **Email sending domain.** Verify the domain in Resend and set `RESEND_API_KEY`, `ENQUIRY_TO_EMAIL` and `ENQUIRY_FROM_EMAIL`.
- [ ] **Analytics and Search Console.** Set `NEXT_PUBLIC_GA_ID` and `NEXT_PUBLIC_GSC_VERIFICATION`.
- [ ] **Legal pages.** Have a lawyer review the drafted Privacy Policy and Terms.
