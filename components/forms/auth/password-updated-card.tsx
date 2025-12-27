"use client";


import { AuthCardContainer } from "@/components/ui/auth-card-container";
import { AuthHeading } from "@/components/ui/auth-heading";
import { SuccessIcon } from "@/components/ui/success-icon";
import { PrimaryButton } from "@/components/ui/primary-button";

export type PasswordUpdatedCardProps = {
    className?: string;
    onLogin?: () => void;
    onCancel?: () => void;
};

export function PasswordUpdatedCard({ className, onLogin, onCancel }: PasswordUpdatedCardProps) {
  return (
    <AuthCardContainer className={className}>
      <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 24 }}>
        <SuccessIcon />
        <AuthHeading>
          <span style={{ display: 'block', textAlign: 'start' }}>PASSWORD UPDATED</span>
        </AuthHeading>
        <div style={{ color: '#1D3A34', fontFamily: 'Inter Tight', fontSize: 16, marginBottom: 8, }}>
          Your password has been changed successfully. You can now log in with your new password.
        </div>
      </div>
      <PrimaryButton type="button" onClick={onLogin}>
        LOGIN
      </PrimaryButton>
    </AuthCardContainer>
  );
}
