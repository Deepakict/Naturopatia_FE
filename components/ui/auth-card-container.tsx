import React from "react";

type AuthCardContainerProps = React.PropsWithChildren<{ className?: string }>;

export function AuthCardContainer({ className, children }: AuthCardContainerProps) {
  return (
    <div
      style={{
        borderRadius: 32,
        border: '1px solid #CCC',
        background: 'var(--Base-Color-Pure-White, #FFF)',
        display: 'flex',
        width: 503,
        padding: 40,
        flexDirection: 'column',
        alignItems: 'flex-start',
        gap: 40,
      }}
      className={className}
    >
      {children}
    </div>
  );
}
