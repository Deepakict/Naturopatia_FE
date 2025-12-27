import { Heading } from "@/components/ui/heading";
import React from "react";

type AuthHeadingProps = React.PropsWithChildren<object>;

export function AuthHeading({ children }: AuthHeadingProps) {
  return (
    <Heading>
      <span
        style={{
          color: 'var(--Brand-Deep-Forest-Green, #1D3A34)',
          fontFamily: 'Optima',
          fontSize: 32,
          fontStyle: 'normal',
          fontWeight: 550,
          lineHeight: '140%',
          display: 'block',
        }}
      >
        {children}
      </span>
    </Heading>
  );
}
