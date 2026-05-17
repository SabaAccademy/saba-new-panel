"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import FullLogo from "@/app/(DashboardLayout)/layout/shared/logo/FullLogo";
import CardBox from "../shared/CardBox";
import Link from "next/link";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useLocale } from "@/lib/i18n/context";

export const Login = () => {
  const { t } = useLocale();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [remember, setRemember] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });
    setLoading(false);
    if (res?.ok) {
      router.push("/");
      router.refresh();
    } else setError("ایمیل یا رمز عبور اشتباه است.");
  };
  return (
    <>
      <div className="h-screen w-full flex justify-center items-center bg-lightprimary">
        <div className="md:min-w-[450px] min-w-max">
          <CardBox>
            <div className="flex justify-center mb-4">
              <FullLogo />
            </div>
            <p className="text-sm text-muted-foreground text-center mb-6">
              {t.auth.welcome}
            </p>

            {/* Demo credentials hint */}
            <div className="bg-primary/5 border border-primary/20 rounded-xl p-3 mb-4 text-xs">
              <p className="font-semibold text-primary mb-1 flex items-center gap-1">
                <Icon icon="solar:info-circle-linear" width={13} />
                اطلاعات نمونه
              </p>
              <p className="text-muted-foreground font-mono">
                admin@demo.com / demo1234
              </p>
            </div>

            {error && (
              <div className="bg-error/10 border border-error/30 rounded-lg px-3 py-2 mb-4 text-error text-sm flex items-center gap-2">
                <Icon icon="solar:danger-circle-linear" width={15} />
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="username1" className="font-medium">
                    {t.auth.username}
                  </Label>
                </div>
                <Input
                  id="username1"
                  type="email"
                  placeholder={t.auth.enterUsername}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="mt-6">
                <div className="mb-2 block">
                  <Label htmlFor="password1" className="font-medium">
                    {t.auth.password}
                  </Label>
                </div>
                <Input
                  id="password1"
                  type={showPass ? "text" : "password"}
                  placeholder={t.auth.enterPassword}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <div className="flex flex-wrap gap-6 items-center justify-between my-6">
                <div className="flex items-center gap-2">
                  <Checkbox
                    id="remember"
                    checked={remember}
                    onCheckedChange={(v) => setRemember(!!v)}
                  />
                  <Label
                    className="text-link font-normal text-sm"
                    htmlFor="remember"
                  >
                    {t.auth.rememberDevice}
                  </Label>
                </div>
                <Link
                  href="#"
                  className="text-sm font-medium text-primary hover:text-primaryemphasis"
                >
                  {t.auth.forgotPassword}
                </Link>
              </div>
            </form>
            <Button
              type="submit"
              onClick={handleSubmit}
              className="w-full mt-2"
              disabled={loading}
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <Icon icon="svg-spinners:ring-resize" width={16} />
                  در حال ورود...
                </span>
              ) : (
                t.auth.signIn
              )}
            </Button>
            <div className="flex items center gap-2 justify-center mt-6 flex-wrap">
              <p className="text-base font-medium text-muted-foreground">
                {t.auth.newToAdmin}
              </p>
              <Link
                href="/auth/register"
                className="text-sm font-medium text-primary hover:text-primaryemphasis"
              >
                {t.auth.createAccount}
              </Link>
            </div>
          </CardBox>
        </div>
      </div>
    </>
  );
};
