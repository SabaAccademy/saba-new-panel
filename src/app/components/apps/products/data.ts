export type ProductStatus = "active" | "inactive" | "draft";

export interface Product {
  id: string;
  name: string;
  sku: string;
  category: string;
  price: number;
  stock: number;
  status: ProductStatus;
  description?: string;
  imageUrl?: string;
  tags?: string;
  createdAt: string;
}

export const CATEGORIES = [
  "electronics",
  "clothing",
  "food",
  "books",
  "sports",
  "home",
  "beauty",
  "other",
] as const;

export type Category = (typeof CATEGORIES)[number];

// ─── Mock data ─────────────────────────────────────────────────────────────────
let nextId = 10;
export function generateId() {
  return String(++nextId);
}

export const mockProducts: Product[] = [
  {
    id: "1",
    name: "Samsung Galaxy S25",
    sku: "SGS-25-001",
    category: "electronics",
    price: 32_000_000,
    stock: 45,
    status: "active",
    description: "گوشی هوشمند سامسونگ با دوربین ۲۰۰ مگاپیکسلی",
    imageUrl: "/images/products/s1.jpg",
    tags: "موبایل, سامسونگ, اندروید",
    createdAt: "2025-01-10",
  },
  {
    id: "2",
    name: "Apple MacBook Air M3",
    sku: "APL-MBA-M3",
    category: "electronics",
    price: 65_000_000,
    stock: 12,
    status: "active",
    description: "لپ‌تاپ اپل با تراشه M3",
    imageUrl: "/images/products/s2.jpg",
    tags: "لپتاپ, اپل, مک",
    createdAt: "2025-01-15",
  },
  {
    id: "3",
    name: "Nike Air Max 270",
    sku: "NK-AM-270",
    category: "sports",
    price: 4_500_000,
    stock: 0,
    status: "inactive",
    description: "کفش ورزشی نایکی مدل Air Max",
    imageUrl: "/images/products/s3.jpg",
    tags: "کفش, نایکی, ورزش",
    createdAt: "2025-02-01",
  },
  {
    id: "4",
    name: "کتاب اتمیک هابیتس",
    sku: "BK-AHB-001",
    category: "books",
    price: 180_000,
    stock: 200,
    status: "active",
    description: "کتاب پرفروش جیمز کلیر",
    imageUrl: "",
    tags: "کتاب, توسعه فردی",
    createdAt: "2025-02-10",
  },
  {
    id: "5",
    name: "پیراهن مردانه لینن",
    sku: "CLT-SHM-001",
    category: "clothing",
    price: 650_000,
    stock: 5,
    status: "active",
    description: "پیراهن لینن تابستانه",
    imageUrl: "",
    tags: "پوشاک, پیراهن",
    createdAt: "2025-03-01",
  },
  {
    id: "6",
    name: "سرویس چای ۱۲ پارچه",
    sku: "HM-TS-012",
    category: "home",
    price: 1_200_000,
    stock: 30,
    status: "draft",
    description: "سرویس چایخوری چینی با طرح گل",
    imageUrl: "",
    tags: "خانه, آشپزخانه",
    createdAt: "2025-03-15",
  },
  {
    id: "7",
    name: "ماسک صورت آرگان",
    sku: "BT-FM-ARG",
    category: "beauty",
    price: 250_000,
    stock: 80,
    status: "active",
    description: "ماسک صورت با روغن آرگان",
    imageUrl: "",
    tags: "آرایشی, پوست",
    createdAt: "2025-04-01",
  },
  {
    id: "8",
    name: "دمبل ۵ کیلویی",
    sku: "SP-DB-005",
    category: "sports",
    price: 380_000,
    stock: 60,
    status: "active",
    description: "دمبل ربطی با ظاهر مدرن",
    imageUrl: "",
    tags: "ورزش, دمبل, بدنسازی",
    createdAt: "2025-04-10",
  },
];
