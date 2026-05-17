import CreateTicketForm from "@/app/components/apps/tickets/CreateTicketForm";
import type { Metadata } from "next";
import { SetBreadcrumb } from "@/app/(DashboardLayout)/layout/shared/breadcrumb/BreadcrumbContext";

export const metadata: Metadata = {
  title: "Ticket App",
};

const CreateTickets = () => {
  return (
    <>
      <SetBreadcrumb
        title="ایجاد تیکت"
        items={[
          { to: "/", title: "خانه" },
          { to: "/apps/tickets", title: "تیکت‌ها" },
          { title: "ایجاد تیکت" },
        ]}
      />
      <CreateTicketForm />
    </>
  );
};

export default CreateTickets;
