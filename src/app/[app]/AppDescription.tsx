import Link from "next/link";
import { ReactNode } from "react";

// Emails, full URLs, and bare domains (with a known TLD) in a description.
const TOKEN_RE = new RegExp(
  [
    "[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,}", // email
    "https?:\\/\\/[^\\s]+", // full URL
    "(?:www\\.)?(?:[a-z0-9-]+\\.)+(?:com|net|org|io|app|media|me|co|dev|ai|gg|hu|news)(?:\\/[^\\s]*)?", // bare domain
  ].join("|"),
  "gi"
);

const linkClass = "text-indigo-500 hover:underline underline-offset-2";

// Strip protocol/www/trailing slash for comparing a token to the app name.
const normDomain = (s: string) =>
  s
    .replace(/^https?:\/\//i, "")
    .replace(/^www\./i, "")
    .replace(/\/+$/, "")
    .toLowerCase();

/**
 * Render an app description with every URL and email turned into a link:
 * - emails → mailto:
 * - support.apple.com → the in-page Support section (#support)
 * - catnip.media → our own domain (laszlotuss.com), linked in-site
 * - everything else → a normal external link
 * A token that matches the app's own name (e.g. "Teleprompter.com") is left as
 * plain text — it's the brand, not a link.
 */
export const AppDescription = ({
  text,
  appId,
  appName,
}: {
  text: string;
  appId: string;
  appName: string;
}) => {
  const brand = normDomain(appName);
  const parts: ReactNode[] = [];
  const re = new RegExp(TOKEN_RE);
  let last = 0;
  let m: RegExpExecArray | null;
  let key = 0;

  while ((m = re.exec(text)) !== null) {
    const full = m[0];
    const token = full.replace(/[.,;:)\]]+$/, ""); // keep trailing punctuation outside the link
    const trailing = full.slice(token.length);

    if (m.index > last) parts.push(text.slice(last, m.index));

    const isEmail = token.includes("@") && !/:\/\//.test(token);

    if (!isEmail && normDomain(token) === brand) {
      // The app's brand name — not a link.
      parts.push(token);
    } else if (isEmail) {
      parts.push(
        <a key={key++} href={`mailto:${token}`} className={linkClass}>
          {token}
        </a>
      );
    } else if (/support\.apple\.com/i.test(token)) {
      parts.push(
        <a key={key++} href="#support" className={linkClass}>
          {token}
        </a>
      );
    } else if (/catnip\.media/i.test(token)) {
      // Swap the old company domain for ours; the link stays in-site.
      const path =
        "/" +
        token
          .replace(/^https?:\/\//i, "")
          .replace(/^www\./i, "")
          .replace(/^catnip\.media\/?/i, "");
      parts.push(
        <Link key={key++} href={path} className={linkClass}>
          {`laszlotuss.com${path}`}
        </Link>
      );
    } else {
      const href = /^https?:\/\//i.test(token) ? token : `https://${token}`;
      parts.push(
        <a
          key={key++}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={linkClass}
        >
          {token}
        </a>
      );
    }

    if (trailing) parts.push(trailing);
    last = m.index + full.length;
  }

  if (last < text.length) parts.push(text.slice(last));
  return <>{parts}</>;
};
