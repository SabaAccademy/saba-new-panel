"use client";

import dynamic from "next/dynamic";
import { ApexOptions } from "apexcharts";
import { Icon } from "@iconify/react/dist/iconify.js";
import CardBox from "@/app/components/shared/CardBox";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";

const Chart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
  loading: () => <Skeleton className="w-full h-[260px] rounded-xl" />,
});

// ─── Data ─────────────────────────────────────────────────────────────────────
const pills = [
  {
    label: "سفارش‌های امروز",
    value: "۳۴۸",
    icon: "solar:box-bold",
    color: "#f59e0b",
    bg: "bg-amber-50 dark:bg-amber-900/20",
    delta: "+۱۲٪",
  },
  {
    label: "فروشنده فعال",
    value: "۱۲۴",
    icon: "solar:shop-bold",
    color: "#8b5cf6",
    bg: "bg-violet-50 dark:bg-violet-900/20",
    delta: "+۵",
  },
  {
    label: "بازخورد مثبت",
    value: "۹۴٪",
    icon: "solar:star-bold",
    color: "#10b981",
    bg: "bg-emerald-50 dark:bg-emerald-900/20",
    delta: "+۰.۸٪",
  },
  {
    label: "کالای موجود",
    value: "۸٬۹۲۰",
    icon: "solar:tag-price-bold",
    color: "#06b6d4",
    bg: "bg-cyan-50 dark:bg-cyan-900/20",
    delta: "+۲۴۰",
  },
];

const orderPipeline = [
  {
    label: "در انتظار",
    count: 86,
    icon: "solar:hourglass-bold",
    color: "#f59e0b",
    bg: "bg-amber-50 dark:bg-amber-900/20",
    text: "text-amber-600",
  },
  {
    label: "پردازش",
    count: 124,
    icon: "solar:settings-bold",
    color: "#8b5cf6",
    bg: "bg-violet-50 dark:bg-violet-900/20",
    text: "text-violet-600",
  },
  {
    label: "ارسال شد",
    count: 68,
    icon: "solar:delivery-bold",
    color: "#3b82f6",
    bg: "bg-blue-50 dark:bg-blue-900/20",
    text: "text-blue-600",
  },
  {
    label: "تحویل داده",
    count: 215,
    icon: "solar:check-circle-bold",
    color: "#10b981",
    bg: "bg-emerald-50 dark:bg-emerald-900/20",
    text: "text-emerald-600",
  },
  {
    label: "مرجوعی",
    count: 14,
    icon: "solar:arrow-left-bold",
    color: "#ef4444",
    bg: "bg-red-50 dark:bg-red-900/20",
    text: "text-red-600",
  },
];

const recentOrders = [
  {
    id: "#ORD-۸۸۱",
    name: "علی رضایی",
    product: "هدفون بلوتوث",
    cat: "الکترونیک",
    catIcon: "solar:headphones-bold",
    catColor: "#8b5cf6",
    amount: "۱٬۲۰۰٬۰۰۰",
    status: "delivered",
  },
  {
    id: "#ORD-۸۸۲",
    name: "مریم حسینی",
    product: "کفش ورزشی نایک",
    cat: "پوشاک",
    catIcon: "solar:t-shirt-bold",
    catColor: "#ec4899",
    amount: "۸۵۰٬۰۰۰",
    status: "shipping",
  },
  {
    id: "#ORD-۸۸۳",
    name: "رضا کریمی",
    product: "قهوه‌ساز دلونگی",
    cat: "لوازم خانه",
    catIcon: "solar:home-bold",
    catColor: "#f59e0b",
    amount: "۳٬۴۰۰٬۰۰۰",
    status: "processing",
  },
  {
    id: "#ORD-۸۸۴",
    name: "نیلوفر صادقی",
    product: "دوربین سونی",
    cat: "الکترونیک",
    catIcon: "solar:camera-bold",
    catColor: "#8b5cf6",
    amount: "۱۸٬۵۰۰٬۰۰۰",
    status: "pending",
  },
  {
    id: "#ORD-۸۸۵",
    name: "سعید تهرانی",
    product: "ست کتاب روانشناسی",
    cat: "کتاب",
    catIcon: "solar:book-bold",
    catColor: "#10b981",
    amount: "۴۵۰٬۰۰۰",
    status: "delivered",
  },
  {
    id: "#ORD-۸۸۶",
    name: "فاطمه نوری",
    product: "ساعت هوشمند سامسونگ",
    cat: "الکترونیک",
    catIcon: "solar:watch-bold",
    catColor: "#8b5cf6",
    amount: "۸٬۲۰۰٬۰۰۰",
    status: "refund",
  },
];

const statusStyle = {
  delivered: {
    label: "تحویل داده",
    cls: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400",
  },
  shipping: {
    label: "ارسال شد",
    cls: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
  },
  processing: {
    label: "پردازش",
    cls: "bg-violet-100 text-violet-700 dark:bg-violet-900/30 dark:text-violet-400",
  },
  pending: {
    label: "در انتظار",
    cls: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
  },
  refund: {
    label: "مرجوعی",
    cls: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
  },
};

const salesOpts: ApexOptions = {
  chart: {
    toolbar: { show: false },
    type: "area",
    fontFamily: "inherit",
    foreColor: "#7C8FAC",
  },
  stroke: { curve: "smooth", width: 2.5 },
  fill: { type: "gradient", gradient: { opacityFrom: 0.35, opacityTo: 0.01 } },
  colors: ["#f59e0b"],
  dataLabels: { enabled: false },
  grid: { borderColor: "rgba(0,0,0,0.06)", strokeDashArray: 4 },
  xaxis: {
    categories: [
      "فر",
      "ار",
      "خر",
      "تیر",
      "مر",
      "شه",
      "مه",
      "آب",
      "آذر",
      "دی",
      "به",
      "اس",
    ],
  },
  tooltip: { theme: "dark" },
  yaxis: { labels: { formatter: (v) => `${(v / 1000).toFixed(0)}م` } },
};

