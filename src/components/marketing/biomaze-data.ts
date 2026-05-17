export interface TopNotice {
  id: string;
  text: string;
  action: string;
}

export interface NavItem {
  id: string;
  label: string;
  href: string;
}

export interface MegaMenuLink {
  label: string;
  href: string;
  description: string;
}

export interface MegaMenuColumn {
  title: string;
  links: MegaMenuLink[];
}

export interface MegaMenuItem extends NavItem {
  featured: {
    eyebrow: string;
    title: string;
    description: string;
    cta: string;
    href: string;
  };
  columns: MegaMenuColumn[];
}

export interface PromoCard {
  id: string;
  eyebrow: string;
  title: string;
  subtitle: string;
  cta: string;
  tone: "sky" | "indigo";
}

export interface ProductItem {
  id: string;
  title: string;
  category: string;
  image: string;
  price: string;
  oldPrice: string;
  badge: string;
}

export interface BookItem {
  id: string;
  title: string;
  status: string;
  image: string;
  tone: string;
}

export interface ArticleItem {
  id: string;
  title: string;
  category: string;
  age: string;
  icon: "mind" | "book" | "desk" | "podcast";
  tone: string;
}

export interface FooterColumn {
  id: string;
  title: string;
  links: Array<{
    label: string;
    href: string;
  }>;
}

export const topNotices: TopNotice[] = [
  {
    id: "cfr",
    text: "استخدام ویژه دعوتگری CFR",
    action: "بخوانید",
  },
  {
    id: "quiz",
    text: "پیش ثبت‌نام آزمون المپیاد سالیانه ۱۴۰۵-۱۴۰۴",
    action: "بخوانید",
  },
];

export const navigationItems: NavItem[] = [
  { id: "courses", label: "کلاس آنلاین و آفلاین", href: "#products" },
  { id: "books", label: "کتاب و جزوه‌ها", href: "#books" },
  { id: "tests", label: "آزمون‌ها", href: "#hero" },
  { id: "articles", label: "مقالات", href: "#articles" },
  { id: "about", label: "درباره ما", href: "#footer" },
];

