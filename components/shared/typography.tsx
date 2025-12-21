import { ElementType, ReactNode } from "react";
import { cn } from "@/lib/utils";

type BaseProps = {
  children: ReactNode;
  className?: string;
};

export function H1({ children, className }: BaseProps) {
  return (
    <h1 className={cn("font-serif text-5xl lg:text-[96px] leading-[1.2] text-brand-forest", className)}>
      {children}
    </h1>
  );
}

export function H2({ children, className }: BaseProps) {
  return <h2 className={cn("font-serif text-4xl lg:text-[80px] leading-[1.2] text-brand-forest", className)}>{children}</h2>;
}

export function H3({ children, className }: BaseProps) {
  return <h3 className={cn("font-serif text-3xl lg:text-[64px] leading-[1.2] text-brand-forest", className)}>{children}</h3>;
}

export function H4({ children, className }: BaseProps) {
  return <h4 className={cn("font-serif text-2xl lg:text-[56px] leading-[1.2] text-brand-forest", className)}>{children}</h4>;
}

export function H5({ children, className }: BaseProps) {
  return <h5 className={cn("font-serif text-xl lg:text-[48px] leading-[1.2] text-brand-forest", className)}>{children}</h5>;
}

export function H6({ children, className }: BaseProps) {
  return <h6 className={cn("font-serif text-[18px] lg:text-[40px] leading-[1.2] text-brand-forest", className)}>{children}</h6>;
}

export function H7({ children, className }: BaseProps) {
  // Use paragraph for smaller headings (h1-h6 cover semantic headings)
  return <p className={cn("font-serif text-[16px] lg:text-[32px] leading-[1.2] text-brand-forest", className)}>{children}</p>;
}

export function H8({ children, className }: BaseProps) {
  return <p className={cn("font-serif text-[14px] lg:text-[24px] leading-[1.2] text-brand-forest", className)}>{children}</p>;
}

export function H9({ children, className }: BaseProps) {
  return <p className={cn("font-serif text-[12px] lg:text-[20px] leading-[1.2] text-brand-forest", className)}>{children}</p>;
}

// Body variants
export function Body({ children, className }: BaseProps) {
  // Figma token: Body text 20px / 1.25rem, line height 28px
  return <p className={cn("text-[20px] leading-[28px] text-slate-700", className)}>{children}</p>;
}

export function BodyLargeExtraBold({ children, className }: BaseProps) {
  return <p className={cn("text-[20px] leading-[28px] text-slate-700 font-extrabold", className)}>{children}</p>;
}
export function BodyLargeBold({ children, className }: BaseProps) {
  return <p className={cn("text-[20px] leading-[28px] text-slate-700 font-bold", className)}>{children}</p>;
}
export function BodyLargeSemiBold({ children, className }: BaseProps) {
  return <p className={cn("text-[20px] leading-[28px] text-slate-700 font-semibold", className)}>{children}</p>;
}
export function BodyLargeMedium({ children, className }: BaseProps) {
  return <p className={cn("text-[20px] leading-[28px] text-slate-700 font-medium", className)}>{children}</p>;
}
export function BodyLargeNormal({ children, className }: BaseProps) {
  return <p className={cn("text-[20px] leading-[28px] text-slate-700 font-normal", className)}>{children}</p>;
}
export function BodyLargeLight({ children, className }: BaseProps) {
  return <p className={cn("text-[20px] leading-[28px] text-slate-700 font-light", className)}>{children}</p>;
}

// Caption medium (18px / 26px)
export function CaptionMediumExtraBold({ children, className }: BaseProps) {
  return <span className={cn("text-[18px] leading-[26px] text-slate-500 font-extrabold", className)}>{children}</span>;
}
export function CaptionMediumBold({ children, className }: BaseProps) {
  return <span className={cn("text-[18px] leading-[26px] text-slate-500 font-bold", className)}>{children}</span>;
}
export function CaptionMediumSemiBold({ children, className }: BaseProps) {
  return <span className={cn("text-[18px] leading-[26px] text-slate-500 font-semibold", className)}>{children}</span>;
}
export function CaptionMedium({ children, className }: BaseProps) {
  return <span className={cn("text-[18px] leading-[26px] text-slate-500 font-normal", className)}>{children}</span>;
}
export function CaptionMediumLight({ children, className }: BaseProps) {
  return <span className={cn("text-[18px] leading-[26px] text-slate-500 font-light", className)}>{children}</span>;
}

