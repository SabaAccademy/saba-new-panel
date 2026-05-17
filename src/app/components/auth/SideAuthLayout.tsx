"use client";

import FullLogo from "@/app/(DashboardLayout)/layout/shared/logo/FullLogo";
import { useLocale } from "@/lib/i18n/context";
import { ReactNode } from "react";

interface SideAuthLayoutProps {
  children: ReactNode;
}

export const SideAuthLayout = ({ children }: SideAuthLayoutProps) => {
  const { t, dir } = useLocale();

  return (
    <div className="min-h-screen flex">
      {/* Side banner – pushed to right in LTR, left in RTL via order */}
      <div
        className={`hidden lg:flex flex-col justify-between w-1/2 bg-gradient-to-br from-primary to-secondary p-10 text-white order-last ${
          dir === "rtl" ? "lg:order-first" : ""
        }`}
      >
        <div>
          <FullLogo />
        </div>
        <div>
          <h2 className="text-3xl font-bold mb-4">{t.auth.sideAuthTitle}</h2>
          <p className="text-white/80 text-lg">{t.auth.sideAuthSubtitle}</p>
        </div>
        <div className="text-white/60 text-sm">
          © {new Date().getFullYear()} TailwindAdmin
        </div>
      </div>

      {/* Form panel */}
      <div className="flex flex-col justify-center items-center w-full lg:w-1/2 p-8 bg-background">
        <div className="w-full max-w-md">
          <div className="lg:hidden flex justify-center mb-8">
            <FullLogo />
          </div>
          {children}
        </div>
      </div>
    </div>
  );
};
