// @ts-nocheck
"use client";

import React, { memo, useCallback, useMemo, useState } from "react";
import { Icon } from "@iconify/react/dist/iconify.js";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type {
  SmartWizardFormProps,
  WizardStep,
  FormField,
  FormAdapter,
  UIAdapter,
  FieldRenderContext,
  FormSchema,
} from "./types";
import { useSmartField } from "./hooks/useSmartField";
import { SmartRepeaterField } from "./SmartRepeaterField";

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

// ─── Step Progress Bar ────────────────────────────────────────────────────────
const StepBar = memo(
  ({
    steps,
    current,
    completed,
  }: {
    steps: WizardStep[];
    current: number;
    completed: Set<number>;
  }) => (
    <div className="flex items-start gap-0 w-full mb-6 overflow-x-auto pb-1">
      {steps.map((step, i) => {
        const isDone = completed.has(i);
        const isCurrent = i === current;
        const isUpcoming = i > current && !completed.has(i);
        return (
          <React.Fragment key={step.id}>
            <div className="flex flex-col items-center flex-1 min-w-[4rem]">
              {/* Circle */}
              <div
                className={cn(
                  "w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold border-2 transition-all duration-200 shrink-0",
                  isDone &&
                    "bg-emerald-500 border-emerald-500 text-white",
                  isCurrent &&
                    "bg-primary border-primary text-primary-foreground ring-4 ring-primary/20",
                  isUpcoming &&
                    "bg-muted border-border text-muted-foreground",
                )}
              >
                {isDone ? (
                  <Icon icon="solar:check-circle-bold" width={18} />
                ) : step.icon ? (
                  <Icon icon={step.icon} width={16} />
                ) : (
                  i + 1
                )}
              </div>
              {/* Label */}
              <p
                className={cn(
                  "text-[10px] font-medium text-center mt-1.5 leading-tight max-w-[4.5rem]",
                  isCurrent ? "text-primary" : "text-muted-foreground",
                  isDone && "text-emerald-600",
                )}
              >
                {step.title}
              </p>
            </div>

            {/* Connector line */}
            {i < steps.length - 1 && (
              <div className="flex-1 flex items-start pt-[18px]">
                <div
                  className={cn(
                    "h-0.5 w-full transition-colors duration-300",
                    completed.has(i) ? "bg-emerald-500" : "bg-border",
                  )}
                />
              </div>
            )}
          </React.Fragment>
        );
      })}
    </div>
  ),
);
StepBar.displayName = "StepBar";

// ─── Wizard Smart Field ───────────────────────────────────────────────────────
interface WizardSmartFieldProps {
  field: FormField;
  adapter: FormAdapter;
  ui: UIAdapter;
  watchedValues: Record<string, unknown>;
}

