"use client";

import { RotateCcw } from "lucide-react";
import { useEffect } from "react";

import { Button, ButtonLink } from "@/components/ui/button";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <section className="bg-night pt-40 pb-24 text-white/75">
      <div className="container-page">
        <p className="text-sm font-semibold tracking-[0.08em] text-copper-light uppercase">
          Something went wrong
        </p>
        <h1 className="mt-4 font-display-tight text-[2.5rem] text-white sm:text-6xl">
          We hit a snag loading this page
        </h1>
        <p className="mt-5 max-w-xl">
          Please try again. If it keeps happening, call or WhatsApp us — we&apos;re happy
          to help directly.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Button onClick={reset} icon={<RotateCcw aria-hidden className="size-4" />}>
            Try again
          </Button>
          <ButtonLink href="/contact" variant="outline-light">
            Contact us
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
