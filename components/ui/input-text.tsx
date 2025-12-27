import React from "react";

export interface InputTextProps extends React.InputHTMLAttributes<HTMLInputElement> {
  fullWidth?: boolean;
}

export const InputText = React.forwardRef<HTMLInputElement, InputTextProps>(
  ({ fullWidth = true, style, ...props }, ref) => {
    return (
      <>
        <input
          ref={ref}
          className="input-text-mobile"
          style={{
            width: fullWidth ? '100%' : undefined,
            borderBottom: '1px solid #e5e7eb',
            paddingBottom: 12,
            fontSize: 14,
            color: 'var(--Brand-Deep-Forest-Green, #1D3A34)',
            fontFamily: 'Inter Tight',
            fontWeight: 400,
            lineHeight: '20px',
            background: 'transparent',
            outline: 'none',
            ...style,
          }}
          {...props}
        />
        <style>{`
          @media (max-width: 640px) {
            .input-text-mobile {
              color: var(--Brand-Deep-Forest-Green, #1D3A34) !important;
              font-family: "Inter Tight" !important;
              font-size: 14px !important;
              font-style: normal !important;
              font-weight: 400 !important;
              line-height: 20px !important;
              opacity: 0.6 !important;
            }
          }
        `}</style>
      </>
    );
  }
);

InputText.displayName = "InputText";
