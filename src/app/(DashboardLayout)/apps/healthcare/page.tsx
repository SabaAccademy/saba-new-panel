import type { Metadata } from "next";
import { SetBreadcrumb } from "@/app/(DashboardLayout)/layout/shared/breadcrumb/BreadcrumbContext";
import HealthcareDashboard from "@/app/components/apps/healthcare/HealthcareDashboard";

export const metadata: Metadata = { title: "داشبورد سلامت" };

const Page = () => (
  <>
    <SetBreadcrumb
      title="داشبورد سلامت"
      items={[{ to: "/", title: "خانه" }, { title: "داشبورد سلامت" }]}
    />
    <HealthcareDashboard />
  </>
);

export default Page;
