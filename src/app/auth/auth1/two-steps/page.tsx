"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useLocale } from "@/lib/i18n/context";
import { SideAuthLayout } from "@/app/components/auth/SideAuthLayout";

const SideTwoStepsPage = () => {
  const { t } = useLocale();
  const router = useRouter();
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [countdown, setCountdown] = useState(60);
  const [canResend, setCanResend] = useState(false);

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown((c) => c - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setCanResend(true);
    }
  }, [countdown]);

  const handleResend = () => {
    setCountdown(60);
    setCanResend(false);
    setError("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (otp.length !== 6) {
      setError("کد تأیید باید ۶ رقم باشد");
      return;
    }
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1000));
    setLoading(false);
    router.push("/");
  };

  return (
    <SideAuthLayout>
      <h4 className="text-2xl font-bold mb-2">{t.auth.twoStepsHeading}</h4>
      <p className="text-muted-foreground mb-6">{t.auth.twoStepsSub}</p>

      <form onSubmit={handleSubmit}>
        {error && (
          <div className="mb-4 text-sm text-red-600 bg-red-50 dark:bg-red-900/20 rounded-lg px-3 py-2">
            {error}
          </div>
        )}
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
            value={otp}
            onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
          />
        </div>
        <Button className="w-full mb-4" type="submit" disabled={loading}>
          {loading ? "در حال تأیید..." : t.auth.verifyCode}
        </Button>
      </form>

      <div className="flex items-center justify-between text-sm">
        {canResend ? (
          <button
            onClick={handleResend}
            className="text-primary hover:underline"
          >
            {t.auth.resendCode}
          </button>
        ) : (
          <span className="text-muted-foreground">
            {t.auth.resendCode}{" "}
            <span className="font-semibold text-foreground">{countdown}s</span>
          </span>
        )}
        <Link
          href="/auth/auth1/login"
          className="text-muted-foreground hover:underline"
        >
          {t.auth.backToLogin}
        </Link>
      </div>
    </SideAuthLayout>
  );
};

export default SideTwoStepsPage;
