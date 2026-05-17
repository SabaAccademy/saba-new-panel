"use client";

import React, { memo, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Icon } from "@iconify/react/dist/iconify.js";
import {
  RavenForm,
  RavenWizardForm,
  RavenFormProvider,
  maskPhone,
  maskBankCard,
  maskCurrency,
  maskPostalCode,
  formatTrim,
} from "raven-form-engine";
import type { FormSchema, WizardStep } from "raven-form-engine";
import { RavenRHFAdapter } from "@/lib/form-engine/adapters/ravenRHFAdapter";
import { RavenAntDAdapter } from "@/lib/form-engine/adapters/ravenAntdAdapter";
import { RavenShadcnUIAdapter } from "@/lib/form-engine/ui/ravenShadcnAdapter";
import { RavenAntDUIAdapter } from "@/lib/form-engine/ui/ravenAntdAdapter";

// ─── Code strings ──────────────────────────────────────────────────────────────
const CODE_STRUCTURE =
  "raven-form-engine (npm package)\n\nLocal adapter wrappers:\n  adapters/\n    ravenRHFAdapter.tsx   React Hook Form adapter\n    ravenAntdAdapter.tsx  Zero-dep in-memory adapter\n  ui/\n    ravenShadcnAdapter.tsx  shadCN/Radix UI mapping\n    ravenAntdAdapter.tsx    AntD-style HTML mapping\n\nAll masks & formatters re-exported from raven-form-engine";
const CODE_MINIMAL_USAGE =
  "import { RavenForm, RavenFormProvider } from 'raven-form-engine'\nimport { RavenRHFAdapter } from '@/lib/form-engine/adapters/ravenRHFAdapter'\nimport { RavenShadcnUIAdapter } from '@/lib/form-engine/ui/ravenShadcnAdapter'\n\n// Wrap your app once:\n<RavenFormProvider uiAdapter={RavenShadcnUIAdapter} formAdapter={RavenRHFAdapter}>\n  <RavenForm\n    schema={{ fields: [\n      { name: 'name', type: 'text', label: 'نام', colSpan: 6, validation: { required: true } },\n      { name: 'email', type: 'text', label: 'ایمیل', colSpan: 6 },\n    ] }}\n    onSubmit={(values) => console.log(values)}\n  />\n</RavenFormProvider>";
const CODE_SIMPLE_SCHEMA =
  "import { formatTrim } from 'raven-form-engine'\n\nconst schema: FormSchema = {\n  fields: [\n    { name: 'name', type: 'text', label: 'نام', colSpan: 6,\n      formatter: formatTrim, validation: { required: true, minLength: 3 } },\n    { name: 'email', type: 'text', label: 'ایمیل', colSpan: 6,\n      validation: { required: true, pattern: /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/ } },\n    { name: 'password', type: 'password', colSpan: 12,\n      validation: { required: true, minLength: 8 } },\n    { name: 'terms', type: 'checkbox', label: 'قوانین را می‌پذیرم', colSpan: 12 },\n  ]\n}\n\n<RavenForm schema={schema} adapter={RavenRHFAdapter} ui={RavenShadcnUIAdapter}\n  onSubmit={handleSubmit} submitLabel='ثبت‌نام' showReset showStateInspector />";
const CODE_ADVANCED_SCHEMA =
  "// phone mask\n{ name: 'phone', mask: maskPhone }     // 0912 → 0912 345 6789\n\n// async validation with debounce\n{ name: 'username', validation: {\n  asyncCustom: async (v) => {\n    await new Promise(r => setTimeout(r, 600))   // simulate API call\n    return ['admin','root'].includes(v) ? 'این نام مجاز نیست' : null\n  }\n}}\n\n// swap adapters — zero code change in components:\n<RavenForm adapter={RavenAntDAdapter} ui={RavenAntDUIAdapter} />\n<RavenForm adapter={RavenRHFAdapter}  ui={RavenShadcnUIAdapter} />";
const CODE_CONDITIONAL =
  "// hidden as function:\n{ name: 'firstName',\n  hidden: (values) => values.accountType === 'business',\n  dependsOn: ['accountType'] }\n\n// disabled as function:\n{ name: 'taxId',\n  disabled: (values) => !values.companyName,\n  dependsOn: ['companyName'] }\n\n// inject any UI inside the grid:\n{ name: 'divider', type: 'custom', colSpan: 12,\n  render: () => <Separator /> }";
const CODE_FORM_ADAPTER =
  "import { createFormAdapter } from 'raven-form-engine'\n\ninterface FormAdapter {\n  Provider: React.FC<FormAdapterProviderProps>\n  useField: (name: string) => FieldBinding\n  useSubmit: () => () => void\n  useWatch: (names?: string[]) => Record<string, unknown>\n  useTrigger?: () => (names: string[]) => Promise<boolean>\n}\n\n// swap adapters — zero changes inside RavenForm:\n<RavenForm adapter={RavenRHFAdapter}  ui={RavenShadcnUIAdapter} />\n<RavenForm adapter={RavenAntDAdapter} ui={RavenAntDUIAdapter} />";
const CODE_UI_ADAPTER =
  "interface UIAdapter {\n  Input, Textarea, Select, Checkbox, Radio,\n  Switch, DatePicker, OTPInput, PasswordInput,\n  FormItem: React.FC<UIFormItemProps>\n}\n\n// implement your own:\nconst MyUIAdapter: UIAdapter = {\n  Input: ({ value, onChange, ...props }) => (\n    <MyInput value={value} onValueChange={onChange} {...props} />\n  ),\n  // ...\n}";
const CODE_FORM_FIELD =
  "interface FormField<T = unknown> {\n  name: string\n  type: 'text'|'number'|'textarea'|'select'|'checkbox'\n        |'radio'|'date'|'password'|'otp'|'switch'|'custom'\n  label?: string\n  placeholder?: string\n  description?: string\n  defaultValue?: T\n  disabled?: boolean | ((formValues: Record<string,unknown>) => boolean)\n  hidden?:   boolean | ((formValues: Record<string,unknown>) => boolean)\n  validation?: {\n    required?: boolean | string\n    min?: number;  max?: number\n    minLength?: number;  maxLength?: number\n    pattern?: RegExp\n    custom?: (value: T, formValues) => string | null\n    asyncCustom?: (value: T, formValues) => Promise<string | null>\n  }\n  mask?:      (value: string) => string\n  formatter?: (value: T) => unknown\n  parser?:    (value: unknown) => T\n  options?: { label: string; value: unknown; disabled?: boolean }[]\n  colSpan?: number           // 1-12 (12-column grid)\n  dependsOn?: string[]       // fields to watch for hidden/disabled\n  render?: (ctx: FieldRenderContext) => ReactNode\n  componentProps?: Record<string, unknown>\n}";
