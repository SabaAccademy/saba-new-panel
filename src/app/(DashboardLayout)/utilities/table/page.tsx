import React from "react";
import { SetBreadcrumb } from "@/app/(DashboardLayout)/layout/shared/breadcrumb/BreadcrumbContext";
import BasicTable from "@/app/components/utilities/basic-table/BasicTable";
import StripedRowTable from "@/app/components/utilities/striped-row-table/StripedRowTable";
import HoverTable from "@/app/components/utilities/hover-table/HoverTable";
import CheckboxTable from "@/app/components/utilities/checkbox-table/CheckboxTable";
import DataTable from "@/app/components/utilities/data-table/DataTable";
import { EmployeesData } from "@/app/components/utilities/data";

function page() {
  return (
    <>
      <SetBreadcrumb
        title="جداول"
        items={[{ to: "/", title: "خانه" }, { title: "جداول" }]}
      />
      <div className="flex gap-6 flex-col ">
        <DataTable data={EmployeesData} />
        <BasicTable />
        <StripedRowTable />
        <HoverTable />
        <CheckboxTable />
      </div>
    </>
  );
}

export default page;
