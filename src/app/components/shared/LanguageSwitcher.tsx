"use client";

import { useLocale } from "@/lib/i18n/context";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Icon } from "@iconify/react";

export function LanguageSwitcher() {
  const { locale, setLocale, t } = useLocale();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="hover:text-primary hover:bg-lightprimary rounded-full h-9 w-9"
          title={t.common.language}
        >
          <Icon icon="tabler:language" width={20} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="min-w-[130px]">
        <DropdownMenuItem
          onClick={() => setLocale("fa")}
          className={`cursor-pointer flex items-center gap-2 ${locale === "fa" ? "text-primary font-semibold" : ""}`}
        >
          <span className="text-base">🇮🇷</span>
          <span className="text-sm">{t.common.persian}</span>
          {locale === "fa" && (
            <Icon icon="tabler:check" width={14} className="ms-auto" />
          )}
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => setLocale("en")}
          className={`cursor-pointer flex items-center gap-2 ${locale === "en" ? "text-primary font-semibold" : ""}`}
        >
          <span className="text-base">🇺🇸</span>
          <span className="text-sm">{t.common.english}</span>
          {locale === "en" && (
            <Icon icon="tabler:check" width={14} className="ms-auto" />
          )}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