const WizardSmartField = memo<WizardSmartFieldProps>(
  ({ field, adapter, ui, watchedValues }) => {
    const rawBinding = adapter.useField(field.name);
    const { handleChange, displayValue, error, onBlur, isValidating } =
      useSmartField({ field, binding: rawBinding });

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

    if (field.type === "repeater") {
      return (
        <SmartRepeaterField field={field} adapter={adapter} ui={ui} />
      );
    }

    const colClass = field.colSpan
      ? `col-span-12 sm:col-span-${field.colSpan}`
      : "col-span-12 sm:col-span-6";

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
      return <div className={colClass}>{field.render(ctx)}</div>;
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
        case "email": return <ui.Input {...commonProps} type="email" />;
        case "tel": return <ui.Input {...commonProps} type="tel" />;
        case "url": return <ui.Input {...commonProps} type="url" />;
        case "number": return <ui.Input {...commonProps} type="number" />;
        case "password": return <ui.PasswordInput {...commonProps} />;
        case "textarea": return <ui.Textarea {...commonProps} />;
        case "date": return <ui.DatePicker {...commonProps} />;
        case "time": return <ui.Input {...commonProps} type="time" />;
        case "datetime": return <ui.Input {...commonProps} type="datetime-local" />;
        case "select": return <ui.Select {...commonProps} options={field.options} />;
        case "multiselect": return <ui.MultiSelect {...commonProps} options={field.options} />;
        case "radio": return <ui.Radio {...commonProps} options={field.options} />;
        case "checkbox": return <ui.Checkbox {...commonProps} />;
        case "switch": return <ui.Switch {...commonProps} />;
        case "otp": return <ui.OTPInput {...commonProps} />;
        case "file": return <ui.FileInput {...commonProps} />;
        case "range": return <ui.Range {...commonProps} />;
        case "color": return <ui.ColorPicker {...commonProps} />;
        case "rating": return <ui.Rating {...commonProps} />;
        default: return <ui.Input {...commonProps} type="text" />;
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
          required={!!field.validation?.required}
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
WizardSmartField.displayName = "WizardSmartField";

// ─── Wizard Inner (needs to live inside FormProvider) ─────────────────────────
const WizardInner = memo(
  ({
    steps,
    adapter,
    ui,
    submitLabel,
    showStateInspector,
    className,
  }: Omit<SmartWizardFormProps, "onSubmit" | "defaultValues">) => {
    const [currentStep, setCurrentStep] = useState(0);
    const [completed, setCompleted] = useState<Set<number>>(new Set());
    const [validating, setValidating] = useState(false);

    const step = steps[currentStep];
    const isLast = currentStep === steps.length - 1;

    // Collect all field names that affect conditional logic in current step
    const dependentNames = useMemo(() => {
      const names = step.fields
        .filter((f) => f.dependsOn)
        .flatMap((f) => f.dependsOn!);
      return [...new Set(names)];
    }, [step.fields]);

    const watchedValues = adapter.useWatch(
      dependentNames.length > 0 ? dependentNames : undefined,
    );

    // Get trigger func (RHF only — other adapters just skip validation)
    const triggerFn = adapter.useTrigger?.();

    const goNext = useCallback(async () => {
      setValidating(true);
      let valid = true;

      if (triggerFn) {
        // Collect required field names in current step (skip repeater/custom)
        const fieldNames = step.fields
          .filter((f) => f.type !== "custom" && f.type !== "repeater")
          .map((f) => f.name);
        valid = await triggerFn(fieldNames);
      }

      setValidating(false);

      if (valid) {
        setCompleted((prev) => new Set([...prev, currentStep]));
        setCurrentStep((s) => Math.min(s + 1, steps.length - 1));
      }
    }, [currentStep, step.fields, steps.length, triggerFn]);

    const goBack = useCallback(() => {
      setCurrentStep((s) => Math.max(s - 1, 0));
    }, []);

    const cols = step.columns ?? 12;

    return (
      <div className={cn("flex flex-col gap-0", className)}>
        {/* Step progress */}
        <StepBar steps={steps} current={currentStep} completed={completed} />

        {/* Step header */}
        <div className="mb-5">
          <h3 className="text-base font-bold flex items-center gap-2">
            {step.icon && (
              <span className="w-7 h-7 rounded-lg bg-primary/10 flex items-center justify-center">
                <Icon icon={step.icon} width={16} className="text-primary" />
              </span>
            )}
            {step.title}
          </h3>
          {step.description && (
            <p className="text-sm text-muted-foreground mt-1">{step.description}</p>
          )}
        </div>

        {/* Fields */}
        <div
          className="grid gap-x-4 gap-y-4"
          style={{ gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))` }}
        >
          {step.fields.map((field) => (
            <WizardSmartField
              key={field.name}
              field={field}
              adapter={adapter}
              ui={ui}
              watchedValues={watchedValues}
            />
          ))}
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between mt-6 pt-4 border-t border-border">
          <Button
            type="button"
            variant="outline"
            onClick={goBack}
            disabled={currentStep === 0}
            className="gap-1.5"
          >
            <Icon icon="solar:arrow-right-bold" width={14} />
            قبلی
          </Button>

          <span className="text-xs text-muted-foreground">
            گام {currentStep + 1} از {steps.length}
          </span>

          {isLast ? (
            <Button type="submit" className="gap-1.5" disabled={validating}>
              {validating && (
                <Icon
                  icon="solar:refresh-circle-bold"
                  width={14}
                  className="animate-spin"
                />
              )}
              <Icon icon="solar:check-circle-bold" width={14} />
              {submitLabel ?? "ارسال"}
            </Button>
          ) : (
            <Button
              type="button"
              onClick={goNext}
              disabled={validating}
              className="gap-1.5"
            >
              {validating ? (
                <Icon
                  icon="solar:refresh-circle-bold"
                  width={14}
                  className="animate-spin"
                />
              ) : null}
              بعدی
              <Icon icon="solar:arrow-left-bold" width={14} />
            </Button>
          )}
        </div>

        {showStateInspector && <StateInspector adapter={adapter} />}
      </div>
    );
  },
);
WizardInner.displayName = "WizardInner";

// ─── SmartWizardForm ──────────────────────────────────────────────────────────
/**
 * Multi-step wizard form built on top of the SmartForm engine.
 * Uses the same adapter/UI adapter as SmartForm — fully compatible
 * with RHFAdapter + ShadCNUIAdapter.
 */
export const SmartWizardForm = memo<SmartWizardFormProps>((props) => {
  const { steps, adapter, ui, onSubmit, defaultValues, ...rest } = props;

  // Build a flat schema combining all step fields so the FormProvider registers them all
  const flatSchema: FormSchema = useMemo(() => {
    const allFields = steps.flatMap((s) =>
      s.fields.flatMap((f) =>
        f.type === "repeater" && f.repeaterConfig
          ? // Register a single placeholder field for the repeater itself
            [f]
          : [f],
      ),
    );
    return { fields: allFields };
  }, [steps]);

  return (
    <adapter.Provider
      schema={flatSchema}
      onSubmit={onSubmit}
      defaultValues={defaultValues}
    >
      <WizardInner steps={steps} adapter={adapter} ui={ui} {...rest} />
    </adapter.Provider>
  );
});
SmartWizardForm.displayName = "SmartWizardForm";

export default SmartWizardForm;
