"use client";

import FullLogo from "@/app/(DashboardLayout)/layout/shared/logo/FullLogo";
import CardBox from "@/app/components/shared/CardBox";
import Link from "next/link";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useLocale } from "@/lib/i18n/context";

const BoxedTwoStepsPage = () => {
  const { t } = useLocale();

  return (
    <div className="h-screen w-full flex justify-center items-center bg-lightprimary">
      <div className="md:min-w-[450px] min-w-max">
        <CardBox>
          <div className="flex justify-center mb-4">
            <FullLogo />
          </div>
          <h4 className="text-xl font-bold text-center mb-1">
            {t.auth.twoStepsHeading}
          </h4>
          <p className="text-sm text-muted-foreground text-center mb-6">
            {t.auth.twoStepsSub}
          </p>

          <div className="mb-6">
            <Label htmlFor="otp" className="font-medium mb-2 block">
              {t.auth.verificationCode}
            </Label>
            <Input
              id="otp"
              type="text"
              inputMode="numeric"
              maxLength={6}
              placeholder={t.auth.enterVerificationCode}
              className="tracking-widest text-center text-xl"
            />
          </div>

          <Button className="w-full mb-4" asChild>
            <Link href="/">{t.auth.verifyCode}</Link>
          </Button>

          <div className="flex items-center justify-between text-sm mt-4">
            <button className="text-primary hover:underline">
              {t.auth.resendCode}
            </button>
            <Link
              href="/auth/login"
              className="text-muted-foreground hover:underline"
            >
              {t.auth.backToLogin}
            </Link>
          </div>
        </CardBox>
      </div>
    </div>
  );
};

export default BoxedTwoStepsPage;
