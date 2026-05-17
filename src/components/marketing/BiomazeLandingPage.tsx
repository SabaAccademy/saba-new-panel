import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  Atom,
  BadgeCheck,
  BookOpen,
  ChevronDown,
  Brain,
  ChevronLeft,
  ChevronRight,
  HeartPulse,
  MapPin,
  Menu,
  MessageCircleMore,
  Phone,
  Search,
  ShieldCheck,
  ShoppingCart,
  Sparkles,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

import {
  articles,
  books,
  footerColumns,
  megaMenuItems,
  products,
  promoCards,
  topNotices,
  type ArticleItem,
} from "./biomaze-data";

const metrics = [
  { id: "students", value: "+۱۸هزار", label: "دانش‌آموز فعال" },
  { id: "classes", value: "۲۴۰", label: "جلسه ویدیویی" },
  { id: "support", value: "۷/۲۴", label: "پشتیبانی آموزشی" },
];

const heroFeatures = [
  { id: "one", label: "مشاوره شخصی‌سازی‌شده", icon: BadgeCheck },
  { id: "two", label: "دوره‌های مرحله‌ای و جامع", icon: HeartPulse },
  { id: "three", label: "آزمون آنلاین و تحلیل عملکرد", icon: ShieldCheck },
];

function ArticleIcon({ type }: { type: ArticleItem["icon"] }) {
  const className = "h-16 w-16 text-[#111827]";

  switch (type) {
    case "mind":
      return <Brain className={className} strokeWidth={1.8} />;
    case "book":
      return <BookOpen className={className} strokeWidth={1.8} />;
    case "desk":
      return <Atom className={className} strokeWidth={1.8} />;
    case "podcast":
      return <MessageCircleMore className={className} strokeWidth={1.8} />;
    default:
      return <Sparkles className={className} strokeWidth={1.8} />;
  }
}

