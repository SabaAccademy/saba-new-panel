"use client";

import dynamic from "next/dynamic";
import CardBox from "@/app/components/shared/CardBox";
import { Skeleton } from "@/components/ui/skeleton";
import { buildChartOptions } from "./chartConfigs";
import type { ChartSeries } from "./types";
import { ApexOptions } from "apexcharts";

const Chart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
  loading: () => <Skeleton className="w-full h-[260px] rounded-xl" />,
});

interface ChartCardProps {
  title: string;
  type: "line" | "bar" | "area" | "pie" | "donut";
  categories: string[];
  series: ChartSeries[] | number[];
  labels?: string[];
  height?: number;
}

const ChartCard = ({
  title,
  type,
  categories,
  series,
  labels,
  height = 260,
}: ChartCardProps) => {
  const options: ApexOptions = buildChartOptions(type, categories, labels);

  const isPieLike = type === "pie" || type === "donut";
  const chartSeries = isPieLike
    ? (series as number[])
    : (series as ChartSeries[]);

  return (
    <CardBox className="flex flex-col gap-2">
      <h4 className="text-base font-semibold text-foreground">{title}</h4>
      <Chart
        options={options}
        series={chartSeries}
        type={type}
        height={height}
        width="100%"
      />
    </CardBox>
  );
};

export default ChartCard;
