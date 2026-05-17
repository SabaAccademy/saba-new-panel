"use client";

import dynamic from "next/dynamic";
import { ApexOptions } from "apexcharts";
import { Icon } from "@iconify/react/dist/iconify.js";
import CardBox from "@/app/components/shared/CardBox";
import { Skeleton } from "@/components/ui/skeleton";
import type { ColumnDef } from "@tanstack/react-table";
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  flexRender,
  type SortingState,
} from "@tanstack/react-table";
import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const Chart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
  loading: () => <Skeleton className="w-full h-[240px] rounded-xl" />,
});

// ─── Data ─────────────────────────────────────────────────────────────────────
const kpis = [
  {
    label: "بیمه‌نامه فعال",
    value: "۲۴٬۵۱۲",
    icon: "solar:shield-bold",
    trend: "+۹٪",
    riskColor: "border-r-green-500",
  },
  {
    label: "خسارت ثبت‌شده",
    value: "۱٬۲۳۴",
    icon: "solar:danger-triangle-bold",
    trend: "+۲۲٪",
    riskColor: "border-r-red-500",
  },
  {
    label: "نرخ تائید",
    value: "۷۴٪",
    icon: "solar:check-circle-bold",
    trend: "+۳٪",
    riskColor: "border-r-green-500",
  },
  {
    label: "در بررسی",
    value: "۲۸۶",
    icon: "solar:clock-circle-bold",
    trend: "-۵٪",
    riskColor: "border-r-amber-500",
  },
  {
    label: "رد شده",
    value: "۱۲۴",
    icon: "solar:close-circle-bold",
    trend: "-۱۱٪",
    riskColor: "border-r-red-500",
  },
  {
    label: "درآمد حق بیمه",
    value: "۸۵ میلیارد",
    icon: "solar:money-bag-bold",
    trend: "+۱۱٪",
    riskColor: "border-r-green-500",
  },
];

const pipeline = [
  { stage: "ثبت شد", count: 1234, color: "bg-blue-500", pct: 100 },
  { stage: "در بررسی", count: 986, color: "bg-indigo-500", pct: 80 },
  { stage: "کارشناسی", count: 712, color: "bg-violet-500", pct: 58 },
  { stage: "تائید", count: 526, color: "bg-emerald-500", pct: 43 },
  { stage: "پرداخت", count: 412, color: "bg-teal-500", pct: 33 },
];

interface ClaimRow {
  id: string;
  claimId: string;
  policyHolder: string;
  type: string;
  amount: string;
  date: string;
  status: string;
  risk: "low" | "medium" | "high";
}

const claims: ClaimRow[] = [
  {
    id: "1",
    claimId: "CLM-۱۰۴۵",
    policyHolder: "شرکت آریان",
    type: "آتش‌سوزی",
    amount: "۴۵۰ م",
    date: "۱۴۰۳/۰۲/۱۵",
    status: "در بررسی",
    risk: "high",
  },
  {
    id: "2",
    claimId: "CLM-۱۰۴۴",
    policyHolder: "رضا مرادی",
    type: "خودرو",
    amount: "۱۸ م",
    date: "۱۴۰۳/۰۲/۱۴",
    status: "تائید شد",
    risk: "low",
  },
  {
    id: "3",
    claimId: "CLM-۱۰۴۳",
    policyHolder: "مهناز کریمی",
    type: "درمان",
    amount: "۸.۵ م",
    date: "۱۴۰۳/۰۲/۱۴",
    status: "پرداخت شد",
    risk: "low",
  },
  {
    id: "4",
    claimId: "CLM-۱۰۴۲",
    policyHolder: "نیکان سازه",
    type: "عمر",
    amount: "۱.۲ میلیارد",
    date: "۱۴۰۳/۰۲/۱۳",
    status: "رد شد",
    risk: "high",
  },
  {
    id: "5",
    claimId: "CLM-۱۰۴۱",
    policyHolder: "امیر حسینی",
    type: "مسافرت",
    amount: "۴.۸ م",
    date: "۱۴۰۳/۰۲/۱۲",
    status: "تائید شد",
    risk: "medium",
  },
  {
    id: "6",
    claimId: "CLM-۱۰۴۰",
    policyHolder: "گلناز رضایی",
    type: "درمان",
    amount: "۲۲ م",
    date: "۱۴۰۳/۰۲/۱۲",
    status: "در بررسی",
    risk: "medium",
  },
];

const riskBadge = {
  low: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400",
  medium:
    "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
  high: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
};

const statusBadge: Record<string, string> = {
  "در بررسی":
    "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
  "تائید شد":
    "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400",
  "پرداخت شد":
    "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
  "رد شد": "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
};

const columns: ColumnDef<ClaimRow, unknown>[] = [
  { accessorKey: "claimId", header: "شناسه" },
  { accessorKey: "policyHolder", header: "بیمه‌گذار" },
  { accessorKey: "type", header: "نوع" },
  { accessorKey: "amount", header: "مبلغ" },
  { accessorKey: "date", header: "تاریخ" },
  {
    accessorKey: "risk",
    header: "ریسک",
    cell: ({ getValue }) => {
      const v = getValue() as "low" | "medium" | "high";
      const l = { low: "پایین", medium: "متوسط", high: "بالا" };
      return (
        <span
          className={`text-xs px-2 py-0.5 rounded-full font-medium ${riskBadge[v]}`}
        >
          {l[v]}
        </span>
      );
    },
  },
  {
    accessorKey: "status",
    header: "وضعیت",
    cell: ({ getValue }) => {
      const v = getValue() as string;
      return (
        <span
          className={`text-xs px-2 py-0.5 rounded-full font-medium ${statusBadge[v]}`}
        >
          {v}
        </span>
      );
    },
  },
];

