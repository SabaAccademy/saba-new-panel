"use client";

/**
 * ProductForm — Advanced showcase of every raven-form-engine feature:
 *
 * ✅ All 22 field types: text, email, tel, url, number, password, textarea,
 *    date, time, datetime, select, multiselect, radio, checkbox, switch,
 *    otp, file, range, color, rating, repeater, custom
 * ✅ colSpan grid layout (1–12)
 * ✅ validation: required, min, max, minLength, maxLength, pattern,
 *               custom (cross-field), asyncCustom (debounced async)
 * ✅ mask: maskPhone, maskBankCard, maskCurrency, maskNationalCode,
 *          maskPostalCode, maskOTP
 * ✅ formatter / parser: formatCurrency / parseCurrency, formatTrim
 * ✅ disabled — static boolean + dynamic function (dependsOn)
 * ✅ hidden   — static boolean + dynamic function (dependsOn)
 * ✅ dependsOn — reactive field dependencies
 * ✅ componentProps — forwarded to underlying UI component
 * ✅ description — inline field help text
 * ✅ options with individual disabled entries
 * ✅ render — fully custom render override (custom type)
 * ✅ repeater — minRows, maxRows, addLabel, removeLabel, defaultRow, sub-fields
 * ✅ RavenWizardForm (create mode) — 5 steps with per-step columns override
 * ✅ RavenForm (edit mode) — flat schema produced from wizard steps
 * ✅ showReset, showStateInspector, submitLabel, resetLabel,
 *    className, submitClassName
 */

import React, { useCallback } from "react";
import { useRouter } from "next/navigation";
import { Icon } from "@iconify/react";
import { Button } from "@/components/ui/button";
import CardBox from "@/app/components/shared/CardBox";
import { useLocale } from "@/lib/i18n/context";
import { CATEGORIES, type Product } from "./data";
import {
  RavenForm,
  RavenWizardForm,
  type FormSchema,
  type WizardStep,
  type FieldRenderContext,
  maskPhone,
  maskBankCard,
  maskCurrency,
  maskNationalCode,
  maskPostalCode,
  maskOTP,
  parseCurrency,
  formatCurrency,
  formatTrim,
} from "@/lib/form-engine/";
import { RavenRHFAdapter } from "@/components/form-engine/adapters/ravenRHFAdapter";

/**
 * Safe mask wrappers — strip all previously-inserted separator characters
 * (spaces, hyphens) BEFORE passing to the library's pattern-based masking.
 *
 * Root cause: raven-form-engine uses a `*` wildcard token that matches ANY
 * character (including spaces). When the stored masked value (e.g. "0912 345")
 * is fed back on the next keystroke, the embedded spaces are consumed as real
 * input slots, shifting every subsequent character and causing the "erasing"
 * behaviour. Stripping to digits-only first ensures the pattern always starts
 * from a clean raw string.
 */
const safePhone = (v: string) => maskPhone(v.replace(/\D/g, ""));
const safeBankCard = (v: string) => maskBankCard(v.replace(/\D/g, ""));
const safePostalCode = (v: string) => maskPostalCode(v.replace(/\D/g, ""));

interface ProductFormProps {
  defaultValues?: Partial<Product>;
  isEdit?: boolean;
  onSuccess?: (values: Record<string, unknown>) => void;
}

