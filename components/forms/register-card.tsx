"use client";

import { useState } from "react";
import { AuthCardContainer } from "@/components/ui/auth-card-container";
import { AuthHeading } from "@/components/ui/auth-heading";
import { AuthTabs } from "@/components/auth/authTabs";
import { PasswordInput } from "@/components/auth/passwordInput";
import { InputText } from "@/components/ui/input-text";
import { PrimaryButton } from "@/components/ui/primary-button";

type RegisterCardProps = {
  onBack?: () => void;
  onRegister?: (v: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    confirmPassword: string;
    terms: boolean;
  }) => void;
};

export function RegisterCard({ onBack, onRegister }: RegisterCardProps) {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    terms: false,
  });

  return (
    <AuthCardContainer>
      <AuthHeading>CREATE AN ACCOUNT</AuthHeading>

      <AuthTabs active="register" onLogin={onBack} />

      <form
        style={{ width: "100%", display: "flex", flexDirection: "column", gap: 24 }}
        onSubmit={e => {
          e.preventDefault();
          onRegister?.(form);
        }}
      >
        <InputText placeholder="First Name*" value={form.firstName} onChange={e => setForm({ ...form, firstName: e.target.value })} />
        <InputText placeholder="Last Name*" value={form.lastName} onChange={e => setForm({ ...form, lastName: e.target.value })} />
        <InputText type="email" placeholder="Email Address*" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />

        <PasswordInput placeholder="Password*" value={form.password} onChange={v => setForm({ ...form, password: v })} />
        <PasswordInput placeholder="Confirm Password*" value={form.confirmPassword} onChange={v => setForm({ ...form, confirmPassword: v })} />

        <label style={{ fontSize: 12, color: "#64748b" }}>
          <input
            type="checkbox"
            checked={form.terms}
            onChange={e => setForm({ ...form, terms: e.target.checked })}
            required
          />{" "}
          I&apos;ve read and accept the Terms & Conditions
        </label>

        <PrimaryButton type="submit">CREATE AN ACCOUNT</PrimaryButton>
      </form>
    </AuthCardContainer>
  );
}