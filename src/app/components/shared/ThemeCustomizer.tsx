"use client";

import { useState } from "react";
import { useTheme } from "next-themes";
import { Icon } from "@iconify/react";
import {
  COLOR_THEMES,
  useColorTheme,
} from "@/lib/theme/ThemeCustomizerContext";
import { useLocale } from "@/lib/i18n/context";
import { Sheet, SheetContent, SheetTitle } from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";

export function ThemeCustomizer() {
  const [open, setOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const { colorTheme, setColorTheme } = useColorTheme();
  const { locale, dir } = useLocale();

  const isDark = theme === "dark";

  return (
    <>
      {/* Trigger button */}
      <button
        onClick={() => setOpen(true)}
        className="hover:text-primary px-2 group focus:ring-0 rounded-full flex justify-center items-center cursor-pointer relative"
        title={locale === "fa" ? "تنظیمات ظاهر" : "Theme Settings"}
      >
        <span className="flex items-center justify-center relative after:absolute after:w-10 after:h-10 after:rounded-full after:-top-1/2 group-hover:after:bg-lightprimary">
          <Icon
            icon="solar:palette-bold-duotone"
            width="20"
            className="text-foreground dark:text-muted-foreground group-hover:text-primary dark:group-hover:text-primary"
          />
        </span>
      </button>

      {/* Settings panel */}
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent
          side={dir === "rtl" ? "left" : "right"}
          className="w-72 p-0 flex flex-col"
        >
          <SheetTitle className="px-5 pt-5 pb-4 text-base font-semibold flex items-center gap-2">
            <Icon
              icon="solar:palette-bold-duotone"
              className="text-primary"
              width={20}
            />
            {locale === "fa" ? "تنظیمات ظاهر" : "Theme Settings"}
          </SheetTitle>

          <Separator />

          <div className="flex-1 overflow-y-auto px-5 py-4 space-y-6">
            {/* Dark / Light */}
            <div>
              <p className="text-xs font-semibold uppercase text-muted-foreground mb-3 tracking-wider">
                {locale === "fa" ? "حالت نمایش" : "Display Mode"}
              </p>
              <div className="grid grid-cols-2 gap-3">
                {/* Light */}
                <button
                  onClick={() => setTheme("light")}
                  className={`flex flex-col items-center gap-2 rounded-xl border-2 p-3 transition-all ${
                    !isDark
                      ? "border-primary bg-lightprimary"
                      : "border-border hover:border-primary/40"
                  }`}
                >
                  <div className="w-full h-10 rounded-lg bg-white border border-border flex items-center justify-center">
                    <Icon
                      icon="tabler:sun"
                      className="text-yellow-500"
                      width={18}
                    />
                  </div>
                  <span className="text-xs font-medium">
                    {locale === "fa" ? "روشن" : "Light"}
                  </span>
                  {!isDark && (
                    <span className="w-4 h-4 rounded-full bg-primary flex items-center justify-center">
                      <Icon
                        icon="tabler:check"
                        className="text-white"
                        width={10}
                      />
                    </span>
                  )}
                </button>

                {/* Dark */}
                <button
                  onClick={() => setTheme("dark")}
                  className={`flex flex-col items-center gap-2 rounded-xl border-2 p-3 transition-all ${
                    isDark
                      ? "border-primary bg-lightprimary"
                      : "border-border hover:border-primary/40"
                  }`}
                >
                  <div className="w-full h-10 rounded-lg bg-[#1c2536] flex items-center justify-center">
                    <Icon
                      icon="tabler:moon"
                      className="text-blue-300"
                      width={18}
                    />
                  </div>
                  <span className="text-xs font-medium">
                    {locale === "fa" ? "تاریک" : "Dark"}
                  </span>
                  {isDark && (
                    <span className="w-4 h-4 rounded-full bg-primary flex items-center justify-center">
                      <Icon
                        icon="tabler:check"
                        className="text-white"
                        width={10}
                      />
                    </span>
                  )}
                </button>
              </div>
            </div>

            <Separator />

            {/* Color Palette */}
            <div>
              <p className="text-xs font-semibold uppercase text-muted-foreground mb-3 tracking-wider">
                {locale === "fa" ? "رنگ اصلی" : "Primary Color"}
              </p>
              <div className="grid grid-cols-3 gap-3">
                {COLOR_THEMES.map((ct) => {
                  const isActive = colorTheme.id === ct.id;
                  return (
                    <button
                      key={ct.id}
                      onClick={() => setColorTheme(ct)}
                      className={`flex flex-col items-center gap-1.5 rounded-xl border-2 p-2.5 transition-all ${
                        isActive
                          ? "border-[var(--primary)] bg-lightprimary"
                          : "border-border hover:border-gray-300"
                      }`}
                    >
                      {/* Dual color swatch */}
                      <div className="flex gap-1">
                        <span
                          className="w-5 h-5 rounded-full shadow-sm"
                          style={{ background: ct.primary }}
                        />
                        <span
                          className="w-5 h-5 rounded-full shadow-sm"
                          style={{ background: ct.secondary }}
                        />
                      </div>
                      <span className="text-[11px] font-medium">
                        {locale === "fa" ? ct.labelFa : ct.label}
                      </span>
                      {isActive && (
                        <span
                          className="w-3.5 h-3.5 rounded-full flex items-center justify-center"
                          style={{ background: ct.primary }}
                        >
                          <Icon
                            icon="tabler:check"
                            className="text-white"
                            width={9}
                          />
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
}
