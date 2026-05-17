import type { Metadata } from "next";
import { SetBreadcrumb } from "@/app/(DashboardLayout)/layout/shared/breadcrumb/BreadcrumbContext";
import ChatApp from "@/app/components/apps/chat/ChatApp";

export const metadata: Metadata = { title: "Chat App" };

const Page = () => (
  <>
    <SetBreadcrumb
      title="Chat App"
      items={[
        { to: "/", title: "Home" },
        { title: "Apps" },
        { title: "Chat App" },
      ]}
    />
    <ChatApp />
  </>
);

export default Page;