const CODE_MASKS =
  "import { maskPhone, maskCurrency, formatCurrency, parseCurrency, formatTrim } from 'raven-form-engine'\n\n// simple mask:\n{ name: 'phone', mask: maskPhone }\n\n// inline custom:\n{ name: 'upper', mask: (v) => v.toUpperCase() }\n\n// full pipeline (mask → formatter → parser):\n{ name: 'price',\n  mask: maskCurrency,         // format on every keystroke\n  formatter: formatCurrency,  // store as formatted string\n  parser: parseCurrency,      // read back as number\n}";
const CODE_ALL_TYPES =
  "// ── Basic text variants ────────────────────────────────\n{ name: 'text',     type: 'text' }\n{ name: 'email',    type: 'email' }       // type=email input\n{ name: 'tel',      type: 'tel' }         // type=tel input\n{ name: 'url',      type: 'url' }         // type=url input\n{ name: 'number',   type: 'number' }\n{ name: 'password', type: 'password' }    // show/hide toggle\n{ name: 'textarea', type: 'textarea' }\n\n// ── Date / time ──────────────────────────────────────────\n{ name: 'date',     type: 'date' }\n{ name: 'time',     type: 'time' }\n{ name: 'datetime', type: 'datetime' }    // datetime-local\n\n// ── Selection ────────────────────────────────────────────\n{ name: 'select',      type: 'select',      options: [...] }\n{ name: 'multiselect', type: 'multiselect', options: [...] } // string[]\n{ name: 'radio',       type: 'radio',       options: [...] }\n\n// ── Toggle ───────────────────────────────────────────────\n{ name: 'checkbox', type: 'checkbox' }\n{ name: 'switch',   type: 'switch' }\n\n// ── Special ──────────────────────────────────────────────\n{ name: 'otp',    type: 'otp' }\n{ name: 'file',   type: 'file' }\n{ name: 'range',  type: 'range', defaultValue: 50,\n  componentProps: { min: 0, max: 100, step: 5 } }\n{ name: 'color',  type: 'color',  defaultValue: '#6366f1' }\n{ name: 'rating', type: 'rating', defaultValue: 0,\n  componentProps: { max: 5 } }\n\n// ── Compound ─────────────────────────────────────────────\n{ name: 'workHistory', type: 'repeater',\n  repeaterConfig: { fields: [...subFields], maxRows: 5 } }\n\n// ── Escape hatch ─────────────────────────────────────────\n{ name: 'custom', type: 'custom', render: (ctx) => <MyWidget {...ctx} /> }";

const CODE_WIZARD =
  "import { RavenWizardForm } from 'raven-form-engine'\nimport type { WizardStep } from 'raven-form-engine'\n\nconst steps: WizardStep[] = [\n  {\n    id: 'personal', title: 'اطلاعات شخصی',\n    icon: 'solar:user-bold',\n    fields: [\n      { name: 'firstName', type: 'text', label: 'نام', colSpan: 6 },\n      { name: 'lastName',  type: 'text', label: 'نام خانوادگی', colSpan: 6 },\n    ]\n  },\n  {\n    id: 'work', title: 'سوابق کاری',\n    icon: 'solar:case-bold',\n    fields: [\n      {\n        name: 'workHistory', type: 'repeater',\n        label: 'سوابق کاری', colSpan: 12,\n        repeaterConfig: {\n          maxRows: 5, addLabel: 'افزودن سابقه',\n          fields: [\n            { name: 'company', type: 'text', label: 'شرکت', colSpan: 6 },\n            { name: 'role',    type: 'text', label: 'سمت',  colSpan: 6 },\n          ]\n        }\n      }\n    ]\n  },\n]\n\n<RavenWizardForm\n  steps={steps}\n  adapter={RavenRHFAdapter}\n  ui={RavenShadcnUIAdapter}\n  onSubmit={(values) => console.log(values)}\n  submitLabel='ارسال'\n  showStateInspector\n/>";

// ─── Schemas ──────────────────────────────────────────────────────────────────
const simpleSchema: FormSchema = {
  columns: 12,
  gap: "gap-4",
  fields: [
    {
      name: "name",
      type: "text",
      label: "نام و نام خانوادگی",
      placeholder: "علی احمدی",
      colSpan: 6,
      formatter: formatTrim,
      validation: { required: true, minLength: 3 },
    },
    {
      name: "email",
      type: "text",
      label: "ایمیل",
      placeholder: "example@email.com",
      colSpan: 6,
      validation: {
        required: "ایمیل الزامی است",
        pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      },
    },
    {
      name: "password",
      type: "password",
      label: "رمز عبور",
      placeholder: "حداقل ۸ کاراکتر",
      colSpan: 12,
      validation: { required: true, minLength: 8 },
    },
    {
      name: "terms",
      type: "checkbox",
      label: "قوانین و مقررات را می‌پذیرم",
      colSpan: 12,
      defaultValue: false,
      validation: { required: "پذیرش قوانین الزامی است" },
    },
  ],
};

