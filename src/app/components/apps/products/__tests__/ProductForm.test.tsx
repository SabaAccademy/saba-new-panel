/**
 * ProductForm — Strict React Testing Library test suite
 *
 * Strategy:
 *   1. raven-form-engine is mocked with functional components that render real
 *      <input> / <select> elements keyed by field definitions so RTL can
 *      interact with them via label and role queries.
 *   2. Captured props (steps / schema) are inspected directly in "schema unit"
 *      tests so we can assert field-level config (type, validation, mask, etc.)
 *      without coupling to any particular UI rendering detail.
 *   3. Behavioural / interaction tests drive the mocked wizard step-by-step and
 *      verify submissions, router calls and dynamic disabled / hidden logic.
 */

import React from "react";
import {
  render,
  screen,
  fireEvent,
  waitFor,
  within,
  act,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";

// ─── Captured props from mocked raven-form-engine ────────────────────────────
let capturedWizardProps: any = null;
let capturedFormProps: any = null;

// ─── Mock: raven-form-engine ─────────────────────────────────────────────────
// We render real HTML form elements based on field definitions so RTL queries
// (getByLabelText, getByRole, etc.) work out-of-the-box.
jest.mock("raven-form-engine", () => {
  const React = require("react");

  /** Render a single field config → real HTML element */
  function RenderField({
    field,
    values,
    onChange,
  }: {
    field: any;
    values: Record<string, any>;
    onChange: (name: string, value: any) => void;
  }) {
    // Evaluate dynamic hidden / disabled
    const isHidden =
      typeof field.hidden === "function"
        ? field.hidden(values)
        : Boolean(field.hidden);
    const isDisabled =
      typeof field.disabled === "function"
        ? field.disabled(values)
        : Boolean(field.disabled);

    if (isHidden) return null;

    const id = `field-${field.name}`;
    const val = values[field.name] ?? field.defaultValue ?? "";

    const label = <label htmlFor={id}>{field.label}</label>;

    switch (field.type) {
      case "select":
        return (
          <div>
            {label}
            <select
              id={id}
              name={field.name}
              disabled={isDisabled}
              value={val}
              onChange={(e) => onChange(field.name, e.target.value)}
              data-testid={`select-${field.name}`}
            >
              <option value="">{field.placeholder}</option>
              {field.options?.map((o: any) => (
                <option key={o.value} value={o.value} disabled={o.disabled}>
                  {o.label}
                </option>
              ))}
            </select>
          </div>
        );

      case "multiselect":
        return (
          <div>
            {label}
            <select
              id={id}
              name={field.name}
              multiple
              disabled={isDisabled}
              data-testid={`multiselect-${field.name}`}
            >
              {field.options?.map((o: any) => (
                <option key={o.value} value={o.value}>
                  {o.label}
                </option>
              ))}
            </select>
          </div>
        );

      case "radio":
        return (
          <fieldset>
            <legend>{field.label}</legend>
            {field.options?.map((o: any) => (
              <label key={o.value}>
                <input
                  type="radio"
                  name={field.name}
                  value={o.value}
                  checked={val === o.value}
                  onChange={() => onChange(field.name, o.value)}
                />
                {o.label}
              </label>
            ))}
          </fieldset>
        );

      case "checkbox":
        return (
          <div>
            <input
              type="checkbox"
              id={id}
              name={field.name}
              checked={Boolean(val)}
              disabled={isDisabled}
              onChange={(e) => onChange(field.name, e.target.checked)}
            />
            <label htmlFor={id}>{field.label}</label>
          </div>
        );

      case "switch":
        return (
          <div>
            <input
              type="checkbox"
              role="switch"
              id={id}
              name={field.name}
              checked={Boolean(val)}
              disabled={isDisabled}
              onChange={(e) => onChange(field.name, e.target.checked)}
            />
            <label htmlFor={id}>{field.label}</label>
          </div>
        );

      case "textarea":
        return (
          <div>
            {label}
            <textarea
              id={id}
              name={field.name}
              disabled={isDisabled}
              value={val}
              onChange={(e) => onChange(field.name, e.target.value)}
              {...(field.componentProps ?? {})}
            />
          </div>
        );

      case "range":
        return (
          <div>
            {label}
            <input
              type="range"
              id={id}
              name={field.name}
              disabled={isDisabled}
              defaultValue={String(val)}
              {...(field.componentProps ?? {})}
            />
          </div>
        );

      case "file":
        return (
          <div>
            {label}
            <input
              type="file"
              id={id}
              name={field.name}
              disabled={isDisabled}
              {...(field.componentProps ?? {})}
            />
          </div>
        );

      case "color":
        return (
          <div>
            {label}
            <input
              type="color"
              id={id}
              name={field.name}
              disabled={isDisabled}
              defaultValue={val}
            />
          </div>
        );

      case "rating":
        return (
          <div>
            {label}
            <input
              type="number"
              id={id}
              name={field.name}
              disabled={isDisabled}
              defaultValue={val}
              data-testid={`rating-${field.name}`}
            />
          </div>
        );

      case "otp":
        return (
          <div>
            {label}
            <input
              type="text"
              id={id}
              name={field.name}
              disabled={isDisabled}
              value={val}
              onChange={(e) => {
                const masked = field.mask
                  ? field.mask(e.target.value)
                  : e.target.value;
                onChange(field.name, masked);
              }}
              data-testid={`otp-${field.name}`}
            />
          </div>
        );

      case "repeater": {
        const rows: any[] = Array.isArray(val) ? val : [];
        const cfg = field.repeaterConfig;
        return (
          <div data-testid={`repeater-${field.name}`}>
            <span>{field.label}</span>
            {rows.map((row: any, idx: number) => (
              <div key={idx} data-testid={`repeater-row-${idx}`}>
                {cfg?.fields?.map((sf: any) => (
                  <input
                    key={sf.name}
                    aria-label={`${sf.label} row ${idx}`}
                    name={`${field.name}[${idx}].${sf.name}`}
                    defaultValue={row[sf.name] ?? ""}
                  />
                ))}
                <button
                  type="button"
                  aria-label={`remove row ${idx}`}
                  onClick={() => {
                    const next = [...rows];
                    next.splice(idx, 1);
                    onChange(field.name, next);
                  }}
                >
                  {cfg?.removeLabel ?? "حذف"}
                </button>
              </div>
            ))}
            {(!cfg?.maxRows || rows.length < cfg.maxRows) && (
              <button
                type="button"
                aria-label="add repeater row"
                onClick={() =>
                  onChange(field.name, [...rows, cfg?.defaultRow ?? {}])
                }
              >
                {cfg?.addLabel ?? "+"}
              </button>
            )}
          </div>
        );
      }

      case "custom":
        return (
          <div data-testid={`custom-${field.name}`}>
            {field.render?.({
              value: val,
              onChange: () => {},
              onBlur: () => {},
            })}
          </div>
        );

      default:
        // text, email, tel, url, number, password, date, time, datetime
        return (
          <div>
            {label}
            <input
              type={field.type}
              id={id}
              name={field.name}
              disabled={isDisabled}
              value={val}
              onChange={(e) => {
                const raw = e.target.value;
                const masked = field.mask ? field.mask(raw) : raw;
                onChange(field.name, masked);
              }}
            />
          </div>
        );
    }
  }

  /** Mock RavenWizardForm */
  function RavenWizardForm(props: any) {
    capturedWizardProps = props;
    const [step, setStep] = React.useState(0);
    const steps: any[] = props.steps ?? [];
    const currentStep = steps[step];

    // Accumulate per-step values across steps
    const initValues: Record<string, any> = {};
    steps.forEach((s: any) =>
      s.fields.forEach((f: any) => {
        initValues[f.name] = f.defaultValue ?? "";
      }),
    );
    const [values, setValues] = React.useState<Record<string, any>>({
      ...initValues,
      ...(props.defaultValues ?? {}),
    });

    const handleChange = (name: string, value: any) =>
      setValues((prev) => ({ ...prev, [name]: value }));

    const handleNext = (e: React.FormEvent) => {
      e.preventDefault();
      if (step < steps.length - 1) setStep((s) => s + 1);
      else props.onSubmit?.(values);
    };

    return (
      <form
        onSubmit={handleNext}
        data-testid="wizard-form"
        aria-label="wizard-form"
      >
        <div
          data-testid={`wizard-step-${currentStep?.id}`}
          data-step-title={currentStep?.title}
        >
          <h3 data-testid="step-title">{currentStep?.title}</h3>
          {currentStep?.fields?.map((f: any) => (
            <RenderField
              key={f.name}
              field={f}
              values={values}
              onChange={handleChange}
            />
          ))}
        </div>
        {step > 0 && (
          <button
            type="button"
            data-testid="wizard-prev"
            onClick={() => setStep((s) => s - 1)}
          >
            قبلی
          </button>
        )}
        <button type="submit" data-testid="wizard-next-or-submit">
          {step < steps.length - 1 ? "بعدی" : (props.submitLabel ?? "ثبت")}
        </button>
      </form>
    );
  }

  /** Mock RavenForm (flat, edit mode) */
  function RavenForm(props: any) {
    capturedFormProps = props;
    const fields: any[] = props.schema?.fields ?? [];
    const initValues: Record<string, any> = {};
    fields.forEach((f: any) => {
      initValues[f.name] = f.defaultValue ?? "";
    });
    const [values, setValues] = React.useState<Record<string, any>>({
      ...initValues,
      ...(props.defaultValues ?? {}),
    });

    const handleChange = (name: string, value: any) =>
      setValues((prev) => ({ ...prev, [name]: value }));

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      props.onSubmit?.(values);
    };

    return (
      <form
        onSubmit={handleSubmit}
        data-testid="edit-form"
        aria-label="edit-form"
      >
        {fields.map((f: any) => (
          <RenderField
            key={f.name}
            field={f}
            values={values}
            onChange={handleChange}
          />
        ))}
        {props.showReset && (
          <button type="reset" data-testid="reset-btn">
            {props.resetLabel ?? "بازنشانی"}
          </button>
        )}
        <button type="submit" data-testid="submit-btn">
          {props.submitLabel ?? "ذخیره"}
        </button>
      </form>
    );
  }

  return {
    RavenForm,
    RavenWizardForm,
    RavenFormProvider: ({ children }: any) => <>{children}</>,
    maskPhone: (v: string) => v.slice(0, 11),
    maskBankCard: (v: string) => v.slice(0, 16),
    maskNationalCode: (v: string) => v.slice(0, 10),
    maskPostalCode: (v: string) => v.slice(0, 10),
    maskOTP: (v: string) => v.slice(0, 6),
    maskCurrency: (v: string) => v,
    parseCurrency: (v: any) => Number(String(v).replace(/,/g, "")) || 0,
    formatCurrency: (v: any) => String(v),
    formatTrim: (v: string) => v.trim(),
  };
});

