// ─────────────────────────────────────────────
// Chat App — Multilingual Translations
// Supports: English (en) · Persian (fa)
// ─────────────────────────────────────────────

export type Lang = "en" | "fa";

export const LANGUAGES: {
  code: Lang;
  label: string;
  nativeLabel: string;
  dir: "ltr" | "rtl";
}[] = [
  { code: "en", label: "English", nativeLabel: "English", dir: "ltr" },
  { code: "fa", label: "Persian", nativeLabel: "فارسی", dir: "rtl" },
];

const translations = {
  en: {
    appTitle: "Chat App",
    recentChats: "Recent Chats",
    search: "Search",
    online: "online",
    offline: "offline",
    you: "You",
    typeHere: "Type here",
    send: "Send",
    media: "Media",
    attachments: "Attachments",
    today: "Today",
    yesterday: "Yesterday",
    noMessages: "No messages yet. Say hi! 👋",
    voiceCall: "Voice Call",
    videoCall: "Video Call",
    moreOptions: "More options",
    emoji: "Emoji",
    attachment: "Attachment",
    voiceMessage: "Voice message",
    gifSticker: "GIF / Sticker",
    role_designer: "Designer",
    role_developer: "Developer",
    role_manager: "Manager",
    role_hr: "HR",
    role_qa: "QA",
    language: "Language",
    hours_ago: "hours ago",
    hour_ago: "hour ago",
    minutes_ago: "minutes ago",
    just_now: "just now",
    day_ago: "day ago",
    days_ago: "days ago",
  },
  fa: {
    appTitle: "پیام‌رسان",
    recentChats: "گفتگوهای اخیر",
    search: "جستجو",
    online: "آنلاین",
    offline: "آفلاین",
    you: "شما",
    typeHere: "پیام بنویسید...",
    send: "ارسال",
    media: "رسانه",
    attachments: "پیوست‌ها",
    today: "امروز",
    yesterday: "دیروز",
    noMessages: "هنوز پیامی نیست. سلام بگو! 👋",
    voiceCall: "تماس صوتی",
    videoCall: "تماس تصویری",
    moreOptions: "بیشتر",
    emoji: "شکلک",
    attachment: "پیوست",
    voiceMessage: "پیام صوتی",
    gifSticker: "GIF / استیکر",
    role_designer: "طراح",
    role_developer: "توسعه‌دهنده",
    role_manager: "مدیر",
    role_hr: "منابع انسانی",
    role_qa: "تضمین کیفیت",
    language: "زبان",
    hours_ago: "ساعت پیش",
    hour_ago: "ساعت پیش",
    minutes_ago: "دقیقه پیش",
    just_now: "همین الان",
    day_ago: "روز پیش",
    days_ago: "روز پیش",
  },
} as const;

export type TranslationKey = keyof typeof translations.en;
// All locales share the same keys; use en as the canonical shape
export type Translations = { [K in TranslationKey]: string };

export function useTranslations(lang: Lang): Translations {
  return translations[lang] as Translations;
}

export default translations;
