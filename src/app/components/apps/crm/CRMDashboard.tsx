"use client";

import dynamic from "next/dynamic";
import { memo, useMemo, useState } from "react";
import { ApexOptions } from "apexcharts";
import { Icon } from "@iconify/react/dist/iconify.js";
import { Skeleton } from "@/components/ui/skeleton";
import { type ColumnDef } from "@tanstack/react-table";
import { cn } from "@/lib/utils";

import CRMStatCard from "./CRMStatCard";
import CRMChartCard from "./CRMChartCard";
import CRMTable from "./CRMTable";
import CRMActivityFeed from "./CRMActivityFeed";

import {
  kpiData,
  leadsData,
  dealsData,
  activitiesData,
  leadsOverTimeData,
  dealPipelineData,
  conversionFunnelData,
  type Lead,
  type Deal,
} from "./crmMockData";

const Chart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
  loading: () => <Skeleton className="w-full h-full rounded-lg" />,
});

// ─── Status badges ─────────────────────────────────────────────────────────────
const leadStatusBadge: Record<Lead["status"], string> = {
  new: "bg-blue-50   text-blue-600   dark:bg-blue-900/30   dark:text-blue-400",
  contacted:
    "bg-violet-50 text-violet-600 dark:bg-violet-900/30 dark:text-violet-400",
  qualified:
    "bg-emerald-50 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400",
  lost: "bg-red-50    text-red-500    dark:bg-red-900/30    dark:text-red-400",
};

const dealStageBadge: Record<Deal["stage"], string> = {
  prospect:
    "bg-gray-100   text-gray-600   dark:bg-gray-800      dark:text-gray-300",
  proposal:
    "bg-blue-50    text-blue-600   dark:bg-blue-900/30   dark:text-blue-400",
  negotiation:
    "bg-amber-50   text-amber-600  dark:bg-amber-900/30  dark:text-amber-400",
  closed_won:
    "bg-emerald-50 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400",
  closed_lost:
    "bg-red-50     text-red-500    dark:bg-red-900/30    dark:text-red-400",
};

const dealStageLabel: Record<Deal["stage"], string> = {
  prospect: "احتمالی",
  proposal: "پیشنهاد",
  negotiation: "مذاکره",
  closed_won: "بسته شد (موفق)",
  closed_lost: "بسته شد (ناموفق)",
};

// ─── Table Columns ─────────────────────────────────────────────────────────────
const leadStatusLabel: Record<Lead["status"], string> = {
  new: "جدید",
  contacted: "تماس گرفته شده",
  qualified: "واجد شرایط",
  lost: "از دست رفته",
};
const leadSourceLabel: Record<Lead["source"], string> = {
  organic: "ارگانیک",
  referral: "معرفی",
  ads: "تبلیغات",
  social: "شبکه اجتماعی",
  cold_outreach: "تماس سرد",
};

const leadColumns: ColumnDef<Lead, unknown>[] = [
  {
    accessorKey: "name",
    header: "نام",
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
    accessorKey: "source",
    header: "منبع",
    cell: ({ getValue }) => {
      const s = getValue<Lead["source"]>();
      return (
        <span className="text-gray-600 dark:text-gray-300">
          {leadSourceLabel[s] ?? s}
        </span>
      );
    },
  },
  {
    accessorKey: "status",
    header: "وضعیت",
    cell: ({ getValue }) => {
      const s = getValue<Lead["status"]>();
      return (
        <span
          className={cn(
            "text-xs font-medium px-2 py-0.5 rounded-full",
            leadStatusBadge[s],
          )}
        >
          {leadStatusLabel[s]}
        </span>
      );
    },
  },
  {
    accessorKey: "value",
    header: "ارزش",
    cell: ({ getValue }) => (
      <span className="font-medium text-gray-700 dark:text-gray-200">
        ${getValue<number>().toLocaleString()}
      </span>
    ),
  },
  {
    accessorKey: "assignedTo",
    header: "مسئول",
    cell: ({ getValue }) => (
      <span className="text-gray-600 dark:text-gray-300">
        {getValue<string>()}
      </span>
    ),
  },
  {
    accessorKey: "createdAt",
    header: "تاریخ ثبت",
    cell: ({ getValue }) => (
      <span className="text-gray-400 text-xs">{getValue<string>()}</span>
    ),
  },
];

