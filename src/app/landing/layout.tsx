import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default: "ماز | لندینگ جدید آموزش تیزهوشان",
    template: "%s | گروه آموزشی ماز",
  },
  description:
    "لندینگ جدید گروه آموزشی ماز برای معرفی آزمون‌ها، دوره‌ها، کتاب‌ها و مقالات ویژه دانش‌آموزان متوسطه اول و داوطلبان تیزهوشان.",
  openGraph: {
    type: "website",
    title: "لندینگ جدید گروه آموزشی ماز",
    description:
      "صفحه فرود بازطراحی‌شده با ساختار فروش‌محور و تجربه کاربری فارسی.",
    siteName: "گروه آموزشی ماز",
  },
  twitter: {
    card: "summary_large_image",
    title: "لندینگ جدید گروه آموزشی ماز",
  },
};

/**
 * Landing page layout — completely isolated from the admin/dashboard layout.
 * The root <html>/<body> is provided by app/layout.tsx.
 * This wrapper resets direction and font for the marketing surface.
 */
export default function LandingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      dir="rtl"
      lang="fa"
      className="font-vazirmatn antialiased bg-[#f3f4f6] text-[#102b57] overflow-x-hidden"
    >
      {children}
    </div>
  );
}
