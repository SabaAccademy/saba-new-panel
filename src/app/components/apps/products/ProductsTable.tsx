"use client";

import React, { useState, useMemo, useCallback } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  flexRender,
  type ColumnDef,
  type SortingState,
} from "@tanstack/react-table";
import Link from "next/link";
import { Icon } from "@iconify/react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import CardBox from "@/app/components/shared/CardBox";
import { useLocale } from "@/lib/i18n/context";
import {
  mockProducts,
  type Product,
  type ProductStatus,
  CATEGORIES,
} from "./data";

// ─── Status Badge ──────────────────────────────────────────────────────────────
const statusStyles: Record<ProductStatus, string> = {
  active:
    "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-400",
  inactive: "bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-400",
  draft: "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-400",
};

function formatPrice(n: number) {
  return n.toLocaleString("fa-IR") + " ت";
}

// ─── Summary Cards ─────────────────────────────────────────────────────────────
function SummaryCards({ products }: { products: Product[] }) {
  const { t } = useLocale();
  const total = products.length;
  const active = products.filter((p) => p.status === "active").length;
  const outOfStock = products.filter((p) => p.stock === 0).length;
  const lowStock = products.filter((p) => p.stock > 0 && p.stock <= 10).length;

  const cards = [
    {
      label: t.products.totalProducts,
      value: total,
      icon: "solar:box-bold",
      color: "text-violet-600",
      bg: "bg-violet-50 dark:bg-violet-900/20",
    },
    {
      label: t.products.activeProducts,
      value: active,
      icon: "solar:check-circle-bold",
      color: "text-emerald-600",
      bg: "bg-emerald-50 dark:bg-emerald-900/20",
    },
    {
      label: t.products.outOfStock,
      value: outOfStock,
      icon: "solar:close-circle-bold",
      color: "text-red-600",
      bg: "bg-red-50 dark:bg-red-900/20",
    },
    {
      label: t.products.lowStock,
      value: lowStock,
      icon: "solar:danger-circle-bold",
      color: "text-amber-600",
      bg: "bg-amber-50 dark:bg-amber-900/20",
    },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {cards.map((c) => (
        <CardBox key={c.label} className="p-4">
          <div className="flex items-center gap-3">
            <div
              className={`w-10 h-10 rounded-xl ${c.bg} flex items-center justify-center shrink-0`}
            >
              <Icon icon={c.icon} width={20} className={c.color} />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">{c.value}</p>
              <p className="text-xs text-muted-foreground mt-0.5">{c.label}</p>
            </div>
          </div>
        </CardBox>
      ))}
    </div>
  );
}

