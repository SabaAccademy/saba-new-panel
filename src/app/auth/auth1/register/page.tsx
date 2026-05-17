"use client";

import Link from "next/link";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useLocale } from "@/lib/i18n/context";
import { SideAuthLayout } from "@/app/components/auth/SideAuthLayout";

const SideRegisterPage = () => {
  const { t } = useLocale();

  return (
    <SideAuthLayout>
      <h4 className="text-2xl font-bold mb-2">{t.auth.signUp}</h4>
      <p className="text-muted-foreground mb-6">{t.auth.welcome}</p>

      <div className="mb-4">
        <Label htmlFor="name" className="font-medium mb-2 block">
          {t.auth.name}
        </Label>
        <Input id="name" type="text" placeholder={t.auth.enterName} />
      </div>

      <div className="mb-4">
        <Label htmlFor="email" className="font-medium mb-2 block">
          {t.auth.email}
        </Label>
        <Input id="email" type="email" placeholder={t.auth.enterEmail} />
      </div>

      <div className="mb-6">
        <Label htmlFor="password" className="font-medium mb-2 block">
          {t.auth.password}
        </Label>
        <Input
          id="password"
          type="password"
          placeholder={t.auth.enterPassword}
        />
      </div>

      <Button className="w-full mb-4" asChild>
        <Link href="/">{t.auth.signUp}</Link>
      </Button>

      <p className="text-center text-sm text-muted-foreground">
        {t.auth.alreadyHaveAccount}{" "}
        <Link
          href="/auth/auth1/login"
          className="text-primary font-medium hover:underline"
        >
          {t.auth.signIn}
        </Link>
      </p>
    </SideAuthLayout>
  );
};

export default SideRegisterPage;
