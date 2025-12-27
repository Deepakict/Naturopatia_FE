"use client";

import { NewPasswordCard } from "@/components/forms/new-password-card";
import { PasswordUpdatedCard } from "@/components/forms/password-updated-card";
import { useState } from "react";

export default function NewPasswordPage({ params }: { params: { token: string } }) {
  const [step, setStep] = useState<'new' | 'updated'>('new');

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f9f9f9' }}>
      {step === 'new' ? (
        <NewPasswordCard
          onSave={() => setStep('updated')}
        />
      ) : (
        <PasswordUpdatedCard
          onLogin={() => window.location.href = '/'}
          onCancel={() => window.location.href = '/'}
        />
      )}
    </div>
  );
}
