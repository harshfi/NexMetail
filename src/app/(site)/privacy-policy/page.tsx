import type { Metadata } from "next";
import Link from "next/link";

import { LegalPage } from "@/components/sections/legal-page";
import { fullAddress, mailLink, siteConfig } from "@/config/site";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Privacy Policy",
  description: `How ${siteConfig.legalName} collects, uses and protects personal data submitted through this website.`,
  path: "/privacy-policy",
});

// TODO(owner): draft text — have it reviewed by a lawyer before launch.
export default function PrivacyPolicyPage() {
  const { legalName, contact } = siteConfig;
  return (
    <LegalPage title="Privacy Policy" updated="4 October 2026" crumb="Privacy Policy">
      <p>
        This policy explains how {legalName} (&ldquo;NexMetal&rdquo;, &ldquo;we&rdquo;,
        &ldquo;us&rdquo;) handles personal data collected through this website. We process
        personal data in line with the Digital Personal Data Protection Act, 2023 and
        other applicable Indian law.
      </p>

      <h2>What we collect</h2>
      <ul>
        <li>
          <strong>Enquiry form:</strong> your name, company, phone number, email address,
          the product you are interested in, quantity, delivery location and any message
          you write.
        </li>
        <li>
          <strong>Calls, WhatsApp and email:</strong> the details you share when you
          contact us directly, including your phone number or email address.
        </li>
        <li>
          <strong>Usage data:</strong> if analytics is enabled, we use Google Analytics to
          collect anonymised information about how the site is used (pages viewed,
          approximate location, device and browser type). Basic server logs (IP address,
          time of request) are kept by our hosting provider for security.
        </li>
      </ul>
      <p>
        We do not collect payment details, government identity numbers or sensitive
        personal data through this website.
      </p>

      <h2>How we use it</h2>
      <ul>
        <li>To reply to your enquiry and send quotes, availability and pricing.</li>
        <li>To process and invoice orders you place with us.</li>
        <li>To keep records required by tax and other laws.</li>
        <li>To understand how the website is used and improve it.</li>
        <li>To protect the website against spam and misuse.</li>
      </ul>
      <p>
        By submitting an enquiry or contacting us, you consent to us using your details
        for these purposes. We do not sell your personal data and we do not send marketing
        messages unless you ask us to.
      </p>

      <h2>Who we share it with</h2>
      <p>
        We share personal data only with service providers that help us run this website
        and our business, and only as needed:
      </p>
      <ul>
        <li>
          Website hosting (Vercel) and email delivery (Resend), which process data on our
          behalf.
        </li>
        <li>Google, if analytics is enabled.</li>
        <li>Transporters, where needed to deliver your order.</li>
        <li>Government or regulatory authorities when the law requires it.</li>
      </ul>
      <p>
        Some of these providers may store data outside India, subject to applicable law.
      </p>

      <h2>How long we keep it</h2>
      <p>
        We keep enquiry details for as long as needed to respond and maintain a business
        relationship, and invoice and transaction records for as long as tax law requires.
        After that, data is deleted or anonymised.
      </p>

      <h2>Cookies</h2>
      <p>
        This website does not use advertising cookies. If analytics is enabled, Google
        Analytics sets cookies to measure site usage. You can block or delete cookies in
        your browser settings; the site will still work.
      </p>

      <h2>Your rights</h2>
      <p>
        You can ask us to access, correct, update or erase your personal data, or withdraw
        your consent, by emailing{" "}
        <a href={mailLink("Privacy request")}>{contact.email}</a>. We will respond within
        a reasonable time and as required by law.
      </p>

      <h2>Security</h2>
      <p>
        We use reasonable technical and organisational measures to protect personal data,
        including encrypted (HTTPS) connections. No method of transmission or storage is
        completely secure.
      </p>

      <h2>Grievances and contact</h2>
      <p>
        For any question or complaint about this policy or your personal data, contact:
        <br />
        <strong>{legalName}</strong>
        <br />
        {fullAddress}
        <br />
        Email: <a href={mailLink("Privacy grievance")}>{contact.email}</a>
      </p>

      <h2>Changes</h2>
      <p>
        We may update this policy from time to time. The &ldquo;last updated&rdquo; date
        above shows when it last changed. See also our{" "}
        <Link href="/terms">Terms of Use</Link>.
      </p>
    </LegalPage>
  );
}
