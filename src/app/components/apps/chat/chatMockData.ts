// ─────────────────────────────────────────────
// Chat App — Mock Data
// ─────────────────────────────────────────────

export type MessageType = "text" | "image";

export interface ChatMessage {
  id: string;
  senderId: string;
  type: MessageType;
  text?: string;
  image?: string;
  time: string; // e.g. "5 hours ago"
  timestamp: number; // unix for ordering
}

export interface ChatContact {
  id: string;
  name: string;
  role: string;
  avatar: string; // emoji avatar placeholder (for demo)
  online: boolean;
  lastMessage: string;
  lastTime: string;
  unread?: number;
  messages: ChatMessage[];
}

export interface MediaItem {
  id: string;
  src: string;
  alt: string;
}

export interface AttachmentItem {
  id: string;
  name: string;
  size: string;
  type: "pdf" | "fig" | "html" | "zip" | "doc" | "js";
}

// ── Current user ──────────────────────────────
export const ME = {
  id: "me",
  name: "Mathew Anderson",
  role: "Designer",
  avatar: "MA",
};

// ── Contacts ──────────────────────────────────
export const CONTACTS: ChatContact[] = [
  {
    id: "c1",
    name: "James Johnson",
    role: "Developer",
    avatar: "JJ",
    online: true,
    lastMessage: "You: Zudpo umi ivubaz iru...",
    lastTime: "4 hours",
    unread: 0,
    messages: [
      {
        id: "m1",
        senderId: "c1",
        type: "text",
        text: "Vuged rata fej lofah lecgo.",
        time: "5 hours ago",
        timestamp: 1,
      },
      {
        id: "m2",
        senderId: "c1",
        type: "text",
        text: "Ci ezaifre puasved bedobov udmacod nuffozluv not vuhesav zeaga haknolrew.",
        time: "4 hours ago",
        timestamp: 2,
      },
      {
        id: "m3",
        senderId: "me",
        type: "text",
        text: "Fo moprejoka usoof kuc gifejow.",
        time: "4 hours ago",
        timestamp: 3,
      },
      {
        id: "m4",
        senderId: "me",
        type: "image",
        image: "/images/products/s1.jpg",
        time: "4 hours ago",
        timestamp: 4,
      },
      {
        id: "m5",
        senderId: "c1",
        type: "text",
        text: "Zudpo umi ivubaz iru dupih nit kiw. Omezov aru gig ine.",
        time: "4 hours ago",
        timestamp: 5,
      },
    ],
  },
  {
    id: "c2",
    name: "Maria Hernandez",
    role: "Designer",
    avatar: "MH",
    online: false,
    lastMessage: "Apbalceg ca kamafus...",
    lastTime: "4 hours",
    unread: 2,
    messages: [
      {
        id: "m1",
        senderId: "c2",
        type: "text",
        text: "Apbalceg ca kamafus tewugi.",
        time: "4 hours ago",
        timestamp: 1,
      },
      {
        id: "m2",
        senderId: "me",
        type: "text",
        text: "Sure, let me check that for you.",
        time: "4 hours ago",
        timestamp: 2,
      },
    ],
  },
  {
    id: "c3",
    name: "David Smith",
    role: "Manager",
    avatar: "DS",
    online: true,
    lastMessage: "You: Tahtin rooja fevad...",
    lastTime: "4 hours",
    messages: [
      {
        id: "m1",
        senderId: "me",
        type: "text",
        text: "Tahtin rooja fevad ozahe.",
        time: "4 hours ago",
        timestamp: 1,
      },
      {
        id: "m2",
        senderId: "c3",
        type: "text",
        text: "Got it! Will send the files soon.",
        time: "3 hours ago",
        timestamp: 2,
      },
    ],
  },
  {
    id: "c4",
    name: "Maria Rodriguez",
    role: "HR",
    avatar: "MR",
    online: false,
    lastMessage: "Pogbu tazemu si weukho...",
    lastTime: "4 hours",
    unread: 1,
    messages: [
      {
        id: "m1",
        senderId: "c4",
        type: "text",
        text: "Pogbu tazemu si weukho zaveg.",
        time: "4 hours ago",
        timestamp: 1,
      },
    ],
  },
  {
    id: "c5",
    name: "Robert Smith",
    role: "Designer",
    avatar: "RS",
    online: true,
    lastMessage: "You: Viige ofsorod neufi...",
    lastTime: "4 hours",
    messages: [
      {
        id: "m1",
        senderId: "me",
        type: "text",
        text: "Viige ofsorod neufi kilep.",
        time: "4 hours ago",
        timestamp: 1,
      },
      {
        id: "m2",
        senderId: "c5",
        type: "text",
        text: "Understood. I'll handle it.",
        time: "3 hours ago",
        timestamp: 2,
      },
    ],
  },
  {
    id: "c6",
    name: "Emily Clark",
    role: "QA",
    avatar: "EC",
    online: false,
    lastMessage: "Let me know when it's ready.",
    lastTime: "1 day",
    messages: [
      {
        id: "m1",
        senderId: "c6",
        type: "text",
        text: "Let me know when it's ready.",
        time: "1 day ago",
        timestamp: 1,
      },
    ],
  },
];

// ── Media attachments for active chat (James Johnson) ─────
export const MEDIA_ITEMS: MediaItem[] = [
  { id: "img1", src: "/images/products/s1.jpg", alt: "product" },
];

export const ATTACHMENT_ITEMS: AttachmentItem[] = [
  { id: "a1", name: "service-task.pdf", size: "2MB", type: "pdf" },
  { id: "a2", name: "homepage-design.fig", size: "3MB", type: "fig" },
  { id: "a3", name: "about-us.html", size: "1KB", type: "html" },
  { id: "a4", name: "work-project.zip", size: "20MB", type: "zip" },
];

// ── Avatar colour map ──────────────────────────
export const AVATAR_COLORS: Record<string, string> = {
  JJ: "from-blue-500 to-cyan-400",
  MH: "from-orange-400 to-amber-300",
  DS: "from-gray-600 to-gray-400",
  MR: "from-emerald-500 to-teal-400",
  RS: "from-red-400 to-rose-300",
  EC: "from-violet-500 to-purple-400",
  MA: "from-indigo-500 to-blue-400",
};