// ─── Mock: next/navigation ────────────────────────────────────────────────────
const mockPush = jest.fn();
const mockBack = jest.fn();
jest.mock("next/navigation", () => ({
  useRouter: () => ({ push: mockPush, back: mockBack }),
  usePathname: () => "/apps/products/new",
}));

// ─── Mock: @iconify/react ─────────────────────────────────────────────────────
jest.mock("@iconify/react", () => ({
  Icon: ({ icon }: { icon: string }) => (
    <span data-testid={`icon-${icon}`} aria-hidden />
  ),
}));

// ─── Mock: shared components ──────────────────────────────────────────────────
jest.mock("@/app/components/shared/CardBox", () => ({
  __esModule: true,
  default: ({ children, className }: any) => (
    <div className={className} data-testid="card-box">
      {children}
    </div>
  ),
}));

// ─── Mock: @/components/ui/button ────────────────────────────────────────────
jest.mock("@/components/ui/button", () => ({
  Button: ({ children, onClick, ...rest }: any) => (
    <button onClick={onClick} {...rest}>
      {children}
    </button>
  ),
}));

// ─── Mock: i18n context ───────────────────────────────────────────────────────
jest.mock("@/lib/i18n/context", () => ({
  useLocale: () => ({
    locale: "fa",
    dir: "rtl",
    setLocale: jest.fn(),
    t: {
      common: { back: "بازگشت", save: "ذخیره" },
      products: {
        title: "محصولات",
        createProduct: "افزودن محصول",
        editProduct: "ویرایش محصول",
        name: "نام محصول",
        namePlaceholder: "مثال: Samsung",
        sku: "کد محصول (SKU)",
        skuPlaceholder: "SKU-001",
        category: "دسته‌بندی",
        categoryPlaceholder: "دسته‌بندی را انتخاب کنید",
        price: "قیمت (تومان)",
        pricePlaceholder: "1,500,000",
        stock: "موجودی انبار",
        stockPlaceholder: "50",
        status: "وضعیت",
        description: "توضیحات",
        descriptionPlaceholder: "توضیح کوتاهی...",
        imageUrl: "آدرس تصویر",
        imageUrlPlaceholder: "https://example.com/image.jpg",
        tags: "برچسب‌ها",
        tagsPlaceholder: "موبایل، الکترونیک",
        active: "فعال",
        inactive: "غیرفعال",
        draft: "پیش‌نویس",
        categories: {
          electronics: "الکترونیک",
          clothing: "پوشاک",
          food: "مواد غذایی",
          books: "کتاب",
          sports: "ورزش",
          home: "خانه و آشپزخانه",
          beauty: "زیبایی و بهداشت",
          other: "سایر",
        },
      },
    },
  }),
}));

