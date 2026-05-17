"use client";

import { memo } from "react";
import { Icon } from "@iconify/react/dist/iconify.js";
import { cn } from "@/lib/utils";
import { type ChatContact, AVATAR_COLORS, ME } from "./chatMockData";
import { type Translations, type Lang } from "./chatTranslations";

interface ChatSidebarProps {
  contacts: ChatContact[];
  activeId: string;
  onSelect: (id: string) => void;
  search: string;
  onSearch: (v: string) => void;
  t: Translations;
  lang: Lang;
}

// ── Avatar helper ────────────────────────────────────────────
function Avatar({
  initials,
  online,
  size = "md",
}: {
  initials: string;
  online?: boolean;
  size?: "sm" | "md";
}) {
  const sizeClass = size === "sm" ? "w-8 h-8 text-xs" : "w-10 h-10 text-sm";
  return (
    <div className="relative shrink-0">
      <div
        className={cn(
          "rounded-full bg-gradient-to-br flex items-center justify-center text-white font-bold",
          sizeClass,
          AVATAR_COLORS[initials] ?? "from-gray-400 to-gray-500",
        )}
      >
        {initials.slice(0, 2)}
      </div>
      {online !== undefined && (
        <span
          className={cn(
            "absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full border-2 border-white dark:border-gray-900",
            online ? "bg-emerald-400" : "bg-gray-300",
          )}
        />
      )}
    </div>
  );
}

const ChatSidebar = memo(function ChatSidebar({
  contacts,
  activeId,
  onSelect,
  search,
  onSearch,
  t,
  lang,
}: ChatSidebarProps) {
  const dir = lang === "fa" ? "rtl" : "ltr";
  const filtered = contacts.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <aside
      className="w-[280px] shrink-0 flex flex-col border-r border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900 h-full"
      dir={dir}
    >
      {/* My profile header */}
      <div className="flex items-center justify-between px-4 py-4 border-b border-gray-100 dark:border-gray-800">
        <div className="flex items-center gap-3">
          <Avatar initials={ME.avatar} online size="md" />
          <div>
            <p className="font-semibold text-sm text-gray-800 dark:text-white leading-tight">
              {ME.name}
            </p>
            <p className="text-xs text-gray-400">
              {(t as Record<string, string>)[`role_${ME.role.toLowerCase()}`] ??
                ME.role}
            </p>
          </div>
        </div>
        <button className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 p-1 rounded-lg transition-colors">
          <Icon icon="solar:menu-dots-bold" width={18} />
        </button>
      </div>

      {/* Search */}
      <div className="px-4 py-3">
        <div className="relative">
          <Icon
            icon="solar:magnifer-linear"
            width={16}
            className={cn(
              "absolute top-1/2 -translate-y-1/2 text-gray-400",
              lang === "fa" ? "right-3" : "left-3",
            )}
          />
          <input
            value={search}
            onChange={(e) => onSearch(e.target.value)}
            placeholder={t.search}
            className={cn(
              "w-full py-2 text-sm rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-700 dark:text-gray-200 outline-none focus:border-blue-400 transition-colors",
              lang === "fa" ? "pr-9 pl-3" : "pl-9 pr-3",
            )}
          />
        </div>
      </div>

      {/* Section label */}
      <div className="flex items-center gap-1 px-4 mb-2">
        <span className="text-xs font-semibold text-gray-500 dark:text-gray-400">
          {t.recentChats}
        </span>
        <Icon
          icon="solar:alt-arrow-down-linear"
          width={14}
          className="text-gray-400"
        />
      </div>

      {/* Contact list */}
      <div className="flex-1 overflow-y-auto">
        {filtered.map((contact) => (
          <button
            key={contact.id}
            onClick={() => onSelect(contact.id)}
            className={cn(
              "w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-800/60 transition-colors text-start",
              activeId === contact.id && "bg-blue-50 dark:bg-blue-900/20",
            )}
          >
            <Avatar initials={contact.avatar} online={contact.online} />
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-0.5">
                <span
                  className={cn(
                    "text-sm font-semibold truncate",
                    activeId === contact.id
                      ? "text-blue-600 dark:text-blue-400"
                      : "text-gray-800 dark:text-white",
                  )}
                >
                  {contact.name}
                </span>
                <span className="text-[11px] text-gray-400 shrink-0 ms-1">
                  {contact.lastTime}
                </span>
              </div>
              <div className="flex items-center justify-between gap-1">
                <p className="text-xs text-gray-400 truncate">
                  {contact.lastMessage.startsWith("You:")
                    ? `${t.you}: ${contact.lastMessage.slice(4).trim()}`
                    : contact.lastMessage}
                </p>
                {contact.unread ? (
                  <span className="shrink-0 w-4 h-4 rounded-full bg-blue-600 text-white text-[10px] flex items-center justify-center font-bold">
                    {contact.unread}
                  </span>
                ) : null}
              </div>
            </div>
          </button>
        ))}
      </div>
    </aside>
  );
});

export { Avatar };
export default ChatSidebar;
