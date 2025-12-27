"use client";

import { useState } from "react";
import { AuthCardContainer } from "@/components/ui/auth-card-container";
import { AuthHeading } from "@/components/ui/auth-heading";
import { InputText } from "@/components/ui/input-text";
import { PrimaryButton } from "@/components/ui/primary-button";

interface ResetPasswordCardProps {
  onReset?: (email: string) => void;
}

export function ResetPasswordCard({ onReset }: ResetPasswordCardProps) {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  return (
    <AuthCardContainer>
      <AuthHeading>RESET PASSWORD</AuthHeading>
      {!sent ? (
        <>
          <div style={{ color: '#1D3A34', fontFamily: 'Inter Tight', fontSize: 16, marginBottom: 24 }}>
            Please enter your email below. If there is an associated account, you will receive a message with a link to reset your password.
          </div>
          <form
            style={{ width: "100%", display: "flex", flexDirection: "column", gap: 24 }}
            onSubmit={e => {
              e.preventDefault();
              onReset?.(email);
              setSent(true);
            }}
          >
            <InputText
              type="email"
              placeholder="Email Address*"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
            />
            <PrimaryButton type="submit">RESET PASSWORD</PrimaryButton>
          </form>
        </>
      ) : (
        <>
          <div style={{ color: '#1D3A34', fontFamily: 'Inter Tight', fontSize: 16, marginBottom: 24 }}>
            We’ve sent a reset link to <strong>{email}</strong>. Follow the instructions in the email to create a new password.
          </div>
          <InputText
            type="email"
            value={email}
            readOnly
            style={{ marginBottom: 24 }}
          />
          <PrimaryButton type="button" onClick={() => window.location.reload()}>
            BACK TO LOGIN
          </PrimaryButton>
          <div style={{ marginTop: 32, width: '100%', textAlign: 'center', color: '#1D3A34', fontFamily: 'Inter Tight', fontSize: 16 }}>
            DIDN’T GET THE EMAIL?{' '}
            <span
              style={{ textDecoration: 'underline', cursor: 'pointer', color: '#1D3A34', fontWeight: 500 }}
              onClick={() => { setSent(false); setEmail(""); }}
            >
              RESEND IT
            </span>
          </div>
        </>
      )}
    </AuthCardContainer>
  );
}