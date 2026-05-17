export type OrderStatus =
  | "در انتظار"
  | "تکمیل شده"
  | "ارسال شده"
  | "لغو شده"
  | "در حال پردازش";

export interface Order {
  id: string;
  customer: { name: string; avatar: string; email: string };
  status: OrderStatus;
  date: string;
  time: string;
  amount: number;
  address: string;
  items: number;
  paymentMethod: string;
  trackingCode: string;
}

export const ordersData: Order[] = [
  {
    id: "ORD-001",
    customer: {
      name: "علی محمدی",
      avatar: "/images/profile/user-1.jpg",
      email: "ali@example.com",
    },
    status: "در انتظار",
    date: "۱۴۰۴/۰۲/۱۵",
    time: "۱۰:۳۱",
    amount: 4850000,
    address: "تهران، خیابان ولیعصر، پلاک ۱۲۳",
    items: 3,
    paymentMethod: "کارت بانکی",
    trackingCode: "TRK-7823",
  },
  {
    id: "ORD-002",
    customer: {
      name: "سارا احمدی",
      avatar: "/images/profile/user-2.jpg",
      email: "sara@example.com",
    },
    status: "تکمیل شده",
    date: "۱۴۰۴/۰۲/۱۴",
    time: "۱۱:۳۱",
    amount: 12500000,
    address: "اصفهان، خیابان چهارباغ، کوچه گلستان",
    items: 5,
    paymentMethod: "آنلاین",
    trackingCode: "TRK-7824",
  },
  {
    id: "ORD-003",
    customer: {
      name: "رضا کریمی",
      avatar: "/images/profile/user-3.jpg",
      email: "reza@example.com",
    },
    status: "ارسال شده",
    date: "۱۴۰۴/۰۲/۱۳",
    time: "۱۲:۰۱",
    amount: 8750000,
    address: "مشهد، بلوار توس، پلاک ۴۵",
    items: 2,
    paymentMethod: "پرداخت در محل",
    trackingCode: "TRK-7825",
  },
  {
    id: "ORD-004",
    customer: {
      name: "مریم رضایی",
      avatar: "/images/profile/user-4.jpg",
      email: "maryam@example.com",
    },
    status: "لغو شده",
    date: "۱۴۰۴/۰۲/۱۳",
    time: "۰۱:۰۶",
    amount: 32100000,
    address: "شیراز، خیابان زند، ساختمان پارسه، واحد ۷",
    items: 8,
    paymentMethod: "کیف پول",
    trackingCode: "TRK-7826",
  },
  {
    id: "ORD-005",
    customer: {
      name: "امیر حسینی",
      avatar: "/images/profile/user-5.jpg",
      email: "amir@example.com",
    },
    status: "در حال پردازش",
    date: "۱۴۰۴/۰۲/۱۱",
    time: "۰۲:۳۴",
    amount: 6300000,
    address: "تبریز، خیابان ارک، پلاک ۷۸",
    items: 4,
    paymentMethod: "آنلاین",
    trackingCode: "TRK-7827",
  },
  {
    id: "ORD-006",
    customer: {
      name: "نیلوفر صادقی",
      avatar: "/images/profile/user-6.jpg",
      email: "niloofar@example.com",
    },
    status: "در انتظار",
    date: "۱۴۰۴/۰۲/۱۰",
    time: "۰۹:۱۵",
    amount: 9100000,
    address: "کرج، بلوار شهید بهشتی، پلاک ۳۲",
    items: 6,
    paymentMethod: "کارت بانکی",
    trackingCode: "TRK-7828",
  },
  {
    id: "ORD-007",
    customer: {
      name: "محمد عباسی",
      avatar: "/images/profile/user-7.jpg",
      email: "mohammad@example.com",
    },
    status: "تکمیل شده",
    date: "۱۴۰۴/۰۲/۰۹",
    time: "۱۴:۲۲",
    amount: 18300000,
    address: "قم، خیابان صفاییه، کوچه دوم",
    items: 7,
    paymentMethod: "آنلاین",
    trackingCode: "TRK-7829",
  },
  {
    id: "ORD-008",
    customer: {
      name: "فاطمه نوری",
      avatar: "/images/profile/user-8.jpg",
      email: "fateme@example.com",
    },
    status: "ارسال شده",
    date: "۱۴۰۴/۰۲/۰۸",
    time: "۱۶:۴۵",
    amount: 5600000,
    address: "اهواز، خیابان نادر، پلاک ۱۱",
    items: 2,
    paymentMethod: "پرداخت در محل",
    trackingCode: "TRK-7830",
  },
  {
    id: "ORD-009",
    customer: {
      name: "حسن قاسمی",
      avatar: "/images/profile/user-9.jpg",
      email: "hasan@example.com",
    },
    status: "در حال پردازش",
    date: "۱۴۰۴/۰۲/۰۷",
    time: "۰۸:۵۰",
    amount: 14200000,
    address: "رشت، خیابان لاکانی، پلاک ۵۶",
    items: 5,
    paymentMethod: "کیف پول",
    trackingCode: "TRK-7831",
  },
  {
    id: "ORD-010",
    customer: {
      name: "زهرا ملکی",
      avatar: "/images/profile/user-10.jpg",
      email: "zahra@example.com",
    },
    status: "تکمیل شده",
    date: "۱۴۰۴/۰۲/۰۶",
    time: "۱۱:۱۰",
    amount: 27400000,
    address: "ساری، خیابان طالقانی، پلاک ۹۰",
    items: 9,
    paymentMethod: "آنلاین",
    trackingCode: "TRK-7832",
  },
  {
    id: "ORD-011",
    customer: {
      name: "بهنام شریفی",
      avatar: "/images/profile/user-1.jpg",
      email: "behnam@example.com",
    },
    status: "لغو شده",
    date: "۱۴۰۴/۰۲/۰۵",
    time: "۱۵:۳۰",
    amount: 3900000,
    address: "کرمان، بلوار جمهوری، کوچه رازی",
    items: 1,
    paymentMethod: "کارت بانکی",
    trackingCode: "TRK-7833",
  },
  {
    id: "ORD-012",
    customer: {
      name: "لیلا پارسا",
      avatar: "/images/profile/user-3.jpg",
      email: "leila@example.com",
    },
    status: "در انتظار",
    date: "۱۴۰۴/۰۲/۰۴",
    time: "۰۷:۴۵",
    amount: 11700000,
    address: "بندرعباس، خیابان امام، پلاک ۲۸",
    items: 4,
    paymentMethod: "آنلاین",
    trackingCode: "TRK-7834",
  },
];

