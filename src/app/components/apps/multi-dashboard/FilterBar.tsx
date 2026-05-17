"use client";

import { Icon } from "@iconify/react/dist/iconify.js";
import { Button } from "@/components/ui/button";
import type { DashboardType, DateRange } from "./types";
import { allDomainConfigs } from "./mockData";

interface FilterBarProps {
  activeType: DashboardType;
  onTypeChange: (type: DashboardType) => void;
  activeRange: DateRange;
  onRangeChange: (range: DateRange) => void;
}

const domainOrder: DashboardType[] = [
  "realEstate",
  "healthcare",
  "insurance",
  "marketing",
  "marketplace",
];

const dateRanges: { value: DateRange; label: string }[] = [
  { value: "today", label: "امروز" },
  { value: "week", label: "هفته" },
  { value: "month", label: "ماه" },
];

const FilterBar = ({
  activeType,
  onTypeChange,
  activeRange,
  onRangeChange,
}: FilterBarProps) => {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
      {/* Domain Tabs */}
      <div className="flex flex-wrap gap-2">
        {domainOrder.map((type) => {
          const config = allDomainConfigs[type];
          const isActive = type === activeType;
          return (
            <button
              key={type}
              onClick={() => onTypeChange(type)}
              className={[
                "flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 border",
                isActive
                  ? "bg-primary text-white border-primary shadow-md shadow-primary/25"
                  : "bg-card text-muted-foreground border-border hover:bg-primary/5 hover:text-primary hover:border-primary/30",
              ].join(" ")}
            >
              <Icon icon={config.icon} width={16} />
              {config.label}
            </button>
          );
        })}
      </div>

      {/* Date Range */}
      <div className="flex items-center rounded-lg border border-border overflow-hidden bg-card">
        {dateRanges.map((range) => (
          <Button
            key={range.value}
            variant="ghost"
            size="sm"
            onClick={() => onRangeChange(range.value)}
            className={[
              "rounded-none text-xs font-medium px-3 h-8 transition-all",
              activeRange === range.value
                ? "bg-primary/10 text-primary"
                : "text-muted-foreground hover:text-primary",
            ].join(" ")}
          >
            {range.label}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default FilterBar;
