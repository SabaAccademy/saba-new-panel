import TicketsApp from "@/app/components/apps/tickets";
import { SetBreadcrumb } from "@/app/(DashboardLayout)/layout/shared/breadcrumb/BreadcrumbContext";
import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Ticket App",
};

const Tickets = () => {
  return (
    <>
      <SetBreadcrumb
        title="تیکت‌ها"
        items={[{ to: "/", title: "خانه" }, { title: "تیکت‌ها" }]}
      />
      <TicketsApp />
    </>
  );
};

export default Tickets;