// Caption regular (16px / 24px)
export function CaptionRegularExtraBold({ children, className }: BaseProps) {
  return <span className={cn("text-[16px] leading-[24px] text-slate-500 font-extrabold", className)}>{children}</span>;
}
export function CaptionRegularBold({ children, className }: BaseProps) {
  return <span className={cn("text-[16px] leading-[24px] text-slate-500 font-bold", className)}>{children}</span>;
}
export function CaptionRegularSemiBold({ children, className }: BaseProps) {
  return <span className={cn("text-[16px] leading-[24px] text-slate-500 font-semibold", className)}>{children}</span>;
}
export function CaptionRegular({ children, className }: BaseProps) {
  return <span className={cn("text-[16px] leading-[24px] text-slate-500 font-normal", className)}>{children}</span>;
}
export function CaptionRegularLight({ children, className }: BaseProps) {
  return <span className={cn("text-[16px] leading-[24px] text-slate-500 font-light", className)}>{children}</span>;
}

// Caption small (14px / 20px)
export function CaptionSmallExtraBold({ children, className }: BaseProps) {
  return <span className={cn("text-[14px] leading-[20px] text-slate-500 font-extrabold", className)}>{children}</span>;
}
export function CaptionSmallBold({ children, className }: BaseProps) {
  return <span className={cn("text-[14px] leading-[20px] text-slate-500 font-bold", className)}>{children}</span>;
}
export function CaptionSmallSemiBold({ children, className }: BaseProps) {
  return <span className={cn("text-[14px] leading-[20px] text-slate-500 font-semibold", className)}>{children}</span>;
}
export function CaptionSmall({ children, className }: BaseProps) {
  return <span className={cn("text-[14px] leading-[20px] text-slate-500 font-normal", className)}>{children}</span>;
}
export function CaptionSmallLight({ children, className }: BaseProps) {
  return <span className={cn("text-[14px] leading-[20px] text-slate-500 font-light", className)}>{children}</span>;
}

// Text small / tiny
export function TextSmall({ children, className }: BaseProps) {
  return <span className={cn("text-[12px] leading-[18px] text-slate-700", className)}>{children}</span>;
}
export function TextTiny({ children, className }: BaseProps) {
  return <span className={cn("text-[12px] leading-[16px] text-slate-700", className)}>{children}</span>;
}

export function Caption({ children, className }: BaseProps) {
  return <span className={cn("text-sm leading-5 text-slate-500", className)}>{children}</span>;
}

export type TextProps<T extends ElementType = "p"> = {
  as?: T;
  children: ReactNode;
  className?: string;
};

export function Text<T extends ElementType = "p">({ as, children, className }: TextProps<T>) {
  const Comp = (as || "p") as ElementType;
  return <Comp className={cn("text-base leading-7 text-slate-700", className)}>{children}</Comp>;
}

const Typography = {
  H1,
  H2,
  H3,
  H4,
  H5,
  H6,
  H7,
  H8,
  H9,
  Body,
  BodyLargeExtraBold,
  BodyLargeBold,
  BodyLargeSemiBold,
  BodyLargeMedium,
  BodyLargeNormal,
  BodyLargeLight,
  CaptionMediumExtraBold,
  CaptionMediumBold,
  CaptionMediumSemiBold,
  CaptionMedium,
  CaptionMediumLight,
  CaptionRegularExtraBold,
  CaptionRegularBold,
  CaptionRegularSemiBold,
  CaptionRegular,
  CaptionRegularLight,
  CaptionSmallExtraBold,
  CaptionSmallBold,
  CaptionSmallSemiBold,
  CaptionSmall,
  CaptionSmallLight,
  TextSmall,
  TextTiny,
  Caption,
  Text,
};

export default Typography;
