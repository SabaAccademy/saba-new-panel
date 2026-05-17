import type { Metadata } from "next";
import { SetBreadcrumb } from "@/app/(DashboardLayout)/layout/shared/breadcrumb/BreadcrumbContext";
import CRMDashboard from "@/app/components/apps/crm/CRMDashboard";

export const metadata: Metadata = { title: "داشبورد CRM" };

const Page = () => (
  <>
    <SetBreadcrumb
      title="داشبورد CRM"
      items={[
        { to: "/", title: "خانه" },
        { title: "CRM" },
        { title: "داشبورد" },
      ]}
    />
    <CRMDashboard />
  </>
);

export default Page;
