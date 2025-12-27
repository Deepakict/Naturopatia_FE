import React from "react";

export interface PrimaryButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'v1' | 'v2';
}


export const PrimaryButton = React.forwardRef<HTMLButtonElement, PrimaryButtonProps>(
  ({ children, style, variant = 'v1', ...props }, ref) => {
    const isV2 = variant === 'v2';
    return (
      <>
        <button
          ref={ref}
          className="primary-btn-mobile"
          style={{
            display: 'flex',
            padding: '14px 20px',
            justifyContent: 'center',
            alignItems: 'center',
            gap: 2,
            alignSelf: 'stretch',
            borderRadius: 32,
            background: isV2 ? 'var(--Base-Color-Pure-White, #FFF)' : 'var(--Brand-Deep-Forest-Green, #1D3A34)',
            border: isV2 ? '1px solid var(--Brand-Deep-Forest-Green, #1D3A34)' : 'none',
            cursor: 'pointer',
            ...style,
          }}
          {...props}
        >
          <span
            className="primary-btn-text-mobile"
            style={{
              color: isV2 ? 'var(--Brand-Deep-Forest-Green, #1D3A34)' : 'var(--Base-Color-Pure-White, #FFF)',
              fontFamily: 'Optima',
              fontSize: 18,
              fontStyle: 'normal',
              fontWeight: 550,
              lineHeight: '26px',
            }}
          >
            {children}
          </span>
        </button>
        <style>{`
          @media (max-width: 640px) {
            .primary-btn-mobile {
              display: flex !important;
              padding: 12px 16px !important;
              justify-content: center !important;
              align-items: center !important;
              gap: 2px !important;
              align-self: stretch !important;
            }
            .primary-btn-text-mobile {
              color: ${isV2 ? 'var(--Brand-Deep-Forest-Green, #1D3A34)' : 'var(--Base-Color-Pure-White, #FFF)'} !important;
              font-family: Optima !important;
              font-size: 16px !important;
              font-style: normal !important;
              font-weight: 400 !important;
              line-height: 24px !important;
            }
          }
        `}</style>
      </>
    );
  }
);

PrimaryButton.displayName = "PrimaryButton";
