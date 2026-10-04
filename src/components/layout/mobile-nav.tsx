"use client";

import { Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { useEffect, useRef, type ReactNode } from "react";

/**
 * Full-screen mobile menu built on <dialog>: native focus trapping, Escape to
 * close and inert background. Menu content is server-rendered and passed in.
 */
export function MobileNav({
  header,
  children,
}: {
  header: ReactNode;
  children: ReactNode;
}) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const pathname = usePathname();

  const close = () => dialogRef.current?.close();

  useEffect(() => close(), [pathname]);

  return (
    <>
      <button
        type="button"
        onClick={() => dialogRef.current?.showModal()}
        aria-label="Open menu"
        aria-haspopup="dialog"
        className="-mr-2 rounded-lg p-2 lg:hidden"
      >
        <Menu aria-hidden className="size-6" />
      </button>

      <dialog
        ref={dialogRef}
        aria-label="Site menu"
        // Close when any link inside is followed.
        onClick={(e) => {
          if ((e.target as HTMLElement).closest("a")) close();
        }}
        className="m-0 h-dvh max-h-none w-screen max-w-none bg-night p-0 text-white backdrop:bg-black/60 open:flex open:flex-col lg:hidden"
      >
        <div className="container-page flex h-20 shrink-0 items-center justify-between border-b border-night-line">
          {header}
          <button
            type="button"
            onClick={close}
            aria-label="Close menu"
            className="-mr-2 rounded-lg p-2"
          >
            <X aria-hidden className="size-6" />
          </button>
        </div>
        <div className="container-page flex-1 overflow-y-auto py-8">{children}</div>
      </dialog>
    </>
  );
}
