"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  MapPin,
  Menu,
  Plus,
  Search,
  X,
} from "lucide-react";

import { cn } from "@/lib/utils";
import {
  categories,
  divarSections,
  sidebarCategories,
  DIVAR_RED,
  type DivarListing,
  type DivarSection,
  type SidebarCategory,
} from "./divar-data";

// ─── Header ─────────────────────────────────────────────────────────────────

function Header({ onMenuToggle }: { onMenuToggle: () => void }) {
  const [q, setQ] = useState("");

  return (
    <header className="fixed inset-x-0 top-0 z-50 bg-white" style={{ boxShadow: "0 1px 4px rgba(0,0,0,0.08)" }}>
      <div className="mx-auto flex h-14 max-w-[1280px] items-center gap-3 px-4 sm:px-6">
        {/* right: logo */}
        <Link
          href="/landing-divar"
          className="flex shrink-0 items-center gap-1.5"
          aria-label="دیوار"
        >
          {/* Divar wordmark style */}
          <span
            className="text-2xl font-black tracking-tight"
            style={{ color: DIVAR_RED }}
          >
            دیوار
          </span>
        </Link>

        {/* city selector */}
        <button
          className="hidden shrink-0 items-center gap-1 rounded-2xl border border-[#e0e0e0] bg-[#fafafa] px-3 py-1.5 text-sm font-bold text-[#333] transition hover:border-[#ccc] sm:flex"
        >
          <MapPin className="h-3.5 w-3.5" style={{ color: DIVAR_RED }} />
          تهران
          <ChevronDown className="h-3.5 w-3.5 text-[#888]" />
        </button>

        {/* search */}
        <div className="flex min-w-0 flex-1 items-center">
          <div className="flex w-full items-center overflow-hidden rounded-2xl bg-[#f5f5f5] border border-transparent transition focus-within:border-[#ddd] focus-within:bg-white">
            <button className="flex h-10 w-10 shrink-0 items-center justify-center text-[#888]">
              <Search className="h-4 w-4" />
            </button>
            <input
              type="search"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="جستجو در دیوار..."
              className="h-10 flex-1 bg-transparent text-sm text-[#333] placeholder-[#aaa] outline-none"
            />
            {q && (
              <button
                onClick={() => setQ("")}
                className="flex h-8 w-8 items-center justify-center rounded-full text-[#aaa] hover:text-[#666]"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* left: actions */}
        <div className="flex shrink-0 items-center gap-2">
          <Link
            href="#login"
            className="hidden text-sm font-bold text-[#444] transition hover:text-[#222] sm:block"
          >
            ورود / ثبت‌نام
          </Link>
          <Link
            href="#post"
            className="flex h-9 items-center gap-1.5 rounded-2xl px-4 text-sm font-black text-white transition hover:opacity-90"
            style={{ backgroundColor: DIVAR_RED }}
          >
            <Plus className="h-4 w-4" />
            ثبت آگهی
          </Link>
          <button
            onClick={onMenuToggle}
            className="flex h-9 w-9 items-center justify-center rounded-xl text-[#555] transition hover:bg-[#f0f0f0] sm:hidden"
          >
            <Menu className="h-5 w-5" />
          </button>
        </div>
      </div>
    </header>
  );
}

// ─── Sidebar ─────────────────────────────────────────────────────────────────

function SidebarItem({ cat, depth = 0 }: { cat: SidebarCategory; depth?: number }) {
  const [open, setOpen] = useState(depth === 0 && cat.id === "real-estate");
  const hasChildren = cat.children && cat.children.length > 0;

  return (
    <li>
      <button
        onClick={() => hasChildren && setOpen((v) => !v)}
        className={cn(
          "flex w-full items-center gap-2 rounded-xl px-3 py-2 text-right text-[13px] font-bold transition hover:bg-[#f5f5f5]",
          depth === 0 ? "text-[#222]" : "pr-6 text-[#444] font-semibold",
        )}
      >
        <span className="flex-1 text-right">{cat.label}</span>
        {hasChildren && (
          <ChevronDown
            className={cn("h-3.5 w-3.5 shrink-0 text-[#aaa] transition-transform", open && "rotate-180")}
          />
        )}
      </button>
      {hasChildren && open && (
        <ul className="mt-0.5 space-y-0.5">
          {cat.children!.map((child) => (
            <SidebarItem key={child.id} cat={child} depth={depth + 1} />
          ))}
        </ul>
      )}
    </li>
  );
}

function Sidebar({ mobileOpen, onClose }: { mobileOpen: boolean; onClose: () => void }) {
  return (
    <>
      {/* mobile backdrop */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/30 lg:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={cn(
          "fixed right-0 top-14 z-40 h-[calc(100vh-56px)] w-[240px] overflow-y-auto bg-white pb-10 transition-transform duration-300 lg:sticky lg:top-[70px] lg:h-[calc(100vh-70px)] lg:translate-x-0 lg:shadow-none",
          mobileOpen ? "translate-x-0 shadow-[−4px_0_20px_rgba(0,0,0,0.12)]" : "translate-x-full",
        )}
        style={{ borderLeft: "1px solid #f0f0f0" }}
      >
        <div className="px-3 py-4">
          <p className="mb-2 px-3 text-xs font-black uppercase tracking-widest text-[#aaa]">دسته‌بندی‌ها</p>
          <ul className="space-y-0.5">
            {sidebarCategories.map((cat) => (
              <SidebarItem key={cat.id} cat={cat} />
            ))}
          </ul>
        </div>
      </aside>
    </>
  );
}

// ─── Category strip ──────────────────────────────────────────────────────────

function CategoryStrip() {
  const [active, setActive] = useState("all");

  return (
    <div
      className="no-scrollbar flex gap-2 overflow-x-auto pb-1"
      style={{ scrollbarWidth: "none" }}
    >
      <button
        onClick={() => setActive("all")}
        className={cn(
          "flex shrink-0 flex-col items-center gap-1.5 rounded-2xl border px-4 py-3 transition",
          active === "all"
            ? "border-transparent text-white"
            : "border-[#e5e5e5] bg-white text-[#444] hover:border-[#ccc]",
        )}
        style={active === "all" ? { backgroundColor: DIVAR_RED } : undefined}
      >
        <span className="text-lg leading-none">🔍</span>
        <span className="text-[11px] font-bold whitespace-nowrap">همه</span>
      </button>
      {categories.map((cat) => (
        <button
          key={cat.id}
          onClick={() => setActive(cat.id)}
          className={cn(
            "flex shrink-0 flex-col items-center gap-1.5 rounded-2xl border px-4 py-3 transition",
            active === cat.id
              ? "border-transparent text-white"
              : "border-[#e5e5e5] bg-white text-[#444] hover:border-[#ccc]",
          )}
          style={active === cat.id ? { backgroundColor: cat.color ?? DIVAR_RED } : undefined}
        >
          <span className="text-lg leading-none">{cat.icon}</span>
          <span className="text-[11px] font-bold whitespace-nowrap">{cat.label}</span>
        </button>
      ))}
    </div>
  );
}

// ─── Listing card ─────────────────────────────────────────────────────────────

function ListingCard({ listing }: { listing: DivarListing }) {
  return (
    <Link
      href="#"
      className="group flex flex-col overflow-hidden rounded-[16px] bg-white transition hover:shadow-[0_8px_30px_rgba(0,0,0,0.1)] hover:-translate-y-0.5"
      style={{ border: "1px solid #ebebeb" }}
    >
      {/* thumbnail */}
      <div
        className="relative aspect-[4/3] w-full overflow-hidden"
        style={{ backgroundColor: listing.thumbnailBg }}
      >
        <Image
          src={listing.thumbnail}
          alt={listing.thumbnailAlt}
          fill
          className="object-cover transition duration-300 group-hover:scale-[1.04]"
          sizes="(max-width:640px) 50vw,(max-width:1024px) 33vw,22vw"
        />

        {/* badge */}
        {listing.badge && (
          <div
            className="absolute right-2 top-2 rounded-lg px-2 py-0.5 text-[10px] font-black text-white"
            style={{ backgroundColor: listing.badge === "vip" ? "#f59e0b" : DIVAR_RED }}
          >
            {listing.badge === "vip" ? "ویژه" : "فوری"}
          </div>
        )}
      </div>

      {/* content */}
      <div className="flex flex-1 flex-col gap-1.5 p-3">
        <h3 className="line-clamp-2 text-[13px] font-bold leading-5 text-[#1a1a1a] transition group-hover:text-[color:var(--dr)]"
          style={{ "--dr": DIVAR_RED } as React.CSSProperties}>
          {listing.title}
        </h3>

        {/* price */}
        <div
          className="text-[14px] font-black"
          style={{ color: listing.price ? DIVAR_RED : "#666" }}
        >
          {listing.price ?? "توافقی"}
        </div>

        {/* footer */}
        <div className="mt-auto flex items-center justify-between">
          <div className="flex items-center gap-1 text-[11px] text-[#999]">
            <MapPin className="h-3 w-3 shrink-0" />
            <span>{listing.district ? `${listing.city} · ${listing.district}` : listing.city}</span>
          </div>
          <span className="text-[11px] text-[#bbb]">{listing.age}</span>
        </div>
      </div>
    </Link>
  );
}

// ─── Section ─────────────────────────────────────────────────────────────────

function Section({ section }: { section: DivarSection }) {
  return (
    <section id={section.id} className="mb-8">
      {/* section header */}
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span
            className="h-5 w-1 rounded-full"
            style={{ backgroundColor: DIVAR_RED }}
          />
          <h2 className="text-[15px] font-black text-[#1a1a1a]">{section.label}</h2>
        </div>
        <Link
          href={section.href}
          className="flex items-center gap-0.5 text-[12px] font-bold transition hover:underline"
          style={{ color: DIVAR_RED }}
        >
          مشاهده همه
          <ChevronLeft className="h-3.5 w-3.5" />
        </Link>
      </div>

      {/* grid */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 xl:grid-cols-4">
        {section.listings.map((listing) => (
          <ListingCard key={listing.id} listing={listing} />
        ))}
      </div>
    </section>
  );
}

// ─── Promo banner ─────────────────────────────────────────────────────────────

function PromoBanner() {
  return (
    <div
      className="relative mb-6 flex flex-col items-start justify-between gap-4 overflow-hidden rounded-[20px] p-5 sm:flex-row sm:items-center"
      style={{ background: "linear-gradient(120deg,#fff5f6 0%,#ffe8eb 100%)", border: `1px solid #ffd0d6` }}
    >
      {/* decor circle */}
      <div
        className="absolute -left-12 -top-12 h-48 w-48 rounded-full opacity-10"
        style={{ backgroundColor: DIVAR_RED }}
      />
      <div className="relative space-y-1.5">
        <p className="text-[11px] font-black uppercase tracking-widest" style={{ color: DIVAR_RED }}>
          دیوار
        </p>
        <h3 className="text-lg font-black text-[#1a1a1a]">
          آگهی رایگان ثبت کنید!
        </h3>
        <p className="max-w-xs text-sm text-[#555]">
          هر چیزی که می‌خواهید بفروشید را در دیوار آگهی کنید — رایگان، سریع و آسان
        </p>
      </div>
      <Link
        href="#post"
        className="relative flex shrink-0 items-center gap-2 rounded-2xl px-6 py-3 text-sm font-black text-white shadow-[0_8px_24px_rgba(239,57,78,0.3)] transition hover:opacity-90"
        style={{ backgroundColor: DIVAR_RED }}
      >
        <Plus className="h-4 w-4" />
        ثبت آگهی رایگان
      </Link>
    </div>
  );
}

// ─── Ad tips / stats bar ──────────────────────────────────────────────────────

function StatsBar() {
  const stats = [
    { label: "آگهی فعال", value: "۴.۲ میلیون" },
    { label: "بازدید روزانه", value: "+۱۴ میلیون" },
    { label: "شهر فعال", value: "۵۳۰+" },
    { label: "کاربر ثبت‌نام شده", value: "+۴۵ میلیون" },
  ];

  return (
    <div className="mb-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
      {stats.map((s) => (
        <div
          key={s.label}
          className="flex flex-col items-center justify-center rounded-[16px] bg-white py-4 text-center"
          style={{ border: "1px solid #f0f0f0" }}
        >
          <span className="text-xl font-black" style={{ color: DIVAR_RED }}>
            {s.value}
          </span>
          <span className="mt-0.5 text-[12px] text-[#777]">{s.label}</span>
        </div>
      ))}
    </div>
  );
}

// ─── Root ────────────────────────────────────────────────────────────────────

export default function DivarLandingPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#f5f5f5]" style={{ direction: "rtl" }}>
      <style>{`* { scrollbar-width: thin; } *::-webkit-scrollbar { width: 4px; height: 4px; } *::-webkit-scrollbar-thumb { background: #ddd; border-radius: 9px; }`}</style>

      <Header onMenuToggle={() => setMobileMenuOpen((v) => !v)} />

      {/* layout */}
      <div className="mx-auto flex max-w-[1280px] gap-0" style={{ paddingTop: 56 }}>
        {/* sidebar */}
        <Sidebar
          mobileOpen={mobileMenuOpen}
          onClose={() => setMobileMenuOpen(false)}
        />

        {/* main */}
        <main className="min-w-0 flex-1 px-4 py-5 sm:px-6 lg:px-8">
          {/* categories */}
          <CategoryStrip />

          <div className="mt-5">
            <PromoBanner />
            <StatsBar />

            {divarSections.map((section) => (
              <Section key={section.id} section={section} />
            ))}
          </div>
        </main>
      </div>

      {/* footer */}
      <footer className="border-t border-[#e5e5e5] bg-white py-8 text-center">
        <div className="mx-auto max-w-[1280px] px-4">
          <div className="mb-3 text-xl font-black" style={{ color: DIVAR_RED }}>دیوار</div>
          <p className="text-sm text-[#888]">
            بزرگ‌ترین سایت آگهی و نیازمندی‌های کشور · تمامی حقوق محفوظ است © ۱۴۰۵
          </p>
          <div className="mt-4 flex flex-wrap items-center justify-center gap-4 text-[13px] text-[#555]">
            {["قوانین و مقررات", "حریم خصوصی", "تماس با ما", "درباره دیوار", "راهنما"].map((l) => (
              <Link key={l} href="#" className="transition hover:underline">{l}</Link>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}
