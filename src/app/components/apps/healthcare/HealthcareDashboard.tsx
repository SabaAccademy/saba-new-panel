"use client";

import dynamic from "next/dynamic";
import { ApexOptions } from "apexcharts";
import { Icon } from "@iconify/react/dist/iconify.js";
import CardBox from "@/app/components/shared/CardBox";
import { Skeleton } from "@/components/ui/skeleton";
import { Progress } from "@/components/ui/progress";

const Chart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
  loading: () => <Skeleton className="w-full h-[240px] rounded-xl" />,
});

// ─── Data ─────────────────────────────────────────────────────────────────────
const radialStats = [
  {
    label: "اشغال تخت",
    value: 78,
    color: "#3b82f6",
    icon: "solar:bed-bold",
    bg: "bg-blue-50 dark:bg-blue-950/30",
  },
  {
    label: "رضایت بیمار",
    value: 92,
    color: "#10b981",
    icon: "solar:heart-bold",
    bg: "bg-emerald-50 dark:bg-emerald-950/30",
  },
  {
    label: "ویزیت موفق",
    value: 85,
    color: "#8b5cf6",
    icon: "solar:health-bold",
    bg: "bg-violet-50 dark:bg-violet-950/30",
  },
  {
    label: "اهداف درمانی",
    value: 67,
    color: "#f59e0b",
    icon: "solar:target-bold",
    bg: "bg-amber-50 dark:bg-amber-950/30",
  },
];

const appointments = [
  {
    time: "۰۸:۰۰",
    patient: "علی محمدی",
    doctor: "دکتر رضایی",
    dept: "قلب",
    status: "in-progress",
  },
  {
    time: "۰۹:۳۰",
    patient: "زهرا کریمی",
    doctor: "دکتر حسینی",
    dept: "زنان",
    status: "done",
  },
  {
    time: "۱۰:۰۰",
    patient: "محمد احمدی",
    doctor: "دکتر جعفری",
    dept: "اورژانس",
    status: "done",
  },
  {
    time: "۱۱:۳۰",
    patient: "لیلا نظری",
    doctor: "دکتر عباسی",
    dept: "اعصاب",
    status: "upcoming",
  },
  {
    time: "۱۴:۰۰",
    patient: "حسن رضوی",
    doctor: "دکتر موسوی",
    dept: "ارتوپدی",
    status: "upcoming",
  },
  {
    time: "۱۵:۳۰",
    patient: "فاطمه صادقی",
    doctor: "دکتر رضایی",
    dept: "کودکان",
    status: "upcoming",
  },
];

const deptData: ApexOptions = {
  chart: {
    toolbar: { show: false },
    type: "bar",
    fontFamily: "inherit",
    foreColor: "#7C8FAC",
  },
  plotOptions: {
    bar: {
      columnWidth: "50%",
      borderRadius: 5,
      borderRadiusApplication: "end",
    },
  },
  colors: ["#3b82f6", "#93c5fd"],
  dataLabels: { enabled: false },
  grid: { borderColor: "rgba(0,0,0,0.06)", strokeDashArray: 4 },
  xaxis: {
    categories: ["اورژانس", "قلب", "ارتوپدی", "اعصاب", "زنان", "کودکان"],
  },
  legend: { position: "top", horizontalAlign: "right" },
  tooltip: { theme: "dark" },
};

const visitOpts: ApexOptions = {
  chart: {
    toolbar: { show: false },
    type: "area",
    fontFamily: "inherit",
    foreColor: "#7C8FAC",
  },
  stroke: { curve: "smooth", width: 2.5 },
  fill: { type: "gradient", gradient: { opacityFrom: 0.3, opacityTo: 0.02 } },
  colors: ["#3b82f6", "#8b5cf6"],
  dataLabels: { enabled: false },
  grid: { borderColor: "rgba(0,0,0,0.06)", strokeDashArray: 4 },
  xaxis: {
    categories: [
      "شنبه",
      "یکشنبه",
      "دوشنبه",
      "سه‌شنبه",
      "چهارشنبه",
      "پنجشنبه",
      "جمعه",
    ],
  },
  legend: { position: "top", horizontalAlign: "right" },
  tooltip: { theme: "dark" },
};

const statusStyle = {
  done: {
    label: "انجام شد",
    cls: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400",
  },
  "in-progress": {
    label: "در جریان",
    cls: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
  },
  upcoming: {
    label: "پیش‌رو",
    cls: "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400",
  },
};

