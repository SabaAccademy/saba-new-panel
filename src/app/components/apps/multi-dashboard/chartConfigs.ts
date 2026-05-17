import { ApexOptions } from "apexcharts";

const baseOptions: ApexOptions = {
  chart: {
    toolbar: { show: false },
    fontFamily: "inherit",
    foreColor: "#7C8FAC",
    animations: { enabled: true, speed: 400 },
  },
  dataLabels: { enabled: false },
  grid: { borderColor: "rgba(0,0,0,0.07)", strokeDashArray: 4 },
  tooltip: { theme: "dark" },
};

export function getLineChartOptions(categories: string[]): ApexOptions {
  return {
    ...baseOptions,
    chart: { ...baseOptions.chart, type: "line" },
    stroke: { curve: "smooth", width: 2.5 },
    xaxis: { categories, labels: { style: { fontSize: "12px" } } },
    legend: { position: "top", horizontalAlign: "right" },
    colors: ["var(--color-primary)", "var(--color-secondary)"],
  };
}

export function getAreaChartOptions(categories: string[]): ApexOptions {
  return {
    ...baseOptions,
    chart: { ...baseOptions.chart, type: "area" },
    stroke: { curve: "smooth", width: 2.5 },
    fill: {
      type: "gradient",
      gradient: { opacityFrom: 0.35, opacityTo: 0.05 },
    },
    xaxis: { categories, labels: { style: { fontSize: "12px" } } },
    legend: { position: "top", horizontalAlign: "right" },
    colors: ["var(--color-primary)", "var(--color-secondary)"],
  };
}

export function getBarChartOptions(categories: string[]): ApexOptions {
  return {
    ...baseOptions,
    chart: { ...baseOptions.chart, type: "bar" },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "45%",
        borderRadius: 4,
        borderRadiusApplication: "end",
      },
    },
    xaxis: { categories, labels: { style: { fontSize: "12px" } } },
    legend: { position: "top", horizontalAlign: "right" },
    colors: [
      "var(--color-primary)",
      "var(--color-secondary)",
      "var(--color-warning)",
    ],
  };
}

export function getPieOrDonutOptions(
  labels: string[],
  type: "pie" | "donut",
): ApexOptions {
  return {
    ...baseOptions,
    chart: { ...baseOptions.chart, type },
    labels,
    legend: { position: "bottom" },
    plotOptions: {
      pie: {
        donut: { size: "65%" },
      },
    },
    colors: [
      "var(--color-primary)",
      "var(--color-secondary)",
      "var(--color-success)",
      "var(--color-warning)",
      "var(--color-error)",
    ],
  };
}

export function buildChartOptions(
  type: "line" | "bar" | "area" | "pie" | "donut",
  categories: string[],
  labels?: string[],
): ApexOptions {
  if (type === "pie" || type === "donut") {
    return getPieOrDonutOptions(labels ?? categories, type);
  }
  if (type === "bar") return getBarChartOptions(categories);
  if (type === "area") return getAreaChartOptions(categories);
  return getLineChartOptions(categories);
}