export const megaMenuItems: MegaMenuItem[] = [
  {
    id: "courses",
    label: "کلاس آنلاین و آفلاین",
    href: "#products",
    featured: {
      eyebrow: "مسیر یادگیری",
      title: "کلاس‌های هدفمند با برنامه‌ریزی هفتگی",
      description:
        "از کلاس‌های شروع ترم تا جمع‌بندی، هر دانش‌آموز مسیر آموزشی متناسب با پایه و هدف خود را دریافت می‌کند.",
      cta: "مشاهده همه کلاس‌ها",
      href: "#products",
    },
    columns: [
      {
        title: "کلاس‌های پایه",
        links: [
          {
            label: "پایه هفتم",
            href: "#products",
            description:
              "کلاس‌های مفهومی و تقویتی ویژه دانش‌آموزان ورودی متوسطه اول",
          },
          {
            label: "پایه هشتم",
            href: "#products",
            description:
              "آموزش تشریحی همراه با آزمون‌های مرحله‌ای و تمرین هفتگی",
          },
        ],
      },
      {
        title: "کلاس‌های هدف‌دار",
        links: [
          {
            label: "جمع‌بندی خرداد",
            href: "#hero",
            description:
              "مرور سریع نکات کلیدی برای امتحانات پایانی و آمادگی کامل",
          },
          {
            label: "آمادگی تیزهوشان",
            href: "#hero",
            description:
              "برنامه ویژه آزمون تیزهوشان با تحلیل عملکرد و بانک سوالات",
          },
        ],
      },
    ],
  },
  {
    id: "books",
    label: "کتاب و جزوه‌ها",
    href: "#books",
    featured: {
      eyebrow: "انتشارات ماز",
      title: "کتاب‌های کمک‌آموزشی با طراحی مسئله‌محور",
      description:
        "ترکیب آموزش، تست، پاسخ تشریحی و مسیر مطالعه در قالبی یکپارچه برای مدارس برتر.",
      cta: "ورود به کتابخانه ماز",
      href: "#books",
    },
    columns: [
      {
        title: "پرفروش‌ها",
        links: [
          {
            label: "مارکوپولو شیمی",
            href: "#books",
            description: "آموزش مفهومی، تمرین هدفمند و پاسخ تشریحی کامل",
          },
          {
            label: "مارکوپولو زیست",
            href: "#books",
            description:
              "ویژه دانش‌آموزانی که به دنبال یادگیری عمیق و منظم هستند",
          },
        ],
      },
      {
        title: "محصولات تکمیلی",
        links: [
          {
            label: "جزوه‌های آزمون محور",
            href: "#products",
            description:
              "جزوات نکته و تست برای مرور قبل از آزمون‌ها و امتحانات",
          },
          {
            label: "بسته‌های جامع QB",
            href: "#books",
            description: "مجموعه کامل منابع آموزشی برای برنامه‌ریزی یک‌ساله",
          },
        ],
      },
    ],
  },
  {
    id: "tests",
    label: "آزمون‌ها",
    href: "#hero",
    featured: {
      eyebrow: "سنجش مستمر",
      title: "آزمون آنلاین با گزارش تحلیلی و رتبه‌بندی",
      description:
        "آزمون‌های مرحله‌ای و جامع با داشبورد عملکرد، تحلیل درس به درس و پیشنهاد مسیر مطالعه.",
      cta: "ورود به بخش آزمون‌ها",
      href: "#hero",
    },
    columns: [
      {
        title: "آزمون‌های فعال",
        links: [
          {
            label: "آزمون هفتگی",
            href: "#hero",
            description:
              "سنجش منظم برای حفظ ریتم مطالعه و ارزیابی مستمر پیشرفت",
          },
          {
            label: "آزمون جامع خرداد",
            href: "#hero",
            description: "شبیه‌ساز امتحانات با درجه سختی متناسب با مدارس برتر",
          },
        ],
      },
      {
        title: "تحلیل و خدمات",
        links: [
          {
            label: "کارنامه هوشمند",
            href: "#hero",
            description:
              "تحلیل درصدها، مقایسه با جامعه آماری و مسیر بهبود شخصی",
          },
          {
            label: "مشاوره پس از آزمون",
            href: "#footer",
            description:
              "جلسه تحلیل عملکرد با پشتیبان آموزشی و تعیین برنامه ادامه مسیر",
          },
        ],
      },
    ],
  },
  {
    id: "articles",
    label: "مقالات",
    href: "#articles",
    featured: {
      eyebrow: "محتوای به‌روز",
      title: "راهنماهای آموزشی، گفتگوها و تحلیل‌های کاربردی",
      description:
        "محتوای تحلیلی برای والدین و دانش‌آموزان با تمرکز بر مطالعه، آزمون و مهارت‌های ذهنی.",
      cta: "ورود به مجله ماز",
      href: "#articles",
    },
    columns: [
      {
        title: "دسته‌بندی‌ها",
        links: [
          {
            label: "روش مطالعه",
            href: "#articles",
            description:
              "تکنیک‌های برنامه‌ریزی، مرور و تست‌زنی برای بازدهی بیشتر",
          },
          {
            label: "مصاحبه رتبه‌ها",
            href: "#articles",
            description:
              "گفتگو با دانش‌آموزان موفق و استخراج الگوهای مطالعه آن‌ها",
          },
        ],
      },
      {
        title: "پرطرفدارها",
        links: [
          {
            label: "اخبار آموزشی",
            href: "#articles",
            description:
              "آخرین رویدادها، تغییرات آزمون‌ها و اطلاعیه‌های آموزشی",
          },
          {
            label: "مهارت‌های ذهنی",
            href: "#articles",
            description: "تمرکز، کنترل استرس و ساختن عادت‌های مطالعاتی پایدار",
          },
        ],
      },
    ],
  },
  {
    id: "about",
    label: "درباره ما",
    href: "#footer",
    featured: {
      eyebrow: "اعتماد خانواده‌ها",
      title: "تجربه‌ای یکپارچه از آموزش، ارزیابی و پشتیبانی",
      description:
        "ماز با تیم آموزشی تخصصی، زیرساخت آنلاین و محتوای اختصاصی، مسیر رشد دانش‌آموزان را پشتیبانی می‌کند.",
      cta: "آشنایی بیشتر با ماز",
      href: "#footer",
    },
    columns: [
      {
        title: "ماز در یک نگاه",
        links: [
          {
            label: "داستان برند",
            href: "#footer",
            description: "مروری بر مسیر شکل‌گیری ماز و ماموریت آموزشی آن",
          },
          {
            label: "تیم آموزشی",
            href: "#footer",
            description: "معرفی مدرسان، مشاوران و پشتیبان‌های تخصصی مجموعه",
          },
        ],
      },
      {
        title: "ارتباط با ما",
        links: [
          {
            label: "پشتیبانی و مشاوره",
            href: "#footer",
            description:
              "تماس با تیم پشتیبانی برای دریافت راهنمایی قبل و بعد از خرید",
          },
          {
            label: "همکاری با مدارس",
            href: "#footer",
            description:
              "ارائه راهکارهای آموزشی و آزمونی برای مدارس و موسسات آموزشی",
          },
        ],
      },
    ],
  },
];

export const promoCards: PromoCard[] = [
  {
    id: "exam",
    eyebrow: "آزمون",
    title: "دسترسی به آزمون‌ها",
    subtitle: "آزمون‌های مرحله‌ای، جامع و شبیه‌ساز ویژه دانش‌آموزان تیزهوشان.",
    cta: "شرکت در آزمون",
    tone: "sky",
  },
  {
    id: "class",
    eyebrow: "کلاس آنلاین",
    title: "برنامه‌ریزی دقیق و هدفمند",
    subtitle: "کلاس‌های تعاملی با تمرین، گزارش عملکرد و پشتیبانی آموزشی.",
    cta: "مشاهده کلاس‌ها",
    tone: "indigo",
  },
];

