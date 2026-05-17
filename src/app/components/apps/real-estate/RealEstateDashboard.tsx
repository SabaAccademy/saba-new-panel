"use client";

import dynamic from "next/dynamic";
import { ApexOptions } from "apexcharts";
import { Icon } from "@iconify/react/dist/iconify.js";
import CardBox from "@/app/components/shared/CardBox";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";

const Chart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
  loading: () => <Skeleton className="w-full h-[280px] rounded-xl" />,
});

// ─── Static Data ─────────────────────────────────────────────────────────────
const stats = [
  {
    label: "ارزش پرتفولیو",
    value: "۳۴۸ میلیارد",
    change: "+۱۲٪",
    icon: "solar:buildings-2-bold",
    color: "from-emerald-500 to-teal-600",
  },
  {
    label: "کل ملک‌های فعال",
    value: "۱٬۲۴۸",
    change: "+۸٪",
    icon: "solar:home-2-bold",
    color: "from-teal-500 to-cyan-600",
  },
  {
    label: "فروش ماهانه",
    value: "۴۵ میلیارد",
    change: "-۳٪",
    icon: "solar:hand-money-bold",
    color: "from-cyan-500 to-blue-600",
  },
  {
    label: "آگهی فعال",
    value: "۳۸۶",
    change: "+۱۵٪",
    icon: "solar:tag-bold",
    color: "from-blue-500 to-indigo-600",
  },
  {
    label: "میانگین قیمت",
    value: "۸.۵ میلیارد",
    change: "+۵٪",
    icon: "solar:chart-square-bold",
    color: "from-violet-500 to-purple-600",
  },
];

const listings = [
  {
    title: "آپارتمان نیاوران",
    city: "تهران",
    price: "۱۲.۵ میلیارد",
    type: "آپارتمان",
    status: "موجود",
    img: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=120&h=80&fit=crop",
  },
  {
    title: "ویلای لواسان",
    city: "تهران",
    price: "۴۸ میلیارد",
    type: "ویلا",
    status: "رزرو",
    img: "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=120&h=80&fit=crop",
  },
  {
    title: "دفتر ولیعصر",
    city: "تهران",
    price: "۱۸ میلیارد",
    type: "تجاری",
    status: "اجاره",
    img: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=120&h=80&fit=crop",
  },
  {
    title: "آپارتمان چهارباغ",
    city: "اصفهان",
    price: "۶.۸ میلیارد",
    type: "آپارتمان",
    status: "فروخته شد",
    img: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=120&h=80&fit=crop",
  },
];

