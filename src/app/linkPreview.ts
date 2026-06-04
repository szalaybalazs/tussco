export interface iLinkPreview {
  title: string;
  description?: string;
  image?: string;
}

const decodeEntities = (s: string) =>
  s
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#0?39;|&#x27;|&apos;/gi, "'")
    .replace(/&nbsp;/g, " ")
    .trim();

/**
 * Best-effort Open Graph preview for a URL, fetched server-side and cached for
 * a week. Returns null on any failure so callers can fall back to a plain link.
 */
export async function fetchLinkPreview(
  url: string
): Promise<iLinkPreview | null> {
  try {
    const res = await fetch(url, { next: { revalidate: 60 * 60 * 24 * 7 } });
    if (!res.ok) return null;
    const html = await res.text();

    const meta = (key: string) => {
      const re = new RegExp(
        `<meta[^>]+(?:property|name)=["']${key}["'][^>]*>`,
        "i"
      );
      const tag = html.match(re)?.[0];
      const content = tag?.match(/content=["']([^"']*)["']/i)?.[1];
      return content ? decodeEntities(content) : undefined;
    };

    const title =
      meta("og:title") ||
      (html.match(/<title[^>]*>([^<]*)<\/title>/i)?.[1] &&
        decodeEntities(html.match(/<title[^>]*>([^<]*)<\/title>/i)![1]));
    if (!title) return null;

    return {
      title,
      description: meta("og:description") || meta("description"),
      image: meta("og:image"),
    };
  } catch {
    return null;
  }
}