const dealColumns: ColumnDef<Deal, unknown>[] = [
  {
    accessorKey: "name",
    header: "نام معامله",
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
            dealStageBadge[s],
          )}
        >
          {dealStageLabel[s]}
        </span>
      );
    },
  },
  {
    accessorKey: "probability",
    header: "احتمال موفقیت",
    cell: ({ getValue }) => {
      const p = getValue<number>();
      return (
        <div className="flex items-center gap-2">
          <div className="flex-1 bg-gray-100 dark:bg-gray-800 rounded-full h-1.5 w-16">
            <div
              className={cn(
                "h-1.5 rounded-full",
                p === 100
                  ? "bg-emerald-500"
                  : p >= 60
                    ? "bg-blue-500"
                    : p <= 0
                      ? "bg-red-500"
                      : "bg-amber-500",
              )}
              style={{ width: `${p}%` }}
            />
          </div>
          <span className="text-xs text-gray-500">{p}%</span>
        </div>
      );
    },
  },
  {
    accessorKey: "owner",
    header: "مسئول",
    cell: ({ getValue }) => (
      <span className="text-gray-600 dark:text-gray-300 text-sm">
        {getValue<string>()}
      </span>
    ),
  },
  {
    accessorKey: "closeDate",
    header: "تاریخ بسته شدن",
    cell: ({ getValue }) => (
      <span className="text-gray-400 text-xs">{getValue<string>()}</span>
    ),
  },
];

// ─── Filter bar ────────────────────────────────────────────────────────────────
const DATE_RANGES = [
  "۷ روز اخیر",
  "۳۰ روز اخیر",
  "فصل گذشته",
  "امسال",
] as const;
type DateRange = (typeof DATE_RANGES)[number];

// ─── KPI Cards config ──────────────────────────────────────────────────────────
const statCards = [
  {
    title: "کل سرنخ‌ها",
    value: kpiData.totalLeads.toLocaleString(),
    growth: kpiData.leadsGrowth,
    icon: "solar:users-group-two-rounded-bold",
    iconColor: "#3b82f6",
    iconBg: "bg-blue-50 dark:bg-blue-900/20",
  },
  {
    title: "نرخ تبدیل",
    value: `${kpiData.conversionRate}`,
    growth: kpiData.conversionGrowth,
    icon: "solar:graph-up-bold",
    iconColor: "#10b981",
    iconBg: "bg-emerald-50 dark:bg-emerald-900/20",
    suffix: "٪",
  },
  {
    title: "معاملات فعال",
    value: kpiData.activeDeals.toLocaleString(),
    growth: kpiData.dealsGrowth,
    icon: "solar:hand-money-bold",
    iconColor: "#f59e0b",
    iconBg: "bg-amber-50 dark:bg-amber-900/20",
  },
  {
    title: "درآمد",
    value: `$${(kpiData.revenue / 1000).toFixed(0)}K`,
    growth: kpiData.revenueGrowth,
    icon: "solar:dollar-minimalistic-bold",
    iconColor: "#8b5cf6",
    iconBg: "bg-violet-50 dark:bg-violet-900/20",
  },
];

