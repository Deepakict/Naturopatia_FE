"use client";
import { useState } from "react";
import { CardContainer } from "@/components/ui/card-container";

export type AddressProps = {
  address?: string;
  firstName?: string;
  lastName?: string;
  street?: string;
  apartment?: string;
  city?: string;
  state?: string;
  zip?: string;
  country?: string;
  phone?: string;
  onBack: () => void;
};

import { Heading } from "@/components/ui/heading";
import { InputText } from "@/components/ui/input-text";

const countryList = ["United States"];
const stateList = ["California"];

export default function AddressCard({
  address = "420 E 54th St",
  firstName = "Giana",
  lastName = "George",
  street = "420 E 54th St",
  apartment = "",
  city = "Sandiego",
  state = "California",
  zip = "10022",
  country = "United States",
  phone = "(504) 454-9005",
  onBack
}: AddressProps) {
  return (
    <CardContainer>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
        <button onClick={onBack} style={{ background: 'none', border: 'none', cursor: 'pointer', marginRight: 8, display: 'flex', alignItems: 'center', padding: 0 }} aria-label="Back">
          <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40" fill="none">
            <path d="M22.155 10.4883L12.6433 19.9999L22.155 29.5116L24.5116 27.1549L17.3566 19.9999L24.5116 12.8449L22.155 10.4883Z" fill="#1D3A34"/>
          </svg>
        </button>
        <Heading>ADDRESS</Heading>
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
        {/* Country Dropdown */}
        <select disabled value={country} style={{ fontSize: 16, padding: '12px 8px', border: 'none', borderBottom: '1px solid #E7EAE9', fontFamily: 'Optima', color: '#1D3A34', background: 'transparent', marginBottom: 0 }}>
          {countryList.map(c => <option key={c} value={c}>{c}</option>)}
        </select>
        {/* Name Row */}
        <div style={{ display: 'flex', gap: 24 }}>
          <InputText
            type="text"
            placeholder="First Name"
            value={firstName}
            disabled
            style={{ flex: 1, fontSize: 18, padding: '12px 8px', borderBottom: '1px solid #E7EAE9', fontFamily: 'Optima', color: '#1D3A34' }}
          />
          <InputText
            type="text"
            placeholder="Last Name"
            value={lastName}
            disabled
            style={{ flex: 1, fontSize: 18, padding: '12px 8px', borderBottom: '1px solid #E7EAE9', fontFamily: 'Optima', color: '#1D3A34' }}
          />
        </div>
        {/* Street Address */}
        <InputText
          type="text"
          placeholder="Street Address"
          value={street}
          disabled
          style={{ fontSize: 16, padding: '12px 8px', borderBottom: '1px solid #E7EAE9', fontFamily: 'Optima', color: '#1D3A34' }}
        />
        {/* Apartment (optional) */}
        <InputText
          type="text"
          placeholder="Apartment, suite, etc. (optional)"
          value={apartment}
          disabled
          style={{ fontSize: 16, padding: '12px 8px', borderBottom: '1px solid #E7EAE9', fontFamily: 'Optima', color: '#1D3A34' }}
        />
        {/* City, State, Zip Row */}
        <div style={{ display: 'flex', gap: 24 }}>
          <InputText
            type="text"
            placeholder="City"
            value={city}
            disabled
            style={{ flex: 1, fontSize: 16, padding: '12px 8px', borderBottom: '1px solid #E7EAE9', fontFamily: 'Optima', color: '#1D3A34' }}
          />
          <select disabled value={state} style={{ flex: 1, fontSize: 16, padding: '12px 8px', border: 'none', borderBottom: '1px solid #E7EAE9', fontFamily: 'Optima', color: '#1D3A34', background: 'transparent' }}>
            {stateList.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
          <InputText
            type="text"
            placeholder="Zip Code"
            value={zip}
            disabled
            style={{ flex: 1, fontSize: 16, padding: '12px 8px', borderBottom: '1px solid #E7EAE9', fontFamily: 'Optima', color: '#1D3A34' }}
          />
        </div>
        {/* Phone */}
        <InputText
          type="text"
          placeholder="Phone"
          value={phone}
          disabled
          style={{ fontSize: 16, padding: '12px 8px', borderBottom: '1px solid #E7EAE9', fontFamily: 'Optima', color: '#1D3A34' }}
        />
      </form>
    </CardContainer>
  );
}
