"use client";

import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { InputText } from "@/components/ui/input-text";

type PasswordInputProps = {
  value: string;
  onChange: (v: string) => void;
  placeholder: string;
};

export function PasswordInput({ value, onChange, placeholder }: PasswordInputProps) {
  const [show, setShow] = useState(false);

  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        alignItems: "center",
        gap: 12,
        borderBottom: "1px solid #e5e7eb",
        paddingBottom: 12,
      }}
    >
      <InputText
        type={show ? "text" : "password"}
        placeholder={placeholder}
        value={value}
        onChange={e => onChange(e.target.value)}
        required
        style={{ border: "none", paddingBottom: 0 }}
      />

      <button
        type="button"
        onClick={() => setShow(p => !p)}
        style={{
          background: "none",
          border: "none",
          cursor: "pointer",
          color: "#64748b",
        }}
        aria-label={show ? "Hide password" : "Show password"}
      >
        {show ? <EyeOff size={16} /> : <Eye size={16} />}
      </button>
    </div>
  );
}