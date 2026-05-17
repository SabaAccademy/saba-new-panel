"use client";

import { memo } from "react";
import { Icon } from "@iconify/react/dist/iconify.js";
import { type MediaItem, type AttachmentItem } from "./chatMockData";
import { type Translations, type Lang } from "./chatTranslations";

interface ChatInfoProps {
  media: MediaItem[];
  attachments: AttachmentItem[];
  t: Translations;
  lang: Lang;
}

const FILE_ICONS: Record<
  AttachmentItem["type"],
  { icon: string; bg: string; color: string }
> = {
  pdf: {
    icon: "solar:file-text-bold",
    bg: "bg-red-100 dark:bg-red-900/30",
    color: "text-red-500",
  },
  fig: {
    icon: "solar:palette-round-bold",
    bg: "bg-blue-100 dark:bg-blue-900/30",
    color: "text-blue-600",
  },
  html: {
    icon: "solar:code-bold",
    bg: "bg-violet-100 dark:bg-violet-900/30",
    color: "text-violet-600",
  },
  zip: {
    icon: "solar:zip-file-bold",
    bg: "bg-amber-100 dark:bg-amber-900/30",
    color: "text-amber-600",
  },
  doc: {
    icon: "solar:document-text-bold",
    bg: "bg-sky-100 dark:bg-sky-900/30",
    color: "text-sky-600",
  },
  js: {
    icon: "solar:code-circle-bold",
    bg: "bg-yellow-100 dark:bg-yellow-900/30",
    color: "text-yellow-500",
  },
};

const ChatInfo = memo(function ChatInfo({
  media,
  attachments,
  t,
  lang,
}: ChatInfoProps) {
  const dir = lang === "fa" ? "rtl" : "ltr";

  return (
    <aside
      className="w-[220px] shrink-0 flex flex-col border-l border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900 h-full overflow-y-auto"
      dir={dir}
    >
      {/* Media */}
      <div className="px-4 pt-5 pb-3">
        <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-200 mb-3">
          {t.media} ({media.length})
        </h3>
        <div className="grid grid-cols-2 gap-2">
          {media.map((item) => (
            <div
              key={item.id}
              className="aspect-square rounded-xl overflow-hidden bg-gray-100 dark:bg-gray-800"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={item.src}
                alt={item.alt}
                className="w-full h-full object-cover"
                onError={(e) =>
                  (e.currentTarget.src = "/images/products/s1.jpg")
                }
              />
            </div>
          ))}
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-gray-100 dark:border-gray-800 mx-4" />

      {/* Attachments */}
      <div className="px-4 pt-4 pb-6">
        <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-200 mb-3">
          {t.attachments} ({attachments.length})
        </h3>
        <div className="space-y-3">
          {attachments.map((att) => {
            const { icon, bg, color } = FILE_ICONS[att.type] ?? FILE_ICONS.doc;
            return (
              <div
                key={att.id}
                className="flex items-center gap-3 group cursor-pointer"
              >
                <div
                  className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${bg}`}
                >
                  <Icon icon={icon} width={18} className={color} />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-xs font-medium text-gray-700 dark:text-gray-200 truncate group-hover:text-blue-600 transition-colors">
                    {att.name}
                  </p>
                  <p className="text-[11px] text-gray-400">{att.size}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </aside>
  );
});

export default ChatInfo;
