// @ts-nocheck
"use client";

/**
 * ShadCN/Radix UI adapter for raven-form-engine.
 * Wraps the existing ShadCN components into the raven-form-engine UIAdapter format.
 */

import { type ComponentType } from "react";
import {
  createUIAdapter,
  type UIFieldProps,
  type UIFormItemProps,
} from "raven-form-engine";
import { ShadCNUIAdapter } from "./shadcnAdapter";

// Cast existing ShadCN components (which use optional onChange) to the
// raven-form-engine UIFieldProps signature (onChange required).
type AnyComp = ComponentType<UIFieldProps>;

export const RavenShadcnUIAdapter = createUIAdapter({
  components: {
    text: ShadCNUIAdapter.Input as AnyComp,
    email: ShadCNUIAdapter.Input as AnyComp,
    tel: ShadCNUIAdapter.Input as AnyComp,
    url: ShadCNUIAdapter.Input as AnyComp,
    number: ShadCNUIAdapter.Input as AnyComp,
    password: ShadCNUIAdapter.PasswordInput as AnyComp,
    textarea: ShadCNUIAdapter.Textarea as AnyComp,
    date: ShadCNUIAdapter.DatePicker as AnyComp,
    time: ShadCNUIAdapter.Input as AnyComp,
    datetime: ShadCNUIAdapter.Input as AnyComp,
    select: ShadCNUIAdapter.Select as AnyComp,
    multiselect: ShadCNUIAdapter.MultiSelect as AnyComp,
    radio: ShadCNUIAdapter.Radio as AnyComp,
    checkbox: ShadCNUIAdapter.Checkbox as AnyComp,
    switch: ShadCNUIAdapter.Switch as AnyComp,
    otp: ShadCNUIAdapter.OTPInput as AnyComp,
    file: ShadCNUIAdapter.FileInput as AnyComp,
    range: ShadCNUIAdapter.Range as AnyComp,
    color: ShadCNUIAdapter.ColorPicker as AnyComp,
    rating: ShadCNUIAdapter.Rating as AnyComp,
  },
  FormItem: ShadCNUIAdapter.FormItem as ComponentType<UIFormItemProps>,
  inlineTypes: ["checkbox", "switch"],
});
