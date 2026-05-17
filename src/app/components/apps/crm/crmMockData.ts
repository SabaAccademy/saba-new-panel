// ─── CRM Mock Data ─────────────────────────────────────────────────────────────

export type LeadStatus = "new" | "contacted" | "qualified" | "lost";
export type DealStage =
  | "prospect"
  | "proposal"
  | "negotiation"
  | "closed_won"
  | "closed_lost";
export type ActivityType = "call" | "email" | "meeting" | "note" | "task";

export interface Lead {
  id: string;
  name: string;
  email: string;
  company: string;
  source: "organic" | "referral" | "ads" | "social" | "cold_outreach";
  status: LeadStatus;
  value: number;
  assignedTo: string;
  createdAt: string;
  phone: string;
}

export interface Customer {
  id: string;
  name: string;
  email: string;
  company: string;
  industry: string;
  totalRevenue: number;
  deals: number;
  status: "active" | "inactive" | "at_risk";
  joinedAt: string;
  avatar: string;
}

export interface Deal {
  id: string;
  name: string;
  company: string;
  value: number;
  stage: DealStage;
  owner: string;
  probability: number;
  closeDate: string;
  createdAt: string;
}

export interface Activity {
  id: string;
  type: ActivityType;
  title: string;
  description: string;
  relatedTo: string;
  relatedType: "lead" | "deal" | "customer";
  owner: string;
  timestamp: string;
  completed: boolean;
}

export interface KPIData {
  totalLeads: number;
  leadsGrowth: number;
  conversionRate: number;
  conversionGrowth: number;
  activeDeals: number;
  dealsGrowth: number;
  revenue: number;
  revenueGrowth: number;
}

// ─── KPIs ──────────────────────────────────────────────────────────────────────
export const kpiData: KPIData = {
  totalLeads: 1284,
  leadsGrowth: 14.5,
  conversionRate: 24.8,
  conversionGrowth: 3.2,
  activeDeals: 87,
  dealsGrowth: 8.1,
  revenue: 2840000,
  revenueGrowth: 22.3,
};

// ─── Leads ────────────────────────────────────────────────────────────────────
export const leadsData: Lead[] = [
  {
    id: "L001",
    name: "Ali Ahmadi",
    email: "ali.ahmadi@techcorp.ir",
    company: "TechCorp Iran",
    source: "referral",
    status: "qualified",
    value: 45000,
    assignedTo: "Sara Hosseini",
    createdAt: "2026-04-28",
    phone: "+98 912 111 2233",
  },
  {
    id: "L002",
    name: "Mina Karimi",
    email: "mina.k@startup.io",
    company: "StartupIO",
    source: "organic",
    status: "contacted",
    value: 12000,
    assignedTo: "Reza Mohammadi",
    createdAt: "2026-04-25",
    phone: "+98 911 222 3344",
  },
  {
    id: "L003",
    name: "Dariush Tehrani",
    email: "d.tehrani@bigco.com",
    company: "Big Co",
    source: "ads",
    status: "new",
    value: 78000,
    assignedTo: "Sara Hosseini",
    createdAt: "2026-04-22",
    phone: "+98 935 333 4455",
  },
  {
    id: "L004",
    name: "Farideh Mousavi",
    email: "fmousavi@enterprise.net",
    company: "Enterprise Net",
    source: "cold_outreach",
    status: "lost",
    value: 23000,
    assignedTo: "Kamran Jafari",
    createdAt: "2026-04-18",
    phone: "+98 901 444 5566",
  },
  {
    id: "L005",
    name: "Bahram Rezaei",
    email: "bahram@innovate.ir",
    company: "Innovate IR",
    source: "social",
    status: "qualified",
    value: 61000,
    assignedTo: "Reza Mohammadi",
    createdAt: "2026-04-15",
    phone: "+98 910 555 6677",
  },
  {
    id: "L006",
    name: "Nasrin Sadeghi",
    email: "nasrin.s@solutions.co",
    company: "Solutions Co",
    source: "referral",
    status: "contacted",
    value: 34000,
    assignedTo: "Kamran Jafari",
    createdAt: "2026-04-12",
    phone: "+98 914 666 7788",
  },
  {
    id: "L007",
    name: "Hamed Golestan",
    email: "hamed.g@nextgen.io",
    company: "NextGen",
    source: "ads",
    status: "new",
    value: 19000,
    assignedTo: "Sara Hosseini",
    createdAt: "2026-04-10",
    phone: "+98 919 777 8899",
  },
  {
    id: "L008",
    name: "Leila Rahmani",
    email: "leila.r@cloudbase.ir",
    company: "CloudBase",
    source: "organic",
    status: "qualified",
    value: 92000,
    assignedTo: "Reza Mohammadi",
    createdAt: "2026-04-07",
    phone: "+98 912 888 9900",
  },
];

