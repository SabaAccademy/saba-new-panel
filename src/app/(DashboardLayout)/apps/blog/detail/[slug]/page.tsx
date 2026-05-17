import { SetBreadcrumb } from "@/app/(DashboardLayout)/layout/shared/breadcrumb/BreadcrumbContext";
import BlogDetailData from "@/app/components/apps/blog/detail";
import React from "react";
import { BlogProvider } from "@/app/context/blog-context/index";
import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Blog Details",
};

const BlogDetail = () => {
  return (
    <>
      <BlogProvider>
        <SetBreadcrumb
          title="جزئیات مطلب"
          items={[
            { to: "/", title: "خانه" },
            { to: "/apps/blog/post", title: "وبلاگ" },
            { title: "جزئیات مطلب" },
          ]}
        />
        <BlogDetailData />
      </BlogProvider>
    </>
  );
};

export default BlogDetail;
