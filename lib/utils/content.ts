import type { MediaInput, RichTextBlock } from "@/lib/types/content";

export function toArray<T>(value?: T | T[] | null): T[] {
  return Array.isArray(value) ? value : value ? [value] : [];
}

export function buildMediaUrl(baseUrl: string, media?: MediaInput | null): string | undefined {
  if (!media) return undefined;
  const m = media.data?.attributes ?? media.attributes ?? media.file ?? media;
  return (
    (m?.formats?.large?.url && `${baseUrl}${m.formats.large.url}`) ||
    (m?.formats?.medium?.url && `${baseUrl}${m.formats.medium.url}`) ||
    (m?.formats?.small?.url && `${baseUrl}${m.formats.small.url}`) ||
    (m?.url && `${baseUrl}${m.url}`) ||
    undefined
  );
}

export function textFromRichBlocks(blocks?: RichTextBlock[] | string | null): string | undefined {
  if (typeof blocks === "string") return blocks;
  if (!Array.isArray(blocks) || !blocks.length) return undefined;
  const joined = blocks
    .map((block) => (Array.isArray(block.children) ? block.children.map((child) => child?.text ?? "").join(" ") : ""))
    .join(" ")
    .trim();
  return joined || undefined;
}
