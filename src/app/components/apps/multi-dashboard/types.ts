export type DashboardType =
  | "realEstate"
  | "healthcare"
  | "insurance"
  | "marketing"
  | "marketplace";

export type DateRange = "today" | "week" | "month";

export type ChangeType = "up" | "down" | "neutral";

export interface StatCardData {
  id: string;
  label: string;
  value: string;
  change: string;
  changeType: ChangeType;
  icon: string;
  iconBg: string;
  iconColor: string;
}

export interface ActivityItem {
  id: string;
  title: string;
  subtitle: string;
  time: string;
  icon: string;
  iconBg: string;
  iconColor: string;
}

// Real Estate
export interface RealEstateRow {
  id: string;
  title: string;
  location: string;
  price: string;
  type: string;
  status: string;
  agent: string;
}

// Healthcare
export interface HealthcareRow {
  id: string;
  patientName: string;
  doctor: string;
  department: string;
  date: string;
  status: string;
  fee: string;
}

// Insurance
export interface InsuranceRow {
  id: string;
  claimId: string;
  policyHolder: string;
  type: string;
  amount: string;
  date: string;
  status: string;
}

// Marketing
export interface MarketingRow {
  id: string;
  campaign: string;
  platform: string;
  impressions: string;
  clicks: string;
  ctr: string;
  cost: string;
  roi: string;
}

// Marketplace
export interface MarketplaceRow {
  id: string;
  orderId: string;
  customer: string;
  seller: string;
  product: string;
  amount: string;
  date: string;
  status: string;
}

export interface ChartSeries {
  name: string;
  data: number[];
}

export interface DomainCharts {
  primary: {
    title: string;
    type: "line" | "bar" | "area" | "pie" | "donut";
    categories: string[];
    series: ChartSeries[] | number[];
    labels?: string[];
  };
  secondary: {
    title: string;
    type: "line" | "bar" | "area" | "pie" | "donut";
    categories: string[];
    series: ChartSeries[] | number[];
    labels?: string[];
  };
}

export interface DomainConfig<T> {
  type: DashboardType;
  label: string;
  icon: string;
  stats: StatCardData[];
  charts: DomainCharts;
  tableData: T[];
  activityFeed: ActivityItem[];
}
