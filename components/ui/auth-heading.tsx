import { Heading } from "@/components/ui/heading";
import React from "react";

type AuthHeadingProps = React.PropsWithChildren<object>;

export function AuthHeading({ children }: AuthHeadingProps) {
  return (
    <Heading>
      <span
        className="auth-heading-mobile"
        style={{
          color: '#1D3A34',
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
      <style>{`
        @media (max-width: 640px) {
          .auth-heading-mobile {
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
    </Heading>
  );
}
