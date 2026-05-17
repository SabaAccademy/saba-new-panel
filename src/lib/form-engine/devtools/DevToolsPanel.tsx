"use client";

import React, { useState, useCallback } from "react";
import { Icon } from "@iconify/react";
import { cn } from "@/lib/utils";
import { useDevTools, type FormSnapshot } from "./DevToolsContext";

// ─── JSON Tree ────────────────────────────────────────────────────────────────
function JsonValue({ value, depth = 0 }: { value: unknown; depth?: number }) {
  const [open, setOpen] = useState(depth < 2);

  if (value === null || value === undefined)
    return <span className="text-zinc-600 italic">null</span>;
  if (typeof value === "boolean")
    return (
      <span className={value ? "text-emerald-400" : "text-rose-400"}>
        {String(value)}
      </span>
    );
  if (typeof value === "number")
    return <span className="text-sky-400">{value}</span>;
  if (typeof value === "string")
    return (
      <span className="text-amber-300">
        &quot;{value.length > 60 ? value.slice(0, 60) + "…" : value}&quot;
      </span>
    );
  if (Array.isArray(value))
    return (
      <span>
        <button
          type="button"
          className="text-zinc-500 hover:text-zinc-200 text-[11px]"
          onClick={() => setOpen((o) => !o)}
        >
          [{value.length}] {open ? "▾" : "▸"}
        </button>
        {open && (
          <div className="ms-3 border-l border-zinc-700 ps-2 mt-0.5">
            {value.map((item, i) => (
              <div key={i} className="text-[11px]">
                <span className="text-zinc-600">{i}: </span>
                <JsonValue value={item} depth={depth + 1} />
              </div>
            ))}
          </div>
        )}
      </span>
    );
  if (typeof value === "object") {
    const entries = Object.entries(value as Record<string, unknown>);
    return (
      <span>
        <button
          type="button"
          className="text-zinc-500 hover:text-zinc-200 text-[11px]"
          onClick={() => setOpen((o) => !o)}
        >
          {"{"}
          {entries.length}
          {"}"} {open ? "▾" : "▸"}
        </button>
        {open && (
          <div className="ms-3 border-l border-zinc-700 ps-2 mt-0.5">
            {entries.map(([k, v]) => (
              <div key={k} className="text-[11px]">
                <span className="text-violet-300">{k}</span>
                <span className="text-zinc-600">: </span>
                <JsonValue value={v} depth={depth + 1} />
              </div>
            ))}
          </div>
        )}
      </span>
    );
  }
  return <span className="text-zinc-400">{String(value)}</span>;
}

// ─── Dirty Field Hints ────────────────────────────────────────────────────────
type HintSeverity = "info" | "success" | "warning" | "danger" | "neutral";

interface FieldHint {
  kind: string;
  severity: HintSeverity;
  message: string;
  tip: string;
}

function isEmpty(v: unknown): boolean {
  return (
    v === undefined ||
    v === null ||
    v === "" ||
    (Array.isArray(v) && v.length === 0)
  );
}

function shortVal(v: unknown): string {
  if (v === undefined) return "undefined";
  if (v === null) return "null";
  if (typeof v === "string") {
    const trimmed = v.trim();
    return trimmed.length === 0
      ? '""'
      : trimmed.length > 40
        ? `"${trimmed.slice(0, 38)}…"`
        : `"${trimmed}"`;
  }
  if (typeof v === "boolean") return v ? "true" : "false";
  if (Array.isArray(v)) return `[${v.length} items]`;
  if (typeof v === "object") return `{${Object.keys(v as object).length} keys}`;
  return String(v);
}

