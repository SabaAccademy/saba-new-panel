"use client";

import FullLogo from "@/app/(DashboardLayout)/layout/shared/logo/FullLogo";
import CardBox from "@/app/components/shared/CardBox";
import Link from "next/link";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useLocale } from "@/lib/i18n/context";

const BoxedForgotPasswordPage = () => {
  const { t } = useLocale();

  return (
    <div className="h-screen w-full flex justify-center items-center bg-lightprimary">
      <div className="md:min-w-[450px] min-w-max">
        <CardBox>
          <div className="flex justify-center mb-4">
            <FullLogo />
          </div>
          <h4 className="text-xl font-bold text-center mb-1">
            {t.auth.forgotPasswordHeading}
          </h4>
          <p className="text-sm text-muted-foreground text-center mb-6">
            {t.auth.forgotPasswordSub}
          </p>

          <div className="mb-6">
            <Label htmlFor="email" className="font-medium mb-2 block">
              {t.auth.email}
            </Label>
            <Input id="email" type="email" placeholder={t.auth.enterEmail} />
          </div>

          <Button className="w-full mb-4">{t.auth.sendResetLink}</Button>

          <div className="flex justify-center mt-4">
            <Link
              href="/auth/login"
              className="text-sm text-primary hover:underline"
            >
              {t.auth.backToLogin}
            </Link>
          </div>
        </CardBox>
      </div>
    </div>
  );
};

export default BoxedForgotPasswordPage;
