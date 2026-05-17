"use client";

import { memo, useMemo } from "react";
import { type ColumnDef } from "@tanstack/react-table";
import { Icon } from "@iconify/react/dist/iconify.js";
import { cn } from "@/lib/utils";
import CRMTable from "@/app/components/apps/crm/CRMTable";
import { leadsData, type Lead } from "@/app/components/apps/crm/crmMockData";

const statusBadge: Record<Lead["status"], string> = {
  new: "bg-blue-50   text-blue-600   dark:bg-blue-900/30   dark:text-blue-400",
  contacted:
    "bg-violet-50 text-violet-600 dark:bg-violet-900/30 dark:text-violet-400",
  qualified:
    "bg-emerald-50 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400",
  lost: "bg-red-50    text-red-500    dark:bg-red-900/30    dark:text-red-400",
};

const sourceLabels: Record<Lead["source"], string> = {
  organic: "ارگانیک",
  referral: "معرفی",
  ads: "تبلیغات",
  social: "شبکه اجتماعی",
  cold_outreach: "تماس سرد",
};

const columns: ColumnDef<Lead, unknown>[] = [
  {
    accessorKey: "name",
    header: "نام",
    cell: ({ row }) => (
      <div>
        <p className="font-medium text-gray-800 dark:text-white">
          {row.original.name}
        </p>
        <p className="text-xs text-gray-400">{row.original.email}</p>
      </div>
    ),
  },
  { accessorKey: "company", header: "شرکت" },
  {
    accessorKey: "phone",
    header: "تلفن",
    cell: ({ getValue }) => (
      <span className="text-gray-500 text-xs">{getValue<string>()}</span>
    ),
  },
  {
    accessorKey: "source",
    header: "منبع",
    cell: ({ getValue }) => (
      <span>{sourceLabels[getValue<Lead["source"]>()]}</span>
    ),
  },
  {
    accessorKey: "status",
    header: "وضعیت",
    cell: ({ getValue }) => {
      const s = getValue<Lead["status"]>();
      const statusLabel: Record<Lead["status"], string> = {
        new: "جدید",
        contacted: "تماس گرفته‌شده",
        qualified: "واجد شرایط",
        lost: "از دست رفته",
      };
      return (
        <span
          className={cn(
            "text-xs font-medium px-2 py-0.5 rounded-full",
            statusBadge[s],
          )}
        >
          {statusLabel[s]}
        </span>
      );
    },
  },
  {
    accessorKey: "value",
    header: "ارزش تخمینی",
    cell: ({ getValue }) => (
      <span className="font-semibold text-emerald-600">
        ${getValue<number>().toLocaleString()}
      </span>
    ),
  },
  { accessorKey: "assignedTo", header: "مسئول" },
  {
    accessorKey: "createdAt",
    header: "تاریخ ثبت",
    cell: ({ getValue }) => (
      <span className="text-xs text-gray-400">{getValue<string>()}</span>
    ),
  },
];

const LeadsPage = memo(function LeadsPage() {
  const stats = useMemo(
    () => ({
      total: leadsData.length,
      new: leadsData.filter((l) => l.status === "new").length,
      qualified: leadsData.filter((l) => l.status === "qualified").length,
      lost: leadsData.filter((l) => l.status === "lost").length,
    }),
    [],
  );

  return (
    <div className="space-y-6" dir="rtl">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-gray-800 dark:text-white">
            سرنخ‌ها
          </h1>
          <p className="text-sm text-gray-500 mt-0.5">
            مدیریت و پیگیری سرنخ‌های ورودی
          </p>
        </div>
        <button className="flex items-center gap-1.5 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors">
          <Icon icon="solar:add-circle-linear" width={16} />
          سرنخ جدید
        </button>
      </div>

      {/* Summary pills */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          {
            label: "کل",
            value: stats.total,
            color: "text-gray-700 dark:text-white",
            bg: "bg-white dark:bg-gray-900",
          },
          {
            label: "جدید",
            value: stats.new,
            color: "text-blue-600   dark:text-blue-400",
            bg: "bg-blue-50   dark:bg-blue-900/20",
          },
          {
            label: "واجد شرایط",
            value: stats.qualified,
            color: "text-emerald-600 dark:text-emerald-400",
            bg: "bg-emerald-50 dark:bg-emerald-900/20",
          },
          {
            label: "از دست رفته",
            value: stats.lost,
            color: "text-red-500    dark:text-red-400",
            bg: "bg-red-50    dark:bg-red-900/20",
          },
        ].map((s) => (
          <div
            key={s.label}
            className={cn(
              "rounded-xl p-4 border border-gray-100 dark:border-gray-800 shadow-sm",
              s.bg,
            )}
          >
            <p className="text-xs text-gray-500 dark:text-gray-400">
              {s.label}
            </p>
            <p className={cn("text-2xl font-bold mt-1", s.color)}>{s.value}</p>
          </div>
        ))}
      </div>

      <CRMTable
        title="همه سرنخ‌ها"
        subtitle={`${leadsData.length} سرنخ`}
        data={leadsData}
        columns={columns}
        searchPlaceholder="جستجو بر اساس نام، شرکت..."
      />
    </div>
  );
});

export default LeadsPage;
