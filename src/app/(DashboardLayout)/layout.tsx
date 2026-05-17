"use client";

import { useState } from "react";
import Header from "./layout/header/Header";
import Sidebar from "./layout/sidebar/Sidebar";
import {
  BreadcrumbProvider,
  useBreadcrumb,
} from "./layout/shared/breadcrumb/BreadcrumbContext";
import BreadcrumbComp from "./layout/shared/breadcrumb/BreadcrumbComp";
import { RavenFormProvider } from "@/lib/form-engine";
import { RavenShadcnUIAdapter } from "@/lib/form-engine/ui/ravenShadcnAdapter";
import { RHFAdapter } from "@/lib/form-engine";
import { RavenRHFAdapter } from "@/lib/form-engine/adapters/ravenRHFAdapter";

function LayoutBody({ children }: { children: React.ReactNode }) {
  const { breadcrumb } = useBreadcrumb();
  const [isCollapse, setIsCollapse] = useState(false);

  return (
    <div className="flex w-full min-h-screen">
      <div
        className={`page-wrapper flex w-full ${isCollapse ? "sidebar-collapsed" : ""}`}
      >
        <div className="xl:block hidden">
          <Sidebar isCollapse={isCollapse} />
        </div>
        <div className="body-wrapper w-full bg-background">
          <Header isCollapse={isCollapse} setIsCollapse={setIsCollapse} />
          <div className="container mx-auto px-6 py-30">
            {breadcrumb && (
              <BreadcrumbComp
                title={breadcrumb.title}
                items={breadcrumb.items}
              />
            )}
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <BreadcrumbProvider>
      <RavenFormProvider
        uiAdapter={RavenShadcnUIAdapter}
        formAdapter={RavenRHFAdapter}
      >
        <LayoutBody>{children}</LayoutBody>
      </RavenFormProvider>
    </BreadcrumbProvider>
  );
}
