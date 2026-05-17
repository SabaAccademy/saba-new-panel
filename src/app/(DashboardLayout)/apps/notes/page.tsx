import NotesApp from "@/app/components/apps/notes";
import { SetBreadcrumb } from "@/app/(DashboardLayout)/layout/shared/breadcrumb/BreadcrumbContext";
import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Notes App",
};

const Notes = () => {
  return (
    <>
      <SetBreadcrumb
        title="یادداشت‌ها"
        items={[{ to: "/", title: "خانه" }, { title: "یادداشت‌ها" }]}
      />
      <NotesApp />
    </>
  );
};

export default Notes;
