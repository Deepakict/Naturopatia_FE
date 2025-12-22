export type MediaFormat = {
  url?: string;
  width?: number;
  height?: number;
};

export type MediaInput = {
  url?: string;
  width?: number;
  height?: number;
  mime?: string;
  alternativeText?: string;
  caption?: string;
  formats?: {
    large?: MediaFormat;
    medium?: MediaFormat;
    small?: MediaFormat;
    thumbnail?: MediaFormat;
  };
  data?: { attributes?: MediaInput };
  attributes?: MediaInput;
  file?: MediaInput;
};

export type RichTextChild = { text?: string };
export type RichTextBlock = { children?: RichTextChild[] };

export type StrapiEntity<T> = { attributes?: T } & T;
