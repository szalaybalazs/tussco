import Link from "next/link";
import { ReactNode } from "react";

// support.apple.com / catnip.media links in App Store descriptions, with or
// without a protocol.
const LINK_RE = /(?:https?:\/\/)?(?:www\.)?(?:support\.apple\.com|catnip\.media)\/\S+/gi;

const linkClass = "text-indigo-500 hover:underline underline-offset-2";

/**
 * Render an app description, rewriting off-site links to in-site ones:
 * support.apple.com → the Support section (#support); catnip.media/pp → the
 * app's privacy policy. Everything else is left untouched.
 */
export const AppDescription = ({
  text,
  appId,
}: {
  text: string;
  appId: string;
}) => {
  const parts: ReactNode[] = [];
  const re = new RegExp(LINK_RE);
  let last = 0;
  let m: RegExpExecArray | null;
  let key = 0;

  while ((m = re.exec(text)) !== null) {
    const raw = m[0];
    const url = raw.replace(/[.,;)]+$/, ""); // keep trailing punctuation outside the link
    const trailing = raw.slice(url.length);

    if (m.index > last) parts.push(text.slice(last, m.index));

    if (/support\.apple\.com/i.test(url)) {
      parts.push(
        <a key={key++} href="#support" className={linkClass}>
          {url}
        </a>
      );
    } else if (/catnip\.media\/pp/i.test(url)) {
      parts.push(
        <Link
          key={key++}
          href={`/${appId}/privacy-policy`}
          className={linkClass}
        >
          {url}
        </Link>
      );
    } else {
      parts.push(url);
    }

    if (trailing) parts.push(trailing);
    last = m.index + raw.length;
  }

  if (last < text.length) parts.push(text.slice(last));
  return <>{parts}</>;
};
