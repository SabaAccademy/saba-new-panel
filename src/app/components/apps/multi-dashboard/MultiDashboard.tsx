"use client";

import { useState, useTransition } from "react";
import { type ColumnDef } from "@tanstack/react-table";
import { Skeleton } from "@/components/ui/skeleton";
import StatCard from "./StatCard";
import ChartCard from "./ChartCard";
import DomainTable from "./DomainTable";
import ActivityFeed from "./ActivityFeed";
import FilterBar from "./FilterBar";
import { allDomainConfigs } from "./mockData";
import type {
  DashboardType,
  DateRange,
  RealEstateRow,
  HealthcareRow,
  InsuranceRow,
  MarketingRow,
  MarketplaceRow,
} from "./types";
import { Badge } from "@/components/ui/badge";

// ─── Column Definitions ──────────────────────────────────────────────────────

const statusColor: Record<string, string> = {
  // Real estate
  فروش: "bg-primary/10 text-primary",
  اجاره: "bg-info/10 text-info",
  "فروخته شد": "bg-success/10 text-success",
  // Healthcare
  بستری: "bg-warning/10 text-warning",
  سرپایی: "bg-primary/10 text-primary",
  "ترخیص شد": "bg-success/10 text-success",
  پیگیری: "bg-info/10 text-info",
  // Insurance
  "در بررسی": "bg-warning/10 text-warning",
  "تائید شد": "bg-success/10 text-success",
  "پرداخت شد": "bg-primary/10 text-primary",
  "رد شد": "bg-error/10 text-error",
  // Marketplace
  "ارسال شد": "bg-primary/10 text-primary",
  "در انتظار": "bg-warning/10 text-warning",
  "تحویل داده شد": "bg-success/10 text-success",
  "مرجوع شد": "bg-error/10 text-error",
};

function StatusBadge({ status }: { status: string }) {
  return (
    <Badge
      className={[
        "text-xs font-medium rounded-full px-2 py-0.5",
        statusColor[status] ?? "bg-muted text-muted-foreground",
      ].join(" ")}
    >
      {status}
    </Badge>
  );
}

const realEstateColumns: ColumnDef<RealEstateRow, unknown>[] = [
  { accessorKey: "title", header: "عنوان ملک" },
  { accessorKey: "location", header: "موقعیت" },
  { accessorKey: "type", header: "نوع" },
  { accessorKey: "price", header: "قیمت" },
  { accessorKey: "agent", header: "مشاور" },
  {
    accessorKey: "status",
    header: "وضعیت",
    cell: ({ getValue }) => <StatusBadge status={getValue() as string} />,
  },
];

const healthcareColumns: ColumnDef<HealthcareRow, unknown>[] = [
  { accessorKey: "patientName", header: "نام بیمار" },
  { accessorKey: "doctor", header: "پزشک" },
  { accessorKey: "department", header: "بخش" },
  { accessorKey: "date", header: "تاریخ" },
  { accessorKey: "fee", header: "هزینه" },
  {
    accessorKey: "status",
    header: "وضعیت",
    cell: ({ getValue }) => <StatusBadge status={getValue() as string} />,
  },
];

const insuranceColumns: ColumnDef<InsuranceRow, unknown>[] = [
  { accessorKey: "claimId", header: "شناسه خسارت" },
  { accessorKey: "policyHolder", header: "بیمه‌گذار" },
  { accessorKey: "type", header: "نوع بیمه" },
  { accessorKey: "amount", header: "مبلغ" },
  { accessorKey: "date", header: "تاریخ" },
  {
    accessorKey: "status",
    header: "وضعیت",
    cell: ({ getValue }) => <StatusBadge status={getValue() as string} />,
  },
];

const marketingColumns: ColumnDef<MarketingRow, unknown>[] = [
  { accessorKey: "campaign", header: "کمپین" },
  { accessorKey: "platform", header: "پلتفرم" },
  { accessorKey: "impressions", header: "نمایش" },
  { accessorKey: "clicks", header: "کلیک" },
  { accessorKey: "ctr", header: "CTR" },
  { accessorKey: "cost", header: "هزینه" },
  { accessorKey: "roi", header: "ROI" },
];

const marketplaceColumns: ColumnDef<MarketplaceRow, unknown>[] = [
  { accessorKey: "orderId", header: "شناسه سفارش" },
  { accessorKey: "customer", header: "مشتری" },
  { accessorKey: "product", header: "محصول" },
  { accessorKey: "amount", header: "مبلغ" },
  { accessorKey: "date", header: "تاریخ" },
  {
    accessorKey: "status",
    header: "وضعیت",
    cell: ({ getValue }) => <StatusBadge status={getValue() as string} />,
  },
];

