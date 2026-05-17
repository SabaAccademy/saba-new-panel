"use client";

import { memo, useMemo } from "react";
import { type ColumnDef } from "@tanstack/react-table";
import { Icon } from "@iconify/react/dist/iconify.js";
import { cn } from "@/lib/utils";
import CRMTable from "@/app/components/apps/crm/CRMTable";
import { dealsData, type Deal } from "@/app/components/apps/crm/crmMockData";

const stageBadge: Record<Deal["stage"], string> = {
  prospect:
    "bg-gray-100   text-gray-600    dark:bg-gray-800      dark:text-gray-300",
  proposal:
    "bg-blue-50    text-blue-600    dark:bg-blue-900/30   dark:text-blue-400",
  negotiation:
    "bg-amber-50   text-amber-600   dark:bg-amber-900/30  dark:text-amber-400",
  closed_won:
    "bg-emerald-50 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400",
  closed_lost:
    "bg-red-50     text-red-500     dark:bg-red-900/30    dark:text-red-400",
};

const stageLabel: Record<Deal["stage"], string> = {
  prospect: "احتمالی",
  proposal: "پیشنهاد",
  negotiation: "مذاکره",
  closed_won: "بسته (موفق)",
  closed_lost: "بسته (ناموفق)",
};

const stageOrder: Deal["stage"][] = [
  "prospect",
  "proposal",
  "negotiation",
  "closed_won",
  "closed_lost",
];

const columns: ColumnDef<Deal, unknown>[] = [
  {
    accessorKey: "name",
    header: "معامله",
    cell: ({ row }) => (
      <div>
        <p className="font-medium text-gray-800 dark:text-white">
          {row.original.name}
        </p>
        <p className="text-xs text-gray-400">{row.original.company}</p>
      </div>
    ),
  },
  {
    accessorKey: "value",
    header: "ارزش",
    cell: ({ getValue }) => (
      <span className="font-semibold text-emerald-600 dark:text-emerald-400">
        ${getValue<number>().toLocaleString()}
      </span>
    ),
  },
  {
    accessorKey: "stage",
    header: "مرحله",
    cell: ({ getValue }) => {
      const s = getValue<Deal["stage"]>();
      return (
        <span
          className={cn(
            "text-xs font-medium px-2 py-0.5 rounded-full",
            stageBadge[s],
          )}
        >
          {stageLabel[s]}
        </span>
      );
    },
  },
  {
    accessorKey: "probability",
    header: "احتمال موفقیت",
    cell: ({ getValue }) => {
      const p = getValue<number>();
      const color =
        p === 100
          ? "bg-emerald-500"
          : p >= 60
            ? "bg-blue-500"
            : p <= 0
              ? "bg-red-500"
              : "bg-amber-500";
      return (
        <div className="flex items-center gap-2">
          <div className="w-20 bg-gray-100 dark:bg-gray-800 rounded-full h-1.5">
            <div
              className={cn("h-1.5 rounded-full", color)}
              style={{ width: `${p}%` }}
            />
          </div>
          <span className="text-xs text-gray-500">{p}%</span>
        </div>
      );
    },
  },
  { accessorKey: "owner", header: "مسئول" },
  {
    accessorKey: "closeDate",
    header: "تاریخ بسته شدن",
    cell: ({ getValue }) => (
      <span className="text-xs text-gray-400">{getValue<string>()}</span>
    ),
  },
];

const DealsPage = memo(function DealsPage() {
  const stats = useMemo(
    () => ({
      total: dealsData.length,
      totalValue: dealsData.reduce((a, d) => a + d.value, 0),
      won: dealsData.filter((d) => d.stage === "closed_won").length,
      wonValue: dealsData
        .filter((d) => d.stage === "closed_won")
        .reduce((a, d) => a + d.value, 0),
    }),
    [],
  );

  return (
    <div className="space-y-6" dir="rtl">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-gray-800 dark:text-white">
            معاملات
          </h1>
          <p className="text-sm text-gray-500 mt-0.5">مدیریت خط فروش شما</p>
        </div>
        <button className="flex items-center gap-1.5 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-medium rounded-lg transition-colors">
          <Icon icon="solar:add-circle-linear" width={16} />
          معامله جدید
        </button>
      </div>

      {/* Stage pipeline overview */}
      <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-800 shadow-sm p-5">
        <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-200 mb-4">
          مراحل خط فروش
        </h3>
        <div className="flex flex-wrap gap-2">
          {stageOrder.map((stage) => {
            const count = dealsData.filter((d) => d.stage === stage).length;
            const value = dealsData
              .filter((d) => d.stage === stage)
              .reduce((a, d) => a + d.value, 0);
            return (
              <div
                key={stage}
                className={cn(
                  "flex-1 min-w-[140px] rounded-lg p-3 border",
                  stageBadge[stage],
                )}
              >
                <p className="text-xs font-medium">{stageLabel[stage]}</p>
                <p className="text-lg font-bold mt-0.5">{count}</p>
                <p className="text-xs opacity-70">
                  ${(value / 1000).toFixed(0)}K
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          {
            label: "کل معاملات",
            value: stats.total,
            color: "text-gray-700 dark:text-white",
          },
          {
            label: "ارزش خط فروش",
            value: `$${(stats.totalValue / 1000).toFixed(0)}K`,
            color: "text-blue-600",
          },
          { label: "موفق", value: stats.won, color: "text-emerald-600" },
          {
            label: "ارزش موفق",
            value: `$${(stats.wonValue / 1000).toFixed(0)}K`,
            color: "text-emerald-600",
          },
        ].map((s) => (
          <div
            key={s.label}
            className="rounded-xl p-4 border border-gray-100 dark:border-gray-800 shadow-sm bg-white dark:bg-gray-900"
          >
            <p className="text-xs text-gray-500">{s.label}</p>
            <p className={cn("text-2xl font-bold mt-1", s.color)}>{s.value}</p>
          </div>
        ))}
      </div>

      <CRMTable
        title="همه معاملات"
        subtitle={`${dealsData.length} معامله`}
        data={dealsData}
        columns={columns}
        searchPlaceholder="جستجو معاملات..."
      />
    </div>
  );
});

export default DealsPage;
