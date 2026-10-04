import { MessageCircle, Phone } from "lucide-react";

import { telLink, whatsappLink } from "@/config/site";

/** Mobile-only bottom bar with Call and WhatsApp. */
export function StickyContactBar() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-2 border-t border-night-line bg-night/95 pb-[env(safe-area-inset-bottom)] backdrop-blur md:hidden">
      <a
        href={telLink()}
        className="flex h-14 items-center justify-center gap-2 text-[15px] font-semibold text-white"
      >
        <Phone aria-hidden className="size-4 text-copper-light" />
        Call
      </a>
      <a
        href={whatsappLink("Hi NexMetal, I'd like a quote for copper scrap.")}
        target="_blank"
        rel="noopener noreferrer"
        className="flex h-14 items-center justify-center gap-2 bg-copper-dark text-[15px] font-semibold text-white"
      >
        <MessageCircle aria-hidden className="size-4" />
        WhatsApp
      </a>
    </div>
  );
}