// ─── Customers ────────────────────────────────────────────────────────────────
export const customersData: Customer[] = [
  {
    id: "C001",
    name: "Parisa Ebrahimi",
    email: "parisa@digitalpro.ir",
    company: "Digital Pro",
    industry: "Technology",
    totalRevenue: 245000,
    deals: 7,
    status: "active",
    joinedAt: "2024-03-15",
    avatar: "PE",
  },
  {
    id: "C002",
    name: "Majid Yousefi",
    email: "m.yousefi@retail.com",
    company: "Retail Plus",
    industry: "Retail",
    totalRevenue: 180000,
    deals: 4,
    status: "active",
    joinedAt: "2024-06-20",
    avatar: "MY",
  },
  {
    id: "C003",
    name: "Shirin Moradi",
    email: "shirin.m@healthtech.io",
    company: "HealthTech",
    industry: "Healthcare",
    totalRevenue: 320000,
    deals: 9,
    status: "active",
    joinedAt: "2023-11-08",
    avatar: "SM",
  },
  {
    id: "C004",
    name: "Farhad Nouri",
    email: "farhad.n@consult.ir",
    company: "Consult Plus",
    industry: "Consulting",
    totalRevenue: 95000,
    deals: 3,
    status: "at_risk",
    joinedAt: "2025-01-14",
    avatar: "FN",
  },
  {
    id: "C005",
    name: "Zohreh Ahmari",
    email: "z.ahmari@logistica.net",
    company: "Logistica",
    industry: "Logistics",
    totalRevenue: 412000,
    deals: 11,
    status: "active",
    joinedAt: "2023-07-22",
    avatar: "ZA",
  },
  {
    id: "C006",
    name: "Kourosh Salehi",
    email: "k.salehi@finance.ir",
    company: "Finance Co",
    industry: "Finance",
    totalRevenue: 67000,
    deals: 2,
    status: "inactive",
    joinedAt: "2025-04-03",
    avatar: "KS",
  },
];

// ─── Deals ────────────────────────────────────────────────────────────────────
export const dealsData: Deal[] = [
  {
    id: "D001",
    name: "Enterprise Software License",
    company: "Digital Pro",
    value: 85000,
    stage: "negotiation",
    owner: "Sara Hosseini",
    probability: 75,
    closeDate: "2026-05-30",
    createdAt: "2026-03-10",
  },
  {
    id: "D002",
    name: "Cloud Migration Project",
    company: "HealthTech",
    value: 140000,
    stage: "proposal",
    owner: "Reza Mohammadi",
    probability: 55,
    closeDate: "2026-06-15",
    createdAt: "2026-03-18",
  },
  {
    id: "D003",
    name: "Marketing Automation Suite",
    company: "Retail Plus",
    value: 32000,
    stage: "closed_won",
    owner: "Kamran Jafari",
    probability: 100,
    closeDate: "2026-04-20",
    createdAt: "2026-02-14",
  },
  {
    id: "D004",
    name: "Data Analytics Platform",
    company: "Logistica",
    value: 210000,
    stage: "prospect",
    owner: "Sara Hosseini",
    probability: 25,
    closeDate: "2026-07-01",
    createdAt: "2026-04-01",
  },
  {
    id: "D005",
    name: "CRM Implementation",
    company: "Finance Co",
    value: 55000,
    stage: "negotiation",
    owner: "Reza Mohammadi",
    probability: 80,
    closeDate: "2026-05-15",
    createdAt: "2026-03-25",
  },
  {
    id: "D006",
    name: "Security Audit Package",
    company: "Consult Plus",
    value: 28000,
    stage: "closed_lost",
    owner: "Kamran Jafari",
    probability: 0,
    closeDate: "2026-04-10",
    createdAt: "2026-02-28",
  },
  {
    id: "D007",
    name: "SaaS Annual Subscription",
    company: "TechCorp Iran",
    value: 47000,
    stage: "proposal",
    owner: "Sara Hosseini",
    probability: 60,
    closeDate: "2026-06-01",
    createdAt: "2026-04-05",
  },
  {
    id: "D008",
    name: "DevOps Consulting",
    company: "NextGen",
    value: 19000,
    stage: "prospect",
    owner: "Reza Mohammadi",
    probability: 30,
    closeDate: "2026-07-20",
    createdAt: "2026-04-15",
  },
];

