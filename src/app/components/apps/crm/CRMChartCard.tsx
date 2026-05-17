"use client";

import { memo, ReactNode } from "react";

interface CRMChartCardProps {
  title: string;
  subtitle?: string;
  children: ReactNode;
  action?: ReactNode;
  height?: string;
}

const CRMChartCard = memo(function CRMChartCard({
  title,
  subtitle,
  children,
  action,
  height = "h-72",
}: CRMChartCardProps) {
  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800 p-5">
      <div className="flex items-start justify-between mb-4 gap-2">
        <div>
          <h3 className="font-semibold text-gray-800 dark:text-white text-base">
            {title}
          </h3>
          {subtitle && (
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
              {subtitle}
            </p>
          )}
        </div>
        {action && <div className="shrink-0">{action}</div>}
      </div>
      <div className={height}>{children}</div>
    </div>
  );
});

export default CRMChartCard;
