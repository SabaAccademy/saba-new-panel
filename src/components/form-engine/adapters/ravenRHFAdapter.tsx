"use client";

/**
 * React Hook Form adapter for raven-form-engine.
 * Implements the FormAdapter interface from the raven-form-engine package.
 * Integrates with RavenDevTools: registers each mounted form instance and
 * streams live values / errors / meta into the DevTools panel.
 */

import { useCallback, useEffect, useRef } from "react";
import {
  useForm,
  useController,
  FormProvider,
  useFormContext,
  useWatch as useRHFWatch,
} from "react-hook-form";
import {
  createFormAdapter,
  buildRHFRules,
  normalizeError,
  type FormAdapterProviderProps,
  type FieldBinding,
} from "raven-form-engine";
import React from "react";
import { useDevTools, nextFormId } from "../devtools/DevToolsContext";

// ─── DevTools Registrar ───────────────────────────────────────────────────────
// Mounts *inside* FormProvider so it can read formContext.
// Registers this form instance on mount and streams live snapshots on every
// field change via a watch subscription.
interface DevToolsRegistrarProps {
  formId: string;
  formLabel: string;
  initialValues: Record<string, unknown>;
}

const DevToolsRegistrar: React.FC<DevToolsRegistrarProps> = ({
  formId,
  formLabel,
  initialValues,
}) => {
  const { enabled, registerForm, updateForm, unregisterForm } = useDevTools();
  const {
    watch,
    formState: {
      errors,
      dirtyFields,
      touchedFields,
      isSubmitting,
      submitCount,
    },
  } = useFormContext();

  // Register on mount; unregister on unmount
  useEffect(() => {
    if (!enabled) return;
    const values = watch();
    const normalizedErrors: Record<string, string | undefined> = {};
    Object.entries(errors).forEach(([k, v]) => {
      normalizedErrors[k] = normalizeError(v);
    });
    registerForm(formId, {
      id: formId,
      label: formLabel,
      values: values as Record<string, unknown>,
      initialValues,
      errors: normalizedErrors,
      dirtyFields: dirtyFields as Record<string, boolean>,
      touchedFields: touchedFields as Record<string, boolean>,
      isSubmitting,
      submitCount,
    });
    return () => unregisterForm(formId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [enabled]);

  // Stream every value change as a watch subscription
  useEffect(() => {
    if (!enabled) return;
    const subscription = watch((values) => {
      const normalizedErrors: Record<string, string | undefined> = {};
      Object.entries(errors).forEach(([k, v]) => {
        normalizedErrors[k] = normalizeError(v);
      });
      updateForm(formId, {
        values: values as Record<string, unknown>,
        errors: normalizedErrors,
        dirtyFields: dirtyFields as Record<string, boolean>,
        touchedFields: touchedFields as Record<string, boolean>,
        isSubmitting,
        submitCount,
      });
    });
    return () => subscription.unsubscribe();
  }, [
    enabled,
    watch,
    errors,
    dirtyFields,
    touchedFields,
    isSubmitting,
    submitCount,
    formId,
    updateForm,
  ]);

  return null;
};

// ─── Internal RHF Provider ────────────────────────────────────────────────────
const RavenRHFFormProvider: React.FC<FormAdapterProviderProps> = ({
  onSubmit,
  children,
  defaultValues = {},
}) => {
  const methods = useForm({ defaultValues, mode: "onChange" });
  // Stable form id for the lifetime of this provider instance
  const formIdRef = useRef(nextFormId("rhf"));
  const formId = formIdRef.current;
  // Build a human-readable label from pathname (client-side only)
  const formLabel =
    typeof window !== "undefined"
      ? `${window.location.pathname} · ${formId}`
      : formId;

  const handleSubmit = methods.handleSubmit(async (data) => {
    await onSubmit(data as Record<string, unknown>);
  });

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={handleSubmit}
        noValidate
        style={{ display: "contents" }}
        data-raven-form="true"
      >
        <DevToolsRegistrar
          formId={formId}
          formLabel={formLabel}
          initialValues={defaultValues as Record<string, unknown>}
        />
        {children}
      </form>
    </FormProvider>
  );
};

// ─── useField ─────────────────────────────────────────────────────────────────
function useRavenRHFField(name: string): FieldBinding {
  const { control } = useFormContext();
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

// ─── useSubmit ────────────────────────────────────────────────────────────────
function useRavenRHFSubmit(): () => void {
  const { handleSubmit } = useFormContext();
  return useCallback(() => {
    const form = document.querySelector<HTMLFormElement>(
      "form[data-raven-form]",
    );
    form?.requestSubmit();
  }, [handleSubmit]);
}

// ─── useWatch ─────────────────────────────────────────────────────────────────
function useRavenRHFWatch(names?: string[]): Record<string, unknown> {
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

// ─── useTrigger ───────────────────────────────────────────────────────────────
function useRavenRHFTrigger(): (names: string[]) => Promise<boolean> {
  const { trigger } = useFormContext();
  return useCallback((names: string[]) => trigger(names), [trigger]);
}

// ─── Export ───────────────────────────────────────────────────────────────────
export const RavenRHFAdapter = createFormAdapter({
  Provider: RavenRHFFormProvider,
  useField: useRavenRHFField,
  useSubmit: useRavenRHFSubmit,
  useWatch: useRavenRHFWatch,
  useTrigger: useRavenRHFTrigger,
});
