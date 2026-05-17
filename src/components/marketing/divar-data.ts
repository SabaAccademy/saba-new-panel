// ─── Divar.ir data model ───────────────────────────────────────────────────

export const DIVAR_RED = "#ef394e";
export const DIVAR_LIGHT = "#fff5f6";

// ─── Types ─────────────────────────────────────────────────────────────────

export interface DivarCategory {
  id: string;
  label: string;
  icon: string; // emoji or icon key
  href: string;
  color?: string;
  count?: string;
}

export interface DivarListing {
  id: string;
  title: string;
  price: string | null; // null = "توافقی"
  city: string;
  district?: string;
  age: string; // e.g. "۳ ساعت پیش"
  thumbnail: string;
  thumbnailAlt: string;
  thumbnailBg: string; // fallback color
  badge?: "vip" | "urgent";
  isImage: boolean;
}

export interface DivarSection {
  id: string;
  label: string;
  href: string;
  listings: DivarListing[];
}

// ─── Categories ────────────────────────────────────────────────────────────

export const categories: DivarCategory[] = [
  { id: "real-estate", label: "مسکن", icon: "🏠", href: "#real-estate", color: "#5b6af0" },
  { id: "vehicles", label: "وسایل نقلیه", icon: "🚗", href: "#vehicles", color: "#f59e0b" },
  { id: "electronics", label: "دیجیتال", icon: "📱", href: "#electronics", color: "#10b981" },
  { id: "furniture", label: "خانه و آشپزخانه", icon: "🛋️", href: "#furniture", color: "#8b5cf6" },
  { id: "personal", label: "وسایل شخصی", icon: "👔", href: "#personal", color: "#ec4899" },
  { id: "services", label: "خدمات", icon: "🔧", href: "#services", color: "#14b8a6" },
  { id: "entertainment", label: "سرگرمی و فراغت", icon: "🎮", href: "#entertainment", color: "#f97316" },
  { id: "social", label: "اجتماعی", icon: "🤝", href: "#social", color: "#6366f1" },
  { id: "industry", label: "صنعتی و اداری", icon: "🏭", href: "#industry", color: "#64748b" },
  { id: "animal", label: "حیوانات", icon: "🐾", href: "#animal", color: "#84cc16" },
];

// ─── Sidebar sub-categories ────────────────────────────────────────────────

export interface SidebarCategory {
  id: string;
  label: string;
  href: string;
  count?: string;
  children?: SidebarCategory[];
}

export const sidebarCategories: SidebarCategory[] = [
  {
    id: "all",
    label: "همه آگهی‌ها",
    href: "#",
  },
  {
    id: "real-estate",
    label: "مسکن",
    href: "#real-estate",
    children: [
      { id: "rent-house", label: "اجاره خانه و ویلا", href: "#rent-house" },
      { id: "buy-house", label: "فروش خانه و ویلا", href: "#buy-house" },
      { id: "rent-apartment", label: "اجاره آپارتمان", href: "#rent-apartment" },
      { id: "buy-apartment", label: "فروش آپارتمان", href: "#buy-apartment" },
      { id: "rent-shop", label: "اجاره مغازه و تجاری", href: "#rent-shop" },
      { id: "land", label: "زمین و کلنگی", href: "#land" },
    ],
  },
  {
    id: "vehicles",
    label: "وسایل نقلیه",
    href: "#vehicles",
    children: [
      { id: "light-cars", label: "خودروهای سواری", href: "#light-cars" },
      { id: "motorcycle", label: "موتورسیکلت", href: "#motorcycle" },
      { id: "spare-parts", label: "قطعات و لوازم جانبی", href: "#spare-parts" },
      { id: "heavy", label: "ماشین سنگین و ساختمانی", href: "#heavy" },
    ],
  },
  {
    id: "electronics",
    label: "دیجیتال",
    href: "#electronics",
    children: [
      { id: "mobile", label: "موبایل", href: "#mobile" },
      { id: "laptop", label: "لپ‌تاپ", href: "#laptop" },
      { id: "tablet", label: "تبلت", href: "#tablet" },
      { id: "camera", label: "دوربین عکاسی و فیلمبرداری", href: "#camera" },
    ],
  },
  {
    id: "furniture",
    label: "خانه و آشپزخانه",
    href: "#furniture",
    children: [
      { id: "sofa", label: "مبل و صندلی", href: "#sofa" },
      { id: "appliance", label: "لوازم برقی", href: "#appliance" },
      { id: "kitchen", label: "ظروف و لوازم آشپزخانه", href: "#kitchen" },
    ],
  },
  { id: "services", label: "خدمات", href: "#services" },
  { id: "entertainment", label: "سرگرمی و فراغت", href: "#entertainment" },
  { id: "personal", label: "وسایل شخصی", href: "#personal" },
  { id: "industry", label: "صنعتی و اداری", href: "#industry" },
  { id: "social", label: "اجتماعی", href: "#social" },
  { id: "animal", label: "حیوانات", href: "#animal" },
];