const advancedSchema: FormSchema = {
  columns: 12,
  gap: "gap-5",
  fields: [
    {
      name: "phone",
      type: "text",
      label: "شماره موبایل",
      placeholder: "0912 345 6789",
      colSpan: 6,
      mask: maskPhone,
      validation: {
        required: true,
        custom: (v: unknown) => {
          const d = String(v).replace(/\D/g, "");
          return d.length === 11 ? null : "شماره باید ۱۱ رقم باشد";
        },
      },
    },
    {
      name: "card",
      type: "text",
      label: "شماره کارت بانکی",
      placeholder: "1234 5678 9012 3456",
      colSpan: 6,
      mask: maskBankCard,
      validation: { required: true },
    },
    {
      name: "amount",
      type: "text",
      label: "مبلغ (تومان)",
      placeholder: "۱٬۰۰۰٬۰۰۰",
      colSpan: 6,
      mask: maskCurrency,
      description: "مبلغ را به تومان وارد کنید",
    },
    {
      name: "username",
      type: "text",
      label: "نام کاربری",
      placeholder: "ali_ahmadi",
      colSpan: 6,
      description: 'امتحان کنید: "admin" یا "root"',
      validation: {
        required: true,
        asyncCustom: async (v: unknown) => {
          await new Promise((r) => setTimeout(r, 600));
          return ["admin", "root"].includes(String(v).toLowerCase())
            ? "این نام کاربری مجاز نیست"
            : null;
        },
      },
    },
    {
      name: "bio",
      type: "textarea",
      label: "درباره شما",
      placeholder: "چند جمله...",
      colSpan: 12,
      validation: { maxLength: 300 },
      description: "حداکثر ۳۰۰ کاراکتر",
    },
    {
      name: "role",
      type: "select",
      label: "نقش",
      colSpan: 6,
      options: [
        { label: "مدیر", value: "admin" },
        { label: "کاربر", value: "user" },
        { label: "توسعه‌دهنده", value: "dev" },
      ],
      validation: { required: true },
    },
    { name: "birthdate", type: "date", label: "تاریخ تولد", colSpan: 6 },
    {
      name: "notifications",
      type: "switch",
      label: "اعلان‌های ایمیلی",
      colSpan: 6,
      defaultValue: true,
    },
    {
      name: "gender",
      type: "radio",
      label: "جنسیت",
      colSpan: 6,
      options: [
        { label: "مرد", value: "male" },
        { label: "زن", value: "female" },
      ],
    },
  ],
};

const conditionalSchema: FormSchema = {
  columns: 12,
  gap: "gap-4",
  fields: [
    {
      name: "accountType",
      type: "select",
      label: "نوع حساب",
      colSpan: 12,
      defaultValue: "personal",
      options: [
        { label: "شخصی", value: "personal" },
        { label: "شرکتی", value: "business" },
      ],
      dependsOn: [],
      validation: { required: true },
    },
    {
      name: "firstName",
      type: "text",
      label: "نام",
      colSpan: 6,
      validation: { required: true },
      hidden: (v: Record<string, unknown>) => v.accountType === "business",
      dependsOn: ["accountType"],
    },
    {
      name: "lastName",
      type: "text",
      label: "نام خانوادگی",
      colSpan: 6,
      validation: { required: true },
      hidden: (v: Record<string, unknown>) => v.accountType === "business",
      dependsOn: ["accountType"],
    },
    {
      name: "companyName",
      type: "text",
      label: "نام شرکت",
      colSpan: 6,
      validation: { required: true },
      hidden: (v: Record<string, unknown>) => v.accountType !== "business",
      dependsOn: ["accountType"],
    },
    {
      name: "taxId",
      type: "text",
      label: "شناسه مالیاتی",
      colSpan: 6,
      validation: { required: true },
      hidden: (v: Record<string, unknown>) => v.accountType !== "business",
      dependsOn: ["accountType"],
    },
    {
      name: "sep",
      type: "custom",
      colSpan: 12,
      render: () => <Separator className="my-2" />,
    },
    {
      name: "otp",
      type: "otp",
      label: "کد تأیید OTP",
      colSpan: 12,
      description: "کد ۶ رقمی ارسال‌شده را وارد کنید",
    },
  ],
};

const allTypesSchema: FormSchema = {
  columns: 12,
  gap: "gap-4",
  fields: [
    // ── Section: Basic Text ──────────────────────────────────────────────────
    {
      name: "_sep1",
      type: "custom",
      colSpan: 12,
      render: () => (
        <div className="col-span-12">
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1">
            Text Inputs
          </p>
          <Separator />
        </div>
      ),
    },
    {
      name: "textField",
      type: "text",
      label: "Text",
      placeholder: "Plain text…",
      colSpan: 4,
    },
    {
      name: "emailField",
      type: "email",
      label: "Email",
      placeholder: "user@example.com",
      colSpan: 4,
      validation: { pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ },
    },
    {
      name: "passwordField",
      type: "password",
      label: "Password",
      placeholder: "Min 8 chars…",
      colSpan: 4,
    },
    {
      name: "numberField",
      type: "number",
      label: "Number",
      placeholder: "42",
      colSpan: 4,
    },
    {
      name: "telField",
      type: "tel",
      label: "Tel",
      placeholder: "+98 912 345 6789",
      colSpan: 4,
    },
    {
      name: "urlField",
      type: "url",
      label: "URL",
      placeholder: "https://example.com",
      colSpan: 4,
    },
    // ── Section: Date & Time ────────────────────────────────────────────────
    {
      name: "_sep2",
      type: "custom",
      colSpan: 12,
      render: () => (
        <div className="col-span-12">
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mt-2 mb-1">
            Date & Time
          </p>
          <Separator />
        </div>
      ),
    },
    { name: "dateField", type: "date", label: "Date", colSpan: 4 },
    { name: "timeField", type: "time", label: "Time", colSpan: 4 },
    {
      name: "datetimeField",
      type: "datetime",
      label: "Date & Time",
      colSpan: 4,
    },
    // ── Section: Multi-line ─────────────────────────────────────────────────
    {
      name: "_sep3",
      type: "custom",
      colSpan: 12,
      render: () => (
        <div className="col-span-12">
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mt-2 mb-1">
            Multi-line
          </p>
          <Separator />
        </div>
      ),
    },
    {
      name: "textareaField",
      type: "textarea",
      label: "Textarea",
      placeholder: "Write multiple lines…",
      colSpan: 12,
    },
    // ── Section: Selection ──────────────────────────────────────────────────
    {
      name: "_sep4",
      type: "custom",
      colSpan: 12,
      render: () => (
        <div className="col-span-12">
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mt-2 mb-1">
            Selection
          </p>
          <Separator />
        </div>
      ),
    },
    {
      name: "selectField",
      type: "select",
      label: "Select (single)",
      colSpan: 6,
      options: [
        { label: "Option A", value: "a" },
        { label: "Option B", value: "b" },
        { label: "Option C", value: "c" },
      ],
    },
    {
      name: "multiselectField",
      type: "multiselect",
      label: "Multi-Select",
      colSpan: 6,
      options: [
        { label: "React", value: "react" },
        { label: "Next.js", value: "next" },
        { label: "TypeScript", value: "ts" },
        { label: "Tailwind", value: "tw" },
      ],
    },
    {
      name: "radioField",
      type: "radio",
      label: "Radio",
      colSpan: 6,
      options: [
        { label: "Free", value: "free" },
        { label: "Pro", value: "pro" },
        { label: "Enterprise", value: "ent" },
      ],
    },
    {
      name: "otpField",
      type: "otp",
      label: "OTP Code",
      colSpan: 6,
      description: "6-digit one-time code",
    },
    // ── Section: Toggle ─────────────────────────────────────────────────────
    {
      name: "_sep5",
      type: "custom",
      colSpan: 12,
      render: () => (
        <div className="col-span-12">
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mt-2 mb-1">
            Toggles
          </p>
          <Separator />
        </div>
      ),
    },
    {
      name: "checkboxField",
      type: "checkbox",
      label: "I agree to the terms and conditions",
      colSpan: 6,
      defaultValue: false,
    },
    {
      name: "switchField",
      type: "switch",
      label: "Enable email notifications",
      colSpan: 6,
      defaultValue: false,
    },
    // ── Section: Special ────────────────────────────────────────────────────
    {
      name: "_sep6",
      type: "custom",
      colSpan: 12,
      render: () => (
        <div className="col-span-12">
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mt-2 mb-1">
            Special
          </p>
          <Separator />
        </div>
      ),
    },
    {
      name: "rangeField",
      type: "range",
      label: "Range / Slider",
      colSpan: 4,
      defaultValue: 40,
      componentProps: { min: 0, max: 100, step: 5 },
    },
    {
      name: "colorField",
      type: "color",
      label: "Color Picker",
      colSpan: 4,
      defaultValue: "#6366f1",
    },
    {
      name: "ratingField",
      type: "rating",
      label: "Star Rating",
      colSpan: 4,
      defaultValue: 3,
      componentProps: { max: 5 },
    },
    {
      name: "fileField",
      type: "file",
      label: "File Upload",
      colSpan: 12,
      description: "Accepts any file type",
    },
  ],
};

