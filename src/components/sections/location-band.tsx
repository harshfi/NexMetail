import { MapPin, Navigation } from "lucide-react";

import { Reveal } from "@/components/motion/reveal";
import { ButtonLink } from "@/components/ui/button";
import { Section, SectionHeading } from "@/components/ui/section";
import { fullAddress, mapsLink, siteConfig } from "@/config/site";

export function LocationBand() {
  return (
    <Section aria-labelledby="location-title">
      <div className="grid gap-10 lg:grid-cols-12 lg:items-center">
        <div className="lg:col-span-6">
          <SectionHeading
            id="location-title"
            eyebrow="Location advantage"
            title="On NH-44, at the Delhi–Haryana border"
            lead={siteConfig.locationAdvantage}
            className="mb-8 sm:mb-8"
          />
          <ul className="flex flex-wrap gap-2">
            {siteConfig.serviceAreas.map((area) => (
              <li
                key={area}
                className="rounded-full border border-line bg-surface px-4 py-1.5 text-sm font-medium text-ink"
              >
                {area}
              </li>
            ))}
          </ul>
        </div>

        <Reveal className="lg:col-span-5 lg:col-start-8">
          <div className="rounded-[var(--radius-card)] border border-line bg-surface p-7 shadow-soft">
            <div className="flex gap-4">
              <span className="grid size-11 shrink-0 place-items-center rounded-full bg-copper-gradient text-white">
                <MapPin aria-hidden className="size-5" />
              </span>
              <div>
                <h3 className="font-semibold">Our yard</h3>
                <address className="mt-1 text-[15px] not-italic">
                  {siteConfig.legalName}
                  <br />
                  {fullAddress}
                </address>
              </div>
            </div>
            <ButtonLink
              href={mapsLink()}
              variant="outline"
              className="mt-6 w-full"
              icon={<Navigation aria-hidden className="size-4" />}
            >
              Get directions
            </ButtonLink>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