// ─── Helper to generate listings ───────────────────────────────────────────

const THUMB_COLORS = [
  "#1e293b","#374151","#334155","#1e3a5f","#312e81",
  "#4a044e","#064e3b","#431407","#1c1917","#0c4a6e",
  "#3b0764","#14532d","#0f172a","#450a0a","#1e1b4b",
  "#292524","#0369a1","#9a3412","#166534","#4c1d95",
];

function bg(seed: string) {
  let h = 0;
  for (let i = 0; i < seed.length; i++) h = seed.charCodeAt(i) + h * 31;
  return THUMB_COLORS[Math.abs(h) % THUMB_COLORS.length];
}

const IMG_POOL = [
  "/images/products/s1.jpg",
  "/images/products/s2.jpg",
  "/images/products/s3.jpg",
  "/images/products/s4.jpg",
  "/images/products/s5.jpg",
  "/images/products/s6.jpg",
  "/images/products/s7.jpg",
  "/images/products/s8.jpg",
  "/images/products/s9.jpg",
  "/images/products/s10.jpg",
  "/images/products/s11.jpg",
  "/images/products/s12.jpg",
  "/images/blog/blog-img1.jpg",
  "/images/blog/blog-img2.jpg",
  "/images/blog/blog-img3.jpg",
  "/images/blog/blog-img4.jpg",
  "/images/blog/blog-img5.jpg",
  "/images/blog/blog-img6.jpg",
];

function img(idx: number) {
  return IMG_POOL[idx % IMG_POOL.length];
}

// ─── All listings ──────────────────────────────────────────────────────────

let _counter = 0;
function L(
  title: string,
  price: string | null,
  city: string,
  district: string,
  age: string,
  imgIdx: number,
  badge?: "vip" | "urgent",
): DivarListing {
  const id = `lst-${_counter++}`;
  return {
    id,
    title,
    price,
    city,
    district,
    age,
    thumbnail: img(imgIdx),
    thumbnailAlt: title,
    thumbnailBg: bg(id + title),
    badge,
    isImage: true,
  };
}