// ─── Wizard Steps ─────────────────────────────────────────────────────────────
const onboardingSteps: WizardStep[] = [
  {
    id: "personal",
    title: "اطلاعات شخصی",
    icon: "solar:user-bold",
    description: "مشخصات پایه خود را وارد کنید",
    fields: [
      {
        name: "firstName",
        type: "text",
        label: "نام",
        placeholder: "علی",
        colSpan: 6,
        formatter: formatTrim,
        validation: { required: true, minLength: 2 },
      },
      {
        name: "lastName",
        type: "text",
        label: "نام خانوادگی",
        placeholder: "احمدی",
        colSpan: 6,
        formatter: formatTrim,
        validation: { required: true, minLength: 2 },
      },
      {
        name: "email",
        type: "email",
        label: "ایمیل",
        placeholder: "ali@example.com",
        colSpan: 6,
        validation: {
          required: "ایمیل الزامی است",
          pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        },
      },
      {
        name: "phone",
        type: "tel",
        label: "موبایل",
        placeholder: "0912 345 6789",
        colSpan: 6,
        mask: maskPhone,
        validation: { required: true },
      },
      {
        name: "birthDate",
        type: "date",
        label: "تاریخ تولد",
        colSpan: 6,
      },
      {
        name: "gender",
        type: "select",
        label: "جنسیت",
        colSpan: 6,
        options: [
          { label: "مرد", value: "male" },
          { label: "زن", value: "female" },
          { label: "ترجیح می‌دهم نگویم", value: "none" },
        ],
      },
    ],
  },
  {
    id: "address",
    title: "آدرس و تماس",
    icon: "solar:map-point-bold",
    description: "آدرس محل سکونت و اطلاعات تماس",
    fields: [
      {
        name: "province",
        type: "select",
        label: "استان",
        colSpan: 4,
        options: [
          { label: "تهران", value: "tehran" },
          { label: "اصفهان", value: "isfahan" },
          { label: "فارس", value: "fars" },
          { label: "خراسان رضوی", value: "khorasan" },
          { label: "آذربایجان شرقی", value: "azarbaijan" },
        ],
        validation: { required: true },
      },
      {
        name: "city",
        type: "text",
        label: "شهر",
        placeholder: "تهران",
        colSpan: 4,
        formatter: formatTrim,
        validation: { required: true },
      },
      {
        name: "postalCode",
        type: "text",
        label: "کد پستی",
        placeholder: "12345-67890",
        colSpan: 4,
        mask: maskPostalCode,
      },
      {
        name: "address",
        type: "textarea",
        label: "آدرس کامل",
        placeholder: "خیابان، کوچه، پلاک...",
        colSpan: 12,
        validation: { required: true, minLength: 10 },
      },
      {
        name: "bio",
        type: "textarea",
        label: "درباره من",
        placeholder: "کمی درباره خودتان بنویسید...",
        colSpan: 12,
        componentProps: { rows: 3 },
      },
    ],
  },
  {
    id: "experience",
    title: "سوابق کاری",
    icon: "solar:case-bold",
    description: "سوابق شغلی خود را وارد کنید (تا ۵ مورد)",
    fields: [
      {
        name: "skills",
        type: "multiselect",
        label: "مهارت‌ها",
        colSpan: 12,
        options: [
          { label: "JavaScript", value: "js" },
          { label: "TypeScript", value: "ts" },
          { label: "React", value: "react" },
          { label: "Next.js", value: "next" },
          { label: "Node.js", value: "node" },
          { label: "Python", value: "python" },
          { label: "UI/UX Design", value: "design" },
          { label: "DevOps", value: "devops" },
        ],
      },
      {
        name: "workHistory",
        type: "repeater",
        label: "سوابق کاری",
        description: "برای هر سابقه یک ردیف اضافه کنید",
        colSpan: 12,
        repeaterConfig: {
          minRows: 1,
          maxRows: 5,
          addLabel: "افزودن سابقه",
          removeLabel: "حذف",
          fields: [
            {
              name: "company",
              type: "text",
              label: "نام شرکت",
              placeholder: "شرکت نمونه",
              colSpan: 6,
              formatter: formatTrim,
            },
            {
              name: "role",
              type: "text",
              label: "عنوان شغلی",
              placeholder: "توسعه‌دهنده ارشد",
              colSpan: 6,
              formatter: formatTrim,
            },
            {
              name: "startYear",
              type: "number",
              label: "سال شروع",
              placeholder: "1398",
              colSpan: 4,
              componentProps: { min: 1370, max: 1410 },
            },
            {
              name: "endYear",
              type: "number",
              label: "سال پایان",
              placeholder: "1402",
              colSpan: 4,
              componentProps: { min: 1370, max: 1410 },
            },
            {
              name: "current",
              type: "switch",
              label: "شغل فعلی",
              colSpan: 4,
              defaultValue: false,
            },
          ],
        },
      },
    ],
  },
  {
    id: "settings",
    title: "تنظیمات",
    icon: "solar:settings-bold",
    description: "تنظیمات حساب کاربری",
    fields: [
      {
        name: "plan",
        type: "radio",
        label: "پلن",
        colSpan: 12,
        defaultValue: "free",
        options: [
          { label: "رایگان", value: "free" },
          { label: "حرفه‌ای (ماهانه ۵۰۰۰۰ تومان)", value: "pro" },
          { label: "سازمانی", value: "enterprise" },
        ],
      },
      {
        name: "theme",
        type: "select",
        label: "قالب نمایش",
        colSpan: 6,
        defaultValue: "system",
        options: [
          { label: "سیستم", value: "system" },
          { label: "روشن", value: "light" },
          { label: "تاریک", value: "dark" },
        ],
      },
      {
        name: "language",
        type: "select",
        label: "زبان",
        colSpan: 6,
        defaultValue: "fa",
        options: [
          { label: "فارسی", value: "fa" },
          { label: "English", value: "en" },
        ],
      },
      {
        name: "notifications",
        type: "switch",
        label: "فعال‌سازی اعلان‌های ایمیلی",
        colSpan: 6,
        defaultValue: true,
      },
      {
        name: "newsletter",
        type: "switch",
        label: "دریافت خبرنامه",
        colSpan: 6,
        defaultValue: false,
      },
      {
        name: "satisfaction",
        type: "rating",
        label: "امتیاز به تجربه ثبت‌نام",
        colSpan: 6,
        defaultValue: 4,
        componentProps: { max: 5 },
      },
      {
        name: "agreeTerms",
        type: "checkbox",
        label: "قوانین و مقررات سرویس را می‌پذیرم",
        colSpan: 12,
        defaultValue: false,
        validation: { required: "پذیرش قوانین الزامی است" },
      },
    ],
  },
];

