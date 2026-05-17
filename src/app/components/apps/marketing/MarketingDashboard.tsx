"use client";

import dynamic from "next/dynamic";
import { ApexOptions } from "apexcharts";
import { Icon } from "@iconify/react/dist/iconify.js";
import CardBox from "@/app/components/shared/CardBox";
import { Skeleton } from "@/components/ui/skeleton";
import { Progress } from "@/components/ui/progress";

const Chart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
  loading: () => <Skeleton className="w-full h-[260px] rounded-xl" />,
});

// ─── Data ─────────────────────────────────────────────────────────────────────
const heroStats = [
  {
    label: "بازدید کل",
    value: "۱.۴۸ میلیون",
    change: "+۲۳٪",
    icon: "solar:eye-bold",
    gradient: "from-violet-600 to-purple-700",
    sparkline: [40, 55, 48, 72, 65, 80, 74, 95, 88, 105],
  },
  {
    label: "نرخ تبدیل",
    value: "۳.۶٪",
    change: "+۰.۴٪",
    icon: "solar:target-bold",
    gradient: "from-fuchsia-600 to-pink-700",
    sparkline: [2.8, 3.0, 2.9, 3.2, 3.4, 3.1, 3.5, 3.6, 3.4, 3.6],
  },
  {
    label: "درآمد کمپین",
    value: "۴.۲ میلیارد",
    change: "+۱۷٪",
    icon: "solar:wallet-money-bold",
    gradient: "from-rose-600 to-orange-600",
    sparkline: [2.8, 3.1, 2.9, 3.5, 3.8, 3.3, 3.9, 4.0, 3.8, 4.2],
  },
  {
    label: "هزینه هر کلیک",
    value: "۱٬۲۵۰ ت",
    change: "-۸٪",
    icon: "solar:cursor-bold",
    gradient: "from-amber-500 to-yellow-600",
    sparkline: [1600, 1500, 1450, 1380, 1420, 1350, 1300, 1280, 1260, 1250],
  },
];

const trafficSources = [
  {
    name: "جستجوی ارگانیک",
    pct: 38,
    color: "#8b5cf6",
    icon: "solar:magnifer-bold",
  },
  { name: "شبکه اجتماعی", pct: 25, color: "#ec4899", icon: "solar:share-bold" },
  {
    name: "ایمیل مارکتینگ",
    pct: 18,
    color: "#f59e0b",
    icon: "solar:letter-bold",
  },
  {
    name: "تبلیغات پولی",
    pct: 12,
    color: "#06b6d4",
    icon: "solar:dollar-minimalistic-bold",
  },
  { name: "مستقیم", pct: 7, color: "#10b981", icon: "solar:cursor-bold" },
];

const campaigns = [
  {
    name: "کمپین عید نوروز",
    platform: "اینستاگرام",
    icon: "solar:instagram-bold",
    pcolor: "#e1306c",
    budget: "۱۲۰ م",
    spent: 78,
    roi: "۳۸۰٪",
    status: "active",
  },
  {
    name: "تبلیغات گوگل",
    platform: "گوگل",
    icon: "solar:magnifer-bold",
    pcolor: "#4285f4",
    budget: "۲۸۰ م",
    spent: 62,
    roi: "۲۶۰٪",
    status: "active",
  },
  {
    name: "ایمیل مارکتینگ",
    platform: "ایمیل",
    icon: "solar:letter-bold",
    pcolor: "#ea4335",
    budget: "۱۸ م",
    spent: 91,
    roi: "۵۲۰٪",
    status: "completed",
  },
  {
    name: "کمپین تلگرام",
    platform: "تلگرام",
    icon: "solar:telegram-bold",
    pcolor: "#0088cc",
    budget: "۴۵ م",
    spent: 45,
    roi: "۱۸۰٪",
    status: "paused",
  },
  {
    name: "پوش نوتیفیکیشن",
    platform: "موبایل",
    icon: "solar:smartphone-bold",
    pcolor: "#8b5cf6",
    budget: "۸ م",
    spent: 100,
    roi: "۴۸۰٪",
    status: "completed",
  },
  {
    name: "بنر سایت",
    platform: "وب",
    icon: "solar:global-bold",
    pcolor: "#06b6d4",
    budget: "۶۵ م",
    spent: 35,
    roi: "۱۴۰٪",
    status: "active",
  },
];

const campaignStatusStyle = {
  active: {
    label: "فعال",
    cls: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400",
  },
  paused: {
    label: "متوقف",
    cls: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
  },
  completed: {
    label: "تکمیل",
    cls: "bg-violet-100 text-violet-700 dark:bg-violet-900/30 dark:text-violet-400",
  },
};

