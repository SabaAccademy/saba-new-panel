"use client";

import React, { useState, memo } from "react";
import type {
  UIAdapter,
  UIInputProps,
  UISelectProps,
  UIFormItemProps,
} from "../types";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { Icon } from "@iconify/react/dist/iconify.js";

// ─── FormItem ─────────────────────────────────────────────────────────────────
const ShadCNFormItem = memo<UIFormItemProps>(
  ({ label, fieldId, error, description, required, children, className }) => (
    <div className={cn("flex flex-col gap-1.5", className)}>
      {label && (
        <Label
          htmlFor={fieldId}
          className={cn("text-sm font-medium", error && "text-destructive")}
        >
          {label}
          {required && <span className="text-destructive ms-1">*</span>}
        </Label>
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
ShadCNFormItem.displayName = "ShadCNFormItem";

// ─── Input ─────────────────────────────────────────────────────────────────────
const ShadCNInput = memo<UIInputProps>(
  ({
    value,
    onChange,
    onBlur,
    placeholder,
    disabled,
    type,
    error,
    className,
    ...rest
  }) => (
    <Input
      type={type ?? "text"}
      value={(value as string) ?? ""}
      onChange={(e) => onChange?.(e.target.value)}
      onBlur={onBlur}
      placeholder={placeholder}
      disabled={disabled}
      className={cn(
        error && "border-destructive focus-visible:ring-destructive",
        className,
      )}
      {...(rest as React.InputHTMLAttributes<HTMLInputElement>)}
    />
  ),
);
ShadCNInput.displayName = "ShadCNInput";

// ─── Password ─────────────────────────────────────────────────────────────────
const ShadCNPasswordInput = memo<UIInputProps>(
  ({ value, onChange, onBlur, placeholder, disabled, error, className }) => {
    const [show, setShow] = useState(false);
    return (
      <div className="relative">
        <Input
          type={show ? "text" : "password"}
          value={(value as string) ?? ""}
          onChange={(e) => onChange?.(e.target.value)}
          onBlur={onBlur}
          placeholder={placeholder}
          disabled={disabled}
          className={cn(
            "pe-10",
            error && "border-destructive focus-visible:ring-destructive",
            className,
          )}
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
ShadCNPasswordInput.displayName = "ShadCNPasswordInput";

// ─── Textarea ─────────────────────────────────────────────────────────────────
const ShadCNTextarea = memo<UIInputProps>(
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
    <Textarea
      value={(value as string) ?? ""}
      onChange={(e) => onChange?.(e.target.value)}
      onBlur={onBlur}
      placeholder={placeholder}
      disabled={disabled}
      className={cn(error && "border-destructive", className)}
      rows={(rest.rows as number) ?? 3}
    />
  ),
);
ShadCNTextarea.displayName = "ShadCNTextarea";

// ─── Select ───────────────────────────────────────────────────────────────────
const ShadCNSelect = memo<UISelectProps>(
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
    <Select
      value={(value as string) ?? ""}
      onValueChange={(v) => {
        onChange?.(v);
        onBlur?.();
      }}
      disabled={disabled}
    >
      <SelectTrigger className={cn(error && "border-destructive", className)}>
        <SelectValue placeholder={placeholder ?? "انتخاب کنید..."} />
      </SelectTrigger>
      <SelectContent>
        {options?.map((opt) => (
          <SelectItem
            key={String(opt.value)}
            value={String(opt.value)}
            disabled={opt.disabled}
          >
            {opt.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  ),
);
ShadCNSelect.displayName = "ShadCNSelect";

// ─── Checkbox ─────────────────────────────────────────────────────────────────
const ShadCNCheckbox = memo<UIInputProps>(
  ({ value, onChange, onBlur, disabled, id, label, error }) => (
    <div className="flex items-center gap-2">
      <Checkbox
        id={id}
        checked={(value as boolean) ?? false}
        onCheckedChange={(checked) => {
          onChange?.(checked);
          onBlur?.();
        }}
        disabled={disabled}
        className={cn(error && "border-destructive")}
      />
      {label && (
        <Label htmlFor={id} className="text-sm cursor-pointer">
          {label}
        </Label>
      )}
    </div>
  ),
);
ShadCNCheckbox.displayName = "ShadCNCheckbox";

// ─── Radio ─────────────────────────────────────────────────────────────────────
const ShadCNRadio = memo<UISelectProps>(
  ({ value, onChange, onBlur, disabled, options, error }) => (
    <RadioGroup
      value={(value as string) ?? ""}
      onValueChange={(v) => {
        onChange?.(v);
        onBlur?.();
      }}
      disabled={disabled}
      className="flex flex-col gap-2"
    >
      {options?.map((opt) => (
        <div key={String(opt.value)} className="flex items-center gap-2">
          <RadioGroupItem
            value={String(opt.value)}
            id={String(opt.value)}
            disabled={opt.disabled}
          />
          <Label htmlFor={String(opt.value)} className="text-sm cursor-pointer">
            {opt.label}
          </Label>
        </div>
      ))}
    </RadioGroup>
  ),
);
ShadCNRadio.displayName = "ShadCNRadio";

// ─── Switch ───────────────────────────────────────────────────────────────────
const ShadCNSwitch = memo<UIInputProps>(
  ({ value, onChange, onBlur, disabled, id, label }) => (
    <div className="flex items-center gap-2">
      <Switch
        id={id}
        checked={(value as boolean) ?? false}
        onCheckedChange={(checked) => {
          onChange?.(checked);
          onBlur?.();
        }}
        disabled={disabled}
      />
      {label && (
        <Label htmlFor={id} className="text-sm cursor-pointer">
          {label}
        </Label>
      )}
    </div>
  ),
);
ShadCNSwitch.displayName = "ShadCNSwitch";

// ─── DatePicker ───────────────────────────────────────────────────────────────
import { SmartDatePicker } from "@/components/ui/smart-date-picker";

const ShadCNDatePicker = memo<UIInputProps>(
  ({ value, onChange, onBlur, placeholder, disabled, error, className }) => (
    <SmartDatePicker
      value={value as string | Date | null}
      onChange={(v) => onChange?.(v)}
      placeholder={placeholder}
      disabled={disabled}
      className={cn("w-full", className)}
      hasError={!!error}
      calendarType="jalali" // Enables +3:30 Tehran handling
    />
  ),
);
ShadCNDatePicker.displayName = "ShadCNDatePicker";

// ─── OTP Input ────────────────────────────────────────────────────────────────
const ShadCNOTPInput = memo<UIInputProps>(
  ({ value, onChange, onBlur, disabled, error, className }) => (
    <Input
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
        "tracking-[0.5em] text-center text-lg font-mono",
        error && "border-destructive",
        className,
      )}
    />
  ),
);
ShadCNOTPInput.displayName = "ShadCNOTPInput";

// ─── File Input ────────────────────────────────────────────────────────────────
const ShadCNFileInput = memo<UIInputProps>(
  ({ onChange, onBlur, disabled, error, className, ...rest }) => (
    <label
      className={cn(
        "w-full flex items-center gap-2.5 cursor-pointer rounded-md border border-input bg-background px-3 py-2 text-sm hover:bg-muted/40 transition-colors",
        error && "border-destructive",
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
ShadCNFileInput.displayName = "ShadCNFileInput";

// ─── Multi Select ──────────────────────────────────────────────────────────────
const ShadCNMultiSelect = memo<UISelectProps>(
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
            "w-full flex items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm text-left hover:bg-muted/20 transition-colors",
            error && "border-destructive",
            className,
          )}
        >
          <span
            className={cn(
              "flex-1 truncate",
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
                  <Checkbox
                    checked={checked}
                    disabled={opt.disabled}
                    onCheckedChange={() => toggle(String(opt.value))}
                    className="h-3.5 w-3.5"
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
ShadCNMultiSelect.displayName = "ShadCNMultiSelect";

// ─── Range ─────────────────────────────────────────────────────────────────────
const ShadCNRange = memo<UIInputProps>(
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
        <span className="text-sm font-semibold text-foreground min-w-10 text-right tabular-nums">
          {v}
        </span>
      </div>
    );
  },
);
ShadCNRange.displayName = "ShadCNRange";

// ─── Color Picker ─────────────────────────────────────────────────────────────
const ShadCNColorPicker = memo<UIInputProps>(
  ({ value, onChange, onBlur, disabled, error, className }) => {
    const hex = (value as string) || "#3b82f6";
    return (
      <div className={cn("w-full flex items-center gap-3", className)}>
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
ShadCNColorPicker.displayName = "ShadCNColorPicker";

// ─── Rating ────────────────────────────────────────────────────────────────────
const ShadCNRating = memo<UIInputProps>(
  ({ value, onChange, onBlur, disabled, className, ...rest }) => {
    const [hovered, setHovered] = useState(0);
    const max = (rest.max as number) ?? 5;
    const v = (value as number) ?? 0;
    const display = hovered || v;
    return (
      <div className={cn("w-full flex items-center gap-1", className)}>
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
ShadCNRating.displayName = "ShadCNRating";

// ─── Export ────────────────────────────────────────────────────────────────────
export const ShadCNUIAdapter: UIAdapter = {
  Input: ShadCNInput,
  Textarea: ShadCNTextarea,
  PasswordInput: ShadCNPasswordInput,
  DatePicker: ShadCNDatePicker,
  Select: ShadCNSelect,
  MultiSelect: ShadCNMultiSelect,
  Radio: ShadCNRadio,
  Checkbox: ShadCNCheckbox,
  Switch: ShadCNSwitch,
  OTPInput: ShadCNOTPInput,
  FileInput: ShadCNFileInput,
  Range: ShadCNRange,
  ColorPicker: ShadCNColorPicker,
  Rating: ShadCNRating,
  FormItem: ShadCNFormItem,
};
