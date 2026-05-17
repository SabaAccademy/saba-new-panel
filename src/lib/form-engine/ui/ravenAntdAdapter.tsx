// @ts-nocheck
"use client";

/**
 * AntD-style UI adapter for raven-form-engine.
 * Wraps the existing AntD HTML components into the raven-form-engine UIAdapter format.
 */

import { type ComponentType } from "react";
import {
  createUIAdapter,
  type UIFieldProps,
  type UIFormItemProps,
} from "raven-form-engine";
import { AntDUIAdapter } from "./antdAdapter";

type AnyComp = ComponentType<UIFieldProps>;

export const RavenAntDUIAdapter = createUIAdapter({
  components: {
    text: AntDUIAdapter.Input as AnyComp,
    email: AntDUIAdapter.Input as AnyComp,
    tel: AntDUIAdapter.Input as AnyComp,
    url: AntDUIAdapter.Input as AnyComp,
    number: AntDUIAdapter.Input as AnyComp,
    password: AntDUIAdapter.PasswordInput as AnyComp,
    textarea: AntDUIAdapter.Textarea as AnyComp,
    date: AntDUIAdapter.DatePicker as AnyComp,
    time: AntDUIAdapter.Input as AnyComp,
    datetime: AntDUIAdapter.Input as AnyComp,
    select: AntDUIAdapter.Select as AnyComp,
    multiselect: AntDUIAdapter.MultiSelect as AnyComp,
    radio: AntDUIAdapter.Radio as AnyComp,
    checkbox: AntDUIAdapter.Checkbox as AnyComp,
    switch: AntDUIAdapter.Switch as AnyComp,
    otp: AntDUIAdapter.OTPInput as AnyComp,
    file: AntDUIAdapter.FileInput as AnyComp,
    range: AntDUIAdapter.Range as AnyComp,
    color: AntDUIAdapter.ColorPicker as AnyComp,
    rating: AntDUIAdapter.Rating as AnyComp,
  },
  FormItem: AntDUIAdapter.FormItem as ComponentType<UIFormItemProps>,
  inlineTypes: ["checkbox", "switch"],
});
