import React from "react";

export interface SecondaryButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export const SecondaryButton = React.forwardRef<HTMLButtonElement, SecondaryButtonProps>(
  ({ children, style, ...props }, ref) => (
    <>
      <button
        ref={ref}
        style={{
          display: 'flex',
          padding: '14px 20px',
          justifyContent: 'center',
          alignItems: 'center',
          gap: 2,
          alignSelf: 'stretch',
          borderRadius: 32,
          background: 'var(--Base-Color-Pure-White, #FFF)',
          border: 'none',
          cursor: 'pointer',
          ...style,
        }}
        {...props}
      >
        <span
          className="secondary-btn-text-mobile"
          style={{
            color: 'var(--Brand-Deep-Forest-Green, #1D3A34)',
            fontFamily: 'Inter Tight',
            fontSize: 18,
            fontStyle: 'normal',
            fontWeight: 500,
            lineHeight: '26px',
            textDecorationLine: 'underline',
            textDecorationStyle: 'solid',
            textDecorationSkipInk: 'auto',
            textDecorationThickness: 'auto',
            textUnderlineOffset: 'auto',
            textUnderlinePosition: 'from-font',
          }}
        >
          {children}
        </span>
      </button>
      <style>{`
        @media (max-width: 640px) {
          .secondary-btn-text-mobile {
            color: var(--Brand-Deep-Forest-Green, #1D3A34) !important;
            font-family: Optima !important;
            font-size: 16px !important;
            font-style: normal !important;
            font-weight: 400 !important;
            line-height: 24px !important;
            text-decoration-line: underline !important;
            text-decoration-style: solid !important;
            text-decoration-skip-ink: auto !important;
            text-decoration-thickness: auto !important;
            text-underline-offset: auto !important;
            text-underline-position: from-font !important;
          }
        }
      `}</style>
    </>
  )
);
SecondaryButton.displayName = "SecondaryButton";
