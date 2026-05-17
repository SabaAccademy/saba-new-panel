import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default: "آپارات | پلتفرم اشتراک ویدیو",
    template: "%s | آپارات",
  },
  description:
    "آپارات — بزرگ‌ترین پلتفرم اشتراک ویدیوی ایران. مشاهده فیلم، سریال، مستند، ورزشی، آموزشی، موزیک و سایر محتوای ویدیویی به زبان فارسی.",
  openGraph: {
    type: "website",
    title: "آپارات | پلتفرم اشتراک ویدیو",
    description: "ویدیوهای موردعلاقه خود را در آپارات بیابید و تماشا کنید.",
    siteName: "آپارات",
  },
  twitter: {
    card: "summary_large_image",
    title: "آپارات | پلتفرم اشتراک ویدیو",
  },
};

export default function AparatLandingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      dir="rtl"
      lang="fa"
      className="font-vazirmatn antialiased bg-[#f5f5f5] text-[#1a1a1a] overflow-x-hidden"
    >
      {children}
    </div>
  );
}