const donutOpts: ApexOptions = {
  chart: {
    toolbar: { show: false },
    type: "donut",
    fontFamily: "inherit",
    foreColor: "#7C8FAC",
  },
  labels: ["عمر", "خودرو", "درمان", "آتش‌سوزی", "مسافرت"],
  colors: ["#6366f1", "#8b5cf6", "#a78bfa", "#c4b5fd", "#ddd6fe"],
  legend: { position: "bottom" },
  plotOptions: { pie: { donut: { size: "65%" } } },
  dataLabels: { enabled: false },
  tooltip: { theme: "dark" },
};

const trendOpts: ApexOptions = {
  chart: {
    toolbar: { show: false },
    type: "line",
    fontFamily: "inherit",
    foreColor: "#7C8FAC",
  },
  stroke: { curve: "smooth", width: 2, dashArray: [0, 5] },
  colors: ["#6366f1", "#a78bfa"],
  dataLabels: { enabled: false },
  grid: { borderColor: "rgba(0,0,0,0.06)", strokeDashArray: 4 },
  xaxis: {
    categories: [
      "فروردین",
      "اردیبهشت",
      "خرداد",
      "تیر",
      "مرداد",
      "شهریور",
      "مهر",
      "آبان",
      "آذر",
      "دی",
      "بهمن",
      "اسفند",
    ],
  },
  legend: { position: "top", horizontalAlign: "right" },
  tooltip: { theme: "dark" },
};

function ClaimsTable() {
  const [sorting, setSorting] = useState<SortingState>([]);
  const table = useReactTable({
    data: claims,
    columns,
    state: { sorting },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });
  return (
    <div className="overflow-x-auto rounded-lg border border-border">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((hg) => (
            <TableRow key={hg.id} className="bg-muted/40">
              {hg.headers.map((h) => (
                <TableHead
                  key={h.id}
                  className="text-xs font-semibold uppercase cursor-pointer"
                  onClick={h.column.getToggleSortingHandler()}
                >
                  {flexRender(h.column.columnDef.header, h.getContext())}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows.map((row) => (
            <TableRow key={row.id} className="hover:bg-muted/30">
              {row.getVisibleCells().map((cell) => (
                <TableCell key={cell.id} className="text-sm py-2.5">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

export default function InsuranceDashboard() {
  return (
    <div className="flex flex-col gap-6">
      {/* 6 KPI cards with risk color border */}
      <div className="grid grid-cols-12 gap-3">
        {kpis.map((k) => (
          <div key={k.label} className="col-span-6 md:col-span-4 lg:col-span-2">
            <div
              className={`bg-card rounded-xl border border-border ${k.riskColor} border-r-4 p-4 hover:shadow-md transition-shadow`}
            >
              <Icon
                icon={k.icon}
                width={22}
                className="text-muted-foreground mb-2"
              />
              <p className="text-xl font-black text-foreground">{k.value}</p>
              <p className="text-xs text-muted-foreground mt-0.5">{k.label}</p>
              <p
                className={`text-xs font-semibold mt-1 ${k.trend.startsWith("+") && k.riskColor.includes("green") ? "text-emerald-500" : k.trend.startsWith("-") && k.riskColor.includes("green") ? "text-red-500" : k.trend.startsWith("+") && k.riskColor.includes("red") ? "text-red-500" : k.trend.startsWith("-") && k.riskColor.includes("red") ? "text-emerald-500" : "text-amber-500"}`}
              >
                {k.trend}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Claims pipeline */}
      <CardBox>
        <h4 className="text-base font-semibold mb-4">مسیر پردازش خسارت</h4>
        <div className="flex flex-wrap gap-3">
          {pipeline.map((p, i) => (
            <div key={p.stage} className="flex-1 min-w-[100px]">
              <div className="flex items-center gap-1 mb-1.5">
                <span
                  className={`${p.color} w-2.5 h-2.5 rounded-full shrink-0`}
                />
                <span className="text-xs text-muted-foreground">{p.stage}</span>
                {i < pipeline.length - 1 && (
                  <Icon
                    icon="solar:alt-arrow-left-linear"
                    className="text-muted-foreground/40 mr-auto"
                    width={14}
                  />
                )}
              </div>
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <div
                  className={`${p.color} h-full rounded-full`}
                  style={{ width: `${p.pct}%` }}
                />
              </div>
              <p className="text-lg font-bold text-foreground mt-1.5">
                {p.count.toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      </CardBox>

      {/* Charts row */}
      <div className="grid grid-cols-12 gap-4">
        <div className="col-span-12 lg:col-span-4">
          <CardBox>
            <h4 className="text-base font-semibold mb-1">
              توزیع نوع بیمه‌نامه
            </h4>
            <Chart
              options={donutOpts}
              series={[35, 28, 22, 10, 5]}
              type="donut"
              height={240}
              width="100%"
            />
          </CardBox>
        </div>
        <div className="col-span-12 lg:col-span-8">
          <CardBox>
            <h4 className="text-base font-semibold mb-1">
              روند خسارت‌ها (ماهانه)
            </h4>
            <Chart
              options={trendOpts}
              series={[
                {
                  name: "ثبت‌شده",
                  data: [85, 92, 78, 105, 98, 112, 88, 124, 115, 130, 142, 108],
                },
                {
                  name: "پرداخت‌شده",
                  data: [70, 78, 65, 88, 82, 95, 74, 102, 96, 108, 118, 90],
                },
              ]}
              type="line"
              height={240}
              width="100%"
            />
          </CardBox>
        </div>
      </div>

      {/* Claims table */}
      <CardBox>
        <h4 className="text-base font-semibold mb-3">خسارت‌های اخیر</h4>
        <ClaimsTable />
      </CardBox>
    </div>
  );
}
