import type { Metadata } from "next";
import { SetBreadcrumb } from "@/app/(DashboardLayout)/layout/shared/breadcrumb/BreadcrumbContext";
import RealEstateDashboard from "@/app/components/apps/real-estate/RealEstateDashboard";

export const metadata: Metadata = { title: "داشبورد املاک" };

const Page = () => (
  <>
    <SetBreadcrumb
      title="داشبورد املاک"
      items={[{ to: "/", title: "خانه" }, { title: "داشبورد املاک" }]}
    />
    <RealEstateDashboard />
  </>
);

export default Page;
