// @ts-nocheck
"use client";

import React, { memo, useCallback, useMemo, useState } from "react";
import type {
  SmartFormProps,
  FormField,
  FormAdapter,
  UIAdapter,
  FieldRenderContext,
} from "./types";
import { useSmartField } from "./hooks/useSmartField";
import { SmartRepeaterField } from "./SmartRepeaterField";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Icon } from "@iconify/react/dist/iconify.js";

// ─── State Inspector ──────────────────────────────────────────────────────────
const StateInspector = memo(({ adapter }: { adapter: FormAdapter }) => {
  const values = adapter.useWatch();
  return (
    <div className="mt-4 rounded-xl border border-border bg-muted/40 p-3">
      <p className="text-xs font-semibold text-muted-foreground mb-2 flex items-center gap-1">
        <Icon icon="solar:bug-bold" width={13} /> Form State Inspector
      </p>
      <pre className="text-xs text-foreground/70 overflow-auto max-h-40 whitespace-pre-wrap">
        {JSON.stringify(values, null, 2)}
      </pre>
    </div>
  );
});
StateInspector.displayName = "StateInspector";

// ─── Individual Smart Field ────────────────────────────────────────────────────
interface SmartFieldProps {
  field: FormField;
  adapter: FormAdapter;
  ui: UIAdapter;
  watchedValues: Record<string, unknown>;
}

const SmartField = memo<SmartFieldProps>(
  ({ field, adapter, ui, watchedValues }) => {
    const rawBinding = adapter.useField(field.name);

    const { handleChange, displayValue, error, onBlur, isValidating } =
      useSmartField({
        field,
        binding: rawBinding,
      });

    // Evaluate dynamic disabled/hidden
    const isDisabled = useMemo(
      () =>
        typeof field.disabled === "function"
          ? field.disabled(watchedValues)
          : (field.disabled ?? false),
      [field.disabled, watchedValues],
    );

    const isHidden = useMemo(
      () =>
        typeof field.hidden === "function"
          ? field.hidden(watchedValues)
          : (field.hidden ?? false),
      [field.hidden, watchedValues],
    );

    if (isHidden) return null;

    const colClass = field.colSpan
      ? `col-span-12 sm:col-span-${field.colSpan}`
      : "col-span-12 sm:col-span-6";

    const isRequired = !!field.validation?.required;

    // Repeater type
    if (field.type === "repeater") {
      return (
        <SmartRepeaterField key={field.name} field={field} adapter={adapter} ui={ui} />
      );
    }

    // Custom render
    if (field.type === "custom" && field.render) {
      const ctx: FieldRenderContext = {
        name: field.name,
        value: displayValue,
        onChange: handleChange,
        onBlur,
        error,
        disabled: isDisabled,
        label: field.label,
        placeholder: field.placeholder,
      };
      return (
        <div className={colClass} style={{ animationDelay: "0ms" }}>
          {field.render(ctx)}
        </div>
      );
    }

    const commonProps = {
      id: field.name,
      value: displayValue,
      onChange: handleChange,
      onBlur,
      placeholder: field.placeholder,
      disabled: isDisabled,
      error,
      label: field.label,
      ...(field.componentProps ?? {}),
    };

    const renderInput = () => {
      switch (field.type) {
        // ── Basic text variants ──────────────────────────────────────────────
        case "email":
          return <ui.Input {...commonProps} type="email" />;
        case "tel":
          return <ui.Input {...commonProps} type="tel" />;
        case "url":
          return <ui.Input {...commonProps} type="url" />;
        case "number":
          return <ui.Input {...commonProps} type="number" />;
        case "password":
          return <ui.PasswordInput {...commonProps} />;
        // ── Multi-line ───────────────────────────────────────────────────────
        case "textarea":
          return <ui.Textarea {...commonProps} />;
        // ── Date / time ──────────────────────────────────────────────────────
        case "date":
          return <ui.DatePicker {...commonProps} />;
        case "time":
          return <ui.Input {...commonProps} type="time" />;
        case "datetime":
          return <ui.Input {...commonProps} type="datetime-local" />;
        // ── Selection ────────────────────────────────────────────────────────
        case "select":
          return <ui.Select {...commonProps} options={field.options} />;
        case "multiselect":
          return <ui.MultiSelect {...commonProps} options={field.options} />;
        case "radio":
          return <ui.Radio {...commonProps} options={field.options} />;
        // ── Toggle ───────────────────────────────────────────────────────────
        case "checkbox":
          return <ui.Checkbox {...commonProps} />;
        case "switch":
          return <ui.Switch {...commonProps} />;
        // ── Special ──────────────────────────────────────────────────────────
        case "otp":
          return <ui.OTPInput {...commonProps} />;
        case "file":
          return <ui.FileInput {...commonProps} />;
        case "range":
          return <ui.Range {...commonProps} />;
        case "color":
          return <ui.ColorPicker {...commonProps} />;
        case "rating":
          return <ui.Rating {...commonProps} />;
        // ── Default ──────────────────────────────────────────────────────────
        default:
          return <ui.Input {...commonProps} type="text" />;
      }
    };

    const skipFormItem = field.type === "checkbox" || field.type === "switch";

    if (skipFormItem) {
      return (
        <div className={cn(colClass, "flex items-center pt-6")}>
          {renderInput()}
          {isValidating && (
            <Icon
              icon="solar:refresh-circle-bold"
              width={14}
              className="text-muted-foreground animate-spin ms-2"
            />
          )}
        </div>
      );
    }

    return (
      <div className={colClass}>
        <ui.FormItem
          label={field.label}
          fieldId={field.name}
          error={error}
          description={field.description}
          required={isRequired}
        >
          <div className="relative">
            {renderInput()}
            {isValidating && (
              <Icon
                icon="solar:refresh-circle-bold"
                width={14}
                className="absolute top-1/2 end-3 -translate-y-1/2 text-muted-foreground animate-spin"
              />
            )}
          </div>
        </ui.FormItem>
      </div>
    );
  },
);
SmartField.displayName = "SmartField";