export const divarSections: DivarSection[] = [
  {
    id: "featured",
    label: "آگهی‌های ویژه",
    href: "#featured",
    listings: [
      L("آپارتمان ۱۱۸ متری کریمخان نوساز", "۱۰٫۵ میلیارد تومان", "تهران", "کریم‌خان", "۲ ساعت پیش", 0, "vip"),
      L("خودرو ایران‌خودرو ۲۰۷ مانتو دستی ۱۴۰۳", "۴۸۵ میلیون تومان", "تهران", "نارمک", "۳ ساعت پیش", 1, "vip"),
      L("سوپربازار صنایع‌دستی روباز دو بر خیابان", "۴.۲ میلیارد تومان", "تهران", "شریعتی", "۱ ساعت پیش", 2, "vip"),
      L("مبل ال شکل چرم مصنوعی قهوه‌ای سالم", "۱۸ میلیون تومان", "تهران", "پیروزی", "۵ ساعت پیش", 3, "vip"),
    ],
  },
  {
    id: "real-estate-rent",
    label: "اجاره مسکن",
    href: "#real-estate",
    listings: [
      L("اجاره آپارتمان ۸۵ متری دو خوابه بازسازی‌شده", "رهن ۳۰۰ میلیون + ۴ میلیون", "تهران", "نیاوران", "۱ ساعت پیش", 4),
      L("اجاره منزل ویلایی ۲۰۰ متر با حیاط بزرگ", "رهن ۵۰۰ میلیون", "کرج", "گوهردشت", "۲ ساعت پیش", 5),
      L("اجاره آپارتمان ۶۵ متری یک‌خوابه نزدیک متروی جوانمرد قصاب", "رهن ۱۵۰م + اجاره ۷م", "تهران", "خزانه", "۴۵ دقیقه پیش", 6),
      L("اجاره مغازه ۴۰ متری بر خیابان اصلی", "رهن ۱۰۰م + ماهانه ۸م", "اصفهان", "خیابان شیخ صدوق", "۳ ساعت پیش", 7),
      L("اجاره خانه دوبلکس ۱۵۰ متری چهار خواب", null, "مشهد", "احمدآباد", "۶ ساعت پیش", 8),
      L("اجاره آپارتمان ۱۱۰ متری طبقه سوم نوساز", "رهن ۴۰۰م + اجاره ۱۔۵م", "تهران", "سعادت‌آباد", "۲۰ دقیقه پیش", 9),
    ],
  },
  {
    id: "vehicles-sale",
    label: "فروش خودرو",
    href: "#vehicles",
    listings: [
      L("پژو ۲۰۶ تیپ ۵ مدل ۱۳۹۸ دست دوم", "۳۱۵ میلیون تومان", "تهران", "طوس", "۱ ساعت پیش", 10),
      L("سمند LX مدل ۱۴۰۰ بی‌رنگ گارانتی‌دار", "۳۵۵ میلیون تومان", "تهران", "نواب", "۵۵ دقیقه پیش", 11),
      L("پراید ۱۳۱ مدل ۱۳۹۶ سفید متالیک آماده", "۱۷۵ میلیون تومان", "شیراز", "زرگری", "۲ ساعت پیش", 12),
      L("تندر ۹۰ E2 مدل ۱۴۰۱ اتوماتیک سفید", "۴۸۰ میلیون تومان", "تهران", "رسالت", "۱۵ دقیقه پیش", 13),
      L("دنا پلاس توربو مدل ۱۴۰۳ نقره‌ای کارکرده ۸۰۰۰", "۸۲۰ میلیون تومان", "تهران", "ونک", "۳ ساعت پیش", 14, "vip"),
      L("ام‌وی‌ام x22 پرو اتوماتیک مدل ۱۴۰۲ سفید", "۶۱۰ میلیون تومان", "کرج", "مهرشهر", "۴ ساعت پیش", 15),
    ],
  },
  {
    id: "electronics-sale",
    label: "موبایل و دیجیتال",
    href: "#electronics",
    listings: [
      L("آیفون ۱۵ پرو مکس ۲۵۶ گیگ دست دوم سالم", "۸۶ میلیون تومان", "تهران", "ولنجک", "۴۰ دقیقه پیش", 0),
      L("سامسونگ Galaxy S24 Ultra NFC اورجینال", "۶۸ میلیون تومان", "تهران", "پاسداران", "۱ ساعت پیش", 1),
      L("لپ‌تاپ ایسوس ROG ویژه گیمینگ i9 RTX4070", "۱۱۷ میلیون تومان", "تهران", "تقی‌آباد", "۲ ساعت پیش", 2, "urgent"),
      L("پاوربانک شیائومی ۳۰۰۰۰ میلی‌آمپر در بسته‌بندی", "۴۸۰ هزار تومان", "تبریز", "ارم", "۳۰ دقیقه پیش", 3),
      L("هدفون سونی WH-1000XM5 نویز کنسل اصل", "۱۱ میلیون تومان", "تهران", "میرداماد", "۵ ساعت پیش", 4),
      L("گوشی شیائومی Redmi Note 13 Pro کارکرده کم", "۱۶ میلیون تومان", "اهواز", "کوی دانشگاه", "۱۰ دقیقه پیش", 5),
    ],
  },
  {
    id: "furniture-sale",
    label: "خانه و آشپزخانه",
    href: "#furniture",
    listings: [
      L("ماشین لباسشویی ۸ کیلو بوش صادراتی", "۲۲ میلیون تومان", "تهران", "ملارد", "۱ ساعت پیش", 6),
      L("کاناپه راحتی ۳ نفره پارچه‌ای طوسی سالم", "۸.۵ میلیون تومان", "تهران", "شاهد", "۴ ساعت پیش", 7),
      L("یخچال فریزر دوقلو دو درب دوو بی‌عیب", "۳۳ میلیون تومان", "مشهد", "فردوسی", "۲ ساعت پیش", 8),
      L("میز ناهار‌خوری ۶ نفره شیشه و آهن مدرن", "۱۴ میلیون تومان", "تهران", "شریعتی", "۵۵ دقیقه پیش", 9),
      L("تلویزیون ال‌جی ۵۵ اینچ UHD 4K OLED", "۱۸.۵ میلیون تومان", "تهران", "ایران‌زمین", "۳ ساعت پیش", 10),
      L("قالی دستباف ۶ متری تبریز دور ابریشم", null, "تهران", "استانبول", "۸ ساعت پیش", 11),
    ],
  },
  {
    id: "services",
    label: "خدمات",
    href: "#services",
    listings: [
      L("سرویس و تعمیر کولر گازی اسپلیت در محل", null, "تهران", "سراسر تهران", "۲۰ دقیقه پیش", 12),
      L("آموزش خصوصی ریاضی کنکور تضمینی", null, "تهران", "تلفنی / آنلاین", "۱ ساعت پیش", 13),
      L("طراحی لوگو و هویت بصری حرفه‌ای", null, "تهران", "آنلاین", "۱۰ دقیقه پیش", 14),
      L("ترجمه رسمی و تخصصی انگلیسی = فارسی", null, "تهران", "آنلاین", "۳۰ دقیقه پیش", 15),
      L("نظافت منزل و آپارتمان پرسنل زن بیمه‌شده", null, "تهران", "سراسر تهران", "۴ ساعت پیش", 0),
      L("حسابداری مالیاتی و اظهارنامه عملکرد ۱۴۰۳", null, "تهران", "تلفنی", "۵۰ دقیقه پیش", 1),
    ],
  },
];
