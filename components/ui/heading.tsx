import React from "react";

type HeadingProps = {
  children: React.ReactNode;
  as?: React.ElementType;
  style?: React.CSSProperties;
  className?: string;
} & React.HTMLAttributes<HTMLHeadingElement>;

export function Heading({
  children,
  as = "h1",
  style = {},
  className = "",
  ...props
}: HeadingProps) {
  const Tag = as;
  return (
    <Tag
      className={`heading-mobile ${className}`}
      style={{
        color: '#1D3A34',
        textAlign: 'center',
        fontFamily: 'Optima',
        fontSize: 32,
        fontStyle: 'normal',
        fontWeight: 550,
        lineHeight: '140%',
        display: 'block',
        ...style,
      }}
      {...props}
    >
      {children}
      <style>{`
        @media (max-width: 640px) {
          .heading-mobile {
            color: #102D26 !important;
            text-align: center !important;
            font-family: Optima !important;
            font-size: 20px !important;
            font-style: normal !important;
            font-weight: 550 !important;
            line-height: 140% !important;
          }
        }
      `}</style>
    </Tag>
  );
}
