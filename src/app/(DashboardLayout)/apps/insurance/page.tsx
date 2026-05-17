import type { Metadata } from "next";
import { SetBreadcrumb } from "@/app/(DashboardLayout)/layout/shared/breadcrumb/BreadcrumbContext";
import InsuranceDashboard from "@/app/components/apps/insurance/InsuranceDashboard";

export const metadata: Metadata = { title: "داشبورد بیمه" };

const Page = () => (
  <>
    <SetBreadcrumb
      title="داشبورد بیمه"
      items={[{ to: "/", title: "خانه" }, { title: "داشبورد بیمه" }]}
    />
    <InsuranceDashboard />
  </>
);

export default Page;
