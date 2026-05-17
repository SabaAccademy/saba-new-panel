"use client";

import React, { useState, useMemo, useCallback } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getExpandedRowModel,
  flexRender,
  type ColumnDef,
  type SortingState,
  type VisibilityState,
  type RowSelectionState,
  type ExpandedState,
} from "@tanstack/react-table";
import Image from "next/image";
import { Icon } from "@iconify/react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
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
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import CardBox from "@/app/components/shared/CardBox";
import { ordersData, summaryStats, type Order, type OrderStatus } from "./data";

// ─── Status Config ─────────────────────────────────────────────────────────────
const statusConfig: Record<
  OrderStatus,
  { label: string; color: string; dot: string }
> = {
  "در انتظار": {
    label: "در انتظار",
    color:
      "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-400",
    dot: "bg-amber-500",
  },
  "تکمیل شده": {
    label: "تکمیل شده",
    color:
      "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-400",
    dot: "bg-emerald-500",
  },
  "ارسال شده": {
    label: "ارسال شده",
    color: "bg-cyan-100 text-cyan-700 dark:bg-cyan-900/40 dark:text-cyan-400",
    dot: "bg-cyan-500",
  },
  "لغو شده": {
    label: "لغو شده",
    color: "bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-400",
    dot: "bg-red-500",
  },
  "در حال پردازش": {
    label: "در حال پردازش",
    color: "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-400",
    dot: "bg-blue-500",
  },
};

function StatusBadge({ status }: { status: OrderStatus }) {
  const cfg = statusConfig[status];
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${cfg.color}`}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${cfg.dot}`} />
      {cfg.label}
    </span>
  );
}

// ─── Expanded Row ──────────────────────────────────────────────────────────────
function ExpandedRow({ order }: { order: Order }) {
  return (
    <div
      dir="rtl"
      className="grid grid-cols-2 md:grid-cols-4 gap-4 px-6 py-4 bg-muted/30 text-sm"
    >
      <div>
        <p className="text-muted-foreground text-xs mb-1">ایمیل مشتری</p>
        <p className="font-medium">{order.customer.email}</p>
      </div>
      <div>
        <p className="text-muted-foreground text-xs mb-1">روش پرداخت</p>
        <p className="font-medium">{order.paymentMethod}</p>
      </div>
      <div>
        <p className="text-muted-foreground text-xs mb-1">کد رهگیری</p>
        <p className="font-medium font-mono">{order.trackingCode}</p>
      </div>
      <div>
        <p className="text-muted-foreground text-xs mb-1">تعداد اقلام</p>
        <p className="font-medium">{order.items} عدد</p>
      </div>
    </div>
  );
}

// ─── Summary Cards ─────────────────────────────────────────────────────────────
function SummaryCards() {
  return (
    <div
      dir="rtl"
      className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-6 gap-4 mb-6"
    >
      {summaryStats.map((stat) => (
        <div
          key={stat.label}
          className={`rounded-xl p-4 flex items-center justify-between ${stat.color}`}
        >
          <div>
            <p className="text-2xl font-bold text-foreground">{stat.value}</p>
            <p className="text-xs text-muted-foreground mt-1">{stat.label}</p>
          </div>
          <div className={`${stat.iconColor}`}>
            <Icon icon={stat.icon} className="w-8 h-8" />
          </div>
        </div>
      ))}
    </div>
  );
}