// ─── Submit Button (connected) ─────────────────────────────────────────────────
const SmartSubmitButton = memo(
  ({
    adapter,
    submitLabel,
    resetLabel,
    showReset,
    submitClassName,
  }: {
    adapter: FormAdapter;
    submitLabel: string;
    resetLabel?: string;
    showReset?: boolean;
    submitClassName?: string;
  }) => {
    const [loading, setLoading] = useState(false);
    return (
      <div className="col-span-12 flex items-center gap-3 pt-2">
        <Button
          type="submit"
          className={cn("min-w-[120px]", submitClassName)}
          disabled={loading}
        >
          {loading ? (
            <Icon
              icon="solar:refresh-circle-bold"
              width={16}
              className="animate-spin me-2"
            />
          ) : null}
          {submitLabel}
        </Button>
        {showReset && (
          <Button type="reset" variant="outline">
            {resetLabel ?? "پاک کردن"}
          </Button>
        )}
      </div>
    );
  },
);
SmartSubmitButton.displayName = "SmartSubmitButton";

// ─── Inner grid (needs to be inside FormProvider to call useWatch) ─────────────
const SmartFormInner = memo(
  ({
    schema,
    adapter,
    ui,
    submitLabel,
    resetLabel,
    showReset,
    showStateInspector,
    className,
    submitClassName,
  }: Omit<SmartFormProps, "onSubmit" | "defaultValues">) => {
    const dependentNames = useMemo(
      () => [
        ...new Set(
          schema.fields.filter((f) => f.dependsOn).flatMap((f) => f.dependsOn!),
        ),
      ],
      [schema.fields],
    );

    const watchedValues = adapter.useWatch(
      dependentNames.length > 0 ? dependentNames : undefined,
    );

    const cols = schema.columns ?? 12;
    const gap = schema.gap ?? "gap-4";

    return (
      <>
        <div
          className={cn(`grid gap-x-4 ${gap}`, className)}
          style={{ gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))` }}
          data-smart-form
        >
          {schema.fields.map((field) => (
            <SmartField
              key={field.name}
              field={field}
              adapter={adapter}
              ui={ui}
              watchedValues={watchedValues}
            />
          ))}
          <SmartSubmitButton
            adapter={adapter}
            submitLabel={submitLabel ?? "ذخیره"}
            resetLabel={resetLabel}
            showReset={showReset}
            submitClassName={submitClassName}
          />
        </div>
        {showStateInspector && <StateInspector adapter={adapter} />}
      </>
    );
  },
);
SmartFormInner.displayName = "SmartFormInner";

// ─── SmartForm ─────────────────────────────────────────────────────────────────
export const SmartForm = memo<SmartFormProps>((props) => {
  const { schema, adapter, ui, onSubmit, defaultValues, ...rest } = props;

  return (
    <adapter.Provider
      schema={schema}
      onSubmit={onSubmit}
      defaultValues={defaultValues}
    >
      <SmartFormInner schema={schema} adapter={adapter} ui={ui} {...rest} />
    </adapter.Provider>
  );
});
SmartForm.displayName = "SmartForm";

export default SmartForm;
