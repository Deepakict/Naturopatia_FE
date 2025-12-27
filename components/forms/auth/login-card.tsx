"use client";

import { useState } from "react";
import { CardContainer } from "@/components/ui/card-container";
import { AuthTabs } from "@/components/forms/auth/authTabs";
import { PasswordInput } from "@/components/forms/auth/passwordInput";
import { InputText } from "@/components/ui/input-text";
import { PrimaryButton } from "@/components/ui/primary-button";
import { SecondaryButton } from "@/components/ui/secondary-button";
import { Heading } from "@/components/ui/heading";

type LoginCardProps = {
  onRegisterClick?: () => void;
  onLogin?: (v: { email: string; password: string }) => void;
  onForgotPassword?: () => void;
};

export function LoginCard({ onRegisterClick, onLogin, onForgotPassword }: LoginCardProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <CardContainer>
      <Heading>LOGIN</Heading>

      <AuthTabs active="login" onRegister={onRegisterClick} />

      <form
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          gap: 24,
          maxWidth: 400,
          margin: "0 auto",
        }}
        onSubmit={e => {
          e.preventDefault();
          onLogin?.({ email, password });
        }}
      >
        <InputText
          type="email"
          placeholder="Email Address*"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
          style={{ fontSize: 16, padding: '12px 8px' }}
        />

        <PasswordInput
          placeholder="Password*"
          value={password}
          onChange={setPassword}
        />

        <PrimaryButton type="submit" style={{ fontSize: 16, padding: '14px 0' }}>LOGIN</PrimaryButton>
        <SecondaryButton type="button" onClick={onForgotPassword} style={{ fontSize: 16, padding: '14px 0' }}>
          FORGOT PASSWORD
        </SecondaryButton>
      </form>


    </CardContainer>
  );
}