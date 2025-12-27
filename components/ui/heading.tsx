import React from "react";

export function Heading({ children, style, ...props }: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h1
      style={{
        color: 'var(--Brand-Deep-Forest-Green, #1D3A34)',
        textAlign: 'center',
        fontFamily: 'Optima',
        fontSize: 32,
        fontStyle: 'normal',
        fontWeight: 550,
        lineHeight: '140%',
        ...style,
      }}
      {...props}
    >
      {children}
    </h1>
  );
}