// ─── Main Component ────────────────────────────────────────────────────────────
export default function OrdersTable() {
  const [globalFilter, setGlobalFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [sorting, setSorting] = useState<SortingState>([]);
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [expanded, setExpanded] = useState<ExpandedState>({});

  const filteredData = useMemo(
    () =>
      statusFilter === "all"
        ? ordersData
        : ordersData.filter((o) => o.status === statusFilter),
    [statusFilter],
  );

  const columns = useMemo<ColumnDef<Order>[]>(
    () => [
      // Select
      {
        id: "select",
        header: ({ table }) => (
          <Checkbox
            checked={table.getIsAllPageRowsSelected()}
            onCheckedChange={(v) => table.toggleAllPageRowsSelected(!!v)}
            aria-label="انتخاب همه"
          />
        ),
        cell: ({ row }) => (
          <Checkbox
            checked={row.getIsSelected()}
            onCheckedChange={(v) => row.toggleSelected(!!v)}
            aria-label="انتخاب ردیف"
          />
        ),
        enableSorting: false,
        enableHiding: false,
        size: 40,
      },
      // Expand
      {
        id: "expand",
        header: "",
        cell: ({ row }) => (
          <button
            onClick={row.getToggleExpandedHandler()}
            className="p-1 text-muted-foreground hover:text-foreground transition-colors"
          >
            <Icon
              icon={
                row.getIsExpanded()
                  ? "solar:alt-arrow-up-linear"
                  : "solar:alt-arrow-down-linear"
              }
              className="w-4 h-4"
            />
          </button>
        ),
        enableSorting: false,
        enableHiding: false,
        size: 36,
      },
      // Order ID
      {
        accessorKey: "id",
        header: "شماره سفارش",
        cell: ({ getValue }) => (
          <span className="font-mono font-semibold text-foreground">
            {getValue<string>()}
          </span>
        ),
      },
      // Customer
      {
        accessorKey: "customer",
        header: "مشتری",
        cell: ({ getValue }) => {
          const c = getValue<Order["customer"]>();
          return (
            <div className="flex items-center gap-2.5">
              <div className="relative w-8 h-8 rounded-full overflow-hidden shrink-0">
                <Image
                  src={c.avatar}
                  alt={c.name}
                  fill
                  className="object-cover"
                />
              </div>
              <span className="font-medium text-foreground whitespace-nowrap">
                {c.name}
              </span>
            </div>
          );
        },
        sortingFn: (a, b) =>
          a.original.customer.name.localeCompare(
            b.original.customer.name,
            "fa",
          ),
        filterFn: (row, _, filterValue) =>
          row.original.customer.name
            .toLowerCase()
            .includes(String(filterValue).toLowerCase()),
      },
      // Status
      {
        accessorKey: "status",
        header: "وضعیت",
        cell: ({ getValue }) => (
          <StatusBadge status={getValue<OrderStatus>()} />
        ),
        filterFn: (row, _, filterValue) =>
          filterValue === "all" || row.original.status === filterValue,
      },
      // Date
      {
        accessorKey: "date",
        header: "تاریخ",
        cell: ({ row }) => (
          <div className="text-sm">
            <p className="font-medium text-foreground">{row.original.date}</p>
            <p className="text-muted-foreground text-xs">{row.original.time}</p>
          </div>
        ),
      },
      // Amount
      {
        accessorKey: "amount",
        header: "مبلغ",
        cell: ({ getValue }) => (
          <span className="font-semibold text-foreground">
            {getValue<number>().toLocaleString("fa-IR")} ﷼
          </span>
        ),
      },
      // Address
      {
        accessorKey: "address",
        header: "آدرس",
        cell: ({ getValue }) => (
          <span className="text-sm text-muted-foreground max-w-48 block truncate">
            {getValue<string>()}
          </span>
        ),
      },
      // Actions
      {
        id: "actions",
        header: "عملیات",
        enableSorting: false,
        cell: ({ row }) => (
          <div className="flex items-center gap-1">
            <button
              onClick={row.getToggleExpandedHandler()}
              className="p-1.5 rounded-lg text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors"
            >
              <Icon icon="solar:alt-arrow-down-linear" className="w-4 h-4" />
            </button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors">
                  <Icon icon="solar:menu-dots-bold" className="w-4 h-4" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem className="gap-2">
                  <Icon icon="solar:eye-linear" className="w-4 h-4" />
                  مشاهده جزئیات
                </DropdownMenuItem>
                <DropdownMenuItem className="gap-2">
                  <Icon icon="solar:pen-linear" className="w-4 h-4" />
                  ویرایش سفارش
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="gap-2 text-destructive focus:text-destructive">
                  <Icon
                    icon="solar:trash-bin-minimalistic-linear"
                    className="w-4 h-4"
                  />
                  حذف سفارش
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        ),
      },
    ],
    [],
  );

  const table = useReactTable({
    data: filteredData,
    columns,
    state: { globalFilter, sorting, rowSelection, columnVisibility, expanded },
    onGlobalFilterChange: setGlobalFilter,
    onSortingChange: setSorting,
    onRowSelectionChange: setRowSelection,
    onColumnVisibilityChange: setColumnVisibility,
    onExpandedChange: setExpanded,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getExpandedRowModel: getExpandedRowModel(),
    globalFilterFn: "includesString",
    initialState: { pagination: { pageSize: 10 } },
  });

  const selectedCount = Object.keys(rowSelection).length;

  // CSV Export
  const handleExport = useCallback(() => {
    const headers = [
      "شماره سفارش",
      "مشتری",
      "وضعیت",
      "تاریخ",
      "مبلغ",
      "آدرس",
      "روش پرداخت",
      "کد رهگیری",
    ];
    const rows = ordersData.map((o) => [
      o.id,
      o.customer.name,
      o.status,
      `${o.date} ${o.time}`,
      o.amount,
      o.address,
      o.paymentMethod,
      o.trackingCode,
    ]);
    const csv = [headers, ...rows]
      .map((r) => r.map((v) => `"${v}"`).join(","))
      .join("\n");
    const blob = new Blob(["\uFEFF" + csv], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "orders.csv";
    a.click();
    URL.revokeObjectURL(url);
  }, []);

  const { pageIndex, pageSize } = table.getState().pagination;
  const totalRows = table.getFilteredRowModel().rows.length;
  const from = pageIndex * pageSize + 1;
  const to = Math.min((pageIndex + 1) * pageSize, totalRows);

  return (
    <div dir="rtl">
      <SummaryCards />

      <CardBox>
        {/* Table Header */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
          <div className="flex items-center gap-3">
            <h3 className="text-xl font-bold text-foreground">جدول سفارشات</h3>
            {selectedCount > 0 && (
              <Badge variant="secondary" className="gap-1">
                {selectedCount} انتخاب شده
                <button
                  onClick={() => setRowSelection({})}
                  className="mr-1 hover:text-destructive"
                >
                  <Icon
                    icon="solar:close-circle-linear"
                    className="w-3.5 h-3.5"
                  />
                </button>
              </Badge>
            )}
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {/* Search */}
            <div className="relative">
              <Icon
                icon="solar:magnifer-linear"
                className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground"
              />
              <Input
                dir="rtl"
                placeholder="جستجو..."
                value={globalFilter}
                onChange={(e) => setGlobalFilter(e.target.value)}
                className="pr-9 w-48"
              />
            </div>

            {/* Status Filter */}
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-40" dir="rtl">
                <Icon
                  icon="solar:filter-linear"
                  className="w-4 h-4 text-muted-foreground ml-1"
                />
                <SelectValue placeholder="فیلتر وضعیت" />
              </SelectTrigger>
              <SelectContent dir="rtl">
                <SelectItem value="all">همه وضعیت‌ها</SelectItem>
                <SelectItem value="در انتظار">در انتظار</SelectItem>
                <SelectItem value="تکمیل شده">تکمیل شده</SelectItem>
                <SelectItem value="ارسال شده">ارسال شده</SelectItem>
                <SelectItem value="در حال پردازش">در حال پردازش</SelectItem>
                <SelectItem value="لغو شده">لغو شده</SelectItem>
              </SelectContent>
            </Select>

            {/* Column Visibility */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="gap-1.5">
                  <Icon icon="solar:settings-linear" className="w-4 h-4" />
                  ستون‌ها
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-44">
                {table
                  .getAllColumns()
                  .filter((col) => col.getCanHide())
                  .map((col) => (
                    <DropdownMenuCheckboxItem
                      key={col.id}
                      checked={col.getIsVisible()}
                      onCheckedChange={(v) => col.toggleVisibility(v)}
                    >
                      {typeof col.columnDef.header === "string"
                        ? col.columnDef.header
                        : col.id}
                    </DropdownMenuCheckboxItem>
                  ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Export */}
            <Button
              variant="outline"
              size="sm"
              onClick={handleExport}
              className="gap-1.5"
            >
              <Icon
                icon="solar:download-minimalistic-linear"
                className="w-4 h-4"
              />
              خروجی CSV
            </Button>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto rounded-xl border border-border">
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((hg) => (
                <TableRow key={hg.id} className="bg-muted/50 hover:bg-muted/50">
                  {hg.headers.map((header) => (
                    <TableHead
                      key={header.id}
                      style={{ width: header.getSize() }}
                      className="text-foreground font-semibold px-4 py-3 whitespace-nowrap"
                    >
                      {header.isPlaceholder ? null : (
                        <div
                          className={`flex items-center gap-1 ${header.column.getCanSort() ? "cursor-pointer select-none" : ""}`}
                          onClick={header.column.getToggleSortingHandler()}
                        >
                          {flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                          {header.column.getCanSort() && (
                            <span className="text-muted-foreground">
                              {header.column.getIsSorted() === "asc" ? (
                                <Icon
                                  icon="solar:alt-arrow-up-linear"
                                  className="w-3.5 h-3.5"
                                />
                              ) : header.column.getIsSorted() === "desc" ? (
                                <Icon
                                  icon="solar:alt-arrow-down-linear"
                                  className="w-3.5 h-3.5"
                                />
                              ) : (
                                <Icon
                                  icon="solar:sort-vertical-linear"
                                  className="w-3.5 h-3.5 opacity-40"
                                />
                              )}
                            </span>
                          )}
                        </div>
                      )}
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
                    className="text-center py-12 text-muted-foreground"
                  >
                    <Icon
                      icon="solar:inbox-linear"
                      className="w-10 h-10 mx-auto mb-2 opacity-40"
                    />
                    <p>نتیجه‌ای یافت نشد</p>
                  </TableCell>
                </TableRow>
              ) : (
                table.getRowModel().rows.map((row, rowIdx) => (
                  <React.Fragment key={row.id}>
                    <TableRow
                      className={`transition-colors border-b border-border/50
                        ${rowIdx % 2 === 0 ? "bg-background" : "bg-muted/25"}
                        ${row.getIsSelected() ? "bg-primary/5 hover:bg-primary/10" : "hover:bg-muted/50"}
                      `}
                    >
                      {row.getVisibleCells().map((cell) => (
                        <TableCell key={cell.id} className="px-4 py-3">
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext(),
                          )}
                        </TableCell>
                      ))}
                    </TableRow>
                    {row.getIsExpanded() && (
                      <TableRow
                        className={
                          rowIdx % 2 === 0 ? "bg-background" : "bg-muted/25"
                        }
                      >
                        <TableCell
                          colSpan={columns.length}
                          className="p-0 border-b border-border/50"
                        >
                          <ExpandedRow order={row.original} />
                        </TableCell>
                      </TableRow>
                    )}
                  </React.Fragment>
                ))
              )}
            </TableBody>
          </Table>
        </div>

        {/* Pagination */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-4 text-sm">
          <div className="flex items-center gap-2 text-muted-foreground">
            نمایش
            <Select
              value={String(pageSize)}
              onValueChange={(v) => table.setPageSize(Number(v))}
            >
              <SelectTrigger className="w-16 h-8" dir="rtl">
                <SelectValue />
              </SelectTrigger>
              <SelectContent dir="rtl">
                {[5, 10, 20, 50].map((s) => (
                  <SelectItem key={s} value={String(s)}>
                    {s}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            در هر صفحه
          </div>

          <span className="text-muted-foreground">
            {from}–{to} از {totalRows}
          </span>

          <div className="flex items-center gap-1">
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.setPageIndex(0)}
              disabled={!table.getCanPreviousPage()}
              className="h-8 w-8 p-0"
            >
              <Icon
                icon="solar:double-alt-arrow-right-linear"
                className="w-4 h-4"
              />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
              className="h-8 w-8 p-0"
            >
              <Icon icon="solar:alt-arrow-right-linear" className="w-4 h-4" />
            </Button>

            {Array.from({ length: table.getPageCount() }, (_, i) => i)
              .filter((i) => Math.abs(i - pageIndex) <= 2)
              .map((i) => (
                <Button
                  key={i}
                  variant={i === pageIndex ? "default" : "outline"}
                  size="sm"
                  onClick={() => table.setPageIndex(i)}
                  className="h-8 w-8 p-0"
                >
                  {i + 1}
                </Button>
              ))}

            <Button
              variant="outline"
              size="sm"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
              className="h-8 w-8 p-0"
            >
              <Icon icon="solar:alt-arrow-left-linear" className="w-4 h-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.setPageIndex(table.getPageCount() - 1)}
              disabled={!table.getCanNextPage()}
              className="h-8 w-8 p-0"
            >
              <Icon
                icon="solar:double-alt-arrow-left-linear"
                className="w-4 h-4"
              />
            </Button>
          </div>
        </div>
      </CardBox>
    </div>
  );
}
