import React from "react";

export interface InputTextProps extends React.InputHTMLAttributes<HTMLInputElement> {
  fullWidth?: boolean;
}

export const InputText = React.forwardRef<HTMLInputElement, InputTextProps>(
  ({ fullWidth = true, style, ...props }, ref) => (
    <input
      ref={ref}
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
  )
);
InputText.displayName = "InputText";
