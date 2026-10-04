import type { Metadata } from "next";
import Link from "next/link";

import { LegalPage } from "@/components/sections/legal-page";
import { mailLink, siteConfig } from "@/config/site";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Terms of Use",
  description: `Terms governing use of the ${siteConfig.name} website and enquiries made through it.`,
  path: "/terms",
});

// TODO(owner): draft text — have it reviewed by a lawyer before launch.
export default function TermsPage() {
  const { legalName, contact, address } = siteConfig;
  return (
    <LegalPage title="Terms of Use" updated="4 October 2026" crumb="Terms">
      <p>
        These terms govern your use of this website, operated by {legalName}{" "}
        (&ldquo;NexMetal&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;). By using the website
        you agree to them. If you do not agree, please do not use the website.
      </p>

      <h2>Information on this website</h2>
      <p>
        Product descriptions, specifications and other content on this website are
        provided for general information about the grades we supply. Availability,
        specifications and prices vary from lot to lot. The grade, quantity, weight and
        price that apply to any purchase are those confirmed in our written quotation,
        order confirmation or GST invoice.
      </p>

      <h2>Enquiries and quotations</h2>
      <p>
        Submitting an enquiry does not create a contract. Quotations are valid only for
        the period stated on them, and a sale is binding only once we confirm the order in
        writing. Supply, payment, delivery and inspection terms for each order are agreed
        separately and prevail over anything on this website.
      </p>

      <h2>Acceptable use</h2>
      <ul>
        <li>Do not submit false, misleading or someone else&apos;s information.</li>
        <li>Do not use the website or its forms to send spam or harmful code.</li>
        <li>
          Do not attempt to interfere with the website&apos;s security or operation.
        </li>
      </ul>

      <h2>Intellectual property</h2>
      <p>
        The NexMetal name, logo, text, photographs and design of this website belong to{" "}
        {legalName} or its licensors. You may not copy or reuse them for commercial
        purposes without our written permission.
      </p>

      <h2>Third-party links</h2>
      <p>
        The website links to third-party services such as Google Maps and WhatsApp. We are
        not responsible for their content or privacy practices.
      </p>

      <h2>Limitation of liability</h2>
      <p>
        We take care to keep this website accurate, but it is provided &ldquo;as
        is&rdquo;. To the extent permitted by law, we are not liable for any loss arising
        from use of, or reliance on, the website. Nothing in these terms limits liability
        that cannot be limited under Indian law.
      </p>

      <h2>Privacy</h2>
      <p>
        Our <Link href="/privacy-policy">Privacy Policy</Link> explains how we handle
        personal data submitted through this website.
      </p>

      <h2>Governing law</h2>
      <p>
        These terms are governed by the laws of India. Courts at {address.district},{" "}
        {address.region} have exclusive jurisdiction over any dispute arising from them.
      </p>

      <h2>Contact</h2>
      <p>
        Questions about these terms:{" "}
        <a href={mailLink("Website terms")}>{contact.email}</a>.
      </p>
    </LegalPage>
  );
}