function analyseField(
  name: string,
  initial: unknown,
  current: unknown,
): FieldHint[] {
  const hints: FieldHint[] = [];
  const wasEmpty = isEmpty(initial);
  const nowEmpty = isEmpty(current);

  if (wasEmpty && !nowEmpty) {
    hints.push({
      kind: "SET",
      severity: "success",
      message: "Set from empty",
      tip: "Field gained a value from its initial empty/null state.",
    });
  } else if (!wasEmpty && nowEmpty) {
    hints.push({
      kind: "CLEARED",
      severity: "warning",
      message: "Cleared",
      tip: `Field was cleared. Initial value was ${shortVal(initial)}. If unintentional, check your onChange handler or formatter.`,
    });
  }

  if (
    !nowEmpty &&
    typeof current === "string" &&
    current.trim().length === 0
  ) {
    hints.push({
      kind: "WHITESPACE",
      severity: "warning",
      message: "Whitespace only",
      tip: "Current value is a non-empty string consisting entirely of whitespace. Consider applying a trim formatter.",
    });
  }

  if (!wasEmpty && !nowEmpty && typeof initial !== typeof current) {
    hints.push({
      kind: "TYPE_COERCION",
      severity: "danger",
      message: `Type changed: ${typeof initial} → ${typeof current}`,
      tip: `Initial type was "${typeof initial}" but current is "${typeof current}". This often causes validation bugs — make sure your parser/formatter preserves the expected type.`,
    });
  }

  const numericName = /price|cost|amount|qty|quantity|stock|count|rate|score|weight|total|tax/i.test(name);
  if (
    numericName &&
    !nowEmpty &&
    (current === 0 || current === "0" || current === "۰")
  ) {
    hints.push({
      kind: "ZERO_VALUE",
      severity: "warning",
      message: "Zero value",
      tip: `"${name}" looks like a numeric field but its value is 0. If the user typed something, the parser may be discarding the input (check parseCurrency / mask pipeline).`,
    });
  }

  if (
    !wasEmpty &&
    !nowEmpty &&
    !hints.some((h) => h.kind === "TYPE_COERCION") &&
    String(initial) === String(current)
  ) {
    hints.push({
      kind: "SEMANTIC_SAME",
      severity: "neutral",
      message: "Appears unchanged",
      tip: "RHF marks this as dirty but the string representation is identical to the default. This can happen when a mask/formatter transforms the default value on first render — consider normalising defaultValue to the formatted form.",
    });
  }

  if (
    typeof current === "string" &&
    current.length > 500
  ) {
    hints.push({
      kind: "LONG_STRING",
      severity: "info",
      message: `Long value (${current.length} chars)`,
      tip: "Very long string stored in form state — ensure it is intentional (e.g. base64 image, rich text).",
    });
  }

  // Generic fallback — only shown when no other hint was produced
  if (hints.length === 0) {
    hints.push({
      kind: "CHANGED",
      severity: "info",
      message: "Changed",
      tip: `Value changed from ${shortVal(initial)} to ${shortVal(current)}.`,
    });
  }

  return hints;
}

const SEVERITY_STYLES: Record<HintSeverity, { pill: string; dot: string }> = {
  success: { pill: "bg-emerald-500/15 text-emerald-400 border-emerald-800/40", dot: "bg-emerald-500" },
  info:    { pill: "bg-sky-500/15 text-sky-400 border-sky-800/40",             dot: "bg-sky-400" },
  warning: { pill: "bg-amber-500/15 text-amber-400 border-amber-800/40",       dot: "bg-amber-400" },
  danger:  { pill: "bg-rose-500/15 text-rose-400 border-rose-800/40",          dot: "bg-rose-500" },
  neutral: { pill: "bg-zinc-700/50 text-zinc-400 border-zinc-700",             dot: "bg-zinc-500" },
};