// ─── Main component ────────────────────────────────────────────────────────────
const CRMDashboard = memo(function CRMDashboard() {
  const [dateRange, setDateRange] = useState<DateRange>("۳۰ روز اخیر");

  // ─── Chart configs ──────────────────────────────────────────────────────────
  const leadsChartOptions = useMemo<ApexOptions>(
    () => ({
      chart: {
        type: "line",
        toolbar: { show: false },
        sparkline: { enabled: false },
        fontFamily: "inherit",
      },
      stroke: { curve: "smooth", width: [2, 2, 2] },
      colors: ["#3b82f6", "#10b981", "#f59e0b"],
      xaxis: {
        categories: leadsOverTimeData.categories,
        axisBorder: { show: false },
        axisTicks: { show: false },
        labels: { style: { fontSize: "11px", colors: "#94a3b8" } },
      },
      yaxis: { labels: { style: { colors: "#94a3b8", fontSize: "11px" } } },
      grid: { borderColor: "#f1f5f9", strokeDashArray: 4 },
      legend: { position: "top", horizontalAlign: "right", fontSize: "12px" },
      tooltip: { y: { formatter: (v: number) => `${v} سرنخ` } },
      markers: { size: 4, hover: { sizeOffset: 2 } },
    }),
    [],
  );

  const pipelineChartOptions = useMemo<ApexOptions>(
    () => ({
      chart: { type: "bar", toolbar: { show: false }, fontFamily: "inherit" },
      colors: ["#6366f1"],
      plotOptions: {
        bar: {
          borderRadius: 6,
          columnWidth: "50%",
          dataLabels: { position: "top" },
        },
      },
      dataLabels: {
        enabled: true,
        formatter: (v: number) => `$${(v / 1000).toFixed(0)}K`,
        offsetY: -20,
        style: { fontSize: "11px", colors: ["#6366f1"] },
      },
      xaxis: {
        categories: dealPipelineData.categories,
        axisBorder: { show: false },
        axisTicks: { show: false },
        labels: { style: { fontSize: "11px", colors: "#94a3b8" } },
      },
      yaxis: {
        labels: {
          formatter: (v: number) => `$${(v / 1000).toFixed(0)}K`,
          style: { colors: "#94a3b8", fontSize: "11px" },
        },
      },
      grid: { borderColor: "#f1f5f9", strokeDashArray: 4 },
      tooltip: { y: { formatter: (v: number) => `$${v.toLocaleString()}` } },
    }),
    [],
  );

  const funnelChartOptions = useMemo<ApexOptions>(
    () => ({
      chart: { type: "bar", toolbar: { show: false }, fontFamily: "inherit" },
      plotOptions: {
        bar: {
          horizontal: true,
          borderRadius: 4,
          barHeight: "60%",
          distributed: true,
        },
      },
      colors: ["#3b82f6", "#6366f1", "#8b5cf6", "#a855f7", "#10b981"],
      legend: { show: false },
      dataLabels: {
        enabled: true,
        formatter: (_v: number, opts: { dataPointIndex: number }) => {
          const total = conversionFunnelData.values[0];
          const curr = conversionFunnelData.values[opts.dataPointIndex];
          return `${((curr / total) * 100).toFixed(0)}%`;
        },
      },
      xaxis: {
        categories: conversionFunnelData.categories,
        labels: { style: { colors: "#94a3b8", fontSize: "11px" } },
      },
      yaxis: { labels: { style: { colors: "#94a3b8", fontSize: "11px" } } },
      grid: { borderColor: "#f1f5f9", strokeDashArray: 4 },
      tooltip: {
        y: { formatter: (v: number) => `${v.toLocaleString()} رکورد` },
      },
    }),
    [],
  );

  return (
    <div className="space-y-6" dir="rtl">
      {/* ─── Filter Bar ───────────────────────────────────────────────────── */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-xl font-bold text-gray-800 dark:text-white">
            داشبورد CRM
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">
            مدیریت خط فروش و روابط مشتریان
          </p>
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          {/* Date range filter */}
          <div className="flex items-center bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
            {DATE_RANGES.map((r) => (
              <button
                key={r}
                onClick={() => setDateRange(r)}
                className={cn(
                  "px-3 py-1.5 text-xs font-medium transition-colors",
                  dateRange === r
                    ? "bg-blue-600 text-white"
                    : "text-gray-500 hover:bg-gray-50 dark:hover:bg-gray-800",
                )}
              >
                {r}
              </button>
            ))}
          </div>
          {/* Quick actions */}
          <button className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-medium rounded-lg transition-colors">
            <Icon icon="solar:add-circle-linear" width={15} />
            افزودن سرنخ
          </button>
          <button className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-medium rounded-lg transition-colors">
            <Icon icon="solar:hand-money-linear" width={15} />
            افزودن معامله
          </button>
        </div>
      </div>

      {/* ─── KPI Cards ────────────────────────────────────────────────────── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {statCards.map((card) => (
          <CRMStatCard key={card.title} {...card} />
        ))}
      </div>

      {/* ─── Charts Row 1 ─────────────────────────────────────────────────── */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
        <div className="xl:col-span-2">
          <CRMChartCard
            title="سرنخ‌ها در طول زمان"
            subtitle="جدید در مقابل واجد شرایط در مقابل تبدیل شده"
          >
            <Chart
              type="line"
              options={leadsChartOptions}
              series={leadsOverTimeData.series}
              height="100%"
            />
          </CRMChartCard>
        </div>
        <div className="xl:col-span-1">
          <CRMChartCard title="قیف تبدیل" subtitle="از سرنخ تا بسته شدن">
            <Chart
              type="bar"
              options={funnelChartOptions}
              series={[{ name: "رکورد", data: conversionFunnelData.values }]}
              height="100%"
            />
          </CRMChartCard>
        </div>
      </div>

      {/* ─── Charts Row 2 + Activity Feed ─────────────────────────────────── */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
        <div className="xl:col-span-2">
          <CRMChartCard
            title="خط لوله معاملات"
            subtitle="ارزش بر اساس مرحله ($)"
          >
            <Chart
              type="bar"
              options={pipelineChartOptions}
              series={dealPipelineData.series}
              height="100%"
            />
          </CRMChartCard>
        </div>
        <div className="xl:col-span-1">
          <CRMActivityFeed activities={activitiesData} limit={6} />
        </div>
      </div>

      {/* ─── Tables ───────────────────────────────────────────────────────── */}
      <CRMTable
        title="سرنخ‌های اخیر"
        subtitle="آخرین سرنخ‌های ورودی"
        data={leadsData}
        columns={leadColumns}
        searchPlaceholder="جستجو در سرنخ‌ها..."
        action={
          <button className="flex items-center gap-1 text-xs text-blue-600 hover:text-blue-700 font-medium">
            مشاهده همه <Icon icon="solar:alt-arrow-left-linear" width={13} />
          </button>
        }
      />

      <CRMTable
        title="معاملات فعال"
        subtitle="معاملات جاری در خط فروش"
        data={dealsData.filter((d) => d.stage !== "closed_lost")}
        columns={dealColumns}
        searchPlaceholder="جستجو در معاملات..."
        action={
          <button className="flex items-center gap-1 text-xs text-emerald-600 hover:text-emerald-700 font-medium">
            مشاهده همه <Icon icon="solar:alt-arrow-left-linear" width={13} />
          </button>
        }
      />
    </div>
  );
});

export default CRMDashboard;
