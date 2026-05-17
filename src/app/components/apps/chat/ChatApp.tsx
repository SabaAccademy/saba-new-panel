"use client";

import { useState, useCallback } from "react";
import { Icon } from "@iconify/react/dist/iconify.js";
import { cn } from "@/lib/utils";

import ChatSidebar from "./ChatSidebar";
import ChatWindow from "./ChatWindow";
import ChatInfo from "./ChatInfo";

import {
  CONTACTS,
  MEDIA_ITEMS,
  ATTACHMENT_ITEMS,
  type ChatContact,
  type ChatMessage,
} from "./chatMockData";
import { useTranslations, LANGUAGES, type Lang } from "./chatTranslations";

// ─────────────────────────────────────────────
export default function ChatApp() {
  const [lang, setLang] = useState<Lang>("en");
  const [activeId, setActiveId] = useState<string>(CONTACTS[0].id);
  const [search, setSearch] = useState("");
  const [showInfo, setShowInfo] = useState(true);
  const [contacts, setContacts] = useState<ChatContact[]>(CONTACTS);

  const t = useTranslations(lang);
  const dir = lang === "fa" ? "rtl" : "ltr";

  const active = contacts.find((c) => c.id === activeId) ?? contacts[0];

  // ── Send a message ────────────────────────────
  const handleSend = useCallback(
    (text: string) => {
      const newMsg: ChatMessage = {
        id: `msg_${Date.now()}`,
        senderId: "me",
        type: "text",
        text,
        time: t.just_now,
        timestamp: Date.now(),
      };
      setContacts((prev) =>
        prev.map((c) =>
          c.id === active.id
            ? {
                ...c,
                messages: [...c.messages, newMsg],
                lastMessage: `You: ${text}`,
                lastTime: t.just_now,
              }
            : c,
        ),
      );
    },
    [active.id, t.just_now],
  );

  // ── Select contact ────────────────────────────
  const handleSelect = useCallback((id: string) => {
    setActiveId(id);
    setShowInfo(true);
  }, []);

  return (
    <div
      className="relative flex flex-col h-[calc(100vh-120px)] min-h-[540px]"
      dir={dir}
    >
      {/* ── Language Switcher (floating top-right relative to app) ── */}
      <div
        className={cn(
          "absolute top-0 z-20 flex items-center gap-1 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl shadow-sm px-2 py-1.5",
          dir === "rtl" ? "left-0" : "right-0",
        )}
      >
        <Icon icon="solar:global-linear" width={14} className="text-gray-400" />
        {LANGUAGES.map((l) => (
          <button
            key={l.code}
            onClick={() => setLang(l.code)}
            className={cn(
              "px-2.5 py-0.5 text-xs rounded-lg font-medium transition-colors",
              lang === l.code
                ? "bg-blue-600 text-white"
                : "text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800",
            )}
          >
            {l.nativeLabel}
          </button>
        ))}
      </div>

      {/* ── Main panel ── */}
      <div className="flex flex-1 min-h-0 rounded-2xl overflow-hidden border border-gray-100 dark:border-gray-800 shadow-sm mt-10">
        {/* Left: Contact list */}
        <ChatSidebar
          contacts={contacts}
          activeId={activeId}
          onSelect={handleSelect}
          search={search}
          onSearch={setSearch}
          t={t}
          lang={lang}
        />

        {/* Middle: Chat window */}
        <ChatWindow
          contact={active}
          messages={active.messages}
          onSend={handleSend}
          onToggleInfo={() => setShowInfo((v) => !v)}
          t={t}
          lang={lang}
        />

        {/* Right: Info panel */}
        {showInfo && (
          <ChatInfo
            media={MEDIA_ITEMS}
            attachments={ATTACHMENT_ITEMS}
            t={t}
            lang={lang}
          />
        )}
      </div>
    </div>
  );
}
