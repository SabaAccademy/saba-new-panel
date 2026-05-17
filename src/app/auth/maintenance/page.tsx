"use client";

import { Icon } from "@iconify/react";
import { useLocale } from "@/lib/i18n/context";
import FullLogo from "@/app/(DashboardLayout)/layout/shared/logo/FullLogo";

const MaintenancePage = () => {
  const { t } = useLocale();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background px-6 text-center">
      <div className="mb-8">
        <FullLogo />
      </div>

      <div className="rounded-full bg-warning/10 p-6 mb-6">
        <Icon icon="solar:settings-linear" className="text-warning text-6xl" />
      </div>

      <h2 className="text-3xl font-bold mb-2">{t.auth.maintenanceTitle}</h2>
      <p className="text-muted-foreground text-lg max-w-md">
        {t.auth.maintenanceMessage}
      </p>
    </div>
  );
};

export default MaintenancePage;
