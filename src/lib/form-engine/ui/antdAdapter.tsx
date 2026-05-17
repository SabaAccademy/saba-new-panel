// @ts-nocheck
"use client";

/**
 * AntD UI Adapter — wraps vanilla HTML inputs with AntD-style classes
 * so the form-engine works without importing @ant-design/react in every page.
 * For projects that DO have AntD installed, these can be swapped for real AntD components.
 */

import React, { memo, useState } from "react";
import type {
  UIAdapter,
  UIInputProps,
  UISelectProps,
  UIFormItemProps,
} from "../types";
import { cn } from "@/lib/utils";
import { Icon } from "@iconify/react/dist/iconify.js";

const base =
  "w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-colors";
const errCls = "border-destructive focus:ring-destructive";

// ─── FormItem ─────────────────────────────────────────────────────────────────
const AntDFormItem = memo<UIFormItemProps>(
  ({ label, error, description, required, children, className }) => (
    <div className={cn("flex flex-col gap-1.5", className)}>
      {label && (
        <label
          className={cn("text-sm font-medium", error && "text-destructive")}
        >
          {label}
          {required && <span className="text-destructive ms-1">*</span>}
        </label>
      )}
      {children}
      {description && !error && (
        <p className="text-xs text-muted-foreground">{description}</p>
      )}
      {error && (
        <p className="text-xs text-destructive flex items-center gap-1">
          <Icon icon="solar:danger-circle-bold" width={12} />
          {error}
        </p>
      )}
    </div>
  ),
);
AntDFormItem.displayName = "AntDFormItem";

// ─── Input ─────────────────────────────────────────────────────────────────────
const AntDInput = memo<UIInputProps>(
  ({
    value,
    onChange,
    onBlur,
    placeholder,
    disabled,
    type,
    error,
    className,
  }) => (
    <input
      type={type ?? "text"}
      value={(value as string) ?? ""}
      onChange={(e) => onChange?.(e.target.value)}
      onBlur={onBlur}
      placeholder={placeholder}
      disabled={disabled}
      className={cn(base, error && errCls, className)}
    />
  ),
);
AntDInput.displayName = "AntDInput";

// ─── Password ─────────────────────────────────────────────────────────────────
const AntDPasswordInput = memo<UIInputProps>(
  ({ value, onChange, onBlur, placeholder, disabled, error, className }) => {
    const [show, setShow] = useState(false);
    return (
      <div className="relative">
        <input
          type={show ? "text" : "password"}
          value={(value as string) ?? ""}
          onChange={(e) => onChange?.(e.target.value)}
          onBlur={onBlur}
          placeholder={placeholder}
          disabled={disabled}
          className={cn(base, "pe-10", error && errCls, className)}
        />
        <button
          type="button"
          tabIndex={-1}
          onClick={() => setShow((s) => !s)}
          className="absolute inset-y-0 end-0 px-3 flex items-center text-muted-foreground hover:text-foreground"
        >
          <Icon
            icon={show ? "solar:eye-closed-bold" : "solar:eye-bold"}
            width={16}
          />
        </button>
      </div>
    );
  },
);
AntDPasswordInput.displayName = "AntDPasswordInput";

// ─── Textarea ─────────────────────────────────────────────────────────────────
const AntDTextarea = memo<UIInputProps>(
  ({
    value,
    onChange,
    onBlur,
    placeholder,
    disabled,
    error,
    className,
    ...rest
  }) => (
    <textarea
      rows={(rest.rows as number) ?? 3}
      value={(value as string) ?? ""}
      onChange={(e) => onChange?.(e.target.value)}
      onBlur={onBlur}
      placeholder={placeholder}
      disabled={disabled}
      className={cn(base, "resize-y min-h-[80px]", error && errCls, className)}
    />
  ),
);
AntDTextarea.displayName = "AntDTextarea";

