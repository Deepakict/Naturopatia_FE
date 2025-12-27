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


type SubHeadingProps = {
  children: React.ReactNode;
  style?: React.CSSProperties;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
};

export const SubHeading: React.FC<SubHeadingProps> = ({ children, style, onClick }) => (
  <div
    style={{ ...subHeadingContainerStyle, ...style }}
    onClick={onClick}
    tabIndex={onClick ? 0 : undefined}
    role={onClick ? "button" : undefined}
    onKeyPress={onClick ? (e: React.KeyboardEvent<HTMLDivElement>) => { if (e.key === "Enter" || e.key === " ") onClick(e as unknown as React.MouseEvent<HTMLDivElement>); } : undefined}
  >
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
