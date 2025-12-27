import React from "react";
// Shared style objects for UI components

export const subHeadingContainerStyle: React.CSSProperties = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  alignSelf: 'stretch',
};

export const subHeadingTextStyle: React.CSSProperties = {
  color: 'var(--Brand-Deep-Forest-Green, #1D3A34)',
  textAlign: 'justify',
  fontFamily: 'Optima',
  fontSize: 20,
  fontStyle: 'normal',
  fontWeight: 550,
  lineHeight: '28px',
};


export const SubHeading: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div style={subHeadingContainerStyle}>
    <span style={subHeadingTextStyle}>
      {children}
    </span>
    <span>
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path d="M10.707 17.707L16.414 12L10.707 6.29297L9.29297 7.70697L13.586 12L9.29297 16.293L10.707 17.707Z" fill="#1D3A34"/>
      </svg>
    </span>
  </div>
);
