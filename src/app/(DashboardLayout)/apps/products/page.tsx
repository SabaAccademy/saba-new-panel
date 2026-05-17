import ProductsTable from "@/app/components/apps/products/ProductsTable";
import { SetBreadcrumb } from "@/app/(DashboardLayout)/layout/shared/breadcrumb/BreadcrumbContext";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "مدیریت محصولات",
};

export default function ProductsPage() {
  return (
    <>
      <SetBreadcrumb
        title="محصولات"
        items={[{ to: "/", title: "خانه" }, { title: "محصولات" }]}
      />
      <ProductsTable />
    </>
  );
}
