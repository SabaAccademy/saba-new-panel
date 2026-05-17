import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default: "دیوار | بزرگ‌ترین سایت آگهی ایران",
    template: "%s | دیوار",
  },
  description: "خرید، فروش، اجاره و نیازمندی‌ها در دیوار — بزرگ‌ترین سایت نیازمندی‌های ایران.",
  openGraph: {
    type: "website",
    title: "دیوار | بزرگ‌ترین سایت آگهی ایران",
    description: "آگهی رایگان ثبت کنید. میلیون‌ها آگهی خودرو، مسکن، دیجیتال، خدمات و بیشتر.",
    siteName: "دیوار",
  },
};

export default function DivarLayout({ children }: { children: React.ReactNode }) {
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
