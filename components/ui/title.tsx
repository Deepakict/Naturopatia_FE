import React from "react";
export const titleContainerStyle: React.CSSProperties = {
  display: 'flex',
  padding: '12px 0',
  alignItems: 'center',
  gap: 8,
  alignSelf: 'stretch',
};

export const titleTextStyle: React.CSSProperties = {
  color: 'var(--Brand-Deep-Forest-Green, #1D3A34)',
  fontFamily: 'Inter Tight',
  fontSize: 14,
  fontStyle: 'normal',
  fontWeight: 400,
  lineHeight: '20px',
};

export const Title: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div style={titleContainerStyle}>
    <span style={titleTextStyle}>
      {children}
    </span>
  </div>
);
