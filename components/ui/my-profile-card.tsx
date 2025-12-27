import React from "react";

export interface MyProfileCardProps {
  name: string;
  email: string;
  phone: string;
  address: string;
  onLogout: () => void;
}

export const MyProfileCard: React.FC<MyProfileCardProps> = ({ name, email, phone, address, onLogout }) => {
  return (
    <div className="auth-card-container my-profile-card flex flex-col items-center gap-8 rounded-[32px] border border-[#CCC] bg-white w-full sm:w-[503px] max-w-full sm:max-w-[503px] p-6 sm:px-8 sm:py-10 mx-auto">
      <h2 className="w-full text-left text-[32px] font-normal leading-[38px] text-[color:#1D3A34]" style={{ fontFamily: 'Optima' }}>
        MY PROFILE
      </h2>
      <div className="w-full flex flex-col gap-6">
        <div className="rounded-[20px] border border-[#CCC] bg-white p-6 flex flex-col gap-2">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[20px] font-[550] leading-[28px] text-[color:#1D3A34]" style={{ fontFamily: 'Optima' }}>Preferences</span>
            <span className="text-[20px] text-[color:#1D3A34]">&gt;</span>
          </div>
          <div className="text-[16px] font-normal leading-[24px] text-[color:#1D3A34]" style={{ fontFamily: 'Inter Tight' }}>{name}</div>
          <div className="text-[16px] font-normal leading-[24px] text-[color:#1D3A34]" style={{ fontFamily: 'Inter Tight' }}>{email}</div>
          <div className="text-[16px] font-normal leading-[24px] text-[color:#1D3A34]" style={{ fontFamily: 'Inter Tight' }}>{phone}</div>
        </div>
        <div className="rounded-[20px] border border-[#CCC] bg-white p-6 flex flex-col gap-2">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[20px] font-[550] leading-[28px] text-[color:#1D3A34]" style={{ fontFamily: 'Optima' }}>Address</span>
            <span className="text-[20px] text-[color:#1D3A34]">&gt;</span>
          </div>
          <div className="text-[16px] font-normal leading-[24px] text-[color:#1D3A34]" style={{ fontFamily: 'Inter Tight' }}>{address}</div>
        </div>
      </div>
      <button
        className="w-full mt-4 rounded-[32px] border border-[#1D3A34] bg-white py-3 text-[20px] font-normal leading-[28px] text-[color:#1D3A34] transition hover:bg-[#F1F3F3]"
        style={{ fontFamily: 'Optima', letterSpacing: 1 }}
        onClick={onLogout}
      >
        LOGOUT
      </button>
    </div>
  );
};
