// ─── Types ─────────────────────────────────────────────────────────────────

export interface AparatVideo {
  id: string;
  title: string;
  channel: string;
  channelVerified?: boolean;
  duration: string;
  views: string;
  age: string;
  thumbnail: string;
  thumbnailAlt: string;
}

export interface AparatSection {
  id: string;
  label: string;
  href: string;
  videos: AparatVideo[];
}

export interface AparatSidebarItem {
  id: string;
  icon: string; // lucide icon name mapping key
  label: string;
  href: string;
  active?: boolean;
}

export interface AparatCategory {
  id: string;
  label: string;
  href: string;
}

export interface AparatTopChannel {
  id: string;
  name: string;
  avatar: string;
  subscribers: string;
  verified?: boolean;
}

// ─── Constants ─────────────────────────────────────────────────────────────

export const APARAT_RED = "#e31c1c";

export const headerCategories: AparatCategory[] = [
  { id: "films", label: "فیلم و سریال", href: "#films" },
  { id: "sports", label: "ورزشی", href: "#sports" },
  { id: "news", label: "خبری", href: "#news" },
  { id: "learn", label: "آموزش", href: "#learn" },
  { id: "music", label: "موزیک", href: "#music" },
  { id: "comedy", label: "طنز", href: "#comedy" },
  { id: "documentary", label: "مستند", href: "#documentary" },
  { id: "travel", label: "سفر", href: "#travel" },
  { id: "tech", label: "علم و فناوری", href: "#tech" },
  { id: "gaming", label: "گیم", href: "#gaming" },
  { id: "cooking", label: "آشپزی", href: "#cooking" },
  { id: "auto", label: "اتومبیل", href: "#auto" },
];

export const sidebarItems: AparatSidebarItem[] = [
  { id: "home", icon: "home", label: "خانه", href: "#", active: true },
  { id: "followed", icon: "tv2", label: "ویدیوهای دنبال‌شده‌ها", href: "#" },
  { id: "watchlater", icon: "clock", label: "مشاهده بعداً", href: "#" },
  { id: "history", icon: "history", label: "تاریخچه", href: "#" },
  { id: "liked", icon: "heart", label: "فیلم‌های پسندیده", href: "#" },
  { id: "films", icon: "clapperboard", label: "فیلم و سریال", href: "#films" },
  { id: "sports", icon: "trophy", label: "ورزشی", href: "#sports" },
  { id: "news", icon: "newspaper", label: "خبری", href: "#news" },
  { id: "learn", icon: "graduation-cap", label: "آموزش", href: "#learn" },
  { id: "music", icon: "music", label: "موزیک", href: "#music" },
  { id: "comedy", icon: "smile", label: "طنز", href: "#comedy" },
  { id: "documentary", icon: "film", label: "مستند", href: "#documentary" },
  { id: "travel", icon: "map-pin", label: "سفر", href: "#travel" },
  { id: "tech", icon: "cpu", label: "علم و فناوری", href: "#tech" },
  { id: "gaming", icon: "gamepad2", label: "گیم", href: "#gaming" },
  { id: "cooking", icon: "utensils", label: "آشپزی", href: "#cooking" },
  { id: "auto", icon: "car", label: "اتومبیل", href: "#auto" },
];

const THUMBS = [
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
  "/images/blog/blog-img8.jpg",
  "/images/blog/blog-img9.jpg",
  "/images/blog/blog-img10.jpg",
  "/images/blog/blog-img11.jpg",
];

function thumb(i: number) {
  return THUMBS[i % THUMBS.length];
}

export const topChannels: AparatTopChannel[] = [
  {
    id: "c1",
    name: "کانال رسمی صداوسیما",
    avatar: "/images/products/s1.jpg",
    subscribers: "۴.۲ میلیون",
    verified: true,
  },
  {
    id: "c2",
    name: "ویدیوکلاب",
    avatar: "/images/products/s2.jpg",
    subscribers: "۲.۸ میلیون",
    verified: true,
  },
  {
    id: "c3",
    name: "گیم‌مگ",
    avatar: "/images/products/s3.jpg",
    subscribers: "۱.۱ میلیون",
  },
  {
    id: "c4",
    name: "آشپزخانه مدرن",
    avatar: "/images/products/s4.jpg",
    subscribers: "۹۸۰ هزار",
    verified: true,
  },
  {
    id: "c5",
    name: "تک‌نیوز",
    avatar: "/images/products/s5.jpg",
    subscribers: "۷۴۰ هزار",
  },
];

