"use client";

import { memo } from "react";
import { Icon } from "@iconify/react/dist/iconify.js";
import { cn } from "@/lib/utils";
import type { Activity, ActivityType } from "./crmMockData";

const activityConfig: Record<
  ActivityType,
  { icon: string; color: string; bg: string; label: string }
> = {
  call: {
    icon: "solar:phone-bold",
    color: "#3b82f6",
    bg: "bg-blue-100 dark:bg-blue-900/30",
    label: "تماس",
  },
  email: {
    icon: "solar:letter-bold",
    color: "#8b5cf6",
    bg: "bg-violet-100 dark:bg-violet-900/30",
    label: "ایمیل",
  },
  meeting: {
    icon: "solar:calendar-bold",
    color: "#10b981",
    bg: "bg-emerald-100 dark:bg-emerald-900/30",
    label: "جلسه",
  },
  note: {
    icon: "solar:notes-bold",
    color: "#f59e0b",
    bg: "bg-amber-100 dark:bg-amber-900/30",
    label: "یادداشت",
  },
  task: {
    icon: "solar:checklist-bold",
    color: "#ef4444",
    bg: "bg-red-100 dark:bg-red-900/30",
    label: "وظیفه",
  },
};

function formatTime(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

interface CRMActivityFeedProps {
  activities: Activity[];
  limit?: number;
}

const CRMActivityFeed = memo(function CRMActivityFeed({
  activities,
  limit = 8,
}: CRMActivityFeedProps) {
  const items = activities.slice(0, limit);
  return (
    <div
      className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800"
      dir="rtl"
    >
      <div className="px-5 py-4 border-b border-gray-100 dark:border-gray-800 flex items-center justify-between">
        <div>
          <h3 className="font-semibold text-gray-800 dark:text-white text-base">
            فید فعالیت‌ها
          </h3>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
            آخرین فعالیت‌های CRM
          </p>
        </div>
        <span className="text-xs bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 px-2 py-0.5 rounded-full font-medium">
          {items.length} فعالیت
        </span>
      </div>
      <div className="p-5">
        <div className="relative">
          {/* vertical line */}
          <div className="absolute left-[19px] top-0 bottom-0 w-px bg-gray-100 dark:bg-gray-800" />
          <div className="space-y-5">
            {items.map((activity, idx) => {
              const cfg = activityConfig[activity.type];
              return (
                <div key={activity.id} className="relative flex gap-4">
                  {/* icon dot */}
                  <div
                    className={cn(
                      "relative z-10 flex items-center justify-center w-10 h-10 rounded-full shrink-0",
                      cfg.bg,
                    )}
                  >
                    <Icon
                      icon={cfg.icon}
                      width={17}
                      style={{ color: cfg.color }}
                    />
                    {activity.completed && (
                      <div className="absolute -bottom-0.5 -right-0.5 w-4 h-4 bg-emerald-500 rounded-full flex items-center justify-center">
                        <Icon
                          icon="solar:check-bold"
                          width={9}
                          className="text-white"
                        />
                      </div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0 pt-1">
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0">
                        <p className="text-sm font-medium text-gray-800 dark:text-white truncate">
                          {activity.title}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5 line-clamp-2">
                          {activity.description}
                        </p>
                        <div className="flex items-center gap-2 mt-1.5">
                          <span className="text-xs text-gray-400 dark:text-gray-500">
                            {activity.owner}
                          </span>
                          <span className="text-gray-300 dark:text-gray-600">
                            ·
                          </span>
                          <span className="text-xs text-blue-500 dark:text-blue-400 truncate">
                            {activity.relatedTo}
                          </span>
                        </div>
                      </div>
                      <div className="shrink-0 text-right">
                        <span className="text-xs text-gray-400 dark:text-gray-500 whitespace-nowrap">
                          {formatTime(activity.timestamp)}
                        </span>
                        <div className="mt-1">
                          <span
                            className={cn(
                              "text-[10px] font-medium px-1.5 py-0.5 rounded-full",
                              activity.completed
                                ? "bg-emerald-50 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400"
                                : "bg-amber-50 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400",
                            )}
                          >
                            {activity.completed ? "انجام شد" : "در انتظار"}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
});

export default CRMActivityFeed;
