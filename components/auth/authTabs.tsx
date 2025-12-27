"use client";

type AuthTabsProps = {
  active: "login" | "register";
  onLogin?: () => void;
  onRegister?: () => void;
};

export function AuthTabs({ active, onLogin, onRegister }: AuthTabsProps) {
  const tabStyle = (activeTab: boolean) => ({
    flex: 1,
    padding: "12px 0",
    background: "transparent",
    borderBottom: activeTab ? "1px solid #1D3A34" : "1px solid transparent",
    fontSize: 14,
    color: "#1D3A34",
    cursor: "pointer",
  });

  return (
    <div style={{ display: "flex", width: "100%" }}>
      <button style={tabStyle(active === "login")} onClick={onLogin}>
        Sign in
      </button>
      <button style={tabStyle(active === "register")} onClick={onRegister}>
        I&apos;m new here
      </button>
    </div>
  );
}