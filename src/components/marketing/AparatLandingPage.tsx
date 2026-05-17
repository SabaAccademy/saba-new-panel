"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import {
  BadgeCheck,
  Bell,
  Car,
  ChevronLeft,
  ChevronRight,
  Clapperboard,
  Clock,
  Cpu,
  Film,
  Gamepad2,
  GraduationCap,
  Heart,
  History,
  Home,
  MapPin,
  Menu,
  Music,
  Newspaper,
  Play,
  Search,
  Smile,
  Trophy,
  Tv2,
  Upload,
  Utensils,
  X,
} from "lucide-react";

import { cn } from "@/lib/utils";
import {
  aparatSections,
  headerCategories,
  sidebarItems,
  topChannels,
  APARAT_RED,
  type AparatSection,
  type AparatVideo,
} from "./aparat-data";

// ─── Constants ───────────────────────────────────────────────────────────────
const SIDEBAR_FULL = 230;
const SIDEBAR_ICON = 64;

// ─── Icon resolver ────────────────────────────────────────────────────────────
const ICONS: Record<string, React.ElementType> = {
  home: Home,
  tv2: Tv2,
  clock: Clock,
  history: History,
  heart: Heart,
  clapperboard: Clapperboard,
  trophy: Trophy,
  newspaper: Newspaper,
  "graduation-cap": GraduationCap,
  music: Music,
  smile: Smile,
  film: Film,
  "map-pin": MapPin,
  cpu: Cpu,
  gamepad2: Gamepad2,
  utensils: Utensils,
  car: Car,
};
function NavIcon({ name }: { name: string }) {
  const I = ICONS[name] ?? Home;
  return <I className="h-5 w-5 shrink-0" />;
}

// ─── Sidebar ──────────────────────────────────────────────────────────────────
function Sidebar({ open }: { open: boolean }) {
  return (
    <aside
      className="fixed right-0 top-[98px] z-30 hidden h-[calc(100vh-98px)] overflow-y-auto overflow-x-hidden bg-white lg:block"
      style={{
        width: open ? SIDEBAR_FULL : SIDEBAR_ICON,
        borderLeft: "1px solid #ebebeb",
        transition: "width 220ms ease",
      }}
    >
      <nav className="pb-8 pt-3">
        {sidebarItems.map((item) => {
          const active = item.active;
          return (
            <Link
              key={item.id}
              href={item.href}
              title={!open ? item.label : undefined}
              className="flex items-center gap-3 px-3 py-[9px] text-[13px] font-bold transition-colors hover:bg-[#fafafa]"
              style={{ color: active ? APARAT_RED : "#444" }}
            >
              <span
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl transition"
                style={
                  active ? { backgroundColor: `${APARAT_RED}15` } : undefined
                }
              >
                <NavIcon name={item.icon} />
              </span>
              {open && <span className="min-w-0 truncate">{item.label}</span>}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}

// ─── Header ───────────────────────────────────────────────────────────────────
function Header({ open, onToggle }: { open: boolean; onToggle: () => void }) {
  const [q, setQ] = useState("");
  return (
    <header
      className="fixed inset-x-0 top-0 z-40 bg-white"
      style={{ borderBottom: "1px solid #ebebeb" }}
    >
      {/* main bar */}
      <div className="flex h-[58px] items-center gap-2 px-3 sm:gap-3 sm:px-4">
        {/* right: toggle + logo */}
        <div className="flex shrink-0 items-center gap-2">
          <button
            onClick={onToggle}
            className="flex h-9 w-9 items-center justify-center rounded-xl text-[#555] transition hover:bg-[#f5f5f5]"
          >
            <Menu className="h-5 w-5" />
          </button>
          <Link href="/landing-aparat" className="flex items-center gap-2">
            <div
              className="flex h-8 w-8 items-center justify-center rounded-lg font-black text-base text-white"
              style={{ backgroundColor: APARAT_RED }}
            >
              آ
            </div>
            <span
              className="hidden text-[17px] font-black sm:block"
              style={{ color: APARAT_RED }}
            >
              آپارات
            </span>
          </Link>
        </div>

        {/* center: search */}
        <div className="flex flex-1 justify-center px-2">
          <div className="flex w-full max-w-[520px] items-center overflow-hidden rounded-2xl bg-[#f5f5f5] border border-[#e5e5e5] focus-within:border-[#ccc] focus-within:bg-white transition">
            <button className="flex h-10 w-10 shrink-0 items-center justify-center text-[#888]">
              <Search className="h-4 w-4" />
            </button>
            <input
              type="search"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="جستجو در آپارات"
              className="h-10 flex-1 bg-transparent pr-1 text-sm text-gray-700 placeholder-gray-400 outline-none"
            />
            {q && (
              <button
                onClick={() => setQ("")}
                className="flex h-8 w-8 items-center justify-center rounded-full text-gray-400"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* left: actions */}
        <div className="flex shrink-0 items-center gap-1.5">
          <button className="flex h-9 w-9 items-center justify-center rounded-xl text-[#555] hover:bg-[#f5f5f5]">
            <Bell className="h-4.5 w-4.5" />
          </button>
          <button
            className="hidden h-9 items-center gap-1.5 rounded-xl border px-3 text-xs font-bold hover:bg-[#fff5f5] sm:flex"
            style={{ borderColor: APARAT_RED, color: APARAT_RED }}
          >
            <Upload className="h-3.5 w-3.5" />
            آپلود
          </button>
          <button
            className="h-9 rounded-xl px-3 text-xs font-black text-white transition"
            style={{ backgroundColor: APARAT_RED }}
          >
            ورود
          </button>
        </div>
      </div>

      {/* categories strip */}
      <div
        className="flex h-[40px] items-center overflow-x-auto px-4"
        style={{ borderTop: "1px solid #f0f0f0", scrollbarWidth: "none" }}
      >
        {headerCategories.map((cat) => (
          <Link
            key={cat.id}
            href={cat.href}
            className="shrink-0 rounded-lg px-3 py-1 text-[13px] font-semibold text-[#444] hover:bg-[#f5f5f5] hover:text-[#222]"
          >
            {cat.label}
          </Link>
        ))}
      </div>
    </header>
  );
}

// ─── Video card ─────────────────────────────────────────────────────────────

const THUMB_BG = [
  "#1a1a2e",
  "#16213e",
  "#0f3460",
  "#533483",
  "#e94560",
  "#f5a623",
  "#7b2d8b",
  "#2ecc71",
  "#e67e22",
  "#2980b9",
  "#8e44ad",
  "#c0392b",
  "#27ae60",
  "#2c3e50",
  "#d35400",
  "#1abc9c",
  "#6c5ce7",
  "#fd79a8",
  "#00b894",
  "#e17055",
  "#0984e3",
  "#a29bfe",
];
function cardBg(id: string) {
  let h = 0;
  for (let i = 0; i < id.length; i++) h = id.charCodeAt(i) + h * 31;
  return THUMB_BG[Math.abs(h) % THUMB_BG.length];
}

function VideoCard({ video }: { video: AparatVideo }) {
  return (
    <article className="group cursor-pointer">
      <div
        className="relative aspect-video w-full overflow-hidden rounded-2xl"
        style={{ backgroundColor: cardBg(video.id) }}
      >
        <Image
          src={video.thumbnail}
          alt={video.thumbnailAlt}
          fill
          className="object-cover opacity-80 transition duration-300 group-hover:scale-[1.04] group-hover:opacity-90"
          sizes="(max-width:640px) 80vw,(max-width:1024px) 33vw,22vw"
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/55 via-transparent to-transparent" />
        <div className="absolute inset-0 flex items-center justify-center opacity-0 transition group-hover:opacity-100">
          <div
            className="flex h-11 w-11 items-center justify-center rounded-full shadow-lg"
            style={{ backgroundColor: APARAT_RED }}
          >
            <Play className="h-4 w-4 translate-x-0.5 text-white" />
          </div>
        </div>
        <div className="absolute bottom-2 left-2 rounded-md bg-black/75 px-1.5 py-0.5 text-[11px] font-bold text-white">
          {video.duration}
        </div>
      </div>
      <div className="mt-2.5 flex gap-2.5">
        <div
          className="relative mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center overflow-hidden rounded-full border-2 border-white shadow-sm text-[10px] font-black text-white"
          style={{ backgroundColor: cardBg(video.channel) }}
        >
          {video.channel.charAt(0)}
        </div>
        <div className="min-w-0 flex-1">
          <h3 className="line-clamp-2 text-[13px] font-bold leading-5 text-[#1a1a1a] transition group-hover:underline">
            {video.title}
          </h3>
          <div className="mt-1 flex items-center gap-1 text-[11px] text-[#666]">
            <span>{video.channel}</span>
            {video.channelVerified && (
              <BadgeCheck
                className="h-3 w-3 shrink-0"
                style={{ color: APARAT_RED }}
              />
            )}
          </div>
          <div className="mt-0.5 text-[11px] text-[#999]">
            {video.views} بازدید · {video.age}
          </div>
        </div>
      </div>
    </article>
  );
}

// ─── Sections ────────────────────────────────────────────────────────────────

function SectionHeader({ section }: { section: AparatSection }) {
  return (
    <div className="mb-3 flex items-center justify-between">
      <div className="flex items-center gap-2">
        <span
          className="h-5 w-[3px] rounded-full"
          style={{ backgroundColor: APARAT_RED }}
        />
        <h2 className="text-[15px] font-black text-[#1a1a1a]">
          {section.label}
        </h2>
      </div>
      <Link
        href={section.href}
        className="flex items-center gap-0.5 text-[12px] font-bold"
        style={{ color: APARAT_RED }}
      >
        مشاهده همه <ChevronLeft className="h-3.5 w-3.5" />
      </Link>
    </div>
  );
}

function CarouselSection({ section }: { section: AparatSection }) {
  return (
    <section id={section.id} className="mb-6">
      <div className="mb-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span
            className="h-5 w-[3px] rounded-full"
            style={{ backgroundColor: APARAT_RED }}
          />
          <h2 className="text-[15px] font-black text-[#1a1a1a]">
            {section.label}
          </h2>
        </div>
        <div className="flex items-center gap-2">
          <Link
            href={section.href}
            className="text-[12px] font-bold"
            style={{ color: APARAT_RED }}
          >
            مشاهده همه
          </Link>
          <div className="flex gap-1">
            <button className="flex h-7 w-7 items-center justify-center rounded-full border border-[#ddd] bg-white text-[#555] hover:border-[#e31c1c] hover:text-[#e31c1c]">
              <ChevronRight className="h-3.5 w-3.5" />
            </button>
            <button className="flex h-7 w-7 items-center justify-center rounded-full border border-[#ddd] bg-white text-[#555] hover:border-[#e31c1c] hover:text-[#e31c1c]">
              <ChevronLeft className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {section.videos.slice(0, 4).map((v) => (
          <VideoCard key={v.id} video={v} />
        ))}
      </div>
    </section>
  );
}

function GridSection({ section }: { section: AparatSection }) {
  return (
    <section id={section.id} className="mb-6">
      <SectionHeader section={section} />
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        {section.videos.slice(0, 3).map((v) => (
          <VideoCard key={v.id} video={v} />
        ))}
      </div>
    </section>
  );
}

// ─── Banner ──────────────────────────────────────────────────────────────────

function CompactBanner() {
  return (
    <div
      className="relative mb-5 flex items-center gap-4 overflow-hidden rounded-[22px] p-5 text-white"
      style={{
        background:
          "linear-gradient(125deg,#1a1a2e 0%,#16213e 60%,#0f3460 100%)",
      }}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(227,28,28,0.25),transparent_60%)]" />
      <div className="relative flex-1 space-y-2">
        <div
          className="text-[11px] font-black uppercase tracking-widest"
          style={{ color: APARAT_RED }}
        >
          آپارات
        </div>
        <div className="text-lg font-black leading-7">
          همه در
          <br />
          یک اپلیکیشن
        </div>
        <button
          className="flex h-8 items-center gap-1.5 rounded-xl px-3 text-xs font-black text-white"
          style={{ backgroundColor: APARAT_RED }}
        >
          ورود به برنامه
        </button>
      </div>
      <div className="relative shrink-0">
        <div className="relative flex h-36 w-[72px] items-start justify-center overflow-hidden rounded-[22px] border-4 border-white/20 bg-white/10 shadow-[0_12px_30px_rgba(0,0,0,0.4)]">
          <div className="absolute inset-x-0 top-0 flex items-center justify-center py-2">
            <div className="h-1.5 w-8 rounded-full bg-white/40" />
          </div>
          <div className="absolute inset-x-2 top-8 bottom-6 overflow-hidden rounded-xl bg-[#0a0a0a]">
            <div className="grid h-full grid-rows-3 gap-0.5">
              {[APARAT_RED, "#ff6b35", "#c00000"].map((c, i) => (
                <div
                  key={i}
                  className="relative overflow-hidden rounded-sm flex items-center justify-center"
                  style={{ backgroundColor: c }}
                >
                  <Play className="h-3 w-3 text-white opacity-70" />
                </div>
              ))}
            </div>
          </div>
          <div className="absolute bottom-1.5 left-1/2 h-1 w-8 -translate-x-1/2 rounded-full bg-white/40" />
        </div>
      </div>
    </div>
  );
}

// ─── Channels ────────────────────────────────────────────────────────────────

function ChannelsSection() {
  return (
    <section className="mb-6">
      <div className="mb-3 flex items-center gap-2">
        <span
          className="h-5 w-[3px] rounded-full"
          style={{ backgroundColor: APARAT_RED }}
        />
        <h2 className="text-[15px] font-black text-[#1a1a1a]">
          کانال‌های پربیننده
        </h2>
      </div>
      <div
        className="flex gap-3 overflow-x-auto pb-1"
        style={{ scrollbarWidth: "none" }}
      >
        {topChannels.map((ch) => (
          <Link
            key={ch.id}
            href="#"
            className="group flex shrink-0 flex-col items-center gap-1.5 rounded-[18px] border border-[#ebebeb] bg-white px-4 py-3 shadow-sm transition hover:border-[#ffd0d0] hover:shadow-[0_6px_20px_rgba(227,28,28,0.1)]"
          >
            <div
              className="relative h-12 w-12 overflow-hidden rounded-full border-2 flex items-center justify-center text-[11px] font-black text-white"
              style={{
                borderColor: APARAT_RED,
                backgroundColor: cardBg(ch.id),
              }}
            >
              <Image
                src={ch.avatar}
                alt={ch.name}
                fill
                className="object-cover"
                sizes="48px"
              />
            </div>
            <span className="max-w-[96px] truncate text-center text-[12px] font-black text-[#222]">
              {ch.name}
            </span>
            <span className="text-[10px] text-[#999]">{ch.subscribers}</span>
            <span
              className="rounded-full border px-2.5 py-0.5 text-[10px] font-black"
              style={{ borderColor: APARAT_RED, color: APARAT_RED }}
            >
              دنبال کردن
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}

// ─── Root ────────────────────────────────────────────────────────────────────

export default function AparatLandingPage() {
  const [open, setOpen] = useState(true);
  const sw = open ? SIDEBAR_FULL : SIDEBAR_ICON;
  const [first, ...rest] = aparatSections;

  return (
    <div className="min-h-screen bg-[#f4f4f4]" style={{ direction: "rtl" }}>
      <style>{`* { scrollbar-width: none; } *::-webkit-scrollbar { display: none; }`}</style>

      <Header open={open} onToggle={() => setOpen((v) => !v)} />

      <div className="flex" style={{ paddingTop: 98 }}>
        <Sidebar open={open} />

        <main
          className="min-w-0 flex-1 px-4 pt-5 pb-10 sm:px-5 lg:px-6"
          style={{ marginRight: sw, transition: "margin-right 220ms ease" }}
        >
          {/* top row: banner + first featured section */}
          <div className="mb-5 grid gap-4 lg:grid-cols-[200px_minmax(0,1fr)]">
            <CompactBanner />
            <CarouselSection section={first} />
          </div>

          <ChannelsSection />

          {rest.map((section) => (
            <GridSection key={section.id} section={section} />
          ))}
        </main>
      </div>

      <footer
        className="border-t border-[#e0e0e0] bg-white py-5 text-center text-[12px] text-[#aaa]"
        style={{ marginRight: sw, transition: "margin-right 220ms ease" }}
      >
        <div className="mb-1 text-sm font-black" style={{ color: APARAT_RED }}>
          آپارات
        </div>
        تمامی حقوق محفوظ است © ۱۴۰۵
      </footer>
    </div>
  );
}

// suppress-unused
void (null as unknown as AparatSection);