// ─── Components ───────────────────────────────────────────────────────────────
const CodeBlock = memo(({ code, title }: { code: string; title?: string }) => {
  const [copied, setCopied] = useState(false);
  return (
    <div className="rounded-xl border border-border overflow-hidden">
      {title && (
        <div className="flex items-center justify-between px-4 py-2 bg-muted/50 border-b border-border">
          <span className="text-xs font-medium text-muted-foreground">
            {title}
          </span>
          <button
            onClick={() => {
              navigator.clipboard.writeText(code);
              setCopied(true);
              setTimeout(() => setCopied(false), 1500);
            }}
            className="text-xs text-muted-foreground hover:text-foreground flex items-center gap-1 transition-colors"
          >
            <Icon
              icon={copied ? "solar:check-circle-bold" : "solar:copy-bold"}
              width={13}
            />
            {copied ? "کپی شد" : "کپی"}
          </button>
        </div>
      )}
      <pre className="p-4 text-xs leading-relaxed overflow-x-auto bg-muted/20 text-foreground/80 whitespace-pre-wrap">
        <code>{code}</code>
      </pre>
    </div>
  );
});
CodeBlock.displayName = "CodeBlock";

const Section = ({
  title,
  description,
  children,
}: {
  title: string;
  description?: string;
  children: React.ReactNode;
}) => (
  <div className="flex flex-col gap-4">
    <div>
      <h3 className="text-lg font-bold">{title}</h3>
      {description && (
        <p className="text-sm text-muted-foreground mt-0.5">{description}</p>
      )}
    </div>
    {children}
  </div>
);

const PreviewCode = ({
  preview,
  code,
  title,
}: {
  preview: React.ReactNode;
  code: string;
  title: string;
}) => (
  <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
    <div className="rounded-xl border border-border p-5 bg-background">
      <p className="text-xs font-semibold text-muted-foreground mb-4 flex items-center gap-1">
        <Icon
          icon="solar:play-circle-bold"
          width={13}
          className="text-emerald-500"
        />
        پیش‌نمایش
      </p>
      {preview}
    </div>
    <CodeBlock title={title} code={code} />
  </div>
);

const featureCards = [
  {
    icon: "solar:shield-check-bold",
    color: "text-emerald-600",
    bg: "bg-emerald-50 dark:bg-emerald-900/20",
    title: "Type-Safe API",
    desc: "تمام schema، adapter و UI کاملاً typed. هیچ any در کد.",
  },
  {
    icon: "solar:lightning-bold",
    color: "text-amber-600",
    bg: "bg-amber-50 dark:bg-amber-900/20",
    title: "حداقل Re-render",
    desc: "React.memo + useController — هر فیلد فقط به تغییر خودش واکنش می‌دهد.",
  },
  {
    icon: "solar:layers-bold",
    color: "text-blue-600",
    bg: "bg-blue-50 dark:bg-blue-900/20",
    title: "Adapter Pattern",
    desc: "FormAdapter و UIAdapter جداست. RHF ↔ AntD بدون تغییر در معماری.",
  },
  {
    icon: "solar:magic-stick-2-bold",
    color: "text-violet-600",
    bg: "bg-violet-50 dark:bg-violet-900/20",
    title: "Mask Pipeline",
    desc: "mask → formatter → parser pipeline برای هر فیلد تنظیم‌پذیر.",
  },
  {
    icon: "solar:chart-2-bold",
    color: "text-pink-600",
    bg: "bg-pink-50 dark:bg-pink-900/20",
    title: "Async Validation",
    desc: "اعتبارسنجی async با debounce داخلی و نمایش spinner حین بررسی.",
  },
  {
    icon: "solar:branching-paths-up-bold",
    color: "text-cyan-600",
    bg: "bg-cyan-50 dark:bg-cyan-900/20",
    title: "Conditional Fields",
    desc: "hidden/disabled می‌توانند function باشند با دسترسی به مقادیر فرم.",
  },
];

