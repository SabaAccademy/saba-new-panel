"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { FormField, FieldBinding } from "../types";
import { applyFormatter, applyParser } from "../utils/formatter";

interface UseSmartFieldOptions {
  field: FormField;
  binding: FieldBinding;
  /** debounce ms for async validation (default 400) */
  debounceMs?: number;
}

interface SmartFieldResult extends FieldBinding {
  handleChange: (rawValue: unknown) => void;
  displayValue: unknown;
  isValidating: boolean;
}

/**
 * Applies mask → (formatter on blur) → parser pipeline on top of a raw FieldBinding.
 *
 * Key design:
 *  - mask   → runs on every keystroke (real-time character masking)
 *  - formatter → runs ONLY on blur (avoids cursor-jump / frozen-field UX for
 *                currency and other reformat-on-every-char formatters)
 *  - parser → used to derive the display value from the stored formatted value
 *             (reverse of formatter, e.g. "۱,۵۰۰" → 1500 for display as "1500")
 */
export function useSmartField({
  field,
  binding,
  debounceMs = 400,
}: UseSmartFieldOptions): SmartFieldResult {
  const { onChange, onBlur: bindingOnBlur, value } = binding;
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [isValidating, setIsValidating] = useState(false);

  // Compute display value:
  //   If formatter is set, apply parser to reverse-format stored value back to
  //   a user-friendly raw string (e.g. parseCurrency("۱,۵۰۰") → 1500 → "1500").
  //   Otherwise, show the stored value as-is.
  const displayValue =
    field.formatter && field.parser
      ? applyParser(value, field.parser) // un-format for display during typing
      : value;

  const handleChange = useCallback(
    (rawValue: unknown) => {
      let processed: unknown = rawValue;

      // 1. Apply mask (string input only) — runs every keystroke
      if (field.mask && typeof processed === "string") {
        processed = field.mask(processed);
      }

      // Formatter intentionally NOT applied here — it runs on blur instead.

      // 2. Async validation debounce
      if (field.validation?.asyncCustom) {
        setIsValidating(true);
        if (debounceRef.current) clearTimeout(debounceRef.current);
        debounceRef.current = setTimeout(() => {
          setIsValidating(false);
        }, debounceMs);
      }

      onChange(processed);
    },
    [field.mask, field.validation?.asyncCustom, onChange, debounceMs],
  );

  // Blur handler: apply formatter here so it only runs when the user leaves
  // the field, then calls the original onBlur from the binding.
  const handleBlur = useCallback(() => {
    if (field.formatter) {
      const current = binding.value;
      if (current !== undefined && current !== null && current !== "") {
        const formatted = applyFormatter(current, field.formatter);
        if (formatted !== current) {
          onChange(formatted);
        }
      }
    }
    bindingOnBlur?.();
  }, [field.formatter, binding.value, onChange, bindingOnBlur]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, []);

  return {
    ...binding,
    onBlur: handleBlur,
    handleChange,
    displayValue,
    isValidating,
  };
}