// ─── Select ───────────────────────────────────────────────────────────────────
const AntDSelect = memo<UISelectProps>(
  ({
    value,
    onChange,
    onBlur,
    placeholder,
    disabled,
    options,
    error,
    className,
  }) => (
    <select
      value={(value as string) ?? ""}
      onChange={(e) => {
        onChange?.(e.target.value);
        onBlur?.();
      }}
      disabled={disabled}
      className={cn(base, error && errCls, className)}
    >
      <option value="" disabled>
        {placeholder ?? "انتخاب کنید..."}
      </option>
      {options?.map((opt) => (
        <option
          key={String(opt.value)}
          value={String(opt.value)}
          disabled={opt.disabled}
        >
          {opt.label}
        </option>
      ))}
    </select>
  ),
);
AntDSelect.displayName = "AntDSelect";

// ─── Checkbox ─────────────────────────────────────────────────────────────────
const AntDCheckbox = memo<UIInputProps>(
  ({ value, onChange, onBlur, disabled, id, label, error }) => (
    <div className="flex items-center gap-2">
      <input
        type="checkbox"
        id={id}
        checked={(value as boolean) ?? false}
        onChange={(e) => {
          onChange?.(e.target.checked);
          onBlur?.();
        }}
        disabled={disabled}
        className={cn(
          "h-4 w-4 rounded border-input cursor-pointer",
          error && "border-destructive",
        )}
      />
      {label && (
        <label htmlFor={id} className="text-sm cursor-pointer">
          {label}
        </label>
      )}
    </div>
  ),
);
AntDCheckbox.displayName = "AntDCheckbox";

// ─── Radio ─────────────────────────────────────────────────────────────────────
const AntDRadio = memo<UISelectProps>(
  ({ value, onChange, onBlur, disabled, options }) => (
    <div className="flex flex-col gap-2">
      {options?.map((opt) => (
        <div key={String(opt.value)} className="flex items-center gap-2">
          <input
            type="radio"
            id={`radio-${opt.value}`}
            name={String(opt.value)}
            value={String(opt.value)}
            checked={value === opt.value}
            onChange={() => {
              onChange?.(opt.value);
              onBlur?.();
            }}
            disabled={disabled || opt.disabled}
            className="h-4 w-4 cursor-pointer"
          />
          <label
            htmlFor={`radio-${opt.value}`}
            className="text-sm cursor-pointer"
          >
            {opt.label}
          </label>
        </div>
      ))}
    </div>
  ),
);
AntDRadio.displayName = "AntDRadio";

// ─── Switch ───────────────────────────────────────────────────────────────────
const AntDSwitch = memo<UIInputProps>(
  ({ value, onChange, onBlur, disabled, id, label }) => (
    <div className="flex items-center gap-2">
      <button
        type="button"
        id={id}
        role="switch"
        aria-checked={(value as boolean) ?? false}
        disabled={disabled}
        onClick={() => {
          onChange?.(!(value as boolean));
          onBlur?.();
        }}
        className={cn(
          "relative inline-flex h-5 w-10 cursor-pointer items-center rounded-full transition-colors",
          value ? "bg-primary" : "bg-muted",
        )}
      >
        <span
          className={cn(
            "inline-block h-4 w-4 rounded-full bg-white shadow transition-transform",
            value ? "translate-x-5" : "translate-x-0.5",
          )}
        />
      </button>
      {label && (
        <label htmlFor={id} className="text-sm cursor-pointer">
          {label}
        </label>
      )}
    </div>
  ),
);
AntDSwitch.displayName = "AntDSwitch";

// ─── DatePicker ───────────────────────────────────────────────────────────────
const AntDDatePicker = memo<UIInputProps>(
  ({ value, onChange, onBlur, placeholder, disabled, error, className }) => (
    <input
      type="date"
      value={(value as string) ?? ""}
      onChange={(e) => onChange?.(e.target.value)}
      onBlur={onBlur}
      disabled={disabled}
      className={cn(base, error && errCls, className)}
    />
  ),
);
AntDDatePicker.displayName = "AntDDatePicker";

