import type { Metadata } from "next";
import { SetBreadcrumb } from "@/app/(DashboardLayout)/layout/shared/breadcrumb/BreadcrumbContext";
import MarketingDashboard from "@/app/components/apps/marketing/MarketingDashboard";

export const metadata: Metadata = { title: "داشبورد بازاریابی" };

const Page = () => (
  <>
    <SetBreadcrumb
      title="داشبورد بازاریابی"
      items={[{ to: "/", title: "خانه" }, { title: "داشبورد بازاریابی" }]}
    />
    <MarketingDashboard />
  </>
);

export default Page;