function DirtyFieldRow({
  name,
  initial,
  current,
}: {
  name: string;
  initial: unknown;
  current: unknown;
}) {
  const [expanded, setExpanded] = useState(false);
  const hints = analyseField(name, initial, current);
  const topSeverity: HintSeverity =
    hints.find((h) => h.severity === "danger")?.severity ??
    hints.find((h) => h.severity === "warning")?.severity ??
    hints[0]?.severity ??
    "info";

  return (
    <div className="rounded-md border border-zinc-800 bg-zinc-900/50 overflow-hidden mb-1.5">
      {/* Field row */}
      <button
        type="button"
        onClick={() => setExpanded((e) => !e)}
        className="w-full flex items-start gap-2 px-2.5 py-2 text-left hover:bg-zinc-800/40 transition-colors"
      >
        <span
          className={cn(
            "mt-[3px] w-1.5 h-1.5 rounded-full shrink-0",
            SEVERITY_STYLES[topSeverity].dot,
          )}
        />
        <span className="flex-1 min-w-0">
          <span className="font-mono text-violet-300 font-semibold">{name}</span>
          <span className="text-zinc-600 mx-1.5">·</span>
          <span className="text-zinc-500 truncate">
            {shortVal(initial)}
            <span className="text-zinc-700 mx-1">→</span>
            <span className="text-zinc-200">{shortVal(current)}</span>
          </span>
        </span>
        <span className="flex gap-1 flex-wrap justify-end shrink-0 max-w-[45%]">
          {hints.map((h) => (
            <span
              key={h.kind}
              className={cn(
                "text-[9px] font-bold px-1.5 py-0.5 rounded border uppercase tracking-wide leading-none",
                SEVERITY_STYLES[h.severity].pill,
              )}
            >
              {h.message}
            </span>
          ))}
        </span>
        <Icon
          icon={expanded ? "solar:alt-arrow-up-linear" : "solar:alt-arrow-down-linear"}
          width={10}
          className="text-zinc-600 shrink-0 mt-0.5"
        />
      </button>

      {/* Expanded tips */}
      {expanded && (
        <div className="border-t border-zinc-800 px-3 py-2 flex flex-col gap-1.5 bg-zinc-950/60">
          {hints.map((h) => (
            <div key={h.kind} className="flex gap-2 items-start">
              <span
                className={cn(
                  "text-[9px] font-bold px-1.5 py-0.5 rounded border uppercase tracking-wide leading-none shrink-0 mt-0.5",
                  SEVERITY_STYLES[h.severity].pill,
                )}
              >
                {h.kind}
              </span>
              <p className="text-[11px] text-zinc-400 leading-snug">{h.tip}</p>
            </div>
          ))}
          {/* Raw values */}
          <div className="mt-1 pt-1.5 border-t border-zinc-800/60 grid grid-cols-2 gap-2">
            <div>
              <p className="text-[9px] text-zinc-600 uppercase tracking-wide mb-0.5">Initial</p>
              <pre className="text-[10px] text-zinc-400 font-mono break-all whitespace-pre-wrap">
                {JSON.stringify(initial, null, 2)}
              </pre>
            </div>
            <div>
              <p className="text-[9px] text-zinc-600 uppercase tracking-wide mb-0.5">Current</p>
              <pre className="text-[10px] text-zinc-200 font-mono break-all whitespace-pre-wrap">
                {JSON.stringify(current, null, 2)}
              </pre>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function DirtyHints({ snap }: { snap: FormSnapshot }) {
  const dirtyEntries = Object.entries(snap.dirtyFields).filter(([, v]) => v);
  if (dirtyEntries.length === 0) {
    return (
      <span className="text-zinc-500 flex items-center gap-1">
        <Icon icon="solar:info-circle-linear" width={11} /> No dirty fields
      </span>
    );
  }
  return (
    <div className="flex flex-col">
      <p className="text-[10px] text-zinc-600 mb-2 font-mono">
        {dirtyEntries.length} field{dirtyEntries.length !== 1 ? "s" : ""} modified · click a row to expand hints
      </p>
      {dirtyEntries.map(([name]) => (
        <DirtyFieldRow
          key={name}
          name={name}
          initial={snap.initialValues[name]}
          current={snap.values[name]}
        />
      ))}
    </div>
  );
}

// ─── Copy button ──────────────────────────────────────────────────────────────
function CopyButton({ data }: { data: unknown }) {
  const [copied, setCopied] = useState(false);
  const copy = () => {
    navigator.clipboard.writeText(JSON.stringify(data, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };
  return (
    <button
      type="button"
      onClick={copy}
      title="Copy as JSON"
      className="p-1 rounded hover:bg-zinc-700 text-zinc-500 hover:text-zinc-200 transition-colors"
    >
      <Icon
        icon={copied ? "solar:check-circle-bold" : "solar:copy-linear"}
        width={12}
        className={copied ? "text-emerald-400" : ""}
      />
    </button>
  );
}

// ─── Form card ────────────────────────────────────────────────────────────────
type PanelTab = "values" | "errors" | "dirty" | "meta";

function FormCard({ snap }: { snap: FormSnapshot }) {
  const [tab, setTab] = useState<PanelTab>("values");
  const [collapsed, setCollapsed] = useState(false);

  const errorEntries = Object.entries(snap.errors).filter(([, v]) => !!v);
  const dirtyEntries = Object.entries(snap.dirtyFields).filter(([, v]) => v);
  const touchedCount = Object.values(snap.touchedFields).filter(Boolean).length;

  const tabContent: Record<PanelTab, unknown> = {
    values: snap.values,
    errors: Object.fromEntries(errorEntries),
    dirty: Object.fromEntries(dirtyEntries),
    meta: {
      id: snap.id,
      submitCount: snap.submitCount,
      isSubmitting: snap.isSubmitting,
      totalFields: Object.keys(snap.values).length,
      dirtyFields: dirtyEntries.length,
      touchedFields: touchedCount,
      lastUpdated: snap.updatedAt,
    },
  };

  const tabs: { id: PanelTab; label: string; badge?: number }[] = [
    { id: "values", label: "Values" },
    { id: "errors", label: "Errors", badge: errorEntries.length },
    { id: "dirty", label: "Dirty", badge: dirtyEntries.length },
    { id: "meta", label: "Meta" },
  ];

  return (
    <div className="rounded-lg border border-zinc-800 bg-zinc-900/60 overflow-hidden text-[11px]">
      {/* Header */}
      <div className="flex items-center gap-2 px-3 py-2 bg-zinc-800/60 border-b border-zinc-800">
        <button
          type="button"
          onClick={() => setCollapsed((c) => !c)}
          className="text-zinc-500 hover:text-zinc-200 transition-colors"
        >
          <Icon
            icon={
              collapsed
                ? "solar:alt-arrow-right-linear"
                : "solar:alt-arrow-down-linear"
            }
            width={12}
          />
        </button>
        <Icon
          icon="solar:document-bold-duotone"
          width={12}
          className="text-primary shrink-0"
        />
        <span className="font-mono font-semibold text-zinc-200 truncate flex-1">
          {snap.label}
        </span>
        {snap.isSubmitting && (
          <span className="px-1.5 py-0.5 rounded-full bg-amber-500/20 text-amber-400 text-[10px] animate-pulse font-medium">
            submitting
          </span>
        )}
        {errorEntries.length > 0 && (
          <span className="px-1.5 py-0.5 rounded-full bg-rose-600/30 text-rose-400 text-[10px] font-bold">
            {errorEntries.length} err
          </span>
        )}
        <span className="text-zinc-600 font-mono text-[10px] tabular-nums shrink-0">
          {new Date(snap.updatedAt).toLocaleTimeString()}
        </span>
        <CopyButton data={tabContent[tab]} />
      </div>

      {!collapsed && (
        <>
          {/* Tab bar */}
          <div className="flex border-b border-zinc-800 bg-zinc-900/40">
            {tabs.map((t) => (
              <button
                key={t.id}
                type="button"
                onClick={() => setTab(t.id)}
                className={cn(
                  "px-3 py-1.5 font-medium flex items-center gap-1 transition-colors text-[11px]",
                  tab === t.id
                    ? "text-primary border-b-2 border-primary -mb-px"
                    : "text-zinc-500 hover:text-zinc-300",
                )}
              >
                {t.label}
                {t.badge != null && t.badge > 0 && (
                  <span className="bg-rose-600 text-white rounded-full px-1 text-[9px] font-bold leading-3 min-w-3 text-center">
                    {t.badge}
                  </span>
                )}
              </button>
            ))}
          </div>

          {/* Content */}
          <div className="p-3 font-mono max-h-56 overflow-y-auto leading-[1.6]">
            {tab === "errors" && errorEntries.length === 0 ? (
              <span className="text-emerald-400 flex items-center gap-1">
                <Icon icon="solar:check-circle-bold" width={11} /> No errors
              </span>
            ) : tab === "dirty" ? (
              <DirtyHints snap={snap} />
            ) : (
              <JsonValue value={tabContent[tab]} depth={0} />
            )}
          </div>
        </>
      )}
    </div>
  );
}

// ─── Main panel ───────────────────────────────────────────────────────────────
export function DevToolsPanel() {
  const { enabled, forms } = useDevTools();
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");

  const toggle = useCallback(() => setOpen((o) => !o), []);

  if (!enabled) return null;

  const snapshots = Array.from(forms.values()).filter(
    (f) =>
      !search ||
      f.label.toLowerCase().includes(search.toLowerCase()) ||
      f.id.toLowerCase().includes(search.toLowerCase()),
  );

  const totalErrors = Array.from(forms.values()).reduce(
    (acc, f) => acc + Object.values(f.errors).filter(Boolean).length,
    0,
  );
  const totalForms = forms.size;

  return (
    <>
      {/* ── Floating trigger ── */}
      <button
        type="button"
        onClick={toggle}
        title="Raven Form DevTools"
        className={cn(
          "fixed bottom-5 end-15 z-[9999]",
          "flex items-center gap-2 px-3 py-2 rounded-xl",
          "bg-zinc-900 border border-zinc-700 text-zinc-100 shadow-xl",
          "hover:bg-zinc-800 hover:border-zinc-500 transition-all select-none",
          "text-xs font-mono font-semibold",
        )}
      >
        <Icon
          icon="solar:code-scan-bold-duotone"
          width={16}
          className="text-primary"
        />
        <span>Raven Dev</span>
        <span className="flex items-center gap-1">
          <span className="px-1.5 py-0.5 rounded-full text-[10px] font-bold bg-zinc-700 text-zinc-300">
            {totalForms}
          </span>
          {totalErrors > 0 && (
            <span className="px-1.5 py-0.5 rounded-full text-[10px] font-bold bg-rose-600 text-white animate-pulse">
              {totalErrors}
            </span>
          )}
        </span>
      </button>

      {/* ── Slide-in panel ── */}
      <div
        className={cn(
          "fixed inset-y-0 end-0 z-[9998] flex flex-col",
          "w-[440px] max-w-[96vw]",
          "bg-zinc-950 border-s border-zinc-800 shadow-2xl",
          "transition-transform duration-300 ease-in-out",
          open ? "translate-x-0" : "translate-x-full",
        )}
        dir="ltr"
      >
        {/* Header */}
        <div className="flex items-center gap-2.5 px-4 py-3 border-b border-zinc-800 shrink-0">
          <Icon
            icon="solar:code-scan-bold-duotone"
            width={17}
            className="text-primary"
          />
          <span className="text-sm font-semibold text-zinc-100 flex-1 font-mono">
            Raven Form DevTools
          </span>
          <div className="flex items-center gap-1.5 text-[11px] font-mono text-zinc-500">
            <span className="px-1.5 py-0.5 bg-zinc-800 rounded text-zinc-400">
              {totalForms} form{totalForms !== 1 ? "s" : ""}
            </span>
            {totalErrors > 0 && (
              <span className="px-1.5 py-0.5 bg-rose-900/50 rounded text-rose-400">
                {totalErrors} error{totalErrors !== 1 ? "s" : ""}
              </span>
            )}
          </div>
          <button
            type="button"
            onClick={toggle}
            className="ms-1 p-1 rounded hover:bg-zinc-800 text-zinc-500 hover:text-zinc-200 transition-colors"
          >
            <Icon icon="solar:close-circle-bold" width={16} />
          </button>
        </div>

        {/* Search */}
        <div className="px-3 py-2 border-b border-zinc-800 shrink-0">
          <div className="relative">
            <Icon
              icon="solar:magnifer-linear"
              width={12}
              className="absolute start-2.5 top-1/2 -translate-y-1/2 text-zinc-600 pointer-events-none"
            />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Filter forms…"
              className={cn(
                "w-full bg-zinc-900 border border-zinc-700 rounded-md",
                "ps-7 pe-3 py-1.5 text-[12px] text-zinc-200 placeholder:text-zinc-600",
                "focus:outline-none focus:border-primary/60 font-mono",
              )}
            />
          </div>
        </div>

        {/* Cards */}
        <div className="flex-1 overflow-y-auto p-3 flex flex-col gap-3">
          {snapshots.length === 0 ? (
            <div className="flex flex-col items-center justify-center gap-3 mt-20 text-zinc-600">
              <Icon icon="solar:ghost-bold-duotone" width={42} />
              <p className="text-sm text-center font-mono">
                {totalForms === 0
                  ? "No active forms on this page"
                  : "No forms match your search"}
              </p>
            </div>
          ) : (
            snapshots.map((snap) => <FormCard key={snap.id} snap={snap} />)
          )}
        </div>

        {/* Footer */}
        <div className="px-3 py-2 border-t border-zinc-800 shrink-0">
          <p className="text-[10px] text-zinc-700 font-mono text-center">
            Updates live on every field change · visible in dev mode only
          </p>
        </div>
      </div>

      {/* Backdrop (mobile) */}
      {open && (
        <div
          className="fixed inset-0 z-[9997] bg-black/50 md:hidden"
          onClick={toggle}
        />
      )}
    </>
  );
}
