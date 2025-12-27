
"use client";
import { useState } from "react";
import { CardContainer } from "@/components/ui/card-container";
import { Heading } from "@/components/ui/heading";
import { InputText } from "@/components/ui/input-text";

type PreferencesProps = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  onBack: () => void;
};

export default function Preferences({ firstName, lastName, email, phone, onBack }: PreferencesProps) {
  const [first, setFirst] = useState(firstName);
  const [last, setLast] = useState(lastName);
  const [mail, setMail] = useState(email);
  const [ph, setPh] = useState(phone);

  return (
    <CardContainer>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
        <button onClick={onBack} style={{ background: 'none', border: 'none', cursor: 'pointer', marginRight: 8, display: 'flex', alignItems: 'center', padding: 0 }} aria-label="Back">
          <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40" fill="none">
            <path d="M22.155 10.4883L12.6433 19.9999L22.155 29.5116L24.5116 27.1549L17.3566 19.9999L24.5116 12.8449L22.155 10.4883Z" fill="#1D3A34"/>
          </svg>
        </button>
        <Heading>PREFERENCES</Heading>
      </div>
      <form
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          gap: 24,
          maxWidth: 400,
          margin: "0 auto",
        }}
        onSubmit={e => e.preventDefault()}
      >
        <div style={{ display: 'flex', gap: 24 }}>
          <InputText
            type="text"
            placeholder="First Name"
            value={first}
            onChange={e => setFirst(e.target.value)}
            disabled
            style={{ flex: 1, fontSize: 18, padding: '12px 8px', borderBottom: '1px solid #E7EAE9', fontFamily: 'Optima', color: '#1D3A34', }}
          />
          <InputText
            type="text"
            placeholder="Last Name"
            value={last}
            onChange={e => setLast(e.target.value)}
            disabled
            style={{ flex: 1, fontSize: 18, padding: '12px 8px', borderBottom: '1px solid #E7EAE9', fontFamily: 'Optima', color: '#1D3A34',}}
          />
        </div>
        <InputText
          type="email"
          placeholder="Email"
          value={mail}
          onChange={e => setMail(e.target.value)}
          disabled
          style={{ fontSize: 16, padding: '12px 8px', borderBottom: '1px solid #E7EAE9', fontFamily: 'Optima', color: '#1D3A34', }}
        />
        <InputText
          type="text"
          placeholder="Phone"
          value={ph}
          onChange={e => setPh(e.target.value)}
          disabled
          style={{ fontSize: 16, padding: '12px 8px', borderBottom: '1px solid #E7EAE9', fontFamily: 'Optima', color: '#1D3A34',  }}
        />
      </form>
    </CardContainer>
  );
}
