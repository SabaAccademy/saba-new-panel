"use client";

import React, {
  createContext,
  useCallback,
  useContext,
  useRef,
  useState,
} from "react";

export interface FormSnapshot {
  id: string;
  label: string;
  values: Record<string, unknown>;
  initialValues: Record<string, unknown>;
  errors: Record<string, string | undefined>;
  dirtyFields: Record<string, boolean>;
  touchedFields: Record<string, boolean>;
  isSubmitting: boolean;
  submitCount: number;
  updatedAt: string;
}

export interface DevToolsContextValue {
  enabled: boolean;
  forms: Map<string, FormSnapshot>;
  registerForm: (id: string, initial: Omit<FormSnapshot, "updatedAt">) => void;
  updateForm: (
    id: string,
    patch: Partial<Omit<FormSnapshot, "id" | "updatedAt">>,
  ) => void;
  unregisterForm: (id: string) => void;
}

export const DevToolsContext = createContext<DevToolsContextValue>({
  enabled: false,
  forms: new Map(),
  registerForm: () => {},
  updateForm: () => {},
  unregisterForm: () => {},
});

export function useDevTools() {
  return useContext(DevToolsContext);
}

let _counter = 0;
export function nextFormId(prefix = "form") {
  return `${prefix}-${++_counter}`;
}

export function DevToolsProvider({
  enabled,
  children,
}: {
  enabled: boolean;
  children: React.ReactNode;
}) {
  const formsRef = useRef<Map<string, FormSnapshot>>(new Map());
  const [, setVersion] = useState(0);
  const bump = useCallback(() => setVersion((v) => v + 1), []);

  const registerForm = useCallback(
    (id: string, initial: Omit<FormSnapshot, "updatedAt">) => {
      formsRef.current.set(id, {
        ...initial,
        updatedAt: new Date().toISOString(),
      });
      bump();
    },
    [bump],
  );

  const updateForm = useCallback(
    (id: string, patch: Partial<Omit<FormSnapshot, "id" | "updatedAt">>) => {
      const existing = formsRef.current.get(id);
      if (!existing) return;
      formsRef.current.set(id, {
        ...existing,
        ...patch,
        updatedAt: new Date().toISOString(),
      });
      bump();
    },
    [bump],
  );

  const unregisterForm = useCallback(
    (id: string) => {
      formsRef.current.delete(id);
      bump();
    },
    [bump],
  );

  return (
    <DevToolsContext.Provider
      value={{
        enabled,
        forms: formsRef.current,
        registerForm,
        updateForm,
        unregisterForm,
      }}
    >
      {children}
    </DevToolsContext.Provider>
  );
}