export const products: ProductItem[] = [
  {
    id: "cpr-course",
    title: "دوره CPR فشرده تجربی",
    category: "دوره آموزشی",
    image: "/images/products/s1.jpg",
    price: "۴۳۰,۰۰۰ تومان",
    oldPrice: "۵۸۰,۰۰۰ تومان",
    badge: "IVY",
  },
  {
    id: "cpr-box-1",
    title: "دوره + جزوه CPR ویژه دوازدهم",
    category: "بسته آموزشی",
    image: "/images/products/s2.jpg",
    price: "۴۲۰,۰۰۰ تومان",
    oldPrice: "۵۱۰,۰۰۰ تومان",
    badge: "IVY",
  },
  {
    id: "cpr-box-2",
    title: "دوره + جزوه CPR پایه نهم",
    category: "بسته آموزشی",
    image: "/images/products/s3.jpg",
    price: "۴۲۰,۰۰۰ تومان",
    oldPrice: "۵۱۰,۰۰۰ تومان",
    badge: "IVY",
  },
  {
    id: "cpr-box-3",
    title: "دوره + جزوه CPR ریاضی",
    category: "بسته آموزشی",
    image: "/images/products/s4.jpg",
    price: "۴۲۰,۰۰۰ تومان",
    oldPrice: "۵۱۰,۰۰۰ تومان",
    badge: "IVY",
  },
];

export const books: BookItem[] = [
  {
    id: "book-chemistry",
    title: "مارکوپولو شیمی",
    status: "منتشر شده",
    image: "/images/blog/blog-img1.jpg",
    tone: "from-[#ff6f4a] via-[#ff8b5d] to-[#ffc26c]",
  },
  {
    id: "book-biology",
    title: "مارکوپولو زیست",
    status: "منتشر شده",
    image: "/images/blog/blog-img2.jpg",
    tone: "from-[#23bf72] via-[#2ad484] to-[#8effb7]",
  },
  {
    id: "book-physics",
    title: "مارکوپولو فیزیک",
    status: "منتشر شده",
    image: "/images/blog/blog-img3.jpg",
    tone: "from-[#1aa7ff] via-[#4f7dff] to-[#9bd0ff]",
  },
  {
    id: "book-collection",
    title: "بسته جامع QB",
    status: "منتشر شده",
    image: "/images/blog/blog-img4.jpg",
    tone: "from-[#f2b500] via-[#ffd86d] to-[#fff0ba]",
  },
];

export const articles: ArticleItem[] = [
  {
    id: "article-1",
    title: "چرا به بودجه‌بندی ذهنی نیاز داریم؟",
    category: "مقاله",
    age: "۵ اردیبهشت ۱۴۰۵",
    icon: "mind",
    tone: "#b8ff9a",
  },
  {
    id: "article-2",
    title: "خلاصه سوالات شیمی و روش مطالعه",
    category: "اخبار",
    age: "۷ اردیبهشت ۱۴۰۵",
    icon: "book",
    tone: "#ffd7b8",
  },
  {
    id: "article-3",
    title: "تکنیک‌های مطالعاتی و تست‌زنی در روزهای مانده",
    category: "مقاله",
    age: "۸ اردیبهشت ۱۴۰۵",
    icon: "desk",
    tone: "#f4b0ff",
  },
  {
    id: "article-4",
    title: "مصاحبه با رتبه‌های برتر تیزهوشان",
    category: "مصاحبه",
    age: "۱۰ اردیبهشت ۱۴۰۵",
    icon: "podcast",
    tone: "#b6efff",
  },
];

export const footerColumns: FooterColumn[] = [
  {
    id: "support",
    title: "پشتیبانی",
    links: [
      { label: "درباره ما", href: "#footer" },
      { label: "تماس با ما", href: "#footer" },
      { label: "همکاری با ما", href: "#footer" },
      { label: "پرسش‌های پرتکرار", href: "#articles" },
      { label: "قوانین سایت", href: "#footer" },
      { label: "حریم خصوصی", href: "#footer" },
      { label: "سوالات متداول", href: "#articles" },
    ],
  },
  {
    id: "quick-links",
    title: "دسترسی سریع",
    links: [
      { label: "فروشگاه", href: "#products" },
      { label: "کلاس آنلاین و آفلاین", href: "#products" },
      { label: "بانک آزمون", href: "#hero" },
      { label: "وبلاگ", href: "#articles" },
      { label: "زندگی", href: "#articles" },
      { label: "نقشه راه", href: "#hero" },
      { label: "مشاوران", href: "#footer" },
      { label: "مدرسین", href: "#footer" },
    ],
  },
];
