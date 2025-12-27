const cardSectionStyle: React.CSSProperties = {
  display: 'flex',
  padding: 16,
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  gap: 4,
  alignSelf: 'stretch',
  borderRadius: 20,
  border: '1px solid #E7EAE9',
  background: 'rgba(255, 255, 255, 0.00)'
};

import React, { useState } from "react";
import { PrimaryButton } from "@/components/ui/primary-button";
import { LogoutCard } from "@/components/forms/authorization/logout-card";
import { Heading } from "@/components/ui/heading";
import { CardContainer } from "@/components/ui/card-container";
import { SubHeading } from "@/components/ui/sub-heading";
import { Title } from "@/components/ui/title";


export interface MyProfileCardProps {
  name: string;
  email: string;
  phone: string;
  address: string;
  onLogout: () => void;
}

export const MyProfileCard: React.FC<MyProfileCardProps> = ({ name, email, phone, address, onLogout }) => {

  return (
    <>
      <CardContainer>
        <Heading>MY PROFILE</Heading>
        <div className="w-full flex flex-col gap-6">
          <div style={cardSectionStyle}>
            <SubHeading>Preferences</SubHeading>
            <Title>{name}</Title>
            <Title>{email}</Title>
            <Title>{phone}</Title>
          </div>
          <div style={cardSectionStyle}>
            <SubHeading>Address</SubHeading>
            <Title>{address}</Title>
          </div>
        </div>
        <PrimaryButton variant="v2" onClick={onLogout}>
          LOGOUT
        </PrimaryButton>
      </CardContainer>
    </>
  );
};