const catOpts: ApexOptions = {
  chart: {
    toolbar: { show: false },
    type: "bar",
    fontFamily: "inherit",
    foreColor: "#7C8FAC",
  },
  plotOptions: { bar: { borderRadius: 6, distributed: true } },
  colors: ["#8b5cf6", "#ec4899", "#f59e0b", "#10b981", "#06b6d4"],
  dataLabels: { enabled: false },
  grid: { borderColor: "rgba(0,0,0,0.06)", strokeDashArray: 4 },
  xaxis: { categories: ["الکترونیک", "پوشاک", "خانه", "کتاب", "ورزش"] },
  legend: { show: false },
  tooltip: { theme: "dark" },
};

export default function MarketplaceDashboard() {
  return (
    <div className="flex flex-col gap-6">
      {/* Big Revenue Hero */}
      <div className="bg-gradient-to-br from-amber-500 via-orange-500 to-rose-500 rounded-2xl p-6 text-white">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <p className="text-white/70 text-sm mb-1">درآمد کل ماه جاری</p>
            <h2 className="text-4xl font-black text-white">۱۲.۸ میلیارد</h2>
            <p className="text-white/70 text-xs mt-1">
              تومان · <span className="text-white font-semibold">+۲۱٪</span>{" "}
              نسبت به ماه گذشته
            </p>
          </div>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {pills.map((p) => (
              <div
                key={p.label}
                className={`${p.bg} rounded-xl p-3 text-center`}
              >
                <Icon
                  icon={p.icon}
                  width={18}
                  style={{ color: p.color }}
                  className="mx-auto mb-1"
                />
                <p className="text-sm font-black" style={{ color: p.color }}>
                  {p.value}
                </p>
                <p className="text-[10px] text-muted-foreground leading-tight">
                  {p.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Order pipeline stages */}
      <CardBox>
        <h4 className="text-base font-semibold mb-4">وضعیت سفارش‌ها</h4>
        <div className="flex flex-wrap gap-2">
          {orderPipeline.map((s, i) => (
            <div key={s.label} className="flex items-center gap-1">
              <div
                className={`${s.bg} ${s.text} flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-medium`}
              >
                <Icon icon={s.icon} width={15} style={{ color: s.color }} />
                <span>{s.label}</span>
                <span className="bg-white/70 dark:bg-white/10 text-foreground text-xs font-black rounded-full px-2 py-0.5">
                  {s.count}
                </span>
              </div>
              {i < orderPipeline.length - 1 && (
                <Icon
                  icon="solar:arrow-left-bold"
                  width={14}
                  className="text-muted-foreground opacity-40"
                />
              )}
            </div>
          ))}
        </div>
      </CardBox>

      {/* Charts */}
      <div className="grid grid-cols-12 gap-4">
        <div className="col-span-12 lg:col-span-8">
          <CardBox>
            <h4 className="text-base font-semibold mb-1">
              فروش ۱۲ ماه اخیر (تومان)
            </h4>
            <Chart
              options={salesOpts}
              series={[
                {
                  name: "فروش",
                  data: [
                    4200, 5800, 5100, 6900, 6200, 7800, 7100, 8500, 7900, 9200,
                    10800, 12800,
                  ],
                },
              ]}
              type="area"
              height={220}
              width="100%"
            />
          </CardBox>
        </div>
        <div className="col-span-12 lg:col-span-4">
          <CardBox>
            <h4 className="text-base font-semibold mb-1">
              فروش بر اساس دسته‌بندی
            </h4>
            <Chart
              options={catOpts}
              series={[{ name: "فروش", data: [420, 310, 185, 95, 140] }]}
              type="bar"
              height={220}
              width="100%"
            />
          </CardBox>
        </div>
      </div>

      {/* Recent orders cards grid */}
      <div>
        <h4 className="text-base font-semibold mb-3">سفارش‌های اخیر</h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3">
          {recentOrders.map((o) => {
            const st = statusStyle[o.status as keyof typeof statusStyle];
            return (
              <div
                key={o.id}
                className="bg-card border border-border rounded-xl p-4 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <div
                      className="w-9 h-9 rounded-xl flex items-center justify-center"
                      style={{ backgroundColor: o.catColor + "15" }}
                    >
                      <Icon
                        icon={o.catIcon}
                        width={18}
                        style={{ color: o.catColor }}
                      />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-foreground leading-tight">
                        {o.product}
                      </p>
                      <p className="text-xs text-muted-foreground">{o.cat}</p>
                    </div>
                  </div>
                  <span
                    className={`text-xs px-2 py-0.5 rounded-full font-medium ${st.cls}`}
                  >
                    {st.label}
                  </span>
                </div>
                <div className="flex items-center justify-between text-xs text-muted-foreground border-t border-border pt-2.5">
                  <div className="flex items-center gap-1">
                    <Icon icon="solar:user-circle-bold" width={13} />
                    <span>{o.name}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="font-mono font-semibold text-foreground/70">
                      {o.id}
                    </span>
                  </div>
                </div>
                <div className="mt-1.5 text-right">
                  <span className="text-sm font-black text-amber-600">
                    {o.amount} ت
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
