import React, { createContext, useContext, useMemo, useState } from "react";
import type { MembershipTier } from "@jaza/shared";

export interface RegistrationState {
  email: string;
  phone: string;
  password: string;
  fullName: string;
  codeName: string;
  tier: MembershipTier | null;
  agreementAccepted: boolean;
}

const initialState: RegistrationState = {
  email: "",
  phone: "",
  password: "",
  fullName: "",
  codeName: "",
  tier: null,
  agreementAccepted: false,
};

interface RegistrationContextValue {
  state: RegistrationState;
  update: (patch: Partial<RegistrationState>) => void;
  reset: () => void;
}

const RegistrationContext = createContext<RegistrationContextValue | null>(null);

export function RegistrationProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<RegistrationState>(initialState);

  const value = useMemo<RegistrationContextValue>(
    () => ({
      state,
      update: (patch) => setState((prev) => ({ ...prev, ...patch })),
      reset: () => setState(initialState),
    }),
    [state]
  );

  return <RegistrationContext.Provider value={value}>{children}</RegistrationContext.Provider>;
}

export function useRegistration() {
  const ctx = useContext(RegistrationContext);
  if (!ctx) {
    throw new Error("useRegistration must be used within a RegistrationProvider");
  }
  return ctx;
}