export default function HealthcareDashboard() {
  return (
    <div className="flex flex-col gap-6">
      {/* Top KPI row */}
      <div className="grid grid-cols-12 gap-4">
        {/* Big number cards */}
        {[
          {
            label: "کل بیماران",
            value: "۸٬۵۳۲",
            sub: "+۱۵٪ این ماه",
            icon: "solar:users-group-rounded-bold",
            bg: "bg-blue-500",
            pattern: "text-blue-50",
          },
          {
            label: "ویزیت امروز",
            value: "۱۴۲",
            sub: "۲۸ در انتظار",
            icon: "solar:calendar-bold",
            bg: "bg-violet-500",
            pattern: "text-violet-50",
          },
          {
            label: "درآمد ماهانه",
            value: "۳.۲ میلیارد",
            sub: "+۱۸٪",
            icon: "solar:wallet-money-bold",
            bg: "bg-emerald-500",
            pattern: "text-emerald-50",
          },
        ].map((s) => (
          <div key={s.label} className="col-span-12 md:col-span-4">
            <div
              className={`${s.bg} rounded-2xl p-5 text-white relative overflow-hidden`}
            >
              <Icon
                icon={s.icon}
                width={52}
                className={`absolute -bottom-3 -left-3 opacity-20 ${s.pattern}`}
              />
              <p className="text-sm font-medium text-white/80 mb-1">
                {s.label}
              </p>
              <h2 className="text-3xl font-black text-white">{s.value}</h2>
              <p className="text-xs text-white/70 mt-1">{s.sub}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Radial progress row */}
      <div className="grid grid-cols-12 gap-4">
        {radialStats.map((r) => (
          <div key={r.label} className="col-span-6 md:col-span-3">
            <CardBox
              className={`${r.bg} border-0 flex flex-col items-center text-center py-6 gap-3`}
            >
              <Icon icon={r.icon} width={28} style={{ color: r.color }} />
              <div className="w-full px-4">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-xs font-medium text-foreground/70">
                    {r.label}
                  </span>
                  <span
                    className="text-sm font-bold"
                    style={{ color: r.color }}
                  >
                    {r.value}٪
                  </span>
                </div>
                <Progress value={r.value} className="h-2" />
              </div>
            </CardBox>
          </div>
        ))}
      </div>

      {/* Charts + Appointments */}
      <div className="grid grid-cols-12 gap-4">
        {/* Visit trend */}
        <div className="col-span-12 lg:col-span-5">
          <CardBox>
            <h4 className="text-base font-semibold mb-1">
              مراجعات بیمار (هفتگی)
            </h4>
            <Chart
              options={visitOpts}
              series={[
                { name: "سرپایی", data: [85, 120, 115, 98, 130, 110, 45] },
                { name: "بستری", data: [22, 28, 25, 30, 24, 26, 10] },
              ]}
              type="area"
              height={220}
              width="100%"
            />
          </CardBox>
        </div>

        {/* Department load */}
        <div className="col-span-12 lg:col-span-3">
          <CardBox>
            <h4 className="text-base font-semibold mb-1">بار بخش‌ها</h4>
            <Chart
              options={deptData}
              series={[
                { name: "بیمار", data: [42, 35, 28, 22, 30, 18] },
                { name: "ظرفیت", data: [60, 45, 40, 30, 40, 25] },
              ]}
              type="bar"
              height={220}
              width="100%"
            />
          </CardBox>
        </div>

        {/* Today's appointments timeline */}
        <div className="col-span-12 lg:col-span-4">
          <CardBox className="flex flex-col gap-3">
            <h4 className="text-base font-semibold">نوبت‌های امروز</h4>
            <div className="flex flex-col gap-2 overflow-auto max-h-[260px]">
              {appointments.map((a) => {
                const st = statusStyle[a.status as keyof typeof statusStyle];
                return (
                  <div
                    key={a.time + a.patient}
                    className="flex items-center gap-3 py-2 border-b border-border/50 last:border-0"
                  >
                    <div className="text-xs font-mono font-semibold text-muted-foreground w-12 shrink-0">
                      {a.time}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-foreground truncate">
                        {a.patient}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {a.doctor} · {a.dept}
                      </p>
                    </div>
                    <span
                      className={`text-xs px-2 py-0.5 rounded-full font-medium shrink-0 ${st.cls}`}
                    >
                      {st.label}
                    </span>
                  </div>
                );
              })}
            </div>
          </CardBox>
        </div>
      </div>
    </div>
  );
}