const perfOpts: ApexOptions = {
  chart: {
    toolbar: { show: false },
    type: "area",
    fontFamily: "inherit",
    foreColor: "#7C8FAC",
  },
  stroke: { curve: "smooth", width: 2.5 },
  fill: { type: "gradient", gradient: { opacityFrom: 0.3, opacityTo: 0.02 } },
  colors: ["#8b5cf6", "#ec4899", "#f59e0b"],
  dataLabels: { enabled: false },
  grid: { borderColor: "rgba(0,0,0,0.06)", strokeDashArray: 4 },
  xaxis: {
    categories: [
      "هفته ۱",
      "هفته ۲",
      "هفته ۳",
      "هفته ۴",
      "هفته ۵",
      "هفته ۶",
      "هفته ۷",
      "هفته ۸",
    ],
  },
  legend: { position: "top", horizontalAlign: "right" },
  tooltip: { theme: "dark" },
};

const sparkOpts: ApexOptions = {
  chart: {
    toolbar: { show: false },
    type: "line",
    sparkline: { enabled: true },
  },
  stroke: { curve: "smooth", width: 2 },
  colors: ["rgba(255,255,255,0.7)"],
  tooltip: { enabled: false },
};

export default function MarketingDashboard() {
  return (
    <div className="flex flex-col gap-6">
      {/* 4 Gradient Hero KPI Banners */}
      <div className="grid grid-cols-12 gap-4">
        {heroStats.map((s) => (
          <div
            key={s.label}
            className="col-span-12 sm:col-span-6 lg:col-span-3"
          >
            <div
              className={`bg-gradient-to-br ${s.gradient} rounded-2xl p-5 text-white overflow-hidden relative`}
            >
              {/* Sparkline bg */}
              <div className="absolute inset-0 opacity-20">
                <Chart
                  options={sparkOpts}
                  series={[{ data: s.sparkline }]}
                  type="line"
                  height="100%"
                  width="100%"
                />
              </div>
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-3">
                  <Icon icon={s.icon} width={22} className="opacity-90" />
                  <span className="text-xs bg-white/20 rounded-full px-2 py-0.5">
                    {s.change}
                  </span>
                </div>
                <h3 className="text-2xl font-black text-white">{s.value}</h3>
                <p className="text-xs text-white/70 mt-1">{s.label}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Full-width campaign performance */}
      <CardBox>
        <h4 className="text-base font-semibold mb-1">عملکرد هفتگی کمپین‌ها</h4>
        <Chart
          options={perfOpts}
          series={[
            {
              name: "کلیک (هزار)",
              data: [4.2, 5.1, 4.8, 6.2, 5.8, 7.1, 6.9, 8.2],
            },
            { name: "تبدیل", data: [150, 188, 172, 224, 210, 256, 248, 296] },
            {
              name: "بازگشت (م)",
              data: [280, 340, 310, 420, 390, 510, 480, 590],
            },
          ]}
          type="area"
          height={200}
          width="100%"
        />
      </CardBox>

      {/* Traffic sources + Campaign cards */}
      <div className="grid grid-cols-12 gap-4">
        {/* Traffic source progress bars */}
        <div className="col-span-12 lg:col-span-4">
          <CardBox className="flex flex-col gap-4 h-full">
            <h4 className="text-base font-semibold">منابع ترافیک</h4>
            {trafficSources.map((src) => (
              <div key={src.name} className="flex flex-col gap-1.5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-sm">
                    <Icon
                      icon={src.icon}
                      width={16}
                      style={{ color: src.color }}
                    />
                    <span className="text-foreground/80">{src.name}</span>
                  </div>
                  <span
                    className="text-sm font-semibold"
                    style={{ color: src.color }}
                  >
                    {src.pct}٪
                  </span>
                </div>
                <div className="h-1.5 rounded-full bg-muted overflow-hidden">
                  <div
                    className="h-full rounded-full"
                    style={{ width: `${src.pct}%`, backgroundColor: src.color }}
                  />
                </div>
              </div>
            ))}
          </CardBox>
        </div>

        {/* Campaign cards grid */}
        <div className="col-span-12 lg:col-span-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 h-full">
            {campaigns.map((c) => {
              const st =
                campaignStatusStyle[
                  c.status as keyof typeof campaignStatusStyle
                ];
              return (
                <div
                  key={c.name}
                  className="bg-card border border-border rounded-xl p-4 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <div
                        className="w-8 h-8 rounded-lg flex items-center justify-center"
                        style={{ backgroundColor: c.pcolor + "20" }}
                      >
                        <Icon
                          icon={c.icon}
                          width={18}
                          style={{ color: c.pcolor }}
                        />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-foreground leading-tight">
                          {c.name}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {c.platform}
                        </p>
                      </div>
                    </div>
                    <span
                      className={`text-xs px-2 py-0.5 rounded-full font-medium ${st.cls}`}
                    >
                      {st.label}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-xs text-muted-foreground mb-1.5">
                    <span>بودجه: {c.budget}</span>
                    <span>
                      ROI:{" "}
                      <span className="text-emerald-500 font-semibold">
                        {c.roi}
                      </span>
                    </span>
                  </div>
                  <Progress value={c.spent} className="h-1.5" />
                  <p className="text-xs text-muted-foreground mt-1">
                    {c.spent}٪ هزینه شد
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
