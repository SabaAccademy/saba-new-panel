// @ts-nocheck
"use client";

import React, { memo, useCallback, useEffect, useRef } from "react";
import { Icon } from "@iconify/react/dist/iconify.js";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { FormField, FormAdapter, UIAdapter, RepeaterConfig } from "./types";

// ─── Types ────────────────────────────────────────────────────────────────────
interface RepeaterRowProps {
  rowIndex: number;
  rowId: string;
  config: RepeaterConfig;
  adapter: FormAdapter;
  ui: UIAdapter;
  namePrefix: string;
  canRemove: boolean;
  onRemove: (rowId: string) => void;
}

// ─── Row ──────────────────────────────────────────────────────────────────────
// Import SmartField from SmartForm lazily to avoid circular dep issues —
// we re-implement a minimal inline version here.
const RepeaterRow = memo<RepeaterRowProps>(
  ({ rowIndex, rowId, config, adapter, ui, namePrefix, canRemove, onRemove }) => {
    return (
      <div className="relative rounded-xl border border-border bg-muted/20 p-4">
        {/* Row number badge */}
        <div className="absolute -top-3 start-4 flex items-center gap-1.5">
          <span className="text-[10px] font-bold text-muted-foreground bg-background border border-border rounded-full px-2 py-0.5">
            #{rowIndex + 1}
          </span>
        </div>

        <div
          className="grid gap-3"
          style={{ gridTemplateColumns: "repeat(12, minmax(0, 1fr))" }}
        >
          {config.fields.map((subField) => {
            const scopedName = `${namePrefix}[${rowIndex}].${subField.name}`;
            return (
              <InlineSmartField
                key={subField.name}
                field={{ ...subField, name: scopedName }}
                adapter={adapter}
                ui={ui}
              />
            );
          })}
        </div>

        {canRemove && (
          <button
            type="button"
            onClick={() => onRemove(rowId)}
            className="absolute -top-3 end-3 w-6 h-6 rounded-full bg-destructive/10 hover:bg-destructive/20 text-destructive flex items-center justify-center transition-colors"
            title={config.removeLabel ?? "حذف ردیف"}
          >
            <Icon icon="solar:trash-bin-minimalistic-bold" width={11} />
          </button>
        )}
      </div>
    );
  },
);
RepeaterRow.displayName = "RepeaterRow";

// ─── Inline SmartField (minimal, no mask/async for nested — keeps it simple) ──
// For full mask support, SmartForm.SmartField is used for top-level fields.
// Repeater sub-fields go through the standard adapter binding.
const InlineSmartField = memo<{
  field: FormField;
  adapter: FormAdapter;
  ui: UIAdapter;
}>(({ field, adapter, ui }) => {
  const binding = adapter.useField(field.name);
  const colClass = field.colSpan
    ? `col-span-12 sm:col-span-${field.colSpan}`
    : "col-span-12 sm:col-span-6";

  const commonProps = {
    id: field.name,
    value: (binding.value as string | number | undefined) ?? "",
    onChange: binding.onChange,
    onBlur: binding.onBlur,
    placeholder: field.placeholder,
    disabled: typeof field.disabled === "boolean" ? field.disabled : false,
    error: binding.error,
    label: field.label,
    ...(field.componentProps ?? {}),
  };

  const renderInput = () => {
    switch (field.type) {
      case "email": return <ui.Input {...commonProps} type="email" />;
      case "tel": return <ui.Input {...commonProps} type="tel" />;
      case "number": return <ui.Input {...commonProps} type="number" />;
      case "password": return <ui.PasswordInput {...commonProps} />;
      case "textarea": return <ui.Textarea {...commonProps} />;
      case "date": return <ui.DatePicker {...commonProps} />;
      case "time": return <ui.Input {...commonProps} type="time" />;
      case "select": return <ui.Select {...commonProps} options={field.options} />;
      case "multiselect": return <ui.MultiSelect {...commonProps} options={field.options} />;
      case "radio": return <ui.Radio {...commonProps} options={field.options} />;
      case "checkbox": return <ui.Checkbox {...commonProps} />;
      case "switch": return <ui.Switch {...commonProps} />;
      case "range": return <ui.Range {...commonProps} />;
      case "color": return <ui.ColorPicker {...commonProps} />;
      case "rating": return <ui.Rating {...commonProps} />;
      default: return <ui.Input {...commonProps} type="text" />;
    }
  };

  const skipFormItem = field.type === "checkbox" || field.type === "switch";
  if (skipFormItem) {
    return (
      <div className={cn(colClass, "flex items-center pt-5")}>{renderInput()}</div>
    );
  }

  return (
    <div className={colClass}>
      <ui.FormItem
        label={field.label}
        error={binding.error}
        description={field.description}
        required={!!field.validation?.required}
      >
        {renderInput()}
      </ui.FormItem>
    </div>
  );
});
InlineSmartField.displayName = "InlineSmartField";

// ─── Row ID generator ─────────────────────────────────────────────────────────
let _nextId = 0;
const genId = () => `row_${++_nextId}`;

// ─── SmartRepeaterField ───────────────────────────────────────────────────────
export interface SmartRepeaterFieldProps {
  /** The top-level FormField with type="repeater" */
  field: FormField;
  adapter: FormAdapter;
  ui: UIAdapter;
}

export const SmartRepeaterField = memo<SmartRepeaterFieldProps>(
  ({ field, adapter, ui }) => {
    const config: RepeaterConfig = field.repeaterConfig ?? { fields: [] };
    const minRows = config.minRows ?? 0;
    const maxRows = config.maxRows ?? 10;

    // We track row IDs locally (just for keys/remove)
    const [rowIds, setRowIds] = React.useState<string[]>(() => {
      const count = Math.max(minRows, 1);
      return Array.from({ length: count }, genId);
    });

    const canAdd = rowIds.length < maxRows;
    const canRemove = rowIds.length > minRows;

    const addRow = useCallback(() => {
      if (canAdd) setRowIds((prev) => [...prev, genId()]);
    }, [canAdd]);

    const removeRow = useCallback((id: string) => {
      setRowIds((prev) => prev.filter((rid) => rid !== id));
    }, []);

    return (
      <div className="col-span-12 flex flex-col gap-3">
        {/* Section header */}
        {field.label && (
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold">{field.label}</p>
              {field.description && (
                <p className="text-xs text-muted-foreground mt-0.5">{field.description}</p>
              )}
            </div>
            <span className="text-xs text-muted-foreground bg-muted rounded-full px-2 py-0.5">
              {rowIds.length} / {maxRows}
            </span>
          </div>
        )}

        {/* Rows */}
        <div className="flex flex-col gap-4">
          {rowIds.map((id, index) => (
            <RepeaterRow
              key={id}
              rowId={id}
              rowIndex={index}
              config={config}
              adapter={adapter}
              ui={ui}
              namePrefix={field.name}
              canRemove={canRemove && rowIds.length > 1}
              onRemove={removeRow}
            />
          ))}
        </div>

        {/* Add row button */}
        {canAdd && (
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={addRow}
            className="self-start gap-1.5 text-xs"
          >
            <Icon icon="solar:add-circle-bold" width={14} />
            {config.addLabel ?? "افزودن ردیف"}
          </Button>
        )}

        {!canAdd && (
          <p className="text-xs text-muted-foreground">
            حداکثر {maxRows} ردیف مجاز است.
          </p>
        )}
      </div>
    );
  },
);
SmartRepeaterField.displayName = "SmartRepeaterField";
