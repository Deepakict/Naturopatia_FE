"use client";

import { useState } from "react";
import { CardContainer } from "@/components/ui/card-container";
import { Heading } from "@/components/ui/heading";
import { PasswordInput } from "@/components/forms/auth/passwordInput";
import { PrimaryButton } from "@/components/ui/primary-button";
import { isStrongPassword } from "@/components/forms/auth/passwordRules";

type NewPasswordCardProps = {
  onSave?: (data: { password: string }) => void;
};

export function NewPasswordCard({ onSave }: NewPasswordCardProps) {
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");

  return (
    <CardContainer>
      <Heading>CREATE A NEW PASSWORD</Heading>
      <div style={{ color: '#1D3A34', fontFamily: 'Inter Tight', fontSize: 16, marginBottom: 16 }}>
        Make sure your new password is strong and unique.
      </div>
      <form
        style={{ width: "100%", display: "flex", flexDirection: "column", gap: 24 }}
        onSubmit={e => {
          e.preventDefault();
          if (!isStrongPassword(password)) {
            setError("Must be at least 8 characters, with one uppercase letter, one number, and one special character.");
            return;
          }
          if (password !== confirm) {
            setError("Passwords do not match.");
            return;
          }
          onSave?.({ password });
        }}
      >
        <div style={{ position: 'relative', width: '100%' }}>
          <PasswordInput placeholder="New Password*" value={password} onChange={setPassword} />
          <div style={{ color: '#64748b', fontSize: 13, marginTop: 4 }}>
            Must be at least 8 characters, with one uppercase letter, one number, and one special character.
          </div>
        </div>
        <PasswordInput placeholder="Confirm new password*" value={confirm} onChange={setConfirm} />
        {error && <div style={{ color: "#E5210E", fontSize: 13 }}>{error}</div>}
        <PrimaryButton type="submit">SAVE NEW PASSWORD</PrimaryButton>
      </form>
    </CardContainer>
  );
}