import React from "react";

type AuthCardContainerProps = React.PropsWithChildren<{ className?: string }>;

export function AuthCardContainer({ className, children }: AuthCardContainerProps) {
  return (
    <div
        className={`flex flex-col items-start sm:gap-10 gap-6 sm:rounded-[32px] rounded-[24px] border border-[#CCC] bg-white w-[90%] sm:w-[503px] max-w-full sm:max-w-[503px] p-6 sm:px-8 sm:py-10 mx-auto ${className || ''}`}
        style={{ alignSelf: 'stretch' }}
    >
      {children}
    </div>
  );
}