// ─── Activities ───────────────────────────────────────────────────────────────
export const activitiesData: Activity[] = [
  {
    id: "A001",
    type: "call",
    title: "Discovery Call",
    description:
      "Initial discovery call with Ali Ahmadi to understand requirements.",
    relatedTo: "Ali Ahmadi",
    relatedType: "lead",
    owner: "Sara Hosseini",
    timestamp: "2026-05-04T09:30:00",
    completed: true,
  },
  {
    id: "A002",
    type: "email",
    title: "Proposal Sent",
    description:
      "Sent detailed proposal for Cloud Migration Project to HealthTech.",
    relatedTo: "Cloud Migration Project",
    relatedType: "deal",
    owner: "Reza Mohammadi",
    timestamp: "2026-05-04T10:15:00",
    completed: true,
  },
  {
    id: "A003",
    type: "meeting",
    title: "Negotiation Meeting",
    description:
      "In-person meeting at Digital Pro HQ to discuss contract terms.",
    relatedTo: "Enterprise Software License",
    relatedType: "deal",
    owner: "Sara Hosseini",
    timestamp: "2026-05-03T14:00:00",
    completed: true,
  },
  {
    id: "A004",
    type: "note",
    title: "Customer Concern Logged",
    description:
      "Parisa mentioned budget constraints for Q3. Follow up in 2 weeks.",
    relatedTo: "Parisa Ebrahimi",
    relatedType: "customer",
    owner: "Sara Hosseini",
    timestamp: "2026-05-03T16:45:00",
    completed: true,
  },
  {
    id: "A005",
    type: "task",
    title: "Prepare Demo Environment",
    description:
      "Set up demo environment for Data Analytics Platform presentation.",
    relatedTo: "Data Analytics Platform",
    relatedType: "deal",
    owner: "Reza Mohammadi",
    timestamp: "2026-05-02T11:00:00",
    completed: false,
  },
  {
    id: "A006",
    type: "call",
    title: "Follow-up Call",
    description:
      "Follow up with Mina Karimi regarding StartupIO integration needs.",
    relatedTo: "Mina Karimi",
    relatedType: "lead",
    owner: "Kamran Jafari",
    timestamp: "2026-05-02T15:30:00",
    completed: true,
  },
  {
    id: "A007",
    type: "email",
    title: "Contract Draft",
    description:
      "Sent contract draft for CRM Implementation to Finance Co legal team.",
    relatedTo: "CRM Implementation",
    relatedType: "deal",
    owner: "Reza Mohammadi",
    timestamp: "2026-05-01T09:00:00",
    completed: true,
  },
  {
    id: "A008",
    type: "meeting",
    title: "Quarterly Review",
    description: "Quarterly business review with Logistica management team.",
    relatedTo: "Zohreh Ahmari",
    relatedType: "customer",
    owner: "Sara Hosseini",
    timestamp: "2026-04-30T13:00:00",
    completed: true,
  },
];

// ─── Chart Series Data ─────────────────────────────────────────────────────────
export const leadsOverTimeData = {
  categories: ["Nov", "Dec", "Jan", "Feb", "Mar", "Apr", "May"],
  series: [
    { name: "New Leads", data: [142, 168, 195, 210, 248, 285, 312] },
    { name: "Qualified", data: [48, 62, 71, 84, 96, 112, 128] },
    { name: "Converted", data: [22, 31, 38, 42, 51, 61, 78] },
  ],
};

export const dealPipelineData = {
  categories: ["Prospect", "Proposal", "Negotiation", "Closed Won"],
  series: [{ name: "Deal Value ($)", data: [410000, 279000, 195000, 87000] }],
};

export const conversionFunnelData = {
  categories: ["Leads", "Contacted", "Qualified", "Proposal", "Closed"],
  values: [1284, 842, 412, 198, 87],
};