// ─── OTP ──────────────────────────────────────────────────────────────────────
const AntDOTPInput = memo<UIInputProps>(
  ({ value, onChange, onBlur, disabled, error, className }) => (
    <input
      type="text"
      inputMode="numeric"
      maxLength={6}
      value={(value as string) ?? ""}
      onChange={(e) =>
        onChange?.(e.target.value.replace(/\D/g, "").slice(0, 6))
      }
      onBlur={onBlur}
      placeholder="○ ○ ○ ○ ○ ○"
      disabled={disabled}
      className={cn(
        base,
        "tracking-[0.5em] text-center text-lg font-mono",
        error && errCls,
        className,
      )}
    />
  ),
);
AntDOTPInput.displayName = "AntDOTPInput";

// ─── File Input ────────────────────────────────────────────────────────────────
const AntDFileInput = memo<UIInputProps>(
  ({ onChange, onBlur, disabled, error, className, ...rest }) => (
    <label
      className={cn(
        "flex items-center gap-2.5 cursor-pointer w-full rounded-md border border-input bg-background px-3 py-2 text-sm hover:bg-muted/40 transition-colors",
        error && errCls,
        disabled && "opacity-50 cursor-not-allowed",
        className,
      )}
    >
      <Icon
        icon="solar:upload-linear"
        width={16}
        className="text-muted-foreground shrink-0"
      />
      <span className="text-muted-foreground text-xs truncate">
        Choose file…
      </span>
      <input
        type="file"
        disabled={disabled}
        className="sr-only"
        onChange={(e) => {
          onChange?.(e.target.files?.[0] ?? null);
          onBlur?.();
        }}
        {...(rest as React.InputHTMLAttributes<HTMLInputElement>)}
      />
    </label>
  ),
);
AntDFileInput.displayName = "AntDFileInput";