function NoticeBar() {
  return (
    <div className="bg-[#1455f5] text-white">
      {topNotices.map((notice) => (
        <div
          key={notice.id}
          className="border-b border-white/15 last:border-b-0"
        >
          <div className="mx-auto flex max-w-[1240px] items-center justify-between gap-3 px-4 py-2 text-sm sm:px-6 lg:px-8">
            <span className="font-medium">{notice.text}</span>
            <Button
              variant="outline"
              size="sm"
              shape="pill"
              className="h-8 border-white/35 bg-white/10 px-4 text-white hover:bg-white hover:text-[#1455f5]"
            >
              {notice.action}
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
}

function MainNavigation() {
  return (
    <div className="mx-auto max-w-[1240px] px-4 pt-4 sm:px-6 lg:px-8">
      <div className="flex items-center justify-between gap-4 rounded-[26px] border border-[#e4e7f0] bg-white px-4 py-3 shadow-[0_12px_40px_rgba(15,41,97,0.08)] sm:px-6">
        <div className="flex min-w-0 items-center gap-2 sm:gap-3">
          <Button
            variant="ghost"
            size="icon"
            className="h-10 w-10 rounded-2xl border border-[#dce5ff] text-[#1455f5] hover:bg-[#edf3ff]"
          >
            <ShoppingCart className="h-5 w-5" />
          </Button>
          <div className="hidden h-10 w-px bg-[#edf0f7] lg:block" />
          <div className="hidden items-center gap-2 rounded-full border border-[#dce5ff] bg-[#f5f8ff] px-3 py-2 text-sm text-[#35507c] lg:flex">
            <Search className="h-4 w-4 text-[#1455f5]" />
            <span>جستجو در سایت</span>
          </div>
        </div>

        <div className="hidden min-w-0 flex-1 items-stretch justify-center gap-2 xl:flex">
          {megaMenuItems.map((item) => (
            <div key={item.id} className="group relative flex items-center">
              <Link
                href={item.href}
                className="inline-flex items-center gap-2 rounded-2xl px-4 py-3 text-sm font-bold text-[#44526c] transition hover:bg-[#f6f8ff] hover:text-[#1455f5]"
              >
                {item.label}
                <ChevronDown className="h-4 w-4 transition duration-200 group-hover:rotate-180 group-focus-within:rotate-180" />
              </Link>

              <div className="pointer-events-none invisible absolute right-1/2 top-full z-30 w-[920px] translate-x-1/2 pt-4 opacity-0 transition duration-200 group-hover:pointer-events-auto group-hover:visible group-hover:opacity-100 group-focus-within:pointer-events-auto group-focus-within:visible group-focus-within:opacity-100">
                <div className="overflow-hidden rounded-[30px] border border-[#dfe6f7] bg-white shadow-[0_30px_80px_rgba(15,41,97,0.16)]">
                  <div className="grid gap-0 lg:grid-cols-[minmax(0,1fr)_292px]">
                    <div className="grid gap-6 p-6 lg:grid-cols-2 lg:p-7">
                      {item.columns.map((column) => (
                        <div key={column.title} className="space-y-4">
                          <div className="text-sm font-black text-[#102b57]">
                            {column.title}
                          </div>
                          <div className="space-y-3">
                            {column.links.map((link) => (
                              <Link
                                key={link.label}
                                href={link.href}
                                className="block rounded-[22px] border border-transparent bg-[#f8fbff] px-4 py-4 transition hover:border-[#d9e5ff] hover:bg-white hover:shadow-[0_12px_30px_rgba(15,41,97,0.08)]"
                              >
                                <div className="flex items-center justify-between gap-3">
                                  <div className="text-sm font-black text-[#163466]">
                                    {link.label}
                                  </div>
                                  <ArrowLeft className="h-4 w-4 shrink-0 text-[#1455f5]" />
                                </div>
                                <p className="mt-2 text-xs leading-6 text-[#6f7f99]">
                                  {link.description}
                                </p>
                              </Link>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="relative overflow-hidden bg-linear-to-br from-[#0f45d8] via-[#1455f5] to-[#0a2f95] p-6 text-white">
                      <div className="absolute -left-6 top-8 h-28 w-28 rounded-full bg-white/10 blur-2xl" />
                      <div className="absolute bottom-0 right-0 h-32 w-32 rounded-full bg-[#7cffb0]/20 blur-2xl" />
                      <div className="relative space-y-4">
                        <span className="inline-flex rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-black">
                          {item.featured.eyebrow}
                        </span>
                        <h3 className="text-2xl font-black leading-10">
                          {item.featured.title}
                        </h3>
                        <p className="text-sm leading-8 text-white/80">
                          {item.featured.description}
                        </p>
                        <Button
                          asChild
                          variant="outline"
                          shape="pill"
                          className="h-11 border-white/30 bg-white/10 px-5 text-white hover:bg-white hover:text-[#1455f5]"
                        >
                          <Link href={item.featured.href}>
                            {item.featured.cta}
                          </Link>
                        </Button>
                        <div className="grid gap-3 pt-4">
                          <div className="rounded-[22px] border border-white/15 bg-white/10 px-4 py-3 text-sm font-semibold text-white/90">
                            گزارش عملکرد و مسیر پیشنهادی یادگیری
                          </div>
                          <div className="rounded-[22px] border border-white/15 bg-white/10 px-4 py-3 text-sm font-semibold text-white/90">
                            زیرساخت فروش، محتوا و تبدیل برای لندینگ جدید
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden text-right sm:block">
            <div className="text-xs text-[#8a94a6]">گروه آموزشی ماز</div>
            <div className="text-sm font-extrabold text-[#123061]">
              نسخه جدید landing
            </div>
          </div>
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#eff4ff] text-[#1455f5] shadow-inner shadow-white/60">
            <Sparkles className="h-5 w-5" />
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="h-10 w-10 rounded-2xl border border-[#dce5ff] text-[#1455f5] xl:hidden"
          >
            <Menu className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
}

function PromoAside() {
  return (
    <div className="grid gap-4 lg:max-w-[292px]">
      {promoCards.map((card) => {
        const toneClass =
          card.tone === "sky"
            ? "from-[#e9f5ff] to-[#fefefe]"
            : "from-[#eef1ff] to-[#fefefe]";

        return (
          <article
            key={card.id}
            className={cn(
              "group relative overflow-hidden rounded-[28px] border border-[#d9e3ff] bg-linear-to-br p-5 shadow-[0_12px_36px_rgba(25,67,151,0.14)]",
              toneClass,
            )}
          >
            <div className="absolute -left-6 -top-6 h-24 w-24 rounded-full bg-[#7ac8ff]/25 blur-2xl" />
            <div className="absolute -bottom-10 -right-8 h-24 w-24 rounded-full bg-[#1455f5]/10 blur-2xl" />
            <div className="relative flex items-center gap-4">
              <div className="flex-1 space-y-2">
                <span className="inline-flex rounded-full bg-white/90 px-3 py-1 text-xs font-extrabold text-[#1455f5] shadow-sm">
                  {card.eyebrow}
                </span>
                <h3 className="text-xl font-black leading-8 text-[#123061]">
                  {card.title}
                </h3>
                <p className="text-sm leading-7 text-[#51617d]">
                  {card.subtitle}
                </p>
                <Button
                  variant="default"
                  size="sm"
                  shape="pill"
                  className="mt-2 h-10 bg-[#1455f5] px-4 text-white shadow-[0_12px_24px_rgba(20,85,245,0.24)] hover:bg-[#0f44cb]"
                >
                  {card.cta}
                </Button>
              </div>
              <div className="relative hidden h-32 w-28 shrink-0 items-center justify-center lg:flex">
                <div className="absolute inset-0 rounded-3xl bg-[#0f4ae5]" />
                <div className="absolute right-3 top-3 h-7 w-7 rounded-full bg-[#5fe17f]" />
                <div className="absolute left-2 top-5 h-20 w-20 rounded-[18px] border-4 border-white/25 bg-white/10" />
                <div className="absolute bottom-4 left-5 h-3 w-16 rounded-full bg-white/85" />
                <div className="absolute bottom-9 left-5 h-3 w-11 rounded-full bg-[#51d494]" />
              </div>
            </div>
          </article>
        );
      })}
    </div>
  );
}

function HeroVisual() {
  return (
    <div className="relative min-h-[360px] overflow-hidden rounded-[34px] border border-[#31d485]/30 bg-[#091f8f] p-6 shadow-[0_24px_80px_rgba(8,31,143,0.28)] sm:min-h-[420px] sm:p-8 lg:min-h-[468px]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(72,130,255,0.6),transparent_35%),radial-gradient(circle_at_bottom_right,rgba(74,255,173,0.22),transparent_40%)]" />
      <div className="absolute left-10 top-8 h-2.5 w-20 rounded-full bg-[#6ef3a5]" />
      <div className="absolute bottom-10 right-20 h-2.5 w-32 rounded-full bg-[#6ef3a5]" />
      <div className="absolute left-[48%] top-[14%] h-20 w-20 rounded-full bg-[#9ff3a7]" />
      <div className="absolute left-[61%] top-[16%] h-8 w-24 rounded-full bg-[#9ff3a7]" />
      <div className="absolute left-[76%] top-[13%] h-20 w-20 rounded-full bg-[#9ff3a7]" />
      <div className="absolute left-[62%] top-[28%] h-8 w-36 rounded-full bg-[#9ff3a7]" />
      <div className="absolute left-[58%] top-[42%] h-24 w-24 rounded-full bg-[#9ff3a7]" />
      <div className="absolute left-[73%] top-[42%] h-24 w-24 rounded-full bg-[#9ff3a7]" />
      <div className="absolute left-[53%] top-[57%] h-10 w-48 rounded-full bg-[#9ff3a7]" />
      <div className="absolute left-[58%] top-[70%] h-24 w-24 rounded-full bg-[#9ff3a7]" />
      <div className="absolute left-[73%] top-[70%] h-24 w-24 rounded-full bg-[#9ff3a7]" />
      <div className="absolute left-[86%] top-[58%] h-10 w-10 rounded-full bg-[#9ff3a7]" />
      <div className="absolute left-[74%] top-[32%] flex h-10 w-10 items-center justify-center rounded-full border-4 border-[#091f8f] bg-[#9ff3a7] text-[#091f8f] text-2xl font-black">
        ×
      </div>

      <div className="relative z-10 flex h-full flex-col justify-between gap-10">
        <div className="flex flex-wrap items-center gap-3">
          <span className="rounded-full bg-[#ff944c] px-5 py-2 text-sm font-black text-white shadow-[0_10px_24px_rgba(255,148,76,0.35)]">
            ۱۴۰۵
          </span>
          <span className="rounded-full bg-[#ff8a39] px-5 py-2 text-sm font-black text-white shadow-[0_10px_24px_rgba(255,138,57,0.32)]">
            متوسطه اول
          </span>
          <span className="rounded-full border border-white/25 bg-white/10 px-4 py-2 text-sm font-bold text-white/90">
            جدید
          </span>
        </div>

        <div className="max-w-[420px] space-y-5 text-white">
          <h1 className="text-3xl font-black leading-[1.7] sm:text-4xl lg:text-[2.85rem] lg:leading-[1.65]">
            ویژه
            <br />
            امتحانات خرداد
            <br />
            و آزمون تیزهوشان
            <br />
            پایه هفتم تا نهم
          </h1>
          <p className="max-w-[360px] text-sm leading-8 text-white/80 sm:text-base">
            نسخه بازطراحی‌شده لندینگ گروه آموزشی ماز با تمرکز بر تجربه کاربری،
            ساختار فروش و نمایش دقیق محصولات، کتاب‌ها و محتوای آموزشی.
          </p>
          <div className="flex flex-wrap gap-3">
            <Button
              asChild
              variant="default"
              shape="pill"
              className="h-11 bg-white px-6 text-[#0d2ea9] hover:bg-[#eaf0ff]"
            >
              <Link href="#products">مشاهده محصولات</Link>
            </Button>
            <Button
              asChild
              variant="outline"
              shape="pill"
              className="h-11 border-white/35 bg-white/10 px-6 text-white hover:bg-white hover:text-[#0d2ea9]"
            >
              <Link href="/auth/login">ورود به پنل دانش‌آموزی</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

function HeroSection() {
  return (
    <section
      id="hero"
      className="mx-auto max-w-[1240px] px-4 py-8 sm:px-6 lg:px-8 lg:py-10"
    >
      <div className="grid items-start gap-5 lg:grid-cols-[292px_minmax(0,1fr)]">
        <PromoAside />
        <div className="space-y-5">
          <HeroVisual />
          <div className="grid gap-4 rounded-[30px] border border-[#dfe4ef] bg-white p-5 shadow-[0_18px_40px_rgba(18,48,97,0.08)] md:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
            <div className="space-y-4">
              <div className="flex flex-wrap items-center gap-3">
                <span className="rounded-full bg-[#eaf3ff] px-4 py-2 text-xs font-black text-[#1455f5]">
                  طراحی جدید / enterprise ready
                </span>
                <span className="text-sm font-semibold text-[#70809d]">
                  ساختار ماژولار، داده‌محور و آماده توسعه
                </span>
              </div>
              <div className="grid gap-3 sm:grid-cols-3">
                {metrics.map((metric) => (
                  <div
                    key={metric.id}
                    className="rounded-[22px] border border-[#ebeff7] bg-[#f8fbff] px-4 py-5 text-center"
                  >
                    <div className="text-2xl font-black text-[#123061]">
                      {metric.value}
                    </div>
                    <div className="mt-2 text-sm text-[#627089]">
                      {metric.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid gap-3">
              {heroFeatures.map(({ id, label, icon: Icon }) => (
                <div
                  key={id}
                  className="flex items-center gap-3 rounded-[22px] border border-[#e6ecfa] bg-[#fbfdff] px-4 py-4"
                >
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#1455f5] text-white shadow-[0_10px_25px_rgba(20,85,245,0.22)]">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div className="text-sm font-bold text-[#203457]">
                    {label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function SectionHeader({
  title,
  subtitle,
  action,
}: {
  title: string;
  subtitle?: string;
  action?: string;
}) {
  return (
    <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
      <div className="space-y-2">
        <div className="flex items-center gap-3">
          <h2 className="text-2xl font-black text-[#102b57]">{title}</h2>
          <span className="h-[3px] w-14 rounded-full bg-[#1455f5]" />
        </div>
        {subtitle ? <p className="text-sm text-[#70809d]">{subtitle}</p> : null}
      </div>
      {action ? (
        <Button
          variant="outline"
          size="sm"
          shape="pill"
          className="h-10 rounded-full border-[#dce5ff] bg-white px-4 text-[#1455f5] hover:bg-[#1455f5] hover:text-white"
        >
          {action}
        </Button>
      ) : null}
    </div>
  );
}

function ProductCard({
  title,
  category,
  image,
  price,
  oldPrice,
  badge,
}: (typeof products)[number]) {
  return (
    <article className="group rounded-[26px] border border-[#e5e9f3] bg-white p-4 shadow-[0_14px_40px_rgba(15,41,97,0.07)] transition hover:-translate-y-1 hover:shadow-[0_20px_60px_rgba(15,41,97,0.12)]">
      <div className="flex items-center justify-between pb-4">
        <span className="rounded-full bg-[#ebfff3] px-3 py-1 text-[11px] font-black text-[#20b567]">
          {badge}
        </span>
        <span className="rounded-full bg-[#eff4ff] px-3 py-1 text-[11px] font-bold text-[#6e7f9e]">
          {category}
        </span>
      </div>
      <div className="relative mx-auto flex aspect-[4/4.8] w-full max-w-[220px] items-center justify-center overflow-hidden rounded-[22px] bg-[#f4f7fd]">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover transition duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, 25vw"
        />
      </div>
      <div className="space-y-3 px-2 pt-4">
        <h3 className="line-clamp-2 min-h-14 text-base font-black leading-7 text-[#102b57]">
          {title}
        </h3>
        <div className="text-sm text-[#a0a9b8] line-through">{oldPrice}</div>
        <div className="flex items-end justify-between gap-3">
          <div>
            <div className="text-xs text-[#7b879c]">قیمت ویژه</div>
            <div className="text-lg font-black text-[#102b57]">{price}</div>
          </div>
          <Button
            variant="success"
            size="icon"
            className="h-10 w-10 rounded-xl bg-[#2ab75d] shadow-[0_12px_24px_rgba(42,183,93,0.22)] hover:bg-[#239b4f]"
          >
            <span className="text-xl leading-none">+</span>
          </Button>
        </div>
      </div>
    </article>
  );
}

function ProductsSection() {
  return (
    <section
      id="products"
      className="mx-auto max-w-[1240px] px-4 py-10 sm:px-6 lg:px-8"
    >
      <SectionHeader
        title="محصولات"
        subtitle="دوره‌ها و بسته‌های پرفروش آموزشی"
        action="مشاهده همه"
      />
      <div className="mb-4 flex justify-start gap-2">
        <Button
          variant="outline"
          size="icon"
          className="h-9 w-9 rounded-xl border-[#dce5ff] text-[#1455f5] hover:bg-[#1455f5] hover:text-white"
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          className="h-9 w-9 rounded-xl border-[#dce5ff] text-[#1455f5] hover:bg-[#1455f5] hover:text-white"
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
      </div>
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        {products.map((product) => (
          <ProductCard key={product.id} {...product} />
        ))}
      </div>
    </section>
  );
}

function BooksSection() {
  return (
    <section
      id="books"
      className="mx-auto max-w-[1240px] px-4 py-10 sm:px-6 lg:px-8"
    >
      <div className="relative overflow-hidden rounded-[34px] bg-[#1455f5] px-5 py-7 text-white shadow-[0_22px_70px_rgba(20,85,245,0.22)] sm:px-8 sm:py-9">
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px)] bg-size-[32px_32px] opacity-30" />
        <div className="relative flex flex-wrap items-start justify-between gap-6">
          <div className="order-2 flex-1 lg:order-1">
            <SectionHeader
              title="کتاب‌های ماز"
              subtitle="مجموعه‌ای از کتاب‌های آموزشی و کمک‌آموزشی ویژه مدارس برتر"
              action="مشاهده همه"
            />
          </div>
          <div className="order-1 flex shrink-0 items-center gap-3 lg:order-2">
            <div className="rounded-3xl bg-[#33c463] px-4 py-3 text-center shadow-[0_14px_30px_rgba(10,47,17,0.2)]">
              <div className="text-3xl font-black">۳۰</div>
              <div className="text-xs font-bold">کتاب منتشر شده</div>
            </div>
          </div>
        </div>

        <div className="relative mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-5">
          <article className="flex min-h-[255px] flex-col justify-between rounded-[26px] border border-white/15 bg-white/12 p-5 backdrop-blur-sm">
            <div>
              <span className="rounded-full bg-white/15 px-3 py-1 text-xs font-black">
                دسته منتخب
              </span>
              <h3 className="mt-4 text-2xl font-black leading-10">
                لیست همه کتاب‌های جدید ماز
              </h3>
            </div>
            <p className="text-sm leading-8 text-white/80">
              گروه آموزش ماز مجموعه‌ای از کتاب‌های آموزشی کشور را در چهار سال
              اخیر بر اساس نیاز مدارس برتر تولید کرده است.
            </p>
          </article>

          {books.map((book) => (
            <article
              key={book.id}
              className="overflow-hidden rounded-[26px] bg-white p-3 text-[#122b57] shadow-[0_18px_45px_rgba(6,32,95,0.18)]"
            >
              <div
                className={cn(
                  "relative flex aspect-[4/4.6] items-center justify-center rounded-[22px] bg-linear-to-br",
                  book.tone,
                )}
              >
                <Image
                  src={book.image}
                  alt={book.title}
                  fill
                  className="object-cover mix-blend-multiply opacity-90"
                  sizes="(max-width: 768px) 100vw, 20vw"
                />
              </div>
              <div className="px-2 pb-2 pt-4">
                <h3 className="text-base font-black">{book.title}</h3>
                <p className="mt-2 text-sm text-[#7b879c]">{book.status}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function ArticlesSection() {
  return (
    <section
      id="articles"
      className="mx-auto max-w-[1240px] px-4 py-10 sm:px-6 lg:px-8"
    >
      <SectionHeader
        title="آخرین مقالات سایت ماز"
        subtitle="تحلیل‌ها، گفتگوها و محتوای آموزشی تازه"
        action="مشاهده همه"
      />
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        {articles.map((article) => (
          <article
            key={article.id}
            className="overflow-hidden rounded-[28px] border border-[#e5e9f3] bg-white shadow-[0_14px_40px_rgba(15,41,97,0.07)] transition hover:-translate-y-1 hover:shadow-[0_18px_50px_rgba(15,41,97,0.12)]"
          >
            <div
              className="flex h-52 items-center justify-center"
              style={{ backgroundColor: article.tone }}
            >
              <ArticleIcon type={article.icon} />
            </div>
            <div className="space-y-3 p-5">
              <div className="flex items-center justify-between text-xs text-[#8f9bb0]">
                <span>{article.age}</span>
                <span className="rounded-full bg-[#fff1ec] px-3 py-1 font-black text-[#ff7d58]">
                  {article.category}
                </span>
              </div>
              <h3 className="min-h-16 text-base font-black leading-8 text-[#102b57]">
                {article.title}
              </h3>
              <Link
                href="#footer"
                className="inline-flex items-center gap-2 text-sm font-black text-[#1455f5] transition hover:gap-3"
              >
                ادامه مطلب
                <ArrowLeft className="h-4 w-4" />
              </Link>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function NewsletterSection() {
  return (
    <section className="mx-auto max-w-[1240px] px-4 py-10 sm:px-6 lg:px-8">
      <div className="overflow-hidden rounded-4xl bg-[#ffe486] px-5 py-8 shadow-[0_18px_50px_rgba(212,166,42,0.18)] sm:px-8">
        <div className="grid items-center gap-8 lg:grid-cols-[minmax(0,1fr)_220px]">
          <div className="space-y-5">
            <div className="space-y-2">
              <h2 className="text-2xl font-black text-[#5b4700]">
                دریافت آخرین اخبار و رویدادهای ماز
              </h2>
              <p className="max-w-3xl text-sm leading-8 text-[#7a630e]">
                برای اطلاع از زمان شروع کلاس‌ها، انتشار کتاب‌های جدید، زمان‌بندی
                آزمون‌ها و اخبار کمپ‌های آموزشی در خبرنامه ما عضو شوید.
              </p>
            </div>
            <form className="grid gap-3 md:grid-cols-[1fr_1fr_1.2fr_auto]">
              <select
                aria-label="پایه تحصیلی"
                className="h-12 rounded-2xl border border-[#f4d667] bg-white px-4 text-sm text-[#5b4700] outline-none transition focus:border-[#1455f5]"
                defaultValue=""
              >
                <option value="" disabled>
                  پایه تحصیلی
                </option>
                <option value="7">هفتم</option>
                <option value="8">هشتم</option>
                <option value="9">نهم</option>
              </select>
              <select
                aria-label="منطقه تحصیلی"
                className="h-12 rounded-2xl border border-[#f4d667] bg-white px-4 text-sm text-[#5b4700] outline-none transition focus:border-[#1455f5]"
                defaultValue=""
              >
                <option value="" disabled>
                  منطقه تحصیلی
                </option>
                <option value="tehran">تهران</option>
                <option value="karaj">کرج</option>
                <option value="mashhad">مشهد</option>
              </select>
              <Input
                type="email"
                placeholder="نشانی ایمیل"
                className="h-12 rounded-2xl border-[#f4d667] bg-white text-[#5b4700] placeholder:text-[#9d8530] focus-visible:border-[#1455f5]"
              />
              <Button
                type="submit"
                variant="default"
                shape="pill"
                className="h-12 bg-[#1f2b3d] px-6 text-white hover:bg-[#111827]"
              >
                ثبت
              </Button>
            </form>
          </div>

          <div className="relative mx-auto hidden h-44 w-44 lg:block">
            <div className="absolute inset-0 rounded-full bg-white/40 blur-2xl" />
            <div className="absolute left-8 top-10 h-24 w-24 rounded-full bg-[#b7ff9a]" />
            <div className="absolute left-0 top-16 h-10 w-10 rounded-full bg-[#ffe05d]" />
            <div className="absolute right-3 top-12 h-12 w-12 rounded-full bg-[#8be86d]" />
            <div className="absolute bottom-4 left-10 flex h-20 w-20 items-center justify-center rounded-3xl bg-white shadow-[0_14px_30px_rgba(91,71,0,0.15)]">
              <BookOpen className="h-9 w-9 text-[#d7a000]" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function FooterSection() {
  return (
    <footer id="footer" className="border-t border-[#e6ebf5] bg-white/80">
      <div className="mx-auto max-w-[1240px] px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid gap-8 border-b border-[#edf1f7] pb-8 lg:grid-cols-[220px_220px_minmax(0,1fr)]">
          {footerColumns.map((column) => (
            <div key={column.id}>
              <h3 className="mb-4 text-lg font-black text-[#102b57]">
                {column.title}
              </h3>
              <ul className="space-y-3 text-sm text-[#6f7f99]">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="transition hover:text-[#1455f5]"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div className="space-y-4">
            <h3 className="text-lg font-black text-[#102b57]">
              گروه آموزشی ماز
            </h3>
            <p className="text-sm leading-8 text-[#6f7f99]">
              ماز از سال ۱۳۹۲ با هدف توسعه آموزش باکیفیت برای دانش‌آموزان مدارس
              برتر شکل گرفته و امروز با دوره‌های آنلاین، بانک آزمون، کتاب‌های
              اختصاصی و تیم پشتیبانی تخصصی به خانواده‌ها خدمات ارائه می‌کند.
            </p>
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="flex items-center gap-3 rounded-[20px] border border-[#e8edf7] bg-[#f8fbff] px-4 py-3 text-sm text-[#24406f]">
                <Phone className="h-4 w-4 text-[#1455f5]" />
                <span>۰۲۱-۴۴۳۰۴۵۴۵</span>
              </div>
              <div className="flex items-center gap-3 rounded-[20px] border border-[#e8edf7] bg-[#f8fbff] px-4 py-3 text-sm text-[#24406f]">
                <MapPin className="h-4 w-4 text-[#1455f5]" />
                <span>تهران، بلوار مرزداران</span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-6 pt-8 lg:flex-row lg:items-end lg:justify-between">
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex h-20 w-20 items-center justify-center rounded-[22px] border border-[#e6ebf5] bg-white shadow-[0_10px_24px_rgba(15,41,97,0.06)]">
              <div className="grid h-12 w-12 place-items-center rounded-xl bg-[#1455f5] text-lg font-black text-white">
                e
              </div>
            </div>
            <div className="flex h-20 w-20 items-center justify-center rounded-[22px] border border-[#e6ebf5] bg-white shadow-[0_10px_24px_rgba(15,41,97,0.06)]">
              <div className="text-xs leading-6 text-[#6f7f99]">
                نماد
                <br />
                اعتماد
              </div>
            </div>
          </div>

          <div className="text-right">
            <div className="text-lg font-black text-[#102b57]">
              گروه آموزشی ماز
            </div>
            <div className="mt-2 text-sm leading-7 text-[#7f8da5]">
              تمامی حقوق این لندینگ جدید متعلق به گروه آموزشی ماز است.
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default function BiomazeLandingPage() {
  return (
    <div className="min-h-screen bg-[#f3f4f6] text-[#102b57]">
      <NoticeBar />
      <MainNavigation />
      <main>
        <HeroSection />
        <ProductsSection />
        <BooksSection />
        <ArticlesSection />
        <NewsletterSection />
      </main>
      <FooterSection />
    </div>
  );
}
