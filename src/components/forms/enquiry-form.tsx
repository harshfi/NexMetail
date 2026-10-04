"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle2, Loader2, Send } from "lucide-react";
import Link from "next/link";
import { useEffect, useId, useRef, useState, useTransition, type ReactNode } from "react";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { submitEnquiry } from "@/lib/actions/enquiry";
import { cn } from "@/lib/utils";
import { enquirySchema, type EnquiryInput, type ProductOption } from "@/lib/validators";

const fieldClasses =
  "block w-full rounded-[var(--radius-btn)] border border-line bg-surface px-4 py-3 text-base text-ink sm:text-[15px] placeholder:text-muted/80 transition-colors focus:border-copper focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-0 focus-visible:outline-copper aria-[invalid=true]:border-red-700";

export function EnquiryForm({ productOptions }: { productOptions: ProductOption[] }) {
  const [pending, startTransition] = useTransition();
  const [status, setStatus] = useState<{ ok: boolean; message: string } | null>(null);
  const successRef = useRef<HTMLHeadingElement>(null);

  // Bring the confirmation into view (and to screen readers) once it renders.
  useEffect(() => {
    if (status?.ok) {
      successRef.current?.focus();
      successRef.current?.scrollIntoView({ block: "center" });
    }
  }, [status]);

  const {
    register,
    handleSubmit,
    setError,
    setValue,
    reset,
    formState: { errors },
  } = useForm<EnquiryInput>({
    resolver: zodResolver(enquirySchema),
    defaultValues: {
      name: "",
      company: "",
      phone: "",
      email: "",
      product: "",
      quantity: "",
      location: "",
      message: "",
      website: "",
    },
  });

  // Preselect the product from ?product=<slug> (read after mount so the page stays static).
  useEffect(() => {
    const slug = new URLSearchParams(window.location.search).get("product");
    if (slug && productOptions.some((o) => o.value === slug)) setValue("product", slug);
  }, [productOptions, setValue]);

  const onSubmit = (values: EnquiryInput) => {
    setStatus(null);
    startTransition(async () => {
      const result = await submitEnquiry(values);
      if (result.ok) {
        reset();
        setStatus({ ok: true, message: "" });
        return;
      }
      for (const [field, message] of Object.entries(result.fieldErrors ?? {})) {
        setError(field as keyof EnquiryInput, { message });
      }
      setStatus({ ok: false, message: result.message });
    });
  };

  if (status?.ok) {
    return (
      <div role="status" className="flex flex-col items-start gap-4 py-6">
        <CheckCircle2 aria-hidden className="size-10 text-copper" />
        <h3
          ref={successRef}
          tabIndex={-1}
          className="font-display-tight text-3xl focus:outline-none"
        >
          Enquiry received
        </h3>
        <p>
          Thank you. Our team will call or WhatsApp you shortly with availability and a
          price.
        </p>
        <Button variant="outline" onClick={() => setStatus(null)}>
          Send another enquiry
        </Button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className="grid gap-5 sm:grid-cols-2"
    >
      <Field label="Your name" required error={errors.name?.message}>
        {(props) => (
          <input
            {...props}
            {...register("name")}
            autoComplete="name"
            className={fieldClasses}
          />
        )}
      </Field>
      <Field label="Company" error={errors.company?.message}>
        {(props) => (
          <input
            {...props}
            {...register("company")}
            autoComplete="organization"
            className={fieldClasses}
          />
        )}
      </Field>
      <Field label="Phone / WhatsApp" required error={errors.phone?.message}>
        {(props) => (
          <input
            {...props}
            {...register("phone")}
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            placeholder="+91 98123 45678"
            className={fieldClasses}
          />
        )}
      </Field>
      <Field label="Email" error={errors.email?.message}>
        {(props) => (
          <input
            {...props}
            {...register("email")}
            type="email"
            autoComplete="email"
            className={fieldClasses}
          />
        )}
      </Field>
      <Field label="Product" required error={errors.product?.message}>
        {(props) => (
          <select
            {...props}
            {...register("product")}
            className={cn(fieldClasses, "pr-10")}
          >
            <option value="" disabled>
              Select a grade
            </option>
            {productOptions.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
        )}
      </Field>
      <Field label="Quantity" error={errors.quantity?.message}>
        {(props) => (
          <input
            {...props}
            {...register("quantity")}
            placeholder="e.g. 5 tonnes / month"
            className={fieldClasses}
          />
        )}
      </Field>
      <Field
        label="Delivery location"
        error={errors.location?.message}
        className="sm:col-span-2"
      >
        {(props) => (
          <input
            {...props}
            {...register("location")}
            autoComplete="address-level2"
            placeholder="City, state"
            className={fieldClasses}
          />
        )}
      </Field>
      <Field label="Message" error={errors.message?.message} className="sm:col-span-2">
        {(props) => (
          <textarea
            {...props}
            {...register("message")}
            rows={4}
            placeholder="Purity, form, packing or anything else we should know"
            className={cn(fieldClasses, "resize-y")}
          />
        )}
      </Field>

      {/* Honeypot: hidden from people and assistive tech. */}
      <div aria-hidden className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label>
          Website
          <input {...register("website")} tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <div className="flex flex-col gap-4 sm:col-span-2">
        {status && !status.ok && (
          <p
            role="alert"
            className="rounded-[var(--radius-btn)] bg-red-50 px-4 py-3 text-sm text-red-800"
          >
            {status.message}
          </p>
        )}
        <Button
          type="submit"
          size="lg"
          disabled={pending}
          className="w-full sm:w-auto sm:self-start"
          icon={
            pending ? (
              <Loader2 aria-hidden className="size-4 animate-spin" />
            ) : (
              <Send aria-hidden className="size-4" />
            )
          }
        >
          {pending ? "Sending…" : "Send enquiry"}
        </Button>
        <p className="text-xs text-muted">
          We use your details only to reply to this enquiry. See our{" "}
          <Link
            href="/privacy-policy"
            className="underline underline-offset-2 hover:text-copper-dark"
          >
            privacy policy
          </Link>
          .
        </p>
      </div>
    </form>
  );
}

function Field({
  label,
  required,
  error,
  className,
  children,
}: {
  label: string;
  required?: boolean;
  error?: string;
  className?: string;
  children: (props: {
    id: string;
    "aria-invalid"?: boolean;
    "aria-describedby"?: string;
    "aria-required"?: boolean;
  }) => ReactNode;
}) {
  const id = useId();
  const errorId = `${id}-error`;
  return (
    <div className={cn("flex flex-col gap-1.5", className)}>
      <label htmlFor={id} className="text-sm font-semibold text-ink">
        {label}
        {required ? (
          <span aria-hidden className="text-copper-dark">
            {" "}
            *
          </span>
        ) : (
          <span className="font-normal text-muted"> (optional)</span>
        )}
      </label>
      {children({
        id,
        "aria-invalid": error ? true : undefined,
        "aria-describedby": error ? errorId : undefined,
        "aria-required": required || undefined,
      })}
      {error && (
        <p id={errorId} className="text-sm text-red-800">
          {error}
        </p>
      )}
    </div>
  );
}
