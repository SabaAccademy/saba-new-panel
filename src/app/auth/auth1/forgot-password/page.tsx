"use client";

import { useState } from "react";
import Link from "next/link";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useLocale } from "@/lib/i18n/context";
import { SideAuthLayout } from "@/app/components/auth/SideAuthLayout";

const SideForgotPasswordPage = () => {
  const { t } = useLocale();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1200));
    setLoading(false);
    setSent(true);
  };

  return (
    <SideAuthLayout>
      <h4 className="text-2xl font-bold mb-2">
        {t.auth.forgotPasswordHeading}
      </h4>
      <p className="text-muted-foreground mb-6">{t.auth.forgotPasswordSub}</p>

      {sent ? (
        <div className="text-center py-4">
          <div className="text-4xl mb-3">📧</div>
          <h3 className="text-base font-bold text-emerald-600 mb-1">
            لینک بازیابی ارسال شد!
          </h3>
          <p className="text-sm text-muted-foreground mb-4">
            لطفاً صندوق ورودی ایمیل خود را بررسی کنید.
          </p>
          <Link
            href="/auth/auth1/login"
            className="text-primary font-medium hover:underline text-sm"
          >
            {t.auth.backToLogin}
          </Link>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <Label htmlFor="email" className="font-medium mb-2 block">
              {t.auth.email}
            </Label>
            <Input
              id="email"
              type="email"
              placeholder={t.auth.enterEmail}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <Button className="w-full mb-4" type="submit" disabled={loading}>
            {loading ? "در حال ارسال..." : t.auth.sendResetLink}
          </Button>
          <p className="text-center text-sm text-muted-foreground">
            <Link
              href="/auth/auth1/login"
              className="text-primary font-medium hover:underline"
            >
              {t.auth.backToLogin}
            </Link>
          </p>
        </form>
      )}
    </SideAuthLayout>
  );
};

export default SideForgotPasswordPage;
