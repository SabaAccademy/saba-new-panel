"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import FullLogo from "@/app/(DashboardLayout)/layout/shared/logo/FullLogo";
import CardBox from "../shared/CardBox";
import Link from "next/link";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useLocale } from "@/lib/i18n/context";

export const Register = () => {
  const { t } = useLocale();
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!name || !email || !password) {
      setError("لطفاً همه فیلدها را پر کنید");
      return;
    }
    if (password.length < 8) {
      setError("رمز عبور باید حداقل ۸ کاراکتر باشد");
      return;
    }
    if (password !== confirm) {
      setError("رمز عبور با تکرار آن مطابقت ندارد");
      return;
    }
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1200));
    setLoading(false);
    setSuccess(true);
    setTimeout(() => router.push("/auth/login"), 2000);
  };

  return (
    <>
      <div className="h-screen w-full flex justify-center items-center bg-lightprimary">
        <div className="md:min-w-[450px] min-w-max">
          <CardBox>
            <div className="flex justify-center mb-4">
              <FullLogo />
            </div>
            {success ? (
              <div className="text-center py-6">
                <div className="text-4xl mb-3">✅</div>
                <h3 className="text-lg font-bold text-emerald-600 mb-1">
                  ثبت‌نام موفق!
                </h3>
                <p className="text-sm text-muted-foreground">
                  در حال انتقال به صفحه ورود...
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <p className="text-sm text-muted-foreground text-center mb-6">
                  {t.auth.socialCampaigns}
                </p>
                {error && (
                  <div className="mb-4 text-sm text-red-600 bg-red-50 dark:bg-red-900/20 rounded-lg px-3 py-2">
                    {error}
                  </div>
                )}
                <div className="mb-4">
                  <Label htmlFor="name1" className="font-medium mb-2 block">
                    {t.auth.name}
                  </Label>
                  <Input
                    id="name1"
                    type="text"
                    placeholder={t.auth.enterName}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-4">
                  <Label htmlFor="email1" className="font-medium mb-2 block">
                    {t.auth.email}
                  </Label>
                  <Input
                    id="email1"
                    type="email"
                    placeholder={t.auth.enterEmail}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-4">
                  <Label htmlFor="password1" className="font-medium mb-2 block">
                    {t.auth.password}
                  </Label>
                  <Input
                    id="password1"
                    type="password"
                    placeholder={t.auth.enterPassword}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-6">
                  <Label htmlFor="confirm1" className="font-medium mb-2 block">
                    تکرار رمز عبور
                  </Label>
                  <Input
                    id="confirm1"
                    type="password"
                    placeholder="رمز عبور را دوباره وارد کنید"
                    value={confirm}
                    onChange={(e) => setConfirm(e.target.value)}
                    required
                  />
                </div>
                <Button className="w-full" type="submit" disabled={loading}>
                  {loading ? "در حال ثبت‌نام..." : t.auth.signUp}
                </Button>
                <div className="flex items-center gap-2 justify-center mt-6 flex-wrap">
                  <p className="text-base font-medium text-muted-foreground">
                    {t.auth.alreadyHaveAccount}
                  </p>
                  <Link
                    href="/auth/login"
                    className="text-sm font-medium text-primary hover:text-primaryemphasis"
                  >
                    {t.auth.signIn}
                  </Link>
                </div>
              </form>
            )}
          </CardBox>
        </div>
      </div>
    </>
  );
};
