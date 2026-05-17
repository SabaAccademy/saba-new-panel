"use client";

/**
 * Zero-dependency in-memory form adapter for raven-form-engine.
 * A lightweight alternative to RHF – useful for demos/simple forms.
 */

import React, {
  useCallback,
  useContext,
  useMemo,
  useState,
  useRef,
  createContext,
} from "react";
import {
  createFormAdapter,
  type FormAdapterProviderProps,
  type FieldBinding,
} from "raven-form-engine";

// ─── Context ───────────────────────────────────────────────────────────────────
interface RavenAntDCtx {
  values: Record<string, unknown>;
  errors: Record<string, string | undefined>;
  touched: Record<string, boolean>;
  setFieldValue: (name: string, value: unknown) => void;
  setFieldTouched: (name: string) => void;
  setErrors: React.Dispatch<
    React.SetStateAction<Record<string, string | undefined>>
  >;
}

const Ctx = createContext<RavenAntDCtx | null>(null);

function useCtx(): RavenAntDCtx {
  const ctx = useContext(Ctx);
  if (!ctx)
    throw new Error("useCtx must be used inside RavenAntDAdapter.Provider");
  return ctx;
}

// ─── Provider ─────────────────────────────────────────────────────────────────
const RavenAntDProvider: React.FC<FormAdapterProviderProps> = ({
  onSubmit,
  children,
  defaultValues = {},
}) => {
  const [values, setValues] = useState<Record<string, unknown>>(defaultValues);
  const [errors, setErrors] = useState<Record<string, string | undefined>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const onSubmitRef = useRef(onSubmit);
  onSubmitRef.current = onSubmit;

  const setFieldValue = useCallback((name: string, value: unknown) => {
    setValues((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: undefined }));
  }, []);

  const setFieldTouched = useCallback((name: string) => {
    setTouched((prev) => ({ ...prev, [name]: true }));
  }, []);

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      await onSubmitRef.current(values);
    },
    [values],
  );

  return (
    <Ctx.Provider
      value={{
        values,
        errors,
        setFieldValue,
        setFieldTouched,
        touched,
        setErrors,
      }}
    >
      <form
        onSubmit={handleSubmit}
        noValidate
        style={{ display: "contents" }}
        data-raven-antd-form="true"
      >
        {children}
      </form>
    </Ctx.Provider>
  );
};

// ─── useField ─────────────────────────────────────────────────────────────────
function useAntDField(name: string): FieldBinding {
  const { values, errors, setFieldValue, setFieldTouched, touched } = useCtx();
  return {
    value: values[name] ?? "",
    onChange: (v) => setFieldValue(name, v),
    onBlur: () => setFieldTouched(name),
    error: errors[name],
    isTouched: touched[name],
  };
}

// ─── useSubmit ────────────────────────────────────────────────────────────────
function useAntDSubmit(): () => void {
  return useCallback(() => {
    const form = document.querySelector<HTMLFormElement>(
      "form[data-raven-antd-form]",
    );
    form?.requestSubmit();
  }, []);
}

// ─── useWatch ─────────────────────────────────────────────────────────────────
function useAntDWatch(names?: string[]): Record<string, unknown> {
  const { values } = useCtx();
  if (!names) return values;
  const result: Record<string, unknown> = {};
  names.forEach((n) => {
    result[n] = values[n];
  });
  return result;
}

// ─── useTrigger ───────────────────────────────────────────────────────────────
function useAntDTrigger(): (names: string[]) => Promise<boolean> {
  // Simple trigger — always passes (validation is optional for this adapter)
  return useCallback(async (_names: string[]) => true, []);
}

// ─── Export ───────────────────────────────────────────────────────────────────
export const RavenAntDAdapter = createFormAdapter({
  Provider: RavenAntDProvider,
  useField: useAntDField,
  useSubmit: useAntDSubmit,
  useWatch: useAntDWatch,
  useTrigger: useAntDTrigger,
});
