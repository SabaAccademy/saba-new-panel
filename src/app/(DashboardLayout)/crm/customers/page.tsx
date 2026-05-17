"use client";

import { memo } from "react";
import { type ColumnDef } from "@tanstack/react-table";
import { Icon } from "@iconify/react/dist/iconify.js";
import { cn } from "@/lib/utils";
import CRMTable from "@/app/components/apps/crm/CRMTable";
import {
  customersData,
  type Customer,
} from "@/app/components/apps/crm/crmMockData";

const statusBadge: Record<Customer["status"], string> = {
  active:
    "bg-emerald-50 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400",
  inactive:
    "bg-gray-100   text-gray-500   dark:bg-gray-800      dark:text-gray-400",
  at_risk:
    "bg-red-50     text-red-500    dark:bg-red-900/30    dark:text-red-400",
};

const columns: ColumnDef<Customer, unknown>[] = [
  {
    accessorKey: "name",
    header: "مشتری",
    cell: ({ row }) => (
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-500 to-violet-600 flex items-center justify-center text-white text-xs font-bold shrink-0">
          {row.original.avatar}
        </div>
        <div>
          <p className="font-medium text-gray-800 dark:text-white">
            {row.original.name}
          </p>
          <p className="text-xs text-gray-400">{row.original.email}</p>
        </div>
      </div>
    ),
  },
  { accessorKey: "company", header: "شرکت" },
  {
    accessorKey: "industry",
    header: "صنعت",
    cell: ({ getValue }) => (
      <span className="text-gray-600 dark:text-gray-300">
        {getValue<string>()}
      </span>
    ),
  },
  {
    accessorKey: "totalRevenue",
    header: "کل درآمد",
    cell: ({ getValue }) => (
      <span className="font-semibold text-emerald-600 dark:text-emerald-400">
        ${getValue<number>().toLocaleString()}
      </span>
    ),
  },
  {
    accessorKey: "deals",
    header: "معاملات",
    cell: ({ getValue }) => (
      <span className="inline-flex items-center justify-center w-6 h-6 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-xs font-bold rounded-full">
        {getValue<number>()}
      </span>
    ),
  },
  {
    accessorKey: "status",
    header: "وضعیت",
    cell: ({ getValue }) => {
      const s = getValue<Customer["status"]>();
      const l: Record<Customer["status"], string> = {
        active: "فعال",
        inactive: "غیرفعال",
        at_risk: "در خطر",
      };
      return (
        <span
          className={cn(
            "text-xs font-medium px-2 py-0.5 rounded-full",
            statusBadge[s],
          )}
        >
          {l[s]}
        </span>
      );
    },
  },
  {
    accessorKey: "joinedAt",
    header: "تاریخ عضویت",
    cell: ({ getValue }) => (
      <span className="text-xs text-gray-400">{getValue<string>()}</span>
    ),
  },
];

const CustomersPage = memo(function CustomersPage() {
  return (
    <div className="space-y-6" dir="rtl">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-gray-800 dark:text-white">
            مشتریان
          </h1>
          <p className="text-sm text-gray-500 mt-0.5">
            مشاهده و مدیریت پایگاه مشتریان
          </p>
        </div>
        <button className="flex items-center gap-1.5 px-4 py-2 bg-violet-600 hover:bg-violet-700 text-white text-sm font-medium rounded-lg transition-colors">
          <Icon icon="solar:user-plus-linear" width={16} />
          افزودن مشتری
        </button>
      </div>

      {/* Revenue summary */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          {
            label: "کل مشتریان",
            value: customersData.length,
            color: "text-blue-600",
            bg: "bg-blue-50 dark:bg-blue-900/20",
          },
          {
            label: "کل درآمد",
            value: `$${(customersData.reduce((a, c) => a + c.totalRevenue, 0) / 1000).toFixed(0)}K`,
            color: "text-emerald-600",
            bg: "bg-emerald-50 dark:bg-emerald-900/20",
          },
          {
            label: "در خطر",
            value: customersData.filter((c) => c.status === "at_risk").length,
            color: "text-red-500",
            bg: "bg-red-50 dark:bg-red-900/20",
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
        title="همه مشتریان"
        subtitle={`${customersData.length} مشتری`}
        data={customersData}
        columns={columns}
        searchPlaceholder="جستجو مشتریان..."
      />
    </div>
  );
});

export default CustomersPage;
