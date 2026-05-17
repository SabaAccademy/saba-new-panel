"use client";
import React from "react";
import type { Metadata } from "next";
import { DM_Sans, Vazirmatn } from "next/font/google";
import "./css/globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import ServiceWorkerRegister from "@/app/components/service-worker/ServiceWorkerRegister";
import { LocaleProvider } from "@/lib/i18n/context";
import { ThemeCustomizerProvider } from "@/lib/theme/ThemeCustomizerContext";
import SessionProvider from "@/components/providers/SessionProvider";
import { RavenDevToolsProvider } from "@/lib/form-engine/devtools/RavenDevToolsProvider";
import { RavenRHFAdapter } from "@/lib/form-engine/adapters/ravenRHFAdapter";
import { RavenShadcnUIAdapter } from "@/lib/form-engine/ui/ravenShadcnAdapter";

const dmSans = DM_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-dm-sans",
});

const vazirmatn = Vazirmatn({
  subsets: ["arabic"],
  display: "swap",
  variable: "--font-vazirmatn",
});

// export const metadata: Metadata = {
//   title: "TailwindAdmin - Nextjs",
//   description: "پنل مدیریت TailwindAdmin",
// };

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fa" dir="rtl" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#5d87ff" />
        {/* Restore locale from cookie before React hydrates */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var l=document.cookie.split('; ').find(function(r){return r.startsWith('NEXT_LOCALE=')});var locale=l?l.split('=')[1]:'fa';document.documentElement.setAttribute('lang',locale);document.documentElement.setAttribute('dir',locale==='en'?'ltr':'rtl');}catch(e){}})()`,
          }}
        />
      </head>
      <body
        className={`${dmSans.variable} ${vazirmatn.variable} font-vazirmatn`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <SessionProvider>
            <LocaleProvider>
              <ThemeCustomizerProvider>
                <RavenDevToolsProvider
                  uiAdapter={RavenShadcnUIAdapter}
                  formAdapter={RavenRHFAdapter}
                  devTools={process.env.NODE_ENV === "development"}
                >
                  <ServiceWorkerRegister />
                  {children}
                </RavenDevToolsProvider>
              </ThemeCustomizerProvider>
            </LocaleProvider>
          </SessionProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
