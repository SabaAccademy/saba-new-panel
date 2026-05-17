"use client";

import React, { useState } from "react";
import dynamic from "next/dynamic";
import CardBox from "../shared/CardBox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ApexOptions } from "apexcharts";
import { useLocale } from "@/lib/i18n/context";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

const seriesData: Record<string, number[][]> = {
  year2025: [
    [1500, 2700, 2200, 3000, 1500, 1000, 1400, 2400, 1900, 2300, 1400, 1100],
    [
      -1800, -1100, -2500, -1500, -600, -1800, -1200, -2300, -1900, -2300,
      -1200, -2500,
    ],
  ],
  year2024: [
    [2000, 2500, 2800, 3000, 2000, 1500, 2300, 1500, 1000, 1400, 2400, 1900],
    [
      -1200, -1500, -2000, -1000, -800, -1300, -1500, -600, -1800, -1200, -2300,
      -1900,
    ],
  ],
  year2023: [
    [1800, 2200, 2600, 3000, 1700, 1200, 2000, 2500, 2800, 1800, 2000, 1500],
    [
      -1500, -1300, -2200, -1200, -700, -1600, -1200, -1500, -2000, -1000, -800,
      -1300,
    ],
  ],
};

const baseChartOptions: ApexOptions = {
  chart: {
    toolbar: { show: false },
    type: "bar",
    fontFamily: "inherit",
    foreColor: "#7C8FAC",
    height: 310,
    stacked: true,
    width: "100%",
    offsetX: -20,
  },
  colors: ["var(--color-primary)", "var(--color-secondary)"],
  plotOptions: {
    bar: {
      horizontal: false,
      barHeight: "60%",
      columnWidth: "20%",
      borderRadius: 6,
      borderRadiusApplication: "end",
      borderRadiusWhenStacked: "all",
    },
  },
  dataLabels: { enabled: false },
  legend: { show: false },
  grid: { borderColor: "rgba(0,0,0,0.1)", strokeDashArray: 3 },
  yaxis: {
    min: -3000,
    max: 3000,
    tickAmount: 6,
    labels: { formatter: (val) => `${val / 1000}k` },
  },
  tooltip: {
    theme: "dark",
    y: { formatter: (val) => `${val}k` },
  },
};

const SalesOverview: React.FC = () => {
  const [selectedKey, setSelectedKey] = useState<string>("year2025");
  const { t } = useLocale();

  const yearOptions: { key: string; label: string }[] = [
    { key: "year2025", label: t.dashboard.year2025 },
    { key: "year2024", label: t.dashboard.year2024 },
    { key: "year2023", label: t.dashboard.year2023 },
  ];

  const currentSeries: ApexAxisChartSeries = [
    { name: t.dashboard.earnings, data: seriesData[selectedKey][0] },
    { name: t.dashboard.expense, data: seriesData[selectedKey][1] },
  ];

  const ChartData: ApexOptions = {
    ...baseChartOptions,
    xaxis: {
      categories: t.dashboard.months,
      axisBorder: { show: false },
      axisTicks: { show: false },
    },
  };

  return (
    <CardBox className="pb-0 h-full w-full">
      <div className="sm:flex items-center justify-between mb-6">
        <div>
          <h5 className="card-title">{t.dashboard.salesOverview}</h5>
          <p className="text-sm text-muted-foreground font-normal">
            {t.dashboard.overviewProduct}
          </p>
        </div>
        <div className="sm:mt-0 mt-4">
          <Select
            value={selectedKey}
            onValueChange={(val) => setSelectedKey(val)}
          >
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder={t.dashboard.year2025} />
            </SelectTrigger>
            <SelectContent>
              {yearOptions.map(({ key, label }) => (
                <SelectItem key={key} value={key}>
                  {label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <Chart
        options={ChartData}
        series={currentSeries}
        type="bar"
        height={316}
        width="100%"
      />
    </CardBox>
  );
};

export default SalesOverview;