const adapterCards = [
  {
    icon: "solar:widget-bold",
    name: "RHFAdapter",
    lib: "react-hook-form",
    color: "text-blue-600",
    bg: "bg-blue-50 dark:bg-blue-900/20",
    desc: "useController + field-level subscription. کمترین re-render ممکن.",
  },
  {
    icon: "solar:atom-bold",
    name: "AntDAdapter",
    lib: "Custom (zero-dep)",
    color: "text-orange-600",
    bg: "bg-orange-50 dark:bg-orange-900/20",
    desc: "Context + useState داخلی. بدون نیاز به کتابخانه خارجی.",
  },
];

const maskRows = [
  ["maskPhone", "0912 345 6789", "mask"],
  ["maskBankCard", "6037 9912 3456 7890", "mask"],
  ["maskCurrency", "۱٬۰۰۰٬۰۰۰", "mask"],
  ["maskNationalCode", "1234567890", "mask"],
  ["maskPostalCode", "12345-67890", "mask"],
  ["maskOTP", "123456", "mask"],
  ["formatCurrency", "۱٬۰۰۰٬۰۰۰", "formatter"],
  ["formatTrim", "text (trimmed)", "formatter"],
  ["parseCurrency", "1000000 (number)", "parser"],
];

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function FormEnginePage() {
  const [r1, setR1] = useState<Record<string, unknown> | null>(null);
  const [r2, setR2] = useState<Record<string, unknown> | null>(null);
  const [r3, setR3] = useState<Record<string, unknown> | null>(null);
  const [r4, setR4] = useState<Record<string, unknown> | null>(null);
  const [rW, setRW] = useState<Record<string, unknown> | null>(null);

  return (
    <RavenFormProvider
      uiAdapter={RavenShadcnUIAdapter}
      formAdapter={RavenRHFAdapter}
    >
      <div className="flex flex-col gap-8 pb-16">
        {/* Header */}
        <div className="rounded-2xl bg-gradient-to-br from-violet-600 via-purple-600 to-indigo-700 p-6 text-white">
          <div className="flex items-start justify-between gap-4 flex-wrap">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Icon icon="solar:widget-5-bold" width={24} />
                <Badge className="bg-white/20 text-white border-0 text-xs">
                  v1.0
                </Badge>
              </div>
              <h1 className="text-3xl font-black mb-2 text-white">
                Smart Form Generator
              </h1>
              <p className="text-white/70 text-sm max-w-xl">
                سیستم فرم‌ساز هوشمند Schema-Driven — RHF/AntD adapter،
                shadCN/AntD UI، masking، async validation، conditional rendering
                و state inspector.
              </p>
            </div>
            <div className="flex flex-col gap-1.5 text-sm">
              {[
                "Schema-Driven API",
                "Adapter Pattern",
                "Zero Re-renders",
                "Mask / Formatter",
                "Async Validation",
                "Conditional Fields",
              ].map((f) => (
                <div
                  key={f}
                  className="flex items-center gap-1.5 text-white/80"
                >
                  <Icon
                    icon="solar:check-circle-bold"
                    width={14}
                    className="text-emerald-300"
                  />
                  {f}
                </div>
              ))}
            </div>
          </div>
        </div>

        <Tabs defaultValue="intro">
          <TabsList className="flex-wrap h-auto gap-1 bg-muted/60 p-1 rounded-xl">
            {[
              { value: "intro", label: "مقدمه", icon: "solar:book-2-bold" },
              {
                value: "basic",
                label: "مثال ساده",
                icon: "solar:document-bold",
              },
              {
                value: "advanced",
                label: "مثال پیشرفته",
                icon: "solar:star-bold",
              },
              {
                value: "conditional",
                label: "فیلد شرطی",
                icon: "solar:branching-paths-up-bold",
              },
              {
                value: "adapters",
                label: "Adapters",
                icon: "solar:plug-circle-bold",
              },
              { value: "schema", label: "Schema API", icon: "solar:code-bold" },
              {
                value: "masks",
                label: "Mask & Format",
                icon: "solar:magic-stick-2-bold",
              },
              {
                value: "fieldtypes",
                label: "All Field Types",
                icon: "solar:layers-bold",
              },
              {
                value: "wizard",
                label: "Wizard & Repeater",
                icon: "solar:magic-stick-3-bold",
              },
            ].map((t) => (
              <TabsTrigger
                key={t.value}
                value={t.value}
                className="flex items-center gap-1.5 text-xs"
              >
                <Icon icon={t.icon} width={13} />
                {t.label}
              </TabsTrigger>
            ))}
          </TabsList>

          {/* ── Intro ─────────────────────────────────────────────────────────── */}
          <TabsContent value="intro" className="mt-6 flex flex-col gap-8">
            <Section
              title="معرفی Smart Form Generator"
              description="سیستم فرم‌ساز production-ready که از UI library و form library کاملاً جدا شده است."
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {featureCards.map((c) => (
                  <div
                    key={c.title}
                    className="rounded-xl border border-border p-4"
                  >
                    <div
                      className={
                        "w-9 h-9 rounded-lg " +
                        c.bg +
                        " flex items-center justify-center mb-3"
                      }
                    >
                      <Icon icon={c.icon} width={18} className={c.color} />
                    </div>
                    <h4 className="text-sm font-semibold mb-1">{c.title}</h4>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      {c.desc}
                    </p>
                  </div>
                ))}
              </div>
            </Section>
            <Section title="ساختار پروژه">
              <CodeBlock
                title="src/components/form-engine/"
                code={CODE_STRUCTURE}
              />
            </Section>
            <Section title="کاربرد پایه">
              <CodeBlock title="minimal usage" code={CODE_MINIMAL_USAGE} />
            </Section>
          </TabsContent>

          {/* ── Basic ─────────────────────────────────────────────────────────── */}
          <TabsContent value="basic" className="mt-6">
            <PreviewCode
              title="simpleSchema — RHF + shadCN"
              preview={
                <div className="flex flex-col gap-3">
                  <RavenForm
                    schema={simpleSchema}
                    adapter={RavenRHFAdapter}
                    ui={RavenShadcnUIAdapter}
                    onSubmit={(v) => setR1(v)}
                    submitLabel="ثبت‌نام"
                    showReset
                    showStateInspector
                  />
                  {r1 && (
                    <div className="rounded-xl bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800 p-3">
                      <p className="text-xs font-semibold text-emerald-700 mb-1">
                        ✅ Submitted
                      </p>
                      <pre className="text-xs text-emerald-800 dark:text-emerald-300 whitespace-pre-wrap">
                        {JSON.stringify(r1, null, 2)}
                      </pre>
                    </div>
                  )}
                </div>
              }
              code={CODE_SIMPLE_SCHEMA}
            />
          </TabsContent>

          {/* ── Advanced ──────────────────────────────────────────────────────── */}
          <TabsContent value="advanced" className="mt-6">
            <PreviewCode
              title="advancedSchema — mask + async validation — AntD adapter & UI"
              preview={
                <div>
                  <RavenForm
                    schema={advancedSchema}
                    adapter={RavenAntDAdapter}
                    ui={RavenAntDUIAdapter}
                    onSubmit={(v) => setR2(v)}
                    submitLabel="ذخیره اطلاعات"
                    showStateInspector
                  />
                  {r2 && (
                    <div className="mt-3 rounded-xl bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 p-3">
                      <p className="text-xs font-semibold text-emerald-700 mb-1">
                        ✅ Submitted
                      </p>
                      <pre className="text-xs text-emerald-800 dark:text-emerald-300 whitespace-pre-wrap">
                        {JSON.stringify(r2, null, 2)}
                      </pre>
                    </div>
                  )}
                </div>
              }
              code={CODE_ADVANCED_SCHEMA}
            />
          </TabsContent>

          {/* ── Conditional ───────────────────────────────────────────────────── */}
          <TabsContent value="conditional" className="mt-6">
            <PreviewCode
              title="فیلدهای شرطی — hidden/disabled به عنوان function"
              preview={
                <div>
                  <RavenForm
                    schema={conditionalSchema}
                    adapter={RavenRHFAdapter}
                    ui={RavenShadcnUIAdapter}
                    onSubmit={(v) => setR3(v)}
                    submitLabel="ادامه"
                  />
                  {r3 && (
                    <div className="mt-3 rounded-xl bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 p-3">
                      <p className="text-xs font-semibold text-emerald-700 mb-1">
                        ✅ Submitted
                      </p>
                      <pre className="text-xs text-emerald-800 dark:text-emerald-300 whitespace-pre-wrap">
                        {JSON.stringify(r3, null, 2)}
                      </pre>
                    </div>
                  )}
                </div>
              }
              code={CODE_CONDITIONAL}
            />
          </TabsContent>

          {/* ── Adapters ──────────────────────────────────────────────────────── */}
          <TabsContent value="adapters" className="mt-6 flex flex-col gap-6">
            <Section
              title="Adapter System"
              description="FormAdapter (منطق) و UIAdapter (نمایش) به طور کامل از هم جدا هستند."
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {adapterCards.map((a) => (
                  <div
                    key={a.name}
                    className="rounded-xl border border-border p-5"
                  >
                    <div
                      className={
                        "w-10 h-10 rounded-xl " +
                        a.bg +
                        " flex items-center justify-center mb-3"
                      }
                    >
                      <Icon icon={a.icon} width={20} className={a.color} />
                    </div>
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="text-sm font-bold">{a.name}</h4>
                      <Badge variant="outline" className="text-xs">
                        {a.lib}
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground">{a.desc}</p>
                  </div>
                ))}
              </div>
              <CodeBlock
                title="FormAdapter interface"
                code={CODE_FORM_ADAPTER}
              />
              <CodeBlock title="UIAdapter interface" code={CODE_UI_ADAPTER} />
            </Section>
          </TabsContent>

          {/* ── Schema ────────────────────────────────────────────────────────── */}
          <TabsContent value="schema" className="mt-6 flex flex-col gap-6">
            <Section title="Schema API Reference">
              <CodeBlock title="FormField<T>" code={CODE_FORM_FIELD} />
            </Section>
          </TabsContent>

          {/* ── Masks ─────────────────────────────────────────────────────────── */}
          <TabsContent value="masks" className="mt-6 flex flex-col gap-6">
            <Section title="Built-in Masks & Formatters">
              <div className="overflow-x-auto">
                <table className="w-full text-sm border-collapse">
                  <thead>
                    <tr className="bg-muted/50">
                      <th className="text-left p-3 text-xs font-semibold text-muted-foreground border-b border-border">
                        نام
                      </th>
                      <th className="text-left p-3 text-xs font-semibold text-muted-foreground border-b border-border">
                        خروجی نمونه
                      </th>
                      <th className="text-left p-3 text-xs font-semibold text-muted-foreground border-b border-border">
                        نوع
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {maskRows.map(([n, o, t]) => (
                      <tr
                        key={n}
                        className="border-b border-border hover:bg-muted/20 transition-colors"
                      >
                        <td className="p-3 font-mono text-xs text-violet-600">
                          {n}
                        </td>
                        <td className="p-3 text-xs font-semibold">{o}</td>
                        <td className="p-3 text-xs">
                          <Badge variant="outline" className="text-xs">
                            {t}
                          </Badge>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <CodeBlock
                title="استفاده از mask + formatter + parser"
                code={CODE_MASKS}
              />
            </Section>
          </TabsContent>

          {/* ── All Field Types ──────────────────────────────────── */}
          <TabsContent value="fieldtypes" className="mt-6 flex flex-col gap-6">
            <Section
              title="All Field Types"
              description="All 21 supported field types rendered live. Change the adapter to see the exact same schema render with different UI."
            >
              {/* Reference table */}
              <div className="overflow-x-auto">
                <table className="w-full text-sm border-collapse">
                  <thead>
                    <tr className="bg-muted/50">
                      <th className="text-left p-3 text-xs font-semibold text-muted-foreground border-b border-border">
                        type
                      </th>
                      <th className="text-left p-3 text-xs font-semibold text-muted-foreground border-b border-border">
                        Value Type
                      </th>
                      <th className="text-left p-3 text-xs font-semibold text-muted-foreground border-b border-border">
                        UIAdapter slot
                      </th>
                      <th className="text-left p-3 text-xs font-semibold text-muted-foreground border-b border-border">
                        Notes
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {(
                      [
                        ["text", "string", "Input", "type=text"],
                        [
                          "email",
                          "string",
                          "Input",
                          "type=email, native browser validation",
                        ],
                        ["tel", "string", "Input", "type=tel"],
                        ["url", "string", "Input", "type=url"],
                        ["number", "number", "Input", "type=number"],
                        [
                          "password",
                          "string",
                          "PasswordInput",
                          "show/hide toggle",
                        ],
                        [
                          "textarea",
                          "string",
                          "Textarea",
                          "resizable, rows via componentProps",
                        ],
                        [
                          "date",
                          "string",
                          "DatePicker",
                          "ISO date string YYYY-MM-DD",
                        ],
                        ["time", "string", "Input", "type=time, HH:MM"],
                        ["datetime", "string", "Input", "type=datetime-local"],
                        ["select", "string", "Select", "requires options[]"],
                        [
                          "multiselect",
                          "string[]",
                          "MultiSelect",
                          "requires options[], value is array",
                        ],
                        ["radio", "string", "Radio", "requires options[]"],
                        [
                          "checkbox",
                          "boolean",
                          "Checkbox",
                          "skips FormItem wrapper",
                        ],
                        [
                          "switch",
                          "boolean",
                          "Switch",
                          "skips FormItem wrapper",
                        ],
                        ["otp", "string", "OTPInput", "numeric, max 6 digits"],
                        [
                          "file",
                          "File|null",
                          "FileInput",
                          "native File object",
                        ],
                        [
                          "range",
                          "number",
                          "Range",
                          "min/max/step via componentProps",
                        ],
                        [
                          "color",
                          "string",
                          "ColorPicker",
                          "hex color string #rrggbb",
                        ],
                        [
                          "rating",
                          "number",
                          "Rating",
                          "max via componentProps (default 5)",
                        ],
                        ["custom", "any", "—", "render prop, full override"],
                      ] as const
                    ).map(([t, vt, slot, notes]) => (
                      <tr
                        key={t}
                        className="border-b border-border hover:bg-muted/20 transition-colors"
                      >
                        <td className="p-3 font-mono text-xs text-violet-600 font-semibold">
                          {t}
                        </td>
                        <td className="p-3 font-mono text-xs text-blue-600">
                          {vt}
                        </td>
                        <td className="p-3 font-mono text-xs text-emerald-600">
                          {slot}
                        </td>
                        <td className="p-3 text-xs text-muted-foreground">
                          {notes}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <CodeBlock
                title="All field types — schema reference"
                code={CODE_ALL_TYPES}
              />
            </Section>

            {/* Live demo */}
            <Section
              title="Live Demo — All Types"
              description="Uses RHF + shadCN adapter. Submit to see all values."
            >
              <RavenForm
                schema={allTypesSchema}
                adapter={RavenRHFAdapter}
                ui={RavenShadcnUIAdapter}
                onSubmit={(v) => setR4(v)}
                submitLabel="Submit All Fields"
                showReset
                showStateInspector
              />
              {r4 && (
                <div className="rounded-xl bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800 p-3">
                  <p className="text-xs font-semibold text-emerald-700 mb-1">
                    ✅ Submitted
                  </p>
                  <pre className="text-xs text-emerald-800 dark:text-emerald-300 whitespace-pre-wrap">
                    {JSON.stringify(r4, null, 2)}
                  </pre>
                </div>
              )}
            </Section>
          </TabsContent>
          {/* ── Wizard & Repeater ─────────────────────────────────────────── */}
          <TabsContent value="wizard" className="mt-6 flex flex-col gap-8">
            {/* Feature cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                {
                  icon: "solar:magic-stick-3-bold",
                  color: "text-violet-600",
                  bg: "bg-violet-50 dark:bg-violet-900/20",
                  title: "Wizard Form",
                  desc: "فرم چند مرحله‌ای با نوار پیشرفت، اعتبارسنجی پیش از رفتن به مرحله بعد و پشتیبانی از همه adapter ها.",
                },
                {
                  icon: "solar:list-bold",
                  color: "text-blue-600",
                  bg: "bg-blue-50 dark:bg-blue-900/20",
                  title: "Repeater Field",
                  desc: "فیلد آرایه‌ای با زیرفیلدهای سفارشی — افزودن/حذف ردیف با کنترل minRows/maxRows.",
                },
              ].map((c) => (
                <div
                  key={c.title}
                  className="rounded-xl border border-border p-4"
                >
                  <div
                    className={
                      "w-9 h-9 rounded-lg " +
                      c.bg +
                      " flex items-center justify-center mb-3"
                    }
                  >
                    <Icon icon={c.icon} width={18} className={c.color} />
                  </div>
                  <h4 className="text-sm font-semibold mb-1">{c.title}</h4>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {c.desc}
                  </p>
                </div>
              ))}
            </div>

            {/* Code reference */}
            <Section title="استفاده از SmartWizardForm">
              <CodeBlock title="SmartWizardForm usage" code={CODE_WIZARD} />
            </Section>

            {/* Live demo */}
            <Section
              title="دمو — فرم جامع استخدام (۴ مرحله)"
              description="RHF + shadCN — اعتبارسنجی per-step، فیلد تکرارشونده سابقه کاری، و State Inspector"
            >
              <div className="rounded-xl border border-border p-5 bg-background">
                <RavenWizardForm
                  steps={onboardingSteps}
                  adapter={RavenRHFAdapter}
                  ui={RavenShadcnUIAdapter}
                  onSubmit={(v) => setRW(v)}
                  submitLabel="تکمیل ثبت‌نام"
                  showStateInspector
                />
                {rW && (
                  <div className="mt-4 rounded-xl bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800 p-3">
                    <p className="text-xs font-semibold text-emerald-700 mb-1">
                      ✅ ثبت‌نام تکمیل شد
                    </p>
                    <pre className="text-xs text-emerald-800 dark:text-emerald-300 whitespace-pre-wrap overflow-auto max-h-60">
                      {JSON.stringify(rW, null, 2)}
                    </pre>
                  </div>
                )}
              </div>
            </Section>
          </TabsContent>
        </Tabs>
      </div>
    </RavenFormProvider>
  );
}