const lineOpts: ApexOptions = {
  chart: {
    toolbar: { show: false },
    type: "area",
    fontFamily: "inherit",
    foreColor: "#7C8FAC",
  },
  stroke: { curve: "smooth", width: 2.5 },
  fill: { type: "gradient", gradient: { opacityFrom: 0.3, opacityTo: 0.02 } },
  colors: ["#10b981", "#06b6d4"],
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

const barOpts: ApexOptions = {
  chart: {
    toolbar: { show: false },
    type: "bar",
    fontFamily: "inherit",
    foreColor: "#7C8FAC",
  },
  plotOptions: { bar: { horizontal: true, borderRadius: 4, barHeight: "60%" } },
  colors: ["#10b981", "#34d399", "#6ee7b7"],
  dataLabels: { enabled: false },
  grid: { borderColor: "rgba(0,0,0,0.06)", strokeDashArray: 4 },
  xaxis: { categories: ["تهران", "اصفهان", "مشهد", "شیراز", "تبریز", "کرج"] },
  legend: { position: "top", horizontalAlign: "right" },
  tooltip: { theme: "dark" },
};

const statusMap: Record<string, string> = {
  موجود:
    "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400",
  رزرو: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
  اجاره: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
  "فروخته شد": "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400",
};

// ─── Component ────────────────────────────────────────────────────────────────
export default function RealEstateDashboard() {
  return (
    <div className="flex flex-col gap-6">
      {/* Hero banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-l from-teal-600 to-emerald-700 p-6 text-white">
        <div className="absolute -top-10 -left-10 w-40 h-40 bg-white/5 rounded-full" />
        <div className="absolute -bottom-8 left-20 w-24 h-24 bg-white/5 rounded-full" />
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-sm font-medium text-white/70 mb-1 flex items-center gap-1.5">
              <Icon icon="solar:buildings-2-bold" width={16} /> پرتفولیو کل
              پروژه‌ها
            </p>
            <h2 className="text-4xl font-black tracking-tight text-white">
              ۳۴۸ میلیارد
            </h2>
            <p className="text-sm text-emerald-200 mt-1 flex items-center gap-1">
              <Icon icon="solar:arrow-up-bold" width={14} /> +۱۲٪ نسبت به ماه
              گذشته
            </p>
          </div>
          <div className="flex gap-6">
            {[
              { label: "در انتظار", val: "۱۲" },
              { label: "در پیشرفت", val: "۸" },
              { label: "تکمیل شده", val: "۵۶" },
            ].map((s) => (
              <div key={s.label} className="text-center">
                <p className="text-2xl font-bold">{s.val}</p>
                <p className="text-xs text-white/60 mt-0.5">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 5 KPI Cards */}
      <div className="grid grid-cols-12 gap-4">
        {stats.map((s) => (
          <div
            key={s.label}
            className="col-span-12 sm:col-span-6 lg:col-span-4 xl:col-span-2 last:xl:col-span-4"
          >
            <CardBox className="flex items-center gap-4 p-4 hover:shadow-md transition-shadow">
              <div
                className={`w-12 h-12 rounded-xl bg-gradient-to-br ${s.color} flex items-center justify-center shrink-0`}
              >
                <Icon icon={s.icon} width={22} className="text-white" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">{s.label}</p>
                <p className="text-lg font-bold text-foreground leading-tight">
                  {s.value}
                </p>
                <p
                  className={`text-xs font-medium ${s.change.startsWith("+") ? "text-emerald-500" : "text-red-500"}`}
                >
                  {s.change}
                </p>
              </div>
            </CardBox>
          </div>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-12 gap-4">
        <div className="col-span-12 lg:col-span-8">
          <CardBox>
            <h4 className="text-base font-semibold mb-1">
              روند قیمت و فروش (ماهانه)
            </h4>
            <Chart
              options={lineOpts}
              series={[
                {
                  name: "فروش (میلیارد)",
                  data: [32, 45, 38, 52, 61, 55, 48, 70, 65, 58, 74, 80],
                },
                {
                  name: "اجاره (میلیارد)",
                  data: [18, 22, 25, 30, 28, 35, 32, 40, 38, 45, 42, 50],
                },
              ]}
              type="area"
              height={280}
              width="100%"
            />
          </CardBox>
        </div>
        <div className="col-span-12 lg:col-span-4">
          <CardBox>
            <h4 className="text-base font-semibold mb-1">
              آگهی‌ها بر اساس شهر
            </h4>
            <Chart
              options={barOpts}
              series={[
                { name: "آپارتمان", data: [120, 68, 54, 45, 38, 30] },
                { name: "ویلا", data: [45, 28, 22, 18, 15, 12] },
                { name: "تجاری", data: [30, 18, 14, 10, 8, 6] },
              ]}
              type="bar"
              height={280}
              width="100%"
            />
          </CardBox>
        </div>
      </div>

      {/* Property listing cards */}
      <div>
        <h4 className="text-base font-semibold mb-3">ملک‌های اخیر</h4>
        <div className="grid grid-cols-12 gap-4">
          {listings.map((p) => (
            <div
              key={p.title}
              className="col-span-12 sm:col-span-6 xl:col-span-3"
            >
              <CardBox className="overflow-hidden p-0 hover:shadow-lg transition-shadow cursor-pointer group">
                <div className="h-32 bg-gradient-to-br from-emerald-100 to-teal-200 dark:from-emerald-900/30 dark:to-teal-900/30 flex items-center justify-center relative overflow-hidden">
                  <Icon
                    icon="solar:buildings-2-bold"
                    width={48}
                    className="text-emerald-400/60 group-hover:scale-110 transition-transform duration-300"
                  />
                  <span
                    className={`absolute top-3 right-3 text-xs font-medium px-2 py-0.5 rounded-full ${statusMap[p.status]}`}
                  >
                    {p.status}
                  </span>
                </div>
                <div className="p-4">
                  <h6 className="font-semibold text-foreground text-sm">
                    {p.title}
                  </h6>
                  <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                    <Icon icon="solar:map-point-linear" width={12} />
                    {p.city} · {p.type}
                  </p>
                  <p className="text-base font-bold text-emerald-600 dark:text-emerald-400 mt-2">
                    {p.price}
                  </p>
                </div>
              </CardBox>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
