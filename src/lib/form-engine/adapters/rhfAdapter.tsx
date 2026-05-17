"use client";

import React, { useCallback, useMemo } from "react";
import {
  useForm,
  useController,
  FormProvider,
  useFormContext,
  useWatch as useRHFWatch,
} from "react-hook-form";
import type {
  FormAdapter,
  FormAdapterProviderProps,
  FieldBinding,
  FormField,
  FormSchema,
} from "../types";
import { buildRHFRules, normalizeError } from "../utils/validation";

// ─── Internal RHF Provider ────────────────────────────────────────────────────
const RHFFormProvider: React.FC<FormAdapterProviderProps> = ({
  schema,
  onSubmit,
  children,
  defaultValues = {},
}) => {
  // Build defaultValues from schema
  const schemaDefaults = useMemo(() => {
    const d: Record<string, unknown> = {};
    schema?.fields.forEach((f) => {
      if (f.defaultValue !== undefined) d[f.name] = f.defaultValue;
    });
    return { ...d, ...defaultValues };
  }, [schema, defaultValues]);

  const methods = useForm({ defaultValues: schemaDefaults, mode: "onChange" });

  const handleSubmit = methods.handleSubmit(async (data) => {
    await onSubmit(data as Record<string, unknown>);
  });

  // Expose submit via a hidden button we trigger externally
  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit} noValidate style={{ display: "contents" }}>
        {children}
      </form>
    </FormProvider>
  );
};

// ─── useField hook ─────────────────────────────────────────────────────────────
function useRHFField(name: string): FieldBinding {
  const { control, getValues, formState } = useFormContext();
  // We call useController here — hook must be called at component level by the caller
  // But since this is a function called inside a component, it satisfies Rules of Hooks.
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { field, fieldState } = useController({ name, control });

  return {
    value: field.value ?? "",
    onChange: (v) => field.onChange(v),
    onBlur: field.onBlur,
    error: normalizeError(fieldState.error),
    isDirty: fieldState.isDirty,
    isTouched: fieldState.isTouched,
  };
}

// ─── useSubmit hook ───────────────────────────────────────────────────────────
function useRHFSubmit(): () => void {
  const { handleSubmit } = useFormContext();
  return useCallback(() => {
    // trigger submit on the wrapping form
    const form = document.querySelector<HTMLFormElement>(
      "form[data-smart-form]",
    );
    form?.requestSubmit();
  }, [handleSubmit]);
}

// ─── useWatch hook ────────────────────────────────────────────────────────────
function useRHFWatchAdapter(names?: string[]): Record<string, unknown> {
  const values = useRHFWatch({ name: names ?? [] });
  if (!names) return values as unknown as Record<string, unknown>;
  const result: Record<string, unknown> = {};
  names.forEach((n, i) => {
    result[n] = Array.isArray(values)
      ? values[i]
      : (values as Record<string, unknown>)[n];
  });
  return result;
}

// ─── useTrigger hook ──────────────────────────────────────────────────────────
function useRHFTrigger(): (names: string[]) => Promise<boolean> {
  const { trigger } = useFormContext();
  return useCallback(
    (names: string[]) => trigger(names),
    [trigger],
  );
}

// ─── Build schema-level rules for a field (called in SmartField) ──────────────
export function buildFieldRules(
  field: FormField,
  getValues: () => Record<string, unknown>,
) {
  return buildRHFRules(field.validation, getValues);
}

// ─── Export Adapter ────────────────────────────────────────────────────────────
export const RHFAdapter: FormAdapter = {
  Provider: RHFFormProvider,
  useField: useRHFField,
  useSubmit: useRHFSubmit,
  useWatch: useRHFWatchAdapter,
  useTrigger: useRHFTrigger,
};
