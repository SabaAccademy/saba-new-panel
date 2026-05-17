import KanbanBoard from "@/app/components/apps/kanban/KanbanBoard";
import { SetBreadcrumb } from "@/app/(DashboardLayout)/layout/shared/breadcrumb/BreadcrumbContext";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "کانبان",
};

const KanbanPage = () => {
  return (
    <>
      <SetBreadcrumb
        title="کانبان"
        items={[{ to: "/", title: "خانه" }, { title: "کانبان" }]}
      />
      <KanbanBoard />
    </>
  );
};

export default KanbanPage;
