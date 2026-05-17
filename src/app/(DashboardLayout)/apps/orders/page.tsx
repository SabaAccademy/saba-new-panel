import OrdersTable from "@/app/components/apps/orders/OrdersTable";
import { SetBreadcrumb } from "@/app/(DashboardLayout)/layout/shared/breadcrumb/BreadcrumbContext";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "سفارشات",
};

const OrdersPage = () => {
  return (
    <>
      <SetBreadcrumb
        title="سفارشات"
        items={[{ to: "/", title: "خانه" }, { title: "سفارشات" }]}
      />
      <OrdersTable />
    </>
  );
};

export default OrdersPage;
