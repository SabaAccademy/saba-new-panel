"use client";

import { memo, useRef, useEffect, useState } from "react";
import { Icon } from "@iconify/react/dist/iconify.js";
import { cn } from "@/lib/utils";
import {
  type ChatContact,
  type ChatMessage,
  AVATAR_COLORS,
} from "./chatMockData";
import { type Translations, type Lang } from "./chatTranslations";

interface ChatWindowProps {
  contact: ChatContact;
  messages: ChatMessage[];
  onSend: (text: string) => void;
  onToggleInfo: () => void;
  t: Translations;
  lang: Lang;
}

// ── Avatar (local copy to avoid cross-import complexity) ──────
function BubbleAvatar({ initials }: { initials: string }) {
  return (
    <div
      className={cn(
        "w-8 h-8 rounded-full bg-gradient-to-br flex items-center justify-center text-white text-xs font-bold shrink-0",
        AVATAR_COLORS[initials] ?? "from-gray-400 to-gray-500",
      )}
    >
      {initials.slice(0, 2)}
    </div>
  );
}

const ChatWindow = memo(function ChatWindow({
  contact,
  messages,
  onSend,
  onToggleInfo,
  t,
  lang,
}: ChatWindowProps) {
  const dir = lang === "fa" ? "rtl" : "ltr";
  const [draft, setDraft] = useState("");
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = () => {
    const txt = draft.trim();
    if (!txt) return;
    onSend(txt);
    setDraft("");
  };

  const handleKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div
      className="flex flex-col flex-1 min-w-0 h-full bg-white dark:bg-gray-900"
      dir={dir}
    >
      {/* ── Header ── */}
      <div className="flex items-center justify-between px-5 py-3.5 border-b border-gray-100 dark:border-gray-800 shrink-0">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div
              className={cn(
                "w-10 h-10 rounded-full bg-gradient-to-br flex items-center justify-center text-white text-sm font-bold",
                AVATAR_COLORS[contact.avatar] ?? "from-gray-400 to-gray-500",
              )}
            >
              {contact.avatar}
            </div>
            <span
              className={cn(
                "absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full border-2 border-white dark:border-gray-900",
                contact.online ? "bg-emerald-400" : "bg-gray-300",
              )}
            />
          </div>
          <div>
            <p className="font-semibold text-sm text-gray-800 dark:text-white">
              {contact.name}
            </p>
            <p
              className={cn(
                "text-xs font-medium",
                contact.online ? "text-emerald-500" : "text-gray-400",
              )}
            >
              {contact.online ? t.online : t.offline}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-1">
          <ActionBtn icon="solar:phone-linear" label={t.voiceCall} />
          <ActionBtn icon="solar:videocamera-linear" label={t.videoCall} />
          <ActionBtn
            icon="solar:hamburger-menu-linear"
            label={t.moreOptions}
            onClick={onToggleInfo}
          />
        </div>
      </div>

      {/* ── Messages ── */}
      <div className="flex-1 overflow-y-auto px-5 py-4 space-y-4">
        {messages.length === 0 && (
          <div className="flex items-center justify-center h-full">
            <p className="text-gray-400 text-sm">{t.noMessages}</p>
          </div>
        )}
        {messages.map((msg) => {
          const isMe = msg.senderId === "me";
          return (
            <MessageBubble
              key={msg.id}
              msg={msg}
              isMe={isMe}
              contactAvatar={contact.avatar}
              contactName={contact.name}
              myName={t.you}
              dir={dir}
            />
          );
        })}
        <div ref={bottomRef} />
      </div>

      {/* ── Input bar ── */}
      <div className="shrink-0 border-t border-gray-100 dark:border-gray-800 px-4 py-3 flex items-center gap-2 bg-white dark:bg-gray-900">
        <ActionBtn icon="solar:emoji-funny-square-linear" label={t.emoji} />
        <input
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={handleKey}
          placeholder={t.typeHere}
          className="flex-1 text-sm text-gray-600 dark:text-gray-300 bg-transparent outline-none placeholder:text-gray-400"
        />
        <div className="flex items-center gap-1">
          <ActionBtn
            icon="solar:send-2-linear"
            label={t.send}
            onClick={handleSend}
            active={!!draft.trim()}
          />
          <ActionBtn
            icon="solar:sticker-smile-circle-2-linear"
            label={t.gifSticker}
          />
          <ActionBtn icon="solar:paperclip-linear" label={t.attachment} />
          <ActionBtn icon="solar:microphone-3-linear" label={t.voiceMessage} />
        </div>
      </div>
    </div>
  );
});

// ── Sub-components ────────────────────────────
function ActionBtn({
  icon,
  label,
  onClick,
  active,
}: {
  icon: string;
  label: string;
  onClick?: () => void;
  active?: boolean;
}) {
  return (
    <button
      title={label}
      onClick={onClick}
      className={cn(
        "p-2 rounded-xl transition-colors",
        active
          ? "text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20"
          : "text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800",
      )}
    >
      <Icon icon={icon} width={20} />
    </button>
  );
}

interface BubbleProps {
  msg: ChatMessage;
  isMe: boolean;
  contactAvatar: string;
  contactName: string;
  myName: string;
  dir: "ltr" | "rtl";
}

function MessageBubble({
  msg,
  isMe,
  contactAvatar,
  contactName,
  dir,
}: BubbleProps) {
  const alignSelf = isMe
    ? dir === "rtl"
      ? "items-start"
      : "items-end"
    : dir === "rtl"
      ? "items-end"
      : "items-start";

  const bubbleSide = isMe
    ? dir === "rtl"
      ? "flex-row-reverse"
      : "flex-row"
    : dir === "rtl"
      ? "flex-row"
      : "flex-row-reverse";

  const isReceived = !isMe;

  return (
    <div className={cn("flex flex-col gap-1", alignSelf)}>
      {/* sender + time */}
      <div
        className={cn(
          "flex items-center gap-2 text-xs text-gray-400",
          isMe
            ? dir === "rtl"
              ? "flex-row-reverse"
              : "flex-row"
            : dir === "rtl"
              ? "flex-row"
              : "flex-row-reverse",
        )}
      >
        {isReceived ? <BubbleAvatar initials={contactAvatar} /> : null}
        <span>{contactName}</span>
        <span>·</span>
        <span>{msg.time}</span>
      </div>

      {/* bubble */}
      <div className={cn("flex items-end gap-2", bubbleSide)}>
        {isMe ? null : null /* avatar already shown in header row */}
        {msg.type === "image" && msg.image ? (
          <div
            className={cn(
              "rounded-2xl overflow-hidden max-w-[220px] shadow-sm",
              isMe ? "rounded-br-sm" : "rounded-bl-sm",
            )}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={msg.image}
              alt="shared"
              className="w-full h-auto object-cover"
              onError={(e) => (e.currentTarget.src = "/images/products/s1.jpg")}
            />
          </div>
        ) : (
          <p
            className={cn(
              "px-4 py-2.5 rounded-2xl text-sm max-w-sm leading-relaxed shadow-sm",
              isMe
                ? "bg-blue-50 dark:bg-blue-900/30 text-blue-900 dark:text-blue-100 rounded-br-sm"
                : "bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-100 rounded-bl-sm",
            )}
          >
            {msg.text}
          </p>
        )}
      </div>
    </div>
  );
}

export default ChatWindow;
