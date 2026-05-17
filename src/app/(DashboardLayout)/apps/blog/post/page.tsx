import { SetBreadcrumb } from "@/app/(DashboardLayout)/layout/shared/breadcrumb/BreadcrumbContext";
import BlogPost from "@/app/components/apps/blog/BlogPost";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Blog Post",
};
const Blog = () => {
  return (
    <>
      <SetBreadcrumb
        title="وبلاگ"
        items={[{ to: "/", title: "خانه" }, { title: "وبلاگ" }]}
      />
      <BlogPost />
    </>
  );
};
export default Blog;
