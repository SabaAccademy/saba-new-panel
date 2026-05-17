import type { Metadata } from "next";
import { SetBreadcrumb } from "@/app/(DashboardLayout)/layout/shared/breadcrumb/BreadcrumbContext";
import MarketplaceDashboard from "@/app/components/apps/marketplace/MarketplaceDashboard";

export const metadata: Metadata = { title: "داشبورد فروشگاه" };

const Page = () => (
  <>
    <SetBreadcrumb
      title="داشبورد فروشگاه"
      items={[{ to: "/", title: "خانه" }, { title: "داشبورد فروشگاه" }]}
    />
    <MarketplaceDashboard />
  </>
);

export default Page;