// ─── Import the component AFTER all mocks ────────────────────────────────────
import ProductForm from "../ProductForm";
import { CATEGORIES } from "../data";

// ─── Helpers ──────────────────────────────────────────────────────────────────
const renderCreate = (
  props?: Partial<React.ComponentProps<typeof ProductForm>>,
) => render(<ProductForm {...props} />);

const renderEdit = (
  defaultValues: Record<string, any>,
  props?: Partial<React.ComponentProps<typeof ProductForm>>,
) => render(<ProductForm isEdit defaultValues={defaultValues} {...props} />);

/** Advance the wizard to a specific step index (0-based) */
async function advanceWizardToStep(n: number) {
  for (let i = 0; i < n; i++) {
    fireEvent.click(screen.getByTestId("wizard-next-or-submit"));
    // Wait for the next step to render
    await waitFor(() =>
      expect(screen.getByTestId("wizard-next-or-submit")).toBeInTheDocument(),
    );
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// 1. RENDERING — Create mode
// ─────────────────────────────────────────────────────────────────────────────
describe("ProductForm — Create mode", () => {
  beforeEach(() => {
    capturedWizardProps = null;
    jest.clearAllMocks();
    renderCreate();
  });

  it("renders the wizard form (not the edit form)", () => {
    expect(screen.getByTestId("wizard-form")).toBeInTheDocument();
    expect(screen.queryByTestId("edit-form")).not.toBeInTheDocument();
  });

  it("shows the create product heading", () => {
    expect(screen.getByText("افزودن محصول")).toBeInTheDocument();
  });

  it("shows the 5-step subtitle", () => {
    expect(
      screen.getByText("اطلاعات محصول جدید را در ۵ مرحله ثبت کنید"),
    ).toBeInTheDocument();
  });

  it("renders the back button with correct label", () => {
    expect(screen.getByText("بازگشت")).toBeInTheDocument();
  });

  it("calls router.back() when back button is clicked", () => {
    fireEvent.click(screen.getByText("بازگشت"));
    expect(mockBack).toHaveBeenCalledTimes(1);
  });

  it("starts on step 1 (اطلاعات پایه)", () => {
    expect(screen.getByTestId("step-title")).toHaveTextContent("اطلاعات پایه");
  });

  it("passes exactly 5 steps to RavenWizardForm", () => {
    expect(capturedWizardProps.steps).toHaveLength(5);
  });

  it("has correct step ids in order", () => {
    const ids = capturedWizardProps.steps.map((s: any) => s.id);
    expect(ids).toEqual(["basic", "pricing", "media", "contact", "variants"]);
  });

  it("passes w-full className to RavenWizardForm", () => {
    expect(capturedWizardProps.className).toBe("w-full");
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// 2. RENDERING — Edit mode
// ─────────────────────────────────────────────────────────────────────────────
describe("ProductForm — Edit mode", () => {
  const defaults = {
    name: "Samsung Galaxy",
    sku: "SGS-001",
    category: "electronics",
    price: 1500000,
    stock: 10,
    status: "active",
  };

  beforeEach(() => {
    capturedFormProps = null;
    jest.clearAllMocks();
    renderEdit(defaults);
  });

  it("renders the flat edit form (not the wizard)", () => {
    expect(screen.getByTestId("edit-form")).toBeInTheDocument();
    expect(screen.queryByTestId("wizard-form")).not.toBeInTheDocument();
  });

  it("shows the edit product heading", () => {
    expect(screen.getByText("ویرایش محصول")).toBeInTheDocument();
  });

  it("shows the product name in the sub-heading", () => {
    expect(screen.getByText(`ویرایش: ${defaults.name}`)).toBeInTheDocument();
  });

  it("shows the reset button in edit mode", () => {
    expect(screen.getByTestId("reset-btn")).toBeInTheDocument();
  });

  it("reset button has the correct label", () => {
    expect(screen.getByTestId("reset-btn")).toHaveTextContent("بازنشانی");
  });

  it("passes showReset=true to RavenForm", () => {
    expect(capturedFormProps.showReset).toBe(true);
  });

  it("pre-fills name field with defaultValues", () => {
    expect(screen.getByLabelText("نام محصول")).toHaveValue(defaults.name);
  });

  it("pre-fills sku field with defaultValues", () => {
    expect(screen.getByLabelText("کد محصول (SKU)")).toHaveValue(defaults.sku);
  });

  it("calls onSuccess and router.push after form submission", async () => {
    const onSuccess = jest.fn();
    const { unmount } = renderEdit(defaults, { onSuccess });
    fireEvent.submit(screen.getAllByTestId("edit-form")[1]);
    await waitFor(() => {
      expect(onSuccess).toHaveBeenCalledTimes(1);
      expect(mockPush).toHaveBeenCalledWith("/apps/products");
    });
    unmount();
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// 3. WIZARD NAVIGATION
// ─────────────────────────────────────────────────────────────────────────────
describe("ProductForm — Wizard navigation", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    renderCreate();
  });

  it("advances to step 2 (قیمت‌گذاری و انبار) on Next click", async () => {
    await advanceWizardToStep(1);
    expect(screen.getByTestId("step-title")).toHaveTextContent(
      "قیمت‌گذاری و انبار",
    );
  });

  it("advances to step 3 (رسانه و توضیحات)", async () => {
    await advanceWizardToStep(2);
    expect(screen.getByTestId("step-title")).toHaveTextContent(
      "رسانه و توضیحات",
    );
  });

  it("advances to step 4 (تماس و احراز هویت)", async () => {
    await advanceWizardToStep(3);
    expect(screen.getByTestId("step-title")).toHaveTextContent(
      "تماس و احراز هویت",
    );
  });

  it("advances to step 5 (واریانت‌ها)", async () => {
    await advanceWizardToStep(4);
    expect(screen.getByTestId("step-title")).toHaveTextContent("واریانت‌ها");
  });

  it("shows 'قبلی' button only from step 2 onward", async () => {
    expect(screen.queryByTestId("wizard-prev")).not.toBeInTheDocument();
    await advanceWizardToStep(1);
    expect(screen.getByTestId("wizard-prev")).toBeInTheDocument();
  });

  it("goes back to step 1 when 'قبلی' is clicked", async () => {
    await advanceWizardToStep(1);
    fireEvent.click(screen.getByTestId("wizard-prev"));
    await waitFor(() =>
      expect(screen.getByTestId("step-title")).toHaveTextContent(
        "اطلاعات پایه",
      ),
    );
  });

  it("shows submitLabel ('افزودن محصول') on the last step", async () => {
    await advanceWizardToStep(4);
    expect(screen.getByTestId("wizard-next-or-submit")).toHaveTextContent(
      "افزودن محصول",
    );
  });

  it("calls onSubmit + router.push after completing all 5 steps", async () => {
    // beforeEach already renders — use its form, spy via onSuccess captured
    // by wrapping in a controlled render in its own container
    const { cleanup } = await import("@testing-library/react");
    cleanup(); // remove beforeEach render so only one form is in DOM
    const onSuccess = jest.fn();
    render(<ProductForm onSuccess={onSuccess} />);
    await advanceWizardToStep(4);
    fireEvent.click(screen.getByTestId("wizard-next-or-submit"));
    await waitFor(() => {
      expect(onSuccess).toHaveBeenCalledTimes(1);
      expect(mockPush).toHaveBeenCalledWith("/apps/products");
    });
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// 4. STEP 1 — Fields presence and interaction
// ─────────────────────────────────────────────────────────────────────────────
describe("Step 1 — Basic Info fields", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    renderCreate();
  });

  it("renders نام محصول text input", () => {
    expect(screen.getByLabelText("نام محصول")).toBeInTheDocument();
  });

  it("renders SKU text input", () => {
    expect(screen.getByLabelText("کد محصول (SKU)")).toBeInTheDocument();
  });

  it("renders category select", () => {
    expect(screen.getByTestId("select-category")).toBeInTheDocument();
  });

  it("category select has all 8 CATEGORIES as options", () => {
    const select = screen.getByTestId("select-category");
    const options = within(select).getAllByRole("option");
    // placeholder + 8 categories = 9 options
    expect(options).toHaveLength(9);
  });

  it("'سایر' (other) option in category is disabled", () => {
    // 'سایر' appears in both category select and multiselect — scope to category
    const categorySelect = screen.getByTestId("select-category");
    const otherOption = within(categorySelect).getByRole("option", {
      name: "سایر",
    });
    expect(otherOption).toBeDisabled();
  });

  it("renders status radio group with 3 options", () => {
    const radios = screen.getAllByRole("radio");
    expect(radios.length).toBeGreaterThanOrEqual(3);
  });

  it("'فعال' radio is checked by default", () => {
    const activeRadio = screen.getByDisplayValue("active");
    expect(activeRadio).toBeChecked();
  });

  it("renders 'محصول ویژه' switch", () => {
    const toggle = screen.getByRole("switch", {
      name: "محصول ویژه (Featured)",
    });
    expect(toggle).toBeInTheDocument();
    expect(toggle).not.toBeChecked();
  });

  it("renders 'قوانین' checkbox unchecked by default", () => {
    const cb = screen.getByRole("checkbox", {
      name: "قوانین و مقررات فروش را می‌پذیرم",
    });
    expect(cb).toBeInTheDocument();
    expect(cb).not.toBeChecked();
  });

  it("accepts typing in name field", async () => {
    const input = screen.getByLabelText("نام محصول");
    await userEvent.type(input, "Test Product");
    expect(input).toHaveValue("Test Product");
  });

  it("accepts typing in SKU field", async () => {
    const input = screen.getByLabelText("کد محصول (SKU)");
    await userEvent.type(input, "SKU-999");
    expect(input).toHaveValue("SKU-999");
  });

  it("can change category select", async () => {
    const select = screen.getByTestId("select-category") as HTMLSelectElement;
    await userEvent.selectOptions(select, "electronics");
    expect(select.value).toBe("electronics");
  });

  it("terms checkbox becomes checked on click", async () => {
    const cb = screen.getByRole("checkbox", {
      name: "قوانین و مقررات فروش را می‌پذیرم",
    });
    await userEvent.click(cb);
    expect(cb).toBeChecked();
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// 5. STEP 2 — Pricing fields (currency, dynamic disabled)
// ─────────────────────────────────────────────────────────────────────────────
describe("Step 2 — Pricing fields", () => {
  beforeEach(async () => {
    jest.clearAllMocks();
    renderCreate();
    await advanceWizardToStep(1);
  });

  it("renders price field as type=text (not number)", () => {
    const priceInput = screen.getByLabelText("قیمت (تومان)");
    expect(priceInput).toHaveAttribute("type", "text");
  });

  it("price field is editable", async () => {
    const priceInput = screen.getByLabelText("قیمت (تومان)");
    await userEvent.clear(priceInput);
    await userEvent.type(priceInput, "1500000");
    expect(priceInput).toHaveValue("1500000");
  });

  it("comparePrice is DISABLED when price is empty", () => {
    const comparePriceInput = screen.getByLabelText("قیمت قبل از تخفیف");
    expect(comparePriceInput).toBeDisabled();
  });

  it("comparePrice becomes ENABLED after price is filled", async () => {
    const priceInput = screen.getByLabelText("قیمت (تومان)");
    await userEvent.type(priceInput, "1000000");
    const comparePriceInput = screen.getByLabelText("قیمت قبل از تخفیف");
    expect(comparePriceInput).not.toBeDisabled();
  });

  it("comparePrice is also type=text", () => {
    const input = screen.getByLabelText("قیمت قبل از تخفیف");
    expect(input).toHaveAttribute("type", "text");
  });

  it("renders stock number input", () => {
    const stock = screen.getByLabelText("موجودی انبار");
    expect(stock).toHaveAttribute("type", "number");
  });

  it("renders taxRate range slider with correct config", () => {
    const range = screen.getByLabelText("نرخ مالیات بر ارزش افزوده (%)");
    expect(range).toHaveAttribute("type", "range");
    expect(range).toHaveAttribute("min", "0");
    expect(range).toHaveAttribute("max", "30");
    expect(range).toHaveAttribute("step", "1");
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// 6. STEP 3 — Media fields (custom render, hidden image preview)
// ─────────────────────────────────────────────────────────────────────────────
describe("Step 3 — Media fields", () => {
  beforeEach(async () => {
    jest.clearAllMocks();
    renderCreate();
    await advanceWizardToStep(2);
  });

  it("renders imageUrl as url input", () => {
    const urlInput = screen.getByLabelText("آدرس تصویر");
    expect(urlInput).toHaveAttribute("type", "url");
  });

  it("image preview custom field is HIDDEN when imageUrl is empty", () => {
    expect(
      screen.queryByTestId("custom-__imagePreview"),
    ).not.toBeInTheDocument();
  });

  it("image preview custom field APPEARS after imageUrl is filled", async () => {
    const urlInput = screen.getByLabelText("آدرس تصویر");
    await userEvent.type(urlInput, "https://example.com/img.jpg");
    await waitFor(() =>
      expect(screen.getByTestId("custom-__imagePreview")).toBeInTheDocument(),
    );
  });

  it("renders color picker input", () => {
    const color = screen.getByLabelText("رنگ شاخص");
    expect(color).toHaveAttribute("type", "color");
  });

  it("renders rating input", () => {
    expect(screen.getByTestId("rating-rating")).toBeInTheDocument();
  });

  it("renders file upload with correct accept attribute", () => {
    const fileInput = screen.getByLabelText("فایل پیوست (PDF / Excel)");
    expect(fileInput).toHaveAttribute("type", "file");
    expect(fileInput).toHaveAttribute("accept", ".pdf,.xlsx,.csv");
  });

  it("renders launchDate as date input", () => {
    const d = screen.getByLabelText("تاریخ عرضه به بازار");
    expect(d).toHaveAttribute("type", "date");
  });

  it("renders launchTime as time input", () => {
    const t = screen.getByLabelText("ساعت عرضه");
    expect(t).toHaveAttribute("type", "time");
  });

  it("renders expiresAt as datetime-local input", () => {
    const dt = screen.getByLabelText("تاریخ انقضاء");
    expect(dt).toHaveAttribute("type", "datetime");
  });

  it("renders description as textarea", () => {
    const ta = screen.getByLabelText("توضیحات");
    expect(ta.tagName.toLowerCase()).toBe("textarea");
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// 7. STEP 4 — Contact & Security (masks, hidden password)
// ─────────────────────────────────────────────────────────────────────────────
describe("Step 4 — Contact & Security fields", () => {
  beforeEach(async () => {
    jest.clearAllMocks();
    renderCreate();
    await advanceWizardToStep(3);
  });

  it("renders manager email as email input", () => {
    const email = screen.getByLabelText("ایمیل مسئول محصول");
    expect(email).toHaveAttribute("type", "email");
  });

  it("renders manager phone as tel input", () => {
    const tel = screen.getByLabelText("تلفن مسئول");
    expect(tel).toHaveAttribute("type", "tel");
  });

  it("renders national code as text input", () => {
    const nc = screen.getByLabelText("کد ملی مسئول");
    expect(nc).toHaveAttribute("type", "text");
  });

  it("renders bank card as text input", () => {
    const bc = screen.getByLabelText("شماره کارت بانکی");
    expect(bc).toHaveAttribute("type", "text");
  });

  it("renders postal code as text input", () => {
    const pc = screen.getByLabelText("کد پستی");
    expect(pc).toHaveAttribute("type", "text");
  });

  it("manager password field is VISIBLE when __skipPassword is false (default)", () => {
    expect(screen.getByLabelText("رمز عبور مسئول")).toBeInTheDocument();
  });

  it("manager password field is HIDDEN when 'تنظیم رمز عبور بعداً' switch is ON", async () => {
    const toggle = screen.getByRole("switch", {
      name: "تنظیم رمز عبور بعداً",
    });
    await userEvent.click(toggle);
    await waitFor(() =>
      expect(screen.queryByLabelText("رمز عبور مسئول")).not.toBeInTheDocument(),
    );
  });

  it("renders OTP field", () => {
    expect(screen.getByTestId("otp-otpCode")).toBeInTheDocument();
  });

  it("renders managerPassword as password type", () => {
    const pwd = screen.getByLabelText("رمز عبور مسئول");
    expect(pwd).toHaveAttribute("type", "password");
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// 8. STEP 5 — Variants (Repeater)
// ─────────────────────────────────────────────────────────────────────────────
describe("Step 5 — Variants repeater", () => {
  beforeEach(async () => {
    jest.clearAllMocks();
    renderCreate();
    await advanceWizardToStep(4);
  });

  it("renders the variants repeater container", () => {
    expect(screen.getByTestId("repeater-variants")).toBeInTheDocument();
  });

  it("starts with zero rows", () => {
    expect(screen.queryByTestId("repeater-row-0")).not.toBeInTheDocument();
  });

  it("adds a row when '+ افزودن واریانت' is clicked", async () => {
    await userEvent.click(
      screen.getByRole("button", { name: "add repeater row" }),
    );
    await waitFor(() =>
      expect(screen.getByTestId("repeater-row-0")).toBeInTheDocument(),
    );
  });

  it("adds multiple rows up to maxRows (10)", async () => {
    const addBtn = screen.getByRole("button", { name: "add repeater row" });
    for (let i = 0; i < 5; i++) {
      await userEvent.click(addBtn);
    }
    await waitFor(() =>
      expect(screen.getAllByTestId(/repeater-row-/)).toHaveLength(5),
    );
  });

  it("removes a row when delete button is clicked", async () => {
    await userEvent.click(
      screen.getByRole("button", { name: "add repeater row" }),
    );
    await waitFor(() =>
      expect(screen.getByTestId("repeater-row-0")).toBeInTheDocument(),
    );
    await userEvent.click(screen.getByRole("button", { name: "remove row 0" }));
    await waitFor(() =>
      expect(screen.queryByTestId("repeater-row-0")).not.toBeInTheDocument(),
    );
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// 9. SCHEMA UNIT TESTS — Field config assertions (type, validation, mask, etc.)
// ─────────────────────────────────────────────────────────────────────────────
describe("Field schema — captured from RavenWizardForm props", () => {
  beforeEach(() => {
    capturedWizardProps = null;
    jest.clearAllMocks();
    renderCreate();
  });

  // Helper: get field by name across all steps
  function getField(name: string) {
    for (const step of capturedWizardProps!.steps) {
      const f = step.fields.find((x: any) => x.name === name);
      if (f) return f;
    }
    return undefined;
  }

  // All 22 field types should be present
  const expectedTypes = [
    "text",
    "email",
    "tel",
    "url",
    "number",
    "password",
    "textarea",
    "date",
    "time",
    "datetime",
    "select",
    "multiselect",
    "radio",
    "checkbox",
    "switch",
    "otp",
    "file",
    "range",
    "color",
    "rating",
    "repeater",
    "custom",
  ];

  it("covers all 22 field types across the 5 steps", () => {
    const allFields = capturedWizardProps!.steps.flatMap((s: any) => s.fields);
    const types = new Set(allFields.map((f: any) => f.type));
    for (const t of expectedTypes) {
      expect(types).toContain(t);
    }
  });

  // --- name field ---
  it("name field: type=text, required, minLength=2, maxLength=100", () => {
    const f = getField("name");
    expect(f).toBeDefined();
    expect(f.type).toBe("text");
    expect(f.validation.required).toBe(true);
    expect(f.validation.minLength).toBe(2);
    expect(f.validation.maxLength).toBe(100);
  });

  it("name field has formatTrim as formatter", () => {
    const f = getField("name");
    expect(typeof f.formatter).toBe("function");
    expect(f.formatter("  hello  ")).toBe("hello");
  });

  // --- sku field ---
  it("sku field: pattern = /^[A-Z0-9\\-]+$/", () => {
    const f = getField("sku");
    expect(f.validation.pattern).toBeInstanceOf(RegExp);
    expect(f.validation.pattern.test("SKU-001")).toBe(true);
    expect(f.validation.pattern.test("invalid sku")).toBe(false);
  });

  it("sku asyncCustom rejects 'TAKEN-001'", async () => {
    const f = getField("sku");
    const result = await f.validation.asyncCustom("TAKEN-001");
    expect(result).toMatch(/ثبت شده/);
  });

  it("sku asyncCustom accepts valid SKU", async () => {
    const f = getField("sku");
    const result = await f.validation.asyncCustom("NEW-999");
    expect(result).toBeNull();
  });

  // --- category field ---
  it("category select has 8 options matching CATEGORIES", () => {
    const f = getField("category");
    expect(f.type).toBe("select");
    expect(f.options).toHaveLength(CATEGORIES.length);
  });

  it("category 'other' option is disabled", () => {
    const f = getField("category");
    const other = f.options.find((o: any) => o.value === "other");
    expect(other.disabled).toBe(true);
  });

  // --- price field ---
  it("price field: type=text (not number), has formatter and parser", () => {
    const f = getField("price");
    expect(f.type).toBe("text");
    expect(f.mask).toBeUndefined(); // mask removed — formatter only
    expect(typeof f.formatter).toBe("function");
    expect(typeof f.parser).toBe("function");
  });

  it("price parseCurrency converts formatted string to number", () => {
    const f = getField("price");
    expect(f.parser("1,500,000")).toBe(1500000);
  });

  // --- comparePrice field ---
  it("comparePrice: disabled=function (dependsOn price)", () => {
    const f = getField("comparePrice");
    expect(typeof f.disabled).toBe("function");
    expect(f.dependsOn).toContain("price");
  });

  it("comparePrice disabled fn returns true when price is empty", () => {
    const f = getField("comparePrice");
    expect(f.disabled({ price: "" })).toBe(true);
    expect(f.disabled({ price: "0" })).toBe(false);
  });

  it("comparePrice cross-field validator rejects compare <= current price", () => {
    const f = getField("comparePrice");
    const err = f.validation.custom("500", { price: "1000" });
    expect(err).toMatch(/بیشتر/);
  });

  it("comparePrice cross-field validator passes when compare > price", () => {
    const f = getField("comparePrice");
    const err = f.validation.custom("2000", { price: "1000" });
    expect(err).toBeNull();
  });

  // --- stock field ---
  it("stock field: type=number, required, min=0", () => {
    const f = getField("stock");
    expect(f.type).toBe("number");
    expect(f.validation.required).toBe(true);
    expect(f.validation.min).toBe(0);
  });

  // --- taxRate field ---
  it("taxRate: type=range, min=0, max=30, componentProps forwarded", () => {
    const f = getField("taxRate");
    expect(f.type).toBe("range");
    expect(f.validation.min).toBe(0);
    expect(f.validation.max).toBe(30);
    expect(f.componentProps).toMatchObject({ min: 0, max: 30, step: 1 });
  });

  // --- managerPhone mask ---
  it("managerPhone uses safePhone mask that strips non-digits before masking", () => {
    const f = getField("managerPhone");
    expect(typeof f.mask).toBe("function");
    // Calling with an already-masked value (with spaces) should NOT break
    // i.e. the safe wrapper strips spaces, then re-masks from clean digits
    const result1 = f.mask("0912 345 6789");
    const result2 = f.mask("09123456789");
    // Both should produce the same output (same underlying digits)
    expect(result1).toBe(result2);
  });

  it("managerPhone mask strips non-digit characters before masking", () => {
    const f = getField("managerPhone");
    // A value with hyphens and spaces should strip them and re-mask
    expect(f.mask("09-12-34")).toBe(f.mask("091234"));
  });

  // --- bankCard mask ---
  it("bankCard uses safeBankCard mask that strips non-digits", () => {
    const f = getField("bankCard");
    expect(typeof f.mask).toBe("function");
    const withSpaces = f.mask("6037 9975 1234 5678");
    const noSpaces = f.mask("6037997512345678");
    expect(withSpaces).toBe(noSpaces);
  });

  // --- postalCode mask ---
  it("postalCode uses safePostalCode mask that strips non-digits", () => {
    const f = getField("postalCode");
    expect(typeof f.mask).toBe("function");
    const withDash = f.mask("12345-67890");
    const clean = f.mask("1234567890");
    expect(withDash).toBe(clean);
  });

  // --- managerNationalCode ---
  it("nationalCode: minLength=10, maxLength=10", () => {
    const f = getField("managerNationalCode");
    expect(f.validation.minLength).toBe(10);
    expect(f.validation.maxLength).toBe(10);
  });

  // --- managerPassword ---
  it("managerPassword: type=password, hidden=function (dependsOn __skipPassword)", () => {
    const f = getField("managerPassword");
    expect(f.type).toBe("password");
    expect(typeof f.hidden).toBe("function");
    expect(f.dependsOn).toContain("__skipPassword");
    expect(f.hidden({ __skipPassword: false })).toBe(false);
    expect(f.hidden({ __skipPassword: true })).toBe(true);
  });

  // --- acceptTerms ---
  it("acceptTerms: custom validator returns error when false", () => {
    const f = getField("acceptTerms");
    expect(f.validation.custom(false)).toMatch(/الزامی/);
    expect(f.validation.custom(true)).toBeNull();
  });

  // --- imageUrl custom preview ---
  it("__imagePreview: type=custom, hidden when imageUrl empty", () => {
    const f = getField("__imagePreview");
    expect(f.type).toBe("custom");
    expect(typeof f.hidden).toBe("function");
    expect(f.hidden({ imageUrl: "" })).toBe(true);
    expect(f.hidden({ imageUrl: "https://x.com/img.jpg" })).toBe(false);
  });

  it("__imagePreview has a render function", () => {
    const f = getField("__imagePreview");
    expect(typeof f.render).toBe("function");
  });

  // --- variants repeater ---
  it("variants: type=repeater, minRows=0, maxRows=10", () => {
    const f = getField("variants");
    expect(f.type).toBe("repeater");
    expect(f.repeaterConfig.minRows).toBe(0);
    expect(f.repeaterConfig.maxRows).toBe(10);
  });

  it("variants repeater has 4 sub-fields: variantName, variantSku, variantPrice, variantStock", () => {
    const f = getField("variants");
    const subNames = f.repeaterConfig.fields.map((sf: any) => sf.name);
    expect(subNames).toEqual([
      "variantName",
      "variantSku",
      "variantPrice",
      "variantStock",
    ]);
  });

  it("variants addLabel and removeLabel are set", () => {
    const f = getField("variants");
    expect(f.repeaterConfig.addLabel).toContain("افزودن");
    expect(f.repeaterConfig.removeLabel).toBe("حذف");
  });

  // --- colSpan ---
  it("all top-level fields have colSpan defined", () => {
    for (const step of capturedWizardProps!.steps) {
      for (const f of step.fields) {
        expect(f.colSpan).toBeDefined();
      }
    }
  });

  // --- edit schema —
  it("edit schema contains all fields from all 5 steps (flattened)", () => {
    capturedFormProps = null;
    renderEdit({ name: "Test" });
    const totalFieldsInWizard = capturedWizardProps!.steps.reduce(
      (acc: number, s: any) => acc + s.fields.length,
      0,
    );
    expect(capturedFormProps!.schema.fields).toHaveLength(totalFieldsInWizard);
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// 10. HEADER — Edit mode with no name
// ─────────────────────────────────────────────────────────────────────────────
describe("ProductForm — Header edge cases", () => {
  it("shows '—' when editing with no defaultValues.name", () => {
    render(<ProductForm isEdit defaultValues={{}} />);
    expect(screen.getByText("ویرایش: —")).toBeInTheDocument();
  });

  it("shows create icon when not isEdit", () => {
    renderCreate();
    expect(
      screen.getByTestId("icon-solar:box-bold-duotone"),
    ).toBeInTheDocument();
  });

  it("shows edit icon when isEdit", () => {
    renderEdit({ name: "Test" });
    expect(
      screen.getByTestId("icon-solar:pen-2-bold-duotone"),
    ).toBeInTheDocument();
  });
});
