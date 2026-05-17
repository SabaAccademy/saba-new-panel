"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useLocale } from "@/lib/i18n/context";
import FullLogo from "@/app/(DashboardLayout)/layout/shared/logo/FullLogo";

const Error404Page = () => {
  const { t } = useLocale();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background px-6 text-center">
      <div className="mb-8">
        <FullLogo />
      </div>

      <div className="text-[120px] font-extrabold leading-none text-primary opacity-20 select-none">
        404
      </div>

      <h2 className="text-3xl font-bold mt-4 mb-2">{t.auth.error404Title}</h2>
      <p className="text-muted-foreground text-lg mb-8 max-w-md">
        {t.auth.error404Message}
      </p>

      <Button asChild size="lg">
        <Link href="/">{t.auth.backToHome}</Link>
      </Button>
    </div>
  );
};

export default Error404Page;