// ─── Main Component ────────────────────────────────────────────────────────────
export default function ProductsTable() {
  const { t } = useLocale();
  const [products, setProducts] = useState<Product[]>(mockProducts);
  const [sorting, setSorting] = useState<SortingState>([]);
  const [globalFilter, setGlobalFilter] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");

  const filtered = useMemo(() => {
    return products.filter((p) => {
      if (categoryFilter !== "all" && p.category !== categoryFilter)
        return false;
      if (statusFilter !== "all" && p.status !== statusFilter) return false;
      return true;
    });
  }, [products, categoryFilter, statusFilter]);

  const handleDelete = useCallback((id: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
  }, []);

  const columns = useMemo<ColumnDef<Product>[]>(
    () => [
      {
        accessorKey: "name",
        header: t.products.table.product,
        cell: ({ row }) => (
          <div className="flex items-center gap-3 min-w-[180px]">
            <div className="w-9 h-9 rounded-lg bg-muted flex items-center justify-center shrink-0 overflow-hidden">
              {row.original.imageUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={row.original.imageUrl}
                  alt={row.original.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <Icon
                  icon="solar:box-linear"
                  width={18}
                  className="text-muted-foreground"
                />
              )}
            </div>
            <div>
              <p className="font-medium text-sm text-foreground leading-tight">
                {row.original.name}
              </p>
              {row.original.description && (
                <p className="text-xs text-muted-foreground mt-0.5 line-clamp-1 max-w-[200px]">
                  {row.original.description}
                </p>
              )}
            </div>
          </div>
        ),
      },
      {
        accessorKey: "sku",
        header: t.products.table.sku,
        cell: ({ getValue }) => (
          <span className="font-mono text-xs text-muted-foreground">
            {getValue() as string}
          </span>
        ),
      },
      {
        accessorKey: "category",
        header: t.products.table.category,
        cell: ({ getValue }) => {
          const cat = getValue() as string;
          return (
            <span className="text-sm text-foreground">
              {t.products.categories[
                cat as keyof typeof t.products.categories
              ] ?? cat}
            </span>
          );
        },
      },
      {
        accessorKey: "price",
        header: t.products.table.price,
        cell: ({ getValue }) => (
          <span className="font-semibold text-sm tabular-nums">
            {formatPrice(getValue() as number)}
          </span>
        ),
      },
      {
        accessorKey: "stock",
        header: t.products.table.stock,
        cell: ({ getValue }) => {
          const v = getValue() as number;
          return (
            <span
              className={`font-medium text-sm ${v === 0 ? "text-red-500" : v <= 10 ? "text-amber-500" : "text-foreground"}`}
            >
              {v.toLocaleString("fa-IR")}
            </span>
          );
        },
      },
      {
        accessorKey: "status",
        header: t.products.table.status,
        cell: ({ getValue }) => {
          const s = getValue() as ProductStatus;
          const labelMap: Record<ProductStatus, string> = {
            active: t.products.active,
            inactive: t.products.inactive,
            draft: t.products.draft,
          };
          return (
            <span
              className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusStyles[s]}`}
            >
              {labelMap[s]}
            </span>
          );
        },
      },
      {
        id: "actions",
        header: t.products.table.actions,
        cell: ({ row }) => (
          <div className="flex items-center gap-1">
            <Link href={`/apps/products/create?id=${row.original.id}`}>
              <Button
                variant="ghost"
                size="sm"
                className="h-8 w-8 p-0 text-muted-foreground hover:text-foreground"
              >
                <Icon icon="solar:pen-2-linear" width={15} />
              </Button>
            </Link>
            <Button
              variant="ghost"
              size="sm"
              className="h-8 w-8 p-0 text-muted-foreground hover:text-red-500"
              onClick={() => {
                if (window.confirm(t.products.confirmDelete)) {
                  handleDelete(row.original.id);
                }
              }}
            >
              <Icon icon="solar:trash-bin-trash-linear" width={15} />
            </Button>
          </div>
        ),
      },
    ],
    [t, handleDelete],
  );

  const table = useReactTable({
    data: filtered,
    columns,
    state: { sorting, globalFilter },
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: { pagination: { pageSize: 8 } },
  });

  return (
    <div className="flex flex-col gap-6">
      {/* Summary */}
      <SummaryCards products={products} />

      {/* Table Card */}
      <CardBox>
        {/* Toolbar */}
        <div className="p-4 flex flex-col sm:flex-row items-start sm:items-center gap-3 border-b border-border">
          <div className="flex-1 relative min-w-0 w-full sm:w-auto">
            <Icon
              icon="solar:magnifer-linear"
              width={15}
              className="absolute start-3 top-1/2 -translate-y-1/2 text-muted-foreground"
            />
            <Input
              placeholder={t.products.searchPlaceholder}
              value={globalFilter}
              onChange={(e) => setGlobalFilter(e.target.value)}
              className="ps-9 h-9 text-sm w-full"
            />
          </div>
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="h-9 text-sm w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">
                  {t.products.filters.allCategories}
                </SelectItem>
                {CATEGORIES.map((c) => (
                  <SelectItem key={c} value={c}>
                    {t.products.categories[c]}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="h-9 text-sm w-36">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">
                  {t.products.filters.allStatuses}
                </SelectItem>
                <SelectItem value="active">{t.products.active}</SelectItem>
                <SelectItem value="inactive">{t.products.inactive}</SelectItem>
                <SelectItem value="draft">{t.products.draft}</SelectItem>
              </SelectContent>
            </Select>
            <Link href="/apps/products/create">
              <Button size="sm" className="h-9 gap-1.5 shrink-0">
                <Icon icon="solar:add-circle-linear" width={15} />
                {t.products.createProduct}
              </Button>
            </Link>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((hg) => (
                <TableRow key={hg.id} className="hover:bg-transparent">
                  {hg.headers.map((h) => (
                    <TableHead
                      key={h.id}
                      className="text-xs font-semibold text-muted-foreground uppercase tracking-wide whitespace-nowrap"
                      onClick={h.column.getToggleSortingHandler()}
                      style={{ cursor: h.column.getCanSort() ? "pointer" : "" }}
                    >
                      <div className="flex items-center gap-1">
                        {flexRender(h.column.columnDef.header, h.getContext())}
                        {h.column.getCanSort() && (
                          <Icon
                            icon={
                              h.column.getIsSorted() === "asc"
                                ? "solar:alt-arrow-up-bold"
                                : h.column.getIsSorted() === "desc"
                                  ? "solar:alt-arrow-down-bold"
                                  : "solar:alt-arrow-down-linear"
                            }
                            width={12}
                            className={
                              h.column.getIsSorted()
                                ? "text-foreground"
                                : "text-muted-foreground/50"
                            }
                          />
                        )}
                      </div>
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-32 text-center text-muted-foreground"
                  >
                    <Icon
                      icon="solar:box-minimalistic-linear"
                      width={36}
                      className="mx-auto mb-2 opacity-30"
                    />
                    <p className="text-sm">{t.common.noData}</p>
                  </TableCell>
                </TableRow>
              ) : (
                table.getRowModel().rows.map((row) => (
                  <TableRow key={row.id} className="hover:bg-muted/30">
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id} className="py-3">
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext(),
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>

        {/* Pagination */}
        <div className="p-4 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-border">
          <p className="text-xs text-muted-foreground">
            {table.getFilteredRowModel().rows.length} نتیجه یافت شد
          </p>
          <div className="flex items-center gap-1">
            <Button
              variant="outline"
              size="sm"
              className="h-8 w-8 p-0"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              <Icon icon="solar:alt-arrow-right-linear" width={14} />
            </Button>
            {Array.from({ length: table.getPageCount() }, (_, i) => i).map(
              (p) => (
                <Button
                  key={p}
                  variant={
                    table.getState().pagination.pageIndex === p
                      ? "default"
                      : "outline"
                  }
                  size="sm"
                  className="h-8 w-8 p-0 text-xs"
                  onClick={() => table.setPageIndex(p)}
                >
                  {p + 1}
                </Button>
              ),
            )}
            <Button
              variant="outline"
              size="sm"
              className="h-8 w-8 p-0"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              <Icon icon="solar:alt-arrow-left-linear" width={14} />
            </Button>
          </div>
        </div>
      </CardBox>
    </div>
  );
}