// ─── Multi Select ──────────────────────────────────────────────────────────────
const AntDMultiSelect = memo<UISelectProps>(
  ({
    value,
    onChange,
    onBlur,
    placeholder,
    disabled,
    options,
    error,
    className,
  }) => {
    const [open, setOpen] = useState(false);
    const selected: string[] = Array.isArray(value) ? (value as string[]) : [];

    const toggle = (v: string) => {
      const next = selected.includes(v)
        ? selected.filter((s) => s !== v)
        : [...selected, v];
      onChange?.(next);
    };

    return (
      <div className="relative">
        <button
          type="button"
          disabled={disabled}
          onClick={() => setOpen((o) => !o)}
          className={cn(
            base,
            "flex items-center justify-between",
            error && errCls,
            className,
          )}
        >
          <span
            className={cn(
              "flex-1 truncate text-left",
              selected.length === 0 && "text-muted-foreground",
            )}
          >
            {selected.length > 0
              ? selected.join(", ")
              : (placeholder ?? "Select options…")}
          </span>
          <Icon
            icon={
              open ? "solar:alt-arrow-up-linear" : "solar:alt-arrow-down-linear"
            }
            width={14}
            className="text-muted-foreground ms-2 shrink-0"
          />
        </button>
        {open && (
          <div className="absolute top-full left-0 right-0 z-50 mt-1 rounded-md border border-input bg-background shadow-lg p-1">
            {options?.map((opt) => {
              const checked = selected.includes(String(opt.value));
              return (
                <label
                  key={String(opt.value)}
                  className={cn(
                    "flex items-center gap-2 px-3 py-1.5 text-sm rounded cursor-pointer hover:bg-muted/50 transition-colors",
                    opt.disabled && "opacity-50 cursor-not-allowed",
                  )}
                >
                  <input
                    type="checkbox"
                    className="h-3.5 w-3.5 cursor-pointer"
                    checked={checked}
                    disabled={opt.disabled}
                    onChange={() => toggle(String(opt.value))}
                  />
                  <span>{opt.label}</span>
                </label>
              );
            })}
            <div className="border-t border-border mt-1 pt-1">
              <button
                type="button"
                onClick={() => {
                  setOpen(false);
                  onBlur?.();
                }}
                className="w-full text-xs text-muted-foreground hover:text-foreground py-1 text-center rounded"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    );
  },
);
AntDMultiSelect.displayName = "AntDMultiSelect";

// ─── Range ─────────────────────────────────────────────────────────────────────
const AntDRange = memo<UIInputProps>(
  ({ value, onChange, onBlur, disabled, error, className, ...rest }) => {
    const min = (rest.min as number) ?? 0;
    const max = (rest.max as number) ?? 100;
    const step = (rest.step as number) ?? 1;
    const v = (value as number) ?? min;
    return (
      <div className="flex items-center gap-3">
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={v}
          disabled={disabled}
          onChange={(e) => onChange?.(Number(e.target.value))}
          onBlur={onBlur}
          className={cn(
            "w-full h-2 accent-primary cursor-pointer rounded-full",
            error && "accent-destructive",
            className,
          )}
        />
        <span className="text-sm font-semibold text-foreground min-w-[2.5rem] text-right tabular-nums">
          {v}
        </span>
      </div>
    );
  },
);
AntDRange.displayName = "AntDRange";

// ─── Color Picker ─────────────────────────────────────────────────────────────
const AntDColorPicker = memo<UIInputProps>(
  ({ value, onChange, onBlur, disabled, error, className }) => {
    const hex = (value as string) || "#3b82f6";
    return (
      <div className="flex items-center gap-3">
        <div
          className={cn(
            "relative w-10 h-9 rounded-md border border-input overflow-hidden cursor-pointer",
            error && "border-destructive",
            disabled && "opacity-50 cursor-not-allowed",
          )}
          style={{ backgroundColor: hex }}
        >
          <input
            type="color"
            value={hex}
            disabled={disabled}
            onChange={(e) => onChange?.(e.target.value)}
            onBlur={onBlur}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          />
        </div>
        <span className="font-mono text-sm text-muted-foreground">{hex}</span>
        <div
          className="w-5 h-5 rounded-full border border-border shadow-sm"
          style={{ backgroundColor: hex }}
        />
      </div>
    );
  },
);
AntDColorPicker.displayName = "AntDColorPicker";

// ─── Rating ────────────────────────────────────────────────────────────────────
const AntDRating = memo<UIInputProps>(
  ({ value, onChange, onBlur, disabled, className, ...rest }) => {
    const [hovered, setHovered] = useState(0);
    const max = (rest.max as number) ?? 5;
    const v = (value as number) ?? 0;
    const display = hovered || v;
    return (
      <div className={cn("flex items-center gap-1", className)}>
        {Array.from({ length: max }, (_, i) => i + 1).map((star) => (
          <button
            key={star}
            type="button"
            disabled={disabled}
            onMouseEnter={() => !disabled && setHovered(star)}
            onMouseLeave={() => !disabled && setHovered(0)}
            onClick={() => {
              onChange?.(star);
              onBlur?.();
            }}
            className={cn(
              "text-2xl leading-none transition-colors focus:outline-none",
              star <= display
                ? "text-amber-400"
                : "text-gray-200 dark:text-gray-700",
              !disabled &&
                "hover:scale-110 transition-transform cursor-pointer",
              disabled && "cursor-not-allowed",
            )}
          >
            ★
          </button>
        ))}
        {v > 0 && (
          <span className="text-xs text-muted-foreground ms-1">
            ({v}/{max})
          </span>
        )}
      </div>
    );
  },
);
AntDRating.displayName = "AntDRating";

// ─── Export ────────────────────────────────────────────────────────────────────
export const AntDUIAdapter: UIAdapter = {
  Input: AntDInput,
  Textarea: AntDTextarea,
  PasswordInput: AntDPasswordInput,
  DatePicker: AntDDatePicker,
  Select: AntDSelect,
  MultiSelect: AntDMultiSelect,
  Radio: AntDRadio,
  Checkbox: AntDCheckbox,
  Switch: AntDSwitch,
  OTPInput: AntDOTPInput,
  FileInput: AntDFileInput,
  Range: AntDRange,
  ColorPicker: AntDColorPicker,
  Rating: AntDRating,
  FormItem: AntDFormItem,
};
