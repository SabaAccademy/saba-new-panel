import ProductForm from "@/app/components/apps/products/ProductForm";
import { SetBreadcrumb } from "@/app/(DashboardLayout)/layout/shared/breadcrumb/BreadcrumbContext";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "افزودن محصول جدید",
};

export default function CreateProductPage() {
  return (
    <>
      <SetBreadcrumb
        title="افزودن محصول"
        items={[
          { to: "/", title: "خانه" },
          { to: "/apps/products", title: "محصولات" },
          { title: "افزودن محصول" },
        ]}
      />
      <ProductForm />
    </>
  );
}
