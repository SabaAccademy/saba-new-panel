"use client";

import { memo } from "react";
import { Icon } from "@iconify/react/dist/iconify.js";
import { cn } from "@/lib/utils";

interface CRMStatCardProps {
  title: string;
  value: string;
  growth: number;
  icon: string;
  iconColor: string;
  iconBg: string;
  prefix?: string;
  suffix?: string;
}

const CRMStatCard = memo(function CRMStatCard({
  title,
  value,
  growth,
  icon,
  iconColor,
  iconBg,
  prefix = "",
  suffix = "",
}: CRMStatCardProps) {
  const positive = growth >= 0;
  return (
    <div
      className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800 p-5 flex items-start gap-4 hover:shadow-md transition-shadow"
      dir="rtl"
    >
      <div
        className={cn(
          "flex items-center justify-center w-12 h-12 rounded-xl shrink-0",
          iconBg,
        )}
      >
        <Icon icon={icon} width={24} style={{ color: iconColor }} />
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-sm text-gray-500 dark:text-gray-400 truncate">
          {title}
        </p>
        <p className="text-2xl font-bold text-gray-800 dark:text-white mt-0.5">
          {prefix}
          {value}
          {suffix}
        </p>
        <div className="flex items-center gap-1 mt-1">
          <Icon
            icon={positive ? "solar:arrow-up-bold" : "solar:arrow-down-bold"}
            width={14}
            className={positive ? "text-emerald-500" : "text-red-500"}
          />
          <span
            className={cn(
              "text-xs font-semibold",
              positive ? "text-emerald-600" : "text-red-500",
            )}
          >
            {positive ? "+" : ""}
            {growth}٪
          </span>
          <span className="text-xs text-gray-400">نسبت به ماه گذشته</span>
        </div>
      </div>
    </div>
  );
});

export default CRMStatCard;