export const aparatSections: AparatSection[] = [
  {
    id: "trending",
    label: "اول ببینید",
    href: "#trending",
    videos: [
      {
        id: "t1",
        title: "خلاصه بازی‌های هفته‌ی گذشته لیگ برتر",
        channel: "ورزش ۳",
        channelVerified: true,
        duration: "۱۸:۴۵",
        views: "۳.۲ میلیون",
        age: "۲ ساعت پیش",
        thumbnail: thumb(0),
        thumbnailAlt: "لیگ برتر",
      },
      {
        id: "t2",
        title: "داستان‌پردازی هوش‌مصنوعی در ایران | گفتگو با محتوا‌ساز جوان",
        channel: "تک‌نیوز",
        duration: "۲۲:۱۰",
        views: "۱.۸ میلیون",
        age: "۵ ساعت پیش",
        thumbnail: thumb(1),
        thumbnailAlt: "هوش مصنوعی",
      },
      {
        id: "t3",
        title: "صفر تا صد ماینکرافت | آموزش کامل برای مبتدیان",
        channel: "گیم‌مگ",
        duration: "۴۵:۳۲",
        views: "۲.۴ میلیون",
        age: "۱ روز پیش",
        thumbnail: thumb(2),
        thumbnailAlt: "ماینکرافت",
      },
      {
        id: "t4",
        title: "بهترین آهنگ‌های جمیله | سرتاپا احساس",
        channel: "موزیک‌پلاس",
        channelVerified: true,
        duration: "۵۴:۱۲",
        views: "۴.۱ میلیون",
        age: "۳ روز پیش",
        thumbnail: thumb(3),
        thumbnailAlt: "موزیک",
      },
    ],
  },
  {
    id: "films",
    label: "فیلم و سریال",
    href: "#films",
    videos: [
      {
        id: "f1",
        title: "سریال ترکی «سفرنگاه هیجان» | قسمت ۱۵ | دوبله فارسی",
        channel: "ویدیوکلاب",
        channelVerified: true,
        duration: "۴۲:۰۰",
        views: "۶.۷ میلیون",
        age: "۶ ساعت پیش",
        thumbnail: thumb(4),
        thumbnailAlt: "سریال",
      },
      {
        id: "f2",
        title: "نقد فیلم رها: نیاز به تلاش بیشتر؟ | بررسی کامل",
        channel: "سینماتیک",
        duration: "۲۸:۳۰",
        views: "۱.۲ میلیون",
        age: "۲ روز پیش",
        thumbnail: thumb(5),
        thumbnailAlt: "نقد فیلم",
      },
      {
        id: "f3",
        title: "بهترین فیلم‌های کمدی ایرانی | TOP 10 کانال ما",
        channel: "فیلم‌باز",
        duration: "۳۵:۵۰",
        views: "۲.۹ میلیون",
        age: "۵ روز پیش",
        thumbnail: thumb(6),
        thumbnailAlt: "Top 10 کمدی",
      },
      {
        id: "f4",
        title: "خلاصه داستان و شخصیت‌پردازی Avatar 2 به فارسی",
        channel: "سینماتیک",
        channelVerified: false,
        duration: "۱۵:۱۱",
        views: "۸۰۰ هزار",
        age: "۱ هفته پیش",
        thumbnail: thumb(7),
        thumbnailAlt: "آواتار ۲",
      },
    ],
  },
  {
    id: "top-channels",
    label: "کانال‌های برتر",
    href: "#top-channels",
    videos: [
      {
        id: "ch1",
        title:
          "پادکست «چرا کالاهایی رو می‌خری که نمی‌خوای؟» | بررسی روان‌شناسی مصرف",
        channel: "مینی‌داک",
        channelVerified: true,
        duration: "۳۱:۴۵",
        views: "۱.۵ میلیون",
        age: "۲ روز پیش",
        thumbnail: thumb(8),
        thumbnailAlt: "پادکست",
      },
      {
        id: "ch2",
        title: "دختر دارم کرده! رقص گروهی BLACKPINK کاور کردم",
        channel: "بیوتی‌استار",
        duration: "۱۲:۳۳",
        views: "۳.۴ میلیون",
        age: "۳ روز پیش",
        thumbnail: thumb(9),
        thumbnailAlt: "کاور بلک‌پینک",
      },
      {
        id: "ch3",
        title: "کوهستان یا شهری | تفاوت زندگی خارج از محله خودتون",
        channel: "ولاگ ایران",
        duration: "۲۲:۰۰",
        views: "۶۵۰ هزار",
        age: "۱ هفته پیش",
        thumbnail: thumb(10),
        thumbnailAlt: "ولاگ شهری",
      },
    ],
  },
  {
    id: "sports",
    label: "ورزشی",
    href: "#sports",
    videos: [
      {
        id: "sp1",
        title: "تمام گل‌های محمد مسلمان در لیگ برتر ۱۴۰۵-۱۴۰۴",
        channel: "گل‌تی‌وی",
        channelVerified: true,
        duration: "۲۰:۱۲",
        views: "۲.۹ میلیون",
        age: "۱ روز پیش",
        thumbnail: thumb(11),
        thumbnailAlt: "گل‌های لیگ",
      },
      {
        id: "sp2",
        title: "آموزش حرکات دفاعی والیبال از صفر تا صد | مربی ملی",
        channel: "ورزش‌یار",
        duration: "۴۸:۰۵",
        views: "۴۳۰ هزار",
        age: "۴ روز پیش",
        thumbnail: thumb(12),
        thumbnailAlt: "والیبال",
      },
      {
        id: "sp3",
        title: "رقابت‌های جهانی پاورلیفتینگ | تیم ایران بر سکو",
        channel: "ورزش ۳",
        channelVerified: true,
        duration: "۱:۱۴:۲۲",
        views: "۱.۱ میلیون",
        age: "۲ روز پیش",
        thumbnail: thumb(13),
        thumbnailAlt: "پاورلیفتینگ",
      },
      {
        id: "sp4",
        title: "برنامه بدنسازی یک ماهه بدون تجهیزات در خانه",
        channel: "فیت‌لایف",
        duration: "۳۳:۴۰",
        views: "۷۸۰ هزار",
        age: "۶ روز پیش",
        thumbnail: thumb(14),
        thumbnailAlt: "بدنسازی خانگی",
      },
    ],
  },
  {
    id: "news",
    label: "خبری",
    href: "#news",
    videos: [
      {
        id: "n1",
        title: "گزارش ویژه: افزایش قیمت دلار و تأثیر آن بر بازار",
        channel: "اقتصاد نیوز",
        channelVerified: true,
        duration: "۱۸:۵۵",
        views: "۲.۲ میلیون",
        age: "۳ ساعت پیش",
        thumbnail: thumb(15),
        thumbnailAlt: "اقتصاد",
      },
      {
        id: "n2",
        title: "آخرین وضعیت پرونده‌های حقوقی پرسروصدای این هفته",
        channel: "خبر ۲۴",
        duration: "۱۳:۲۰",
        views: "۱.۴ میلیون",
        age: "۷ ساعت پیش",
        thumbnail: thumb(16),
        thumbnailAlt: "خبر",
      },
      {
        id: "n3",
        title: "مصرف مسئولانه: قدم‌پایدار و چرخه دوباره‌پوشیدن",
        channel: "اکو‌نیوز",
        channelVerified: true,
        duration: "۲۵:۱۵",
        views: "۵۶۰ هزار",
        age: "۱ روز پیش",
        thumbnail: thumb(17),
        thumbnailAlt: "محیط‌زیست",
      },
    ],
  },
  {
    id: "music",
    label: "موزیک",
    href: "#music",
    videos: [
      {
        id: "m1",
        title: "Best Songs of Amir Arslan | موزیک‌ودیو رسمی",
        channel: "ARMusic",
        channelVerified: true,
        duration: "۵۸:۳۰",
        views: "۵.۴ میلیون",
        age: "۱ هفته پیش",
        thumbnail: thumb(18),
        thumbnailAlt: "امیر ارسلان",
      },
      {
        id: "m2",
        title: "Top 5 Songs Behnam Bani | ویدیو کلیپ رسمی",
        channel: "بهنام بانی",
        channelVerified: true,
        duration: "۲۵:۴۴",
        views: "۳.۲ میلیون",
        age: "۲ هفته پیش",
        thumbnail: thumb(19),
        thumbnailAlt: "بهنام بانی",
      },
      {
        id: "m3",
        title: "Top 10 Xahar Xosravi - موزیک‌ولاگ ۱۴۰۵",
        channel: "موزیک‌پلاس",
        duration: "۱:۰۵:۱۸",
        views: "۲.۷ میلیون",
        age: "۱۰ روز پیش",
        thumbnail: thumb(20),
        thumbnailAlt: "خواهر خسروی",
      },
    ],
  },
  {
    id: "documentary",
    label: "مستند",
    href: "#documentary",
    videos: [
      {
        id: "d1",
        title: "میشه زیر آب نفس کشید؟ | مستند علمی ویژه",
        channel: "علم‌پلاس",
        channelVerified: true,
        duration: "۴۲:۱۰",
        views: "۱.۸ میلیون",
        age: "۳ روز پیش",
        thumbnail: thumb(21),
        thumbnailAlt: "مستند علمی",
      },
      {
        id: "d2",
        title: "صدای تاریخ | روایتی از دوره قاجار در ایران",
        channel: "ایران‌داک",
        duration: "۱:۱۸:۰۰",
        views: "۹۸۰ هزار",
        age: "۵ روز پیش",
        thumbnail: thumb(0),
        thumbnailAlt: "مستند تاریخی",
      },
      {
        id: "d3",
        title: "زندگی پنگوئن‌های قطب جنوب | ۴K مستند جدید",
        channel: "نیچر‌فارسی",
        channelVerified: true,
        duration: "۵۵:۲۰",
        views: "۳.۱ میلیون",
        age: "۷ روز پیش",
        thumbnail: thumb(1),
        thumbnailAlt: "پنگوئن",
      },
    ],
  },
  {
    id: "tech",
    label: "علم و فناوری",
    href: "#tech",
    videos: [
      {
        id: "tech1",
        title: "بررسی Find X9 Ultra | اولین برخورد",
        channel: "تک‌فارسی",
        channelVerified: true,
        duration: "۲۸:۰۰",
        views: "۱.۶ میلیون",
        age: "۱ روز پیش",
        thumbnail: thumb(2),
        thumbnailAlt: "Find X9 Ultra",
      },
      {
        id: "tech2",
        title: "رشد کانال در بله: قدم به قدم از صفر تا درآمد",
        channel: "دیجیتال‌مارکتینگ",
        duration: "۳۸:۴۵",
        views: "۷۲۰ هزار",
        age: "۳ روز پیش",
        thumbnail: thumb(3),
        thumbnailAlt: "رشد کانال",
      },
      {
        id: "tech3",
        title: "گاد او وار روی پی‌سی | نصب و بررسی کامل",
        channel: "گیم‌نیوز",
        channelVerified: false,
        duration: "۵۲:۳۳",
        views: "۱.۳ میلیون",
        age: "۴ روز پیش",
        thumbnail: thumb(4),
        thumbnailAlt: "بازی پی‌سی",
      },
    ],
  },
  {
    id: "gaming",
    label: "گیم",
    href: "#gaming",
    videos: [
      {
        id: "g1",
        title: "نبرد در پیپس‌گوچی | گیم‌پلی کامل رویال",
        channel: "گیم‌لند",
        channelVerified: true,
        duration: "۱:۰۸:۱۵",
        views: "۲.۵ میلیون",
        age: "۲ روز پیش",
        thumbnail: thumb(5),
        thumbnailAlt: "گیم‌پلی",
      },
      {
        id: "g2",
        title: "شاخه‌های خاموش؟ پایان جنبش اپن‌ورلد؟ تحلیل بازار",
        channel: "گیم‌مگ",
        channelVerified: true,
        duration: "۳۴:۱۲",
        views: "۹۴۰ هزار",
        age: "۳ روز پیش",
        thumbnail: thumb(6),
        thumbnailAlt: "تحلیل گیم",
      },
      {
        id: "g3",
        title: "Dark Souls III سختی ۱۰۰٪ بیش | قسمت چهارم",
        channel: "سول‌پلیر",
        duration: "۲:۲۵:۳۳",
        views: "۱.۷ میلیون",
        age: "۵ روز پیش",
        thumbnail: thumb(7),
        thumbnailAlt: "Dark Souls",
      },
    ],
  },
  {
    id: "travel",
    label: "سفر",
    href: "#travel",
    videos: [
      {
        id: "tr1",
        title: "ماجراجویی در کویر مصر | ولاگ آفرودی قسمت ۴",
        channel: "سفرنامه",
        channelVerified: true,
        duration: "۴۵:۲۳",
        views: "۱.۴ میلیون",
        age: "۱ هفته پیش",
        thumbnail: thumb(8),
        thumbnailAlt: "کویر مصر",
      },
      {
        id: "tr2",
        title: "گوهرستان یا شهری | زندگی در روستای آذربایجان",
        channel: "ولاگ ایران",
        duration: "۲۸:۵۰",
        views: "۶۸۰ هزار",
        age: "۲ هفته پیش",
        thumbnail: thumb(9),
        thumbnailAlt: "روستای آذربایجان",
      },
    ],
  },
  {
    id: "cooking",
    label: "آشپزی",
    href: "#cooking",
    videos: [
      {
        id: "ck1",
        title: "ایده‌های پولسازی از آشپزخانه | قسمت دوم: پودر پنکیک و کوکی",
        channel: "آشپزخانه مدرن",
        channelVerified: true,
        duration: "۳۱:۰۰",
        views: "۱.۲ میلیون",
        age: "۴ روز پیش",
        thumbnail: thumb(10),
        thumbnailAlt: "پودر کوکی",
      },
      {
        id: "ck2",
        title: "استمبولی ملون | طرز تهیه کامل با نکات استاد",
        channel: "فودی‌شف",
        duration: "۲۲:۴۰",
        views: "۸۶۰ هزار",
        age: "۶ روز پیش",
        thumbnail: thumb(11),
        thumbnailAlt: "استمبولی ملون",
      },
      {
        id: "ck3",
        title: "نان شیرین ذاگنوت دانک | دستور اصل ترکی با ترجمه کامل",
        channel: "پخت‌خانه",
        duration: "۱۸:۲۲",
        views: "۵۴۰ هزار",
        age: "۱ هفته پیش",
        thumbnail: thumb(12),
        thumbnailAlt: "نان ترکی",
      },
    ],
  },
  {
    id: "auto",
    label: "اتومبیل",
    href: "#auto",
    videos: [
      {
        id: "au1",
        title: "تویوتا سوپرا نسل ۵ | بررسی کامل و تست رانندگی",
        channel: "موتورمگ",
        channelVerified: true,
        duration: "۳۸:۴۵",
        views: "۱.۸ میلیون",
        age: "۳ روز پیش",
        thumbnail: thumb(13),
        thumbnailAlt: "تویوتا سوپرا",
      },
      {
        id: "au2",
        title: "کی جی‌ام اکتیون در ایران | عکس‌برداری و بررسی خودروی جدید",
        channel: "آتو‌ایران",
        duration: "۴۲:۱۰",
        views: "۱.۳ میلیون",
        age: "۵ روز پیش",
        thumbnail: thumb(14),
        thumbnailAlt: "JMC اکتیون",
      },
      {
        id: "au3",
        title: "نانو‌موتور رئیس | راهنما خرید کامل برای اولین بار",
        channel: "بایک‌لایف",
        channelVerified: false,
        duration: "۲۵:۵۵",
        views: "۶۲۰ هزار",
        age: "۱ هفته پیش",
        thumbnail: thumb(15),
        thumbnailAlt: "نانو موتور رئیس",
      },
    ],
  },
];