const tableLabels: Record<DashboardType, string> = {
  realEstate: "ملک‌های اخیر",
  healthcare: "بیماران اخیر",
  insurance: "خسارت‌های اخیر",
  marketing: "کمپین‌های فعال",
  marketplace: "سفارشات اخیر",
};

// ─── Component ───────────────────────────────────────────────────────────────

const MultiDashboard = () => {
  const [activeType, setActiveType] = useState<DashboardType>("realEstate");
  const [activeRange, setActiveRange] = useState<DateRange>("month");
  const [isPending, startTransition] = useTransition();

  const handleTypeChange = (type: DashboardType) => {
    startTransition(() => setActiveType(type));
  };

  const config = allDomainConfigs[activeType];

  return (
    <div className="flex flex-col gap-6">
      <FilterBar
        activeType={activeType}
        onTypeChange={handleTypeChange}
        activeRange={activeRange}
        onRangeChange={setActiveRange}
      />

      {isPending ? (
        <DashboardSkeleton />
      ) : (
        <>
          {/* Stats Row */}
          <div className="grid grid-cols-12 gap-4">
            {config.stats.map((stat) => (
              <div
                key={stat.id}
                className="col-span-12 sm:col-span-6 xl:col-span-3"
              >
                <StatCard data={stat} />
              </div>
            ))}
          </div>

          {/* Charts Row */}
          <div className="grid grid-cols-12 gap-4">
            <div className="col-span-12 lg:col-span-8">
              <ChartCard
                title={config.charts.primary.title}
                type={config.charts.primary.type}
                categories={config.charts.primary.categories}
                series={config.charts.primary.series}
                labels={config.charts.primary.labels}
              />
            </div>
            <div className="col-span-12 lg:col-span-4">
              <ChartCard
                title={config.charts.secondary.title}
                type={config.charts.secondary.type}
                categories={config.charts.secondary.categories}
                series={config.charts.secondary.series}
                labels={config.charts.secondary.labels}
                height={260}
              />
            </div>
          </div>

          {/* Table + Activity Row */}
          <div className="grid grid-cols-12 gap-4">
            <div className="col-span-12 lg:col-span-8">
              {activeType === "realEstate" && (
                <DomainTable<RealEstateRow>
                  title={tableLabels.realEstate}
                  columns={realEstateColumns}
                  data={allDomainConfigs.realEstate.tableData}
                />
              )}
              {activeType === "healthcare" && (
                <DomainTable<HealthcareRow>
                  title={tableLabels.healthcare}
                  columns={healthcareColumns}
                  data={allDomainConfigs.healthcare.tableData}
                />
              )}
              {activeType === "insurance" && (
                <DomainTable<InsuranceRow>
                  title={tableLabels.insurance}
                  columns={insuranceColumns}
                  data={allDomainConfigs.insurance.tableData}
                />
              )}
              {activeType === "marketing" && (
                <DomainTable<MarketingRow>
                  title={tableLabels.marketing}
                  columns={marketingColumns}
                  data={allDomainConfigs.marketing.tableData}
                />
              )}
              {activeType === "marketplace" && (
                <DomainTable<MarketplaceRow>
                  title={tableLabels.marketplace}
                  columns={marketplaceColumns}
                  data={allDomainConfigs.marketplace.tableData}
                />
              )}
            </div>

            <div className="col-span-12 lg:col-span-4">
              <ActivityFeed items={config.activityFeed} />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

// ─── Skeleton ─────────────────────────────────────────────────────────────────

function DashboardSkeleton() {
  return (
    <div className="flex flex-col gap-6 animate-pulse">
      <div className="grid grid-cols-12 gap-4">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="col-span-12 sm:col-span-6 xl:col-span-3">
            <Skeleton className="h-24 rounded-xl" />
          </div>
        ))}
      </div>
      <div className="grid grid-cols-12 gap-4">
        <div className="col-span-12 lg:col-span-8">
          <Skeleton className="h-72 rounded-xl" />
        </div>
        <div className="col-span-12 lg:col-span-4">
          <Skeleton className="h-72 rounded-xl" />
        </div>
      </div>
      <div className="grid grid-cols-12 gap-4">
        <div className="col-span-12 lg:col-span-8">
          <Skeleton className="h-64 rounded-xl" />
        </div>
        <div className="col-span-12 lg:col-span-4">
          <Skeleton className="h-64 rounded-xl" />
        </div>
      </div>
    </div>
  );
}

export default MultiDashboard;
