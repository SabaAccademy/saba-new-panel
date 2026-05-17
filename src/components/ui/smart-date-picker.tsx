"use client";

import React, { forwardRef, useState } from "react";
import DatePicker, { DateObject } from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import gregorian from "react-date-object/calendars/gregorian";
import gregorian_en from "react-date-object/locales/gregorian_en";
import TimePicker from "react-multi-date-picker/plugins/time_picker";
import { cn } from "@/lib/utils";
import moment from "moment-timezone";

export type CalendarType = "jalali" | "gregorian";

export interface SmartDatePickerProps {
  value?: string | Date | null;
  onChange?: (date: string | null) => void;
  calendarType?: CalendarType;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  showTime?: boolean;
  hasError?: boolean;
}

/**
 * Enterprise Date Picker handling both Gregorian and Jalali calendars.
 * Safely resolves the 3:30 Tehran UTC shifting issue by explicit timezone conversions.
 */
export const SmartDatePicker = forwardRef<HTMLInputElement, SmartDatePickerProps>(
  (
    {
      value,
      onChange,
      calendarType = "gregorian",
      placeholder = "Select Date...",
      disabled,
      className,
      showTime = false,
      hasError,
    },
    ref
  ) => {
    // Parse initial value carefully to avoid timezone shift dropping day behind
    const getInitialDate = () => {
      if (!value) return null;
      // In Jalali mode, handling +3:30 for Tehran 
      // ensures the parsed date doesn't drop to yesterday when converting to local midnight.
      if (calendarType === "jalali" && typeof value === "string") {
        const d = moment.tz(value, "Asia/Tehran").toDate();
        return new DateObject({ date: d, calendar: persian, locale: persian_fa });
      }
      return new DateObject({ date: value });
    };

    const isJalali = calendarType === "jalali";

    return (
      <div className={cn("relative w-full", className)}>
        <DatePicker
          value={getInitialDate()}
          onChange={(dateObj: DateObject | DateObject[] | null) => {
            if (!dateObj) {
              onChange?.(null);
              return;
            }
            let isoString = "";
            const d = Array.isArray(dateObj) ? dateObj[0] : dateObj;
            
            if (isJalali) {
              // Convert Persian DateObject precisely considering Tehran timezone (+3:30 / +4:30)
              // We construct the gregorian date equivalents at noon to avoid midnight UTC shift bugs
              const jsDate = new Date(d.toDate().setHours(12, 0, 0, 0));
              isoString = jsDate.toISOString();
            } else {
              isoString = d.toDate().toISOString();
            }
            
            onChange?.(isoString);
          }}
          calendar={isJalali ? persian : gregorian}
          locale={isJalali ? persian_fa : gregorian_en}
          placeholder={placeholder}
          disabled={disabled}
          plugins={showTime ? [<TimePicker key="time" position="bottom" />] : []}
          inputClass={cn(
            "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
            hasError && "border-destructive text-destructive",
            "text-start"
          )}
          containerClassName="w-full"
        />
      </div>
    );
  }
);

SmartDatePicker.displayName = "SmartDatePicker";
