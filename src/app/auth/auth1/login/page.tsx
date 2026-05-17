"use client";

import Link from "next/link";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useLocale } from "@/lib/i18n/context";
import { SideAuthLayout } from "@/app/components/auth/SideAuthLayout";

const SideLoginPage = () => {
  const { t } = useLocale();

  return (
    <SideAuthLayout>
      <h4 className="text-2xl font-bold mb-2">{t.auth.signIn}</h4>
      <p className="text-muted-foreground mb-6">{t.auth.welcome}</p>

      <div className="mb-4">
        <Label htmlFor="username" className="font-medium mb-2 block">
          {t.auth.username}
        </Label>
        <Input id="username" type="text" placeholder={t.auth.enterUsername} />
      </div>

      <div className="mb-4">
        <Label htmlFor="password" className="font-medium mb-2 block">
          {t.auth.password}
        </Label>
        <Input
          id="password"
          type="password"
          placeholder={t.auth.enterPassword}
        />
      </div>

      <div className="flex flex-wrap gap-4 items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Checkbox id="remember" checked />
          <Label className="text-sm font-normal" htmlFor="remember">
            {t.auth.rememberDevice}
          </Label>
        </div>
        <Link
          href="/auth/auth1/forgot-password"
          className="text-sm text-primary hover:underline"
        >
          {t.auth.forgotPassword}
        </Link>
      </div>

      <Button className="w-full mb-4" asChild>
        <Link href="/">{t.auth.signIn}</Link>
      </Button>

      <p className="text-center text-sm text-muted-foreground">
        {t.auth.newToAdmin}{" "}
        <Link
          href="/auth/auth1/register"
          className="text-primary font-medium hover:underline"
        >
          {t.auth.createAccount}
        </Link>
      </p>
    </SideAuthLayout>
  );
};

export default SideLoginPage;