export const summaryStats = [
  {
    label: "درآمد کل",
    value: "۱۵۴.۷M",
    icon: "solar:dollar-minimalistic-linear",
    color: "bg-purple-50 dark:bg-purple-950/30",
    iconColor: "text-purple-500",
    unit: "﷼",
  },
  {
    label: "در انتظار",
    value: "۴۸۵",
    icon: "solar:clock-circle-linear",
    color: "bg-amber-50 dark:bg-amber-950/30",
    iconColor: "text-amber-500",
    unit: "",
  },
  {
    label: "تکمیل شده",
    value: "۱.۴k",
    icon: "solar:check-circle-linear",
    color: "bg-emerald-50 dark:bg-emerald-950/30",
    iconColor: "text-emerald-500",
    unit: "",
  },
  {
    label: "ارسال شده",
    value: "۹۹۶",
    icon: "solar:delivery-linear",
    color: "bg-cyan-50 dark:bg-cyan-950/30",
    iconColor: "text-cyan-500",
    unit: "",
  },
  {
    label: "در حال پردازش",
    value: "۲.۱k",
    icon: "solar:refresh-circle-linear",
    color: "bg-blue-50 dark:bg-blue-950/30",
    iconColor: "text-blue-500",
    unit: "",
  },
  {
    label: "لغو شده",
    value: "۱.۱k",
    icon: "solar:close-circle-linear",
    color: "bg-red-50 dark:bg-red-950/30",
    iconColor: "text-red-500",
    unit: "",
  },
];
