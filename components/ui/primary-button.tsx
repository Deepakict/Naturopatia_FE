import React from "react";

export interface PrimaryButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export const PrimaryButton = React.forwardRef<HTMLButtonElement, PrimaryButtonProps>(
  ({ children, style, ...props }, ref) => (
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
        background: 'var(--Brand-Deep-Forest-Green, #1D3A34)',
        border: 'none',
        cursor: 'pointer',
        ...style,
      }}
      {...props}
    >
      <span
        style={{
          color: 'var(--Base-Color-Pure-White, #FFF)',
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
  )
);
PrimaryButton.displayName = "PrimaryButton";