export default function ProductForm({
  defaultValues,
  isEdit = false,
  onSuccess,
}: ProductFormProps) {
  const router = useRouter();
  const { t } = useLocale();
  const p = t.products;

  // ─────────────────────────────────────────────────────────────────────────
  // STEP 1 — Basic Info
  // Demonstrates: text, select, multiselect, radio, switch, checkbox
  //               required, minLength/maxLength, pattern, asyncCustom
  //               formatter, description, colSpan variety, disabled option
  // ─────────────────────────────────────────────────────────────────────────
  const stepBasic: WizardStep = {
    id: "basic",
    title: "اطلاعات پایه",
    description: "نام، دسته‌بندی، وضعیت و تنظیمات اصلی محصول",
    columns: 12,
    fields: [
      {
        name: "name",
        type: "text",
        label: p.name,
        placeholder: p.namePlaceholder,
        colSpan: 6,
        description: "حداقل ۲ و حداکثر ۱۰۰ کاراکتر",
        validation: { required: true, minLength: 2, maxLength: 100 },
        formatter: formatTrim,
        defaultValue: defaultValues?.name ?? "",
      },
      {
        // asyncCustom — debounced SKU uniqueness check simulation
        name: "sku",
        type: "text",
        label: p.sku,
        placeholder: p.skuPlaceholder,
        colSpan: 6,
        description: "فقط حروف بزرگ، اعداد و خط تیره — مثال: SKU-001",
        validation: {
          required: true,
          pattern: /^[A-Z0-9\-]+$/,
          asyncCustom: async (value) => {
            await new Promise((r) => setTimeout(r, 500)); // simulate API call
            if (value === "TAKEN-001") return "این SKU قبلاً ثبت شده است";
            return null;
          },
        },
        defaultValue: defaultValues?.sku ?? "",
      },
      {
        // options with one disabled entry
        name: "category",
        type: "select",
        label: p.category,
        placeholder: p.categoryPlaceholder,
        colSpan: 6,
        validation: { required: true },
        defaultValue: defaultValues?.category ?? "",
        options: CATEGORIES.map((c) => ({
          label: p.categories[c as keyof typeof p.categories],
          value: c,
          disabled: c === "other", // demo: disabled option
        })),
      },
      {
        // radio
        name: "status",
        type: "radio",
        label: p.status,
        colSpan: 6,
        validation: { required: "انتخاب وضعیت الزامی است" },
        defaultValue: defaultValues?.status ?? "active",
        options: [
          { label: p.active, value: "active" },
          { label: p.inactive, value: "inactive" },
          { label: p.draft, value: "draft" },
        ],
      },
      {
        // multiselect
        name: "secondaryCategories",
        type: "multiselect",
        label: "دسته‌بندی‌های مرتبط",
        placeholder: "انتخاب کنید...",
        colSpan: 6,
        description: "می‌توانید چند دسته‌بندی انتخاب کنید",
        defaultValue: [],
        options: CATEGORIES.map((c) => ({
          label: p.categories[c as keyof typeof p.categories],
          value: c,
        })),
      },
      {
        // switch — inline type (no FormItem wrapper)
        name: "isFeatured",
        type: "switch",
        label: "محصول ویژه (Featured)",
        colSpan: 6,
        description: "محصول‌های ویژه در صفحه اول بنر می‌شوند",
        defaultValue: false,
      },
      {
        // checkbox with custom cross-field validator
        name: "acceptTerms",
        type: "checkbox",
        label: "قوانین و مقررات فروش را می‌پذیرم",
        colSpan: 12,

        validation: {
          required: true,
          custom: (val) => (val ? null : "تأیید قوانین الزامی است"),
        },
        defaultValue: false,
      },
    ],
  };

  // ─────────────────────────────────────────────────────────────────────────
  // STEP 2 — Pricing & Inventory
  // Demonstrates: text (currency masked), number, range
  //               min/max validation, cross-field custom validation
  //               dynamic disabled (dependsOn), mask + formatter + parser
  // NOTE: price fields use type:"text" so maskCurrency (formatted string)
  //       is compatible — type:"number" rejects non-numeric characters.
  // ─────────────────────────────────────────────────────────────────────────
  const stepPricing: WizardStep = {
    id: "pricing",
    title: "قیمت‌گذاری و انبار",
    description: "قیمت، تخفیف، موجودی، وزن و نرخ مالیات",
    columns: 12,
    fields: [
      {
        // type:"text" + maskCurrency for live formatting while typing
        name: "price",
        type: "text",
        label: p.price,
        placeholder: p.pricePlaceholder,
        colSpan: 6,
        validation: { required: true },
        mask: maskCurrency,
        parser: parseCurrency,
        defaultValue: defaultValues?.price ? String(defaultValues.price) : "",
      },
      {
        // dynamic disabled + cross-field custom validator
        name: "comparePrice",
        type: "text",
        label: "قیمت قبل از تخفیف",
        placeholder: "قیمت اصلی برای نمایش تخفیف",
        colSpan: 6,
        description: "اگر تخفیف دارید قیمت اصلی را وارد کنید",
        mask: maskCurrency,
        parser: parseCurrency,
        disabled: (values) => !values.price || String(values.price) === "",
        dependsOn: ["price"],
        validation: {
          custom: (val, all) => {
            const cur = parseCurrency(all.price ?? 0);
            const orig = parseCurrency(val ?? 0);
            if (orig > 0 && orig <= cur)
              return "قیمت قبل تخفیف باید از قیمت فعلی بیشتر باشد";
            return null;
          },
        },
        defaultValue: "",
      },
      {
        name: "stock",
        type: "number",
        label: p.stock,
        placeholder: p.stockPlaceholder,
        colSpan: 6,
        validation: { required: true, min: 0 },
        defaultValue: defaultValues?.stock ?? "",
      },
      {
        name: "lowStockThreshold",
        type: "number",
        label: "آستانه هشدار کمبود موجودی",
        placeholder: "10",
        colSpan: 6,
        description: "وقتی موجودی به این عدد رسید هشدار نمایش داده می‌شود",
        validation: { min: 0 },
        defaultValue: 10,
      },
      {
        name: "weight",
        type: "number",
        label: "وزن (گرم)",
        placeholder: "0",
        colSpan: 6,
        validation: { min: 0 },
        defaultValue: "",
      },
      {
        // range slider — componentProps forwarded to underlying UI element
        name: "taxRate",
        type: "range",
        label: "نرخ مالیات بر ارزش افزوده (%)",
        colSpan: 6,
        description: "بین ۰ تا ۳۰ درصد",
        validation: { min: 0, max: 30 },
        defaultValue: 9,
        componentProps: { min: 0, max: 30, step: 1 },
      },
    ],
  };

  // ─────────────────────────────────────────────────────────────────────────
  // STEP 3 — Media & Description
  // Demonstrates: url, color, rating, file, date, time, datetime, textarea
  //               hidden dynamic (dependsOn), custom render override
  // ─────────────────────────────────────────────────────────────────────────
  const stepMedia: WizardStep = {
    id: "media",
    title: "رسانه و توضیحات",
    description: "تصویر، رنگ، امتیاز، فایل پیوست و توضیحات",
    columns: 12,
    fields: [
      {
        name: "imageUrl",
        type: "url",
        label: p.imageUrl,
        placeholder: p.imageUrlPlaceholder,
        colSpan: 12,
        defaultValue: defaultValues?.imageUrl ?? "",
      },
      {
        // color picker
        name: "productColor",
        type: "color",
        label: "رنگ شاخص",
        colSpan: 6,
        defaultValue: "#3b82f6",
      },
      {
        // CUSTOM RENDER — image preview (hidden until imageUrl has a value)
        name: "__imagePreview",
        type: "custom",
        label: "پیش‌نمایش",
        colSpan: 6,
        hidden: (values) => !values.imageUrl,
        dependsOn: ["imageUrl"],
        render: ({ onBlur }: FieldRenderContext) => (
          <div
            tabIndex={-1}
            onBlur={onBlur}
            className="rounded-xl border border-dashed border-border bg-muted/30
                       flex flex-col items-center justify-center gap-2 h-32 w-full
                       text-muted-foreground"
          >
            <Icon icon="solar:gallery-bold-duotone" width={28} />
            <span className="text-xs">
              پیش‌نمایش تصویر پس از ذخیره نمایش داده می‌شود
            </span>
          </div>
        ),
      },
      {
        // rating with componentProps
        name: "rating",
        type: "rating",
        label: "امتیاز اولیه",
        colSpan: 6,
        defaultValue: 0,
        componentProps: { max: 5 },
      },
      {
        name: "tags",
        type: "text",
        label: p.tags,
        placeholder: p.tagsPlaceholder,
        colSpan: 12,
        description: "تگ‌ها را با کاما جدا کنید",
        formatter: formatTrim,
        defaultValue: defaultValues?.tags ?? "",
      },
      {
        // file upload — componentProps forwarded to <input type="file">
        name: "attachedFile",
        type: "file",
        label: "فایل پیوست (PDF / Excel)",
        colSpan: 6,
        description: "مستندات فنی، برگه داده یا کاتالوگ محصول",
        componentProps: { accept: ".pdf,.xlsx,.csv", multiple: false },
        defaultValue: null,
      },
      {
        // date picker
        name: "launchDate",
        type: "date",
        label: "تاریخ عرضه به بازار",
        colSpan: 12,
        defaultValue: "",
      },
      {
        // time
        name: "launchTime",
        type: "time",
        label: "ساعت عرضه",
        colSpan: 12,
        defaultValue: "",
      },
      {
        // datetime
        name: "expiresAt",
        type: "datetime",
        label: "تاریخ انقضاء",
        colSpan: 12,
        description: "اختیاری — برای محصولات فصلی",
        defaultValue: "",
      },
      {
        name: "description",
        type: "textarea",
        label: p.description,
        placeholder: p.descriptionPlaceholder,
        colSpan: 12,
        validation: { maxLength: 1000 },
        defaultValue: defaultValues?.description ?? "",
        componentProps: { rows: 5 },
      },
    ],
  };

  // ─────────────────────────────────────────────────────────────────────────
  // STEP 4 — Contact & Security
  // Demonstrates: email, tel, password, otp, text
  //               maskPhone, maskBankCard, maskNationalCode, maskPostalCode,
  //               maskOTP, hidden (dynamic), dependsOn, minLength/maxLength,
  //               pattern validation
  // ─────────────────────────────────────────────────────────────────────────
  const stepContact: WizardStep = {
    id: "contact",
    title: "تماس و احراز هویت",
    description: "اطلاعات تماس مسئول محصول و تأیید هویت",
    columns: 12,
    fields: [
      {
        name: "managerEmail",
        type: "email",
        label: "ایمیل مسئول محصول",
        placeholder: "manager@example.com",
        colSpan: 12,
        validation: {
          pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        },
        defaultValue: "",
      },
      {
        // maskPhone
        name: "managerPhone",
        type: "tel",
        label: "تلفن مسئول",
        placeholder: "0912 345 6789",
        colSpan: 12,
        mask: safePhone,
        defaultValue: "",
      },
      {
        // maskNationalCode
        name: "managerNationalCode",
        type: "text",
        label: "کد ملی مسئول",
        placeholder: "0000000000",
        colSpan: 12,
        mask: maskNationalCode,
        validation: { minLength: 10, maxLength: 10 },
        defaultValue: "",
      },
      {
        // maskBankCard
        name: "bankCard",
        type: "text",
        label: "شماره کارت بانکی",
        placeholder: "1234 5678 9012 3456",
        colSpan: 12,
        mask: safeBankCard,
        defaultValue: "",
      },
      {
        // maskPostalCode
        name: "postalCode",
        type: "text",
        label: "کد پستی",
        placeholder: "12345-67890",
        colSpan: 5,
        mask: safePostalCode,
        defaultValue: "",
      },
      {
        // dynamic hidden — controlled by __skipPassword switch below
        name: "managerPassword",
        type: "password",
        label: "رمز عبور مسئول",
        placeholder: "حداقل ۸ کاراکتر",
        colSpan: 7,
        validation: { minLength: 8 },
        hidden: (values) => Boolean(values.__skipPassword),
        dependsOn: ["__skipPassword"],
        defaultValue: "",
      },
      {
        // this switch controls the hidden state of managerPassword above
        name: "__skipPassword",
        type: "switch",
        label: "تنظیم رمز عبور بعداً",
        colSpan: 12,
        defaultValue: false,
      },
      {
        // OTP field — maskOTP
        name: "otpCode",
        type: "otp",
        label: "کد تأیید پیامک",
        colSpan: 12,
        mask: maskOTP,
        description: "کد ۶ رقمی ارسال شده به موبایل را وارد کنید",
        validation: { minLength: 6, maxLength: 6 },
        defaultValue: "",
      },
    ],
  };

  // ─────────────────────────────────────────────────────────────────────────
  // STEP 5 — Variants (Repeater)
  // Demonstrates: repeater with minRows, maxRows, addLabel, removeLabel,
  //               defaultRow, nested sub-fields (text + number + mask)
  // ─────────────────────────────────────────────────────────────────────────
  const stepVariants: WizardStep = {
    id: "variants",
    title: "واریانت‌ها",
    description: "رنگ، سایز یا هر تنوع دیگری از محصول",
    columns: 12,
    fields: [
      {
        name: "variants",
        type: "repeater",
        label: "واریانت‌های محصول",
        colSpan: 12,
        description: "هر واریانت می‌تواند SKU، قیمت و موجودی مستقل داشته باشد",
        defaultValue: [],
        repeaterConfig: {
          minRows: 0,
          maxRows: 10,
          addLabel: "+ افزودن واریانت",
          removeLabel: "حذف",
          defaultRow: {
            variantName: "",
            variantSku: "",
            variantPrice: "",
            variantStock: 0,
          },
          fields: [
            {
              name: "variantName",
              type: "text",
              label: "نام واریانت",
              placeholder: "مثال: قرمز / XL / نسخه Pro",
              colSpan: 4,
              validation: { required: true, minLength: 1 },
            },
            {
              name: "variantSku",
              type: "text",
              label: "SKU واریانت",
              placeholder: "SKU-001-RED",
              colSpan: 3,
              validation: { required: true },
            },
            {
              name: "variantPrice",
              type: "number",
              label: "قیمت",
              placeholder: "0",
              colSpan: 3,
              mask: maskCurrency,
              formatter: formatCurrency,
              parser: parseCurrency,
              validation: { min: 0 },
            },
            {
              name: "variantStock",
              type: "number",
              label: "موجودی",
              placeholder: "0",
              colSpan: 2,
              validation: { min: 0 },
            },
          ],
        },
      },
    ],
  };

  // ─────────────────────────────────────────────────────────────────────────
  // Wizard (Create mode) — 5 steps
  // ─────────────────────────────────────────────────────────────────────────
  const wizardSteps: WizardStep[] = [
    stepBasic,
    stepPricing,
    stepMedia,
    stepContact,
    stepVariants,
  ];

  // ─────────────────────────────────────────────────────────────────────────
  // Flat Schema (Edit mode) — all fields from all steps merged into one form
  // ─────────────────────────────────────────────────────────────────────────
  const editSchema: FormSchema = {
    columns: 12,
    gap: "gap-5",
    fields: wizardSteps.flatMap((s) => s.fields),
  };

  const handleSubmit = useCallback(
    async (values: Record<string, unknown>) => {
      console.log("✅ Product submitted:", values);
      onSuccess?.(values);
      router.push("/apps/products");
    },
    [router, onSuccess],
  );

  return (
    <CardBox className="p-6">
      {/* ── Header ─────────────────────────────────────────────────────── */}
      <div className="flex items-center gap-3 mb-6 pb-5 border-b border-border">
        <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
          <Icon
            icon={
              isEdit ? "solar:pen-2-bold-duotone" : "solar:box-bold-duotone"
            }
            width={22}
            className="text-primary"
          />
        </div>
        <div className="flex-1 min-w-0">
          <h2 className="text-base font-semibold text-foreground">
            {isEdit ? p.editProduct : p.createProduct}
          </h2>
          <p className="text-xs text-muted-foreground mt-0.5 truncate">
            {isEdit
              ? `ویرایش: ${defaultValues?.name ?? "—"}`
              : "اطلاعات محصول جدید را در ۵ مرحله ثبت کنید"}
          </p>
        </div>
        <Button
          variant="ghost"
          size="sm"
          className="gap-1.5 text-muted-foreground shrink-0"
          onClick={() => router.back()}
        >
          <Icon icon="solar:arrow-right-linear" width={15} />
          {t.common.back}
        </Button>
      </div>

      {/*
       * ── RavenWizardForm (Create) / RavenForm (Edit) ─────────────────────
       *
       * Adapters (formAdapter + uiAdapter) are inherited from the global
       * <RavenDevToolsProvider> in root layout.tsx — no adapter props needed.
       *
       * Live form state is visible in the floating Raven DevTools panel
       * (bottom-right corner) in development mode.
       */}
      {isEdit ? (
        <RavenForm
          schema={editSchema}
          onSubmit={handleSubmit}
          defaultValues={defaultValues as Record<string, unknown>}
          submitLabel={t.common.save}
          resetLabel="بازنشانی"
          showReset
          className="w-full"
          submitClassName="min-w-32"
          adapter={RavenRHFAdapter}
        />
      ) : (
        <RavenWizardForm
          steps={wizardSteps}
          onSubmit={handleSubmit}
          defaultValues={defaultValues as Record<string, unknown>}
          submitLabel={p.createProduct}
          className="w-full"
        />
      )}
    </CardBox>
  );
}
