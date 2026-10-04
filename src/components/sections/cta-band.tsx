import { MessageCircle, Phone } from "lucide-react";

import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { siteConfig, telLink, whatsappLink } from "@/config/site";

import { CopperStrands } from "./copper-strands";

/** Closing call-to-action used at the bottom of most pages. */
export function CtaBand({
  title = "Need copper scrap this week?",
  lead = "Tell us the grade, quantity and delivery location. We'll come back with availability and a clear price.",
}: {
  title?: string;
  lead?: string;
}) {
  return (
    <section aria-labelledby="cta-title" className="bg-bg py-16 sm:py-20">
      <Container>
        <div className="relative isolate overflow-hidden rounded-[22px] bg-night px-6 py-12 text-white/75 sm:px-12 sm:py-16 lg:px-16">
          <CopperStrands className="absolute inset-0 -z-10 size-full opacity-70" />
          <div
            aria-hidden
            className="absolute -right-24 -bottom-24 -z-10 size-96 rounded-full bg-copper/30 blur-[100px]"
          />
          <div className="grid items-end gap-10 xl:grid-cols-12">
            <div className="xl:col-span-7">
              <h2
                id="cta-title"
                className="font-display-tight text-[2.25rem] text-white sm:text-5xl"
              >
                {title}
              </h2>
              <p className="mt-4 max-w-xl sm:text-lg">{lead}</p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap xl:col-span-5 xl:justify-end">
              <ButtonLink href="/contact#enquiry" size="lg" arrow>
                Send enquiry
              </ButtonLink>
              <ButtonLink
                href={telLink()}
                variant="outline-light"
                size="lg"
                icon={<Phone aria-hidden className="size-4" />}
              >
                <span className="sr-only">Call </span>
                {siteConfig.contact.phoneDisplay}
              </ButtonLink>
              <ButtonLink
                href={whatsappLink("Hi NexMetal, I'd like a quote for copper scrap.")}
                variant="outline-light"
                size="lg"
                className="sm:hidden"
                icon={<MessageCircle aria-hidden className="size-4" />}
              >
                WhatsApp
              </ButtonLink>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
