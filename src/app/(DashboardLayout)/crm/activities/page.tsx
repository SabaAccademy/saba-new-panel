"use client";

import { memo, useState } from "react";
import { Icon } from "@iconify/react/dist/iconify.js";
import { cn } from "@/lib/utils";
import CRMActivityFeed from "@/app/components/apps/crm/CRMActivityFeed";
import {
  activitiesData,
  type ActivityType,
} from "@/app/components/apps/crm/crmMockData";

const filterTypes: { label: string; value: ActivityType | "all" }[] = [
  { label: "همه", value: "all" },
  { label: "تماس‌ها", value: "call" },
  { label: "ایمیل‌ها", value: "email" },
  { label: "جلسات", value: "meeting" },
  { label: "یادداشت‌ها", value: "note" },
  { label: "وظایف", value: "task" },
];

const ActivitiesPage = memo(function ActivitiesPage() {
  const [filter, setFilter] = useState<ActivityType | "all">("all");

  const filtered =
    filter === "all"
      ? activitiesData
      : activitiesData.filter((a) => a.type === filter);

  return (
    <div className="space-y-6" dir="rtl">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-gray-800 dark:text-white">
            فعالیت‌ها
          </h1>
          <p className="text-sm text-gray-500 mt-0.5">مشاهده همه تعاملات CRM</p>
        </div>
        <button className="flex items-center gap-1.5 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors">
          <Icon icon="solar:add-circle-linear" width={16} />
          ثبت فعالیت
        </button>
      </div>

      {/* Type filter */}
      <div className="flex items-center gap-2 flex-wrap">
        {filterTypes.map((f) => (
          <button
            key={f.value}
            onClick={() => setFilter(f.value)}
            className={cn(
              "px-3 py-1.5 text-sm rounded-lg font-medium transition-colors border",
              filter === f.value
                ? "bg-blue-600 text-white border-blue-600"
                : "bg-white dark:bg-gray-900 text-gray-600 dark:text-gray-300 border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800",
            )}
          >
            {f.label}
            <span className="ml-1.5 text-xs opacity-70">
              {f.value === "all"
                ? activitiesData.length
                : activitiesData.filter((a) => a.type === f.value).length}
            </span>
          </button>
        ))}
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
        {[
          {
            type: "call" as ActivityType,
            label: "تماس‌ها",
            icon: "solar:phone-bold",
            color: "#3b82f6",
            bg: "bg-blue-50 dark:bg-blue-900/20",
          },
          {
            type: "email" as ActivityType,
            label: "ایمیل‌ها",
            icon: "solar:letter-bold",
            color: "#8b5cf6",
            bg: "bg-violet-50 dark:bg-violet-900/20",
          },
          {
            type: "meeting" as ActivityType,
            label: "جلسات",
            icon: "solar:calendar-bold",
            color: "#10b981",
            bg: "bg-emerald-50 dark:bg-emerald-900/20",
          },
          {
            type: "note" as ActivityType,
            label: "یادداشت‌ها",
            icon: "solar:notes-bold",
            color: "#f59e0b",
            bg: "bg-amber-50 dark:bg-amber-900/20",
          },
          {
            type: "task" as ActivityType,
            label: "وظایف",
            icon: "solar:checklist-bold",
            color: "#ef4444",
            bg: "bg-red-50 dark:bg-red-900/20",
          },
        ].map((s) => {
          const count = activitiesData.filter((a) => a.type === s.type).length;
          return (
            <div
              key={s.type}
              className={cn(
                "rounded-xl p-4 border border-gray-100 dark:border-gray-800 shadow-sm flex items-center gap-3",
                s.bg,
              )}
            >
              <Icon icon={s.icon} width={20} style={{ color: s.color }} />
              <div>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {s.label}
                </p>
                <p className="text-xl font-bold text-gray-800 dark:text-white">
                  {count}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      <CRMActivityFeed activities={filtered} limit={filtered.length} />
    </div>
  );
});

export default ActivitiesPage;
