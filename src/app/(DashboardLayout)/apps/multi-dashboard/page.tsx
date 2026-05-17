import type { Metadata } from "next";
import { SetBreadcrumb } from "@/app/(DashboardLayout)/layout/shared/breadcrumb/BreadcrumbContext";
import MultiDashboard from "@/app/components/apps/multi-dashboard/MultiDashboard";

export const metadata: Metadata = {
  title: "داشبورد چندگانه",
};

const MultiDashboardPage = () => {
  return (
    <>
      <SetBreadcrumb
        title="داشبورد چندگانه"
        items={[{ to: "/", title: "خانه" }, { title: "داشبورد چندگانه" }]}
      />
      <MultiDashboard />
    </>
  );
};

export default MultiDashboardPage;
