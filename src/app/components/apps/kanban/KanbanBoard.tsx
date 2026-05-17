"use client";

import { useState, useCallback } from "react";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "@hello-pangea/dnd";
import { Icon } from "@iconify/react";
import Image from "next/image";
import { KanbanColumn, KanbanCard } from "./types";
import { initialColumns } from "./data";
import { uniqueId } from "lodash";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// ─── Priority Badge ────────────────────────────────────────────────────────────
const priorityConfig: Record<
  KanbanCard["priority"],
  { color: string; bg: string }
> = {
  عادی: { color: "text-foreground", bg: "bg-muted" },
  متوسط: { color: "text-orange-600", bg: "bg-orange-50 dark:bg-orange-950/30" },
  بالا: { color: "text-red-600", bg: "bg-red-50 dark:bg-red-950/30" },
  فوری: { color: "text-purple-600", bg: "bg-purple-50 dark:bg-purple-950/30" },
};

function PriorityBadge({ priority }: { priority: KanbanCard["priority"] }) {
  const { color, bg } = priorityConfig[priority];
  return (
    <span
      className={`text-xs font-medium px-2 py-0.5 rounded-full ${bg} ${color}`}
    >
      {priority === "عادی"
        ? "اولویت عادی"
        : priority === "متوسط"
          ? "اولویت متوسط"
          : priority === "بالا"
            ? "اولویت بالا"
            : "اولویت فوری"}
    </span>
  );
}

// ─── Kanban Card ───────────────────────────────────────────────────────────────
function KanbanCardItem({
  card,
  index,
  columnId,
  onDelete,
}: {
  card: KanbanCard;
  index: number;
  columnId: string;
  onDelete: (columnId: string, cardId: string) => void;
}) {
  return (
    <Draggable draggableId={card.id} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className={`bg-card border border-border rounded-xl p-4 mb-3 shadow-sm transition-shadow cursor-grab active:cursor-grabbing select-none
            ${snapshot.isDragging ? "shadow-xl ring-2 ring-primary/30 rotate-1" : "hover:shadow-md"}`}
        >
          {card.image && (
            <div className="mb-3 rounded-lg overflow-hidden h-32 relative">
              <Image
                src={card.image}
                alt={card.title}
                fill
                className="object-cover"
              />
            </div>
          )}

          {card.tags && card.tags.length > 0 && (
            <div className="flex flex-wrap gap-1 mb-2">
              {card.tags.map((tag) => (
                <Badge
                  key={tag}
                  variant="secondary"
                  className="text-xs px-2 py-0"
                >
                  {tag}
                </Badge>
              ))}
            </div>
          )}

          <p className="text-sm font-semibold text-foreground mb-3 leading-relaxed">
            {card.title}
          </p>

          <div className="flex items-center justify-between">
            <div className="flex -space-x-2 rtl:space-x-reverse">
              {card.assignees.slice(0, 3).map((src, i) => (
                <div
                  key={i}
                  className="w-7 h-7 rounded-full border-2 border-card overflow-hidden relative"
                >
                  <Image
                    src={src}
                    alt="assignee"
                    fill
                    className="object-cover"
                  />
                </div>
              ))}
              {card.assignees.length > 3 && (
                <div className="w-7 h-7 rounded-full border-2 border-card bg-muted flex items-center justify-center text-xs text-muted-foreground">
                  +{card.assignees.length - 3}
                </div>
              )}
            </div>
            <PriorityBadge priority={card.priority} />
          </div>

          <div className="flex items-center justify-between mt-3 pt-3 border-t border-border/50">
            <div className="flex items-center gap-3 text-muted-foreground text-xs">
              <span className="flex items-center gap-1">
                <Icon icon="solar:link-linear" className="w-3.5 h-3.5" />
                {card.links}
              </span>
              <span className="flex items-center gap-1">
                <Icon icon="solar:chat-line-linear" className="w-3.5 h-3.5" />
                {card.comments}
              </span>
            </div>
            <button
              onClick={() => onDelete(columnId, card.id)}
              className="text-muted-foreground hover:text-destructive transition-colors"
            >
              <Icon
                icon="solar:trash-bin-minimalistic-linear"
                className="w-3.5 h-3.5"
              />
            </button>
          </div>
        </div>
      )}
    </Draggable>
  );
}

// ─── Add Card Dialog ───────────────────────────────────────────────────────────
function AddCardDialog({
  open,
  onClose,
  onAdd,
}: {
  open: boolean;
  onClose: () => void;
  onAdd: (card: Omit<KanbanCard, "id">) => void;
}) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState<KanbanCard["priority"]>("عادی");

  const handleAdd = () => {
    if (!title.trim()) return;
    onAdd({
      title,
      description,
      priority,
      assignees: ["/images/profile/user-1.jpg"],
      comments: 0,
      links: 0,
    });
    setTitle("");
    setDescription("");
    setPriority("عادی");
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md" dir="rtl">
        <DialogHeader>
          <DialogTitle>افزودن کارت جدید</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-4 pt-2">
          <div>
            <label className="text-sm font-medium mb-1.5 block">عنوان</label>
            <Input
              dir="rtl"
              placeholder="عنوان کارت را وارد کنید..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleAdd()}
            />
          </div>
          <div>
            <label className="text-sm font-medium mb-1.5 block">توضیحات</label>
            <Input
              dir="rtl"
              placeholder="توضیحات (اختیاری)"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div>
            <label className="text-sm font-medium mb-1.5 block">اولویت</label>
            <Select
              value={priority}
              onValueChange={(v) => setPriority(v as KanbanCard["priority"])}
            >
              <SelectTrigger dir="rtl">
                <SelectValue />
              </SelectTrigger>
              <SelectContent dir="rtl">
                <SelectItem value="عادی">عادی</SelectItem>
                <SelectItem value="متوسط">متوسط</SelectItem>
                <SelectItem value="بالا">بالا</SelectItem>
                <SelectItem value="فوری">فوری</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex gap-2 justify-end">
            <Button variant="outline" onClick={onClose}>
              انصراف
            </Button>
            <Button onClick={handleAdd} disabled={!title.trim()}>
              افزودن
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

// ─── Add Column Dialog ─────────────────────────────────────────────────────────
function AddColumnDialog({
  open,
  onClose,
  onAdd,
}: {
  open: boolean;
  onClose: () => void;
  onAdd: (title: string, color: string) => void;
}) {
  const [title, setTitle] = useState("");
  const [color, setColor] = useState("#6366f1");
  const presets = [
    "#FF6B6B",
    "#4ECDC4",
    "#45B7D1",
    "#96CEB4",
    "#FFEAA7",
    "#DDA0DD",
    "#98D8C8",
    "#6366f1",
  ];

  const handleAdd = () => {
    if (!title.trim()) return;
    onAdd(title, color);
    setTitle("");
    setColor("#6366f1");
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-sm" dir="rtl">
        <DialogHeader>
          <DialogTitle>افزودن ستون جدید</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-4 pt-2">
          <div>
            <label className="text-sm font-medium mb-1.5 block">
              عنوان ستون
            </label>
            <Input
              dir="rtl"
              placeholder="مثلاً: بازبینی"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleAdd()}
            />
          </div>
          <div>
            <label className="text-sm font-medium mb-2 block">رنگ نشانگر</label>
            <div className="flex gap-2 flex-wrap">
              {presets.map((c) => (
                <button
                  key={c}
                  onClick={() => setColor(c)}
                  className={`w-7 h-7 rounded-full transition-transform ${color === c ? "scale-125 ring-2 ring-offset-2 ring-primary" : "hover:scale-110"}`}
                  style={{ backgroundColor: c }}
                />
              ))}
            </div>
          </div>
          <div className="flex gap-2 justify-end">
            <Button variant="outline" onClick={onClose}>
              انصراف
            </Button>
            <Button onClick={handleAdd} disabled={!title.trim()}>
              افزودن ستون
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

// ─── Main Board ────────────────────────────────────────────────────────────────
export default function KanbanBoard() {
  const [columns, setColumns] = useState<KanbanColumn[]>(initialColumns);
  const [addCardColId, setAddCardColId] = useState<string | null>(null);
  const [addColOpen, setAddColOpen] = useState(false);
  const [editingColId, setEditingColId] = useState<string | null>(null);
  const [editingColTitle, setEditingColTitle] = useState("");

  const onDragEnd = useCallback(
    (result: DropResult) => {
      const { source, destination, type } = result;
      if (!destination) return;
      if (
        source.droppableId === destination.droppableId &&
        source.index === destination.index
      )
        return;

      if (type === "COLUMN") {
        const reordered = Array.from(columns);
        const [removed] = reordered.splice(source.index, 1);
        reordered.splice(destination.index, 0, removed);
        setColumns(reordered);
        return;
      }

      const srcCol = columns.find((c) => c.id === source.droppableId)!;
      const dstCol = columns.find((c) => c.id === destination.droppableId)!;

      if (srcCol.id === dstCol.id) {
        const newCards = Array.from(srcCol.cards);
        const [removed] = newCards.splice(source.index, 1);
        newCards.splice(destination.index, 0, removed);
        setColumns(
          columns.map((c) =>
            c.id === srcCol.id ? { ...c, cards: newCards } : c,
          ),
        );
      } else {
        const srcCards = Array.from(srcCol.cards);
        const dstCards = Array.from(dstCol.cards);
        const [removed] = srcCards.splice(source.index, 1);
        dstCards.splice(destination.index, 0, removed);
        setColumns(
          columns.map((c) =>
            c.id === srcCol.id
              ? { ...c, cards: srcCards }
              : c.id === dstCol.id
                ? { ...c, cards: dstCards }
                : c,
          ),
        );
      }
    },
    [columns],
  );

  const handleAddCard = (colId: string, card: Omit<KanbanCard, "id">) => {
    setColumns(
      columns.map((c) =>
        c.id === colId
          ? { ...c, cards: [...c.cards, { ...card, id: uniqueId("card-") }] }
          : c,
      ),
    );
  };

  const handleDeleteCard = (colId: string, cardId: string) => {
    setColumns(
      columns.map((c) =>
        c.id === colId
          ? { ...c, cards: c.cards.filter((card) => card.id !== cardId) }
          : c,
      ),
    );
  };

  const handleDeleteColumn = (colId: string) => {
    setColumns(columns.filter((c) => c.id !== colId));
  };

  const handleAddColumn = (title: string, color: string) => {
    setColumns([...columns, { id: uniqueId("col-"), title, color, cards: [] }]);
  };

  const handleRenameColumn = (colId: string, newTitle: string) => {
    setColumns(
      columns.map((c) => (c.id === colId ? { ...c, title: newTitle } : c)),
    );
    setEditingColId(null);
  };

  return (
    <div dir="rtl" className="flex flex-col gap-5">
      {/* Board Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-bold text-foreground">
            بهبود فرآیندهای کاری
          </h2>
          <p className="text-sm text-muted-foreground mt-0.5">
            {columns.reduce((acc, c) => acc + c.cards.length, 0)} کارت در{" "}
            {columns.length} ستون
          </p>
        </div>
        <Button onClick={() => setAddColOpen(true)} className="gap-2">
          <Icon icon="solar:add-circle-linear" className="w-4 h-4" />
          افزودن ستون
        </Button>
      </div>

      {/* Board */}
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="board" direction="horizontal" type="COLUMN">
          {(provided) => (
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
              className="flex gap-4 overflow-x-auto pb-4 items-start"
              style={{ minHeight: "70vh" }}
            >
              {columns.map((col, colIndex) => (
                <Draggable key={col.id} draggableId={col.id} index={colIndex}>
                  {(colProvided, colSnapshot) => (
                    <div
                      ref={colProvided.innerRef}
                      {...colProvided.draggableProps}
                      className={`flex-shrink-0 w-72 bg-muted/40 dark:bg-muted/20 rounded-2xl p-3 transition-shadow
                        ${colSnapshot.isDragging ? "shadow-2xl ring-2 ring-primary/20" : ""}`}
                    >
                      {/* Column Header */}
                      <div
                        {...colProvided.dragHandleProps}
                        className="flex items-center justify-between mb-3 px-1"
                      >
                        <div className="flex items-center gap-2 min-w-0">
                          <span
                            className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                            style={{ backgroundColor: col.color }}
                          />
                          {editingColId === col.id ? (
                            <input
                              dir="rtl"
                              autoFocus
                              value={editingColTitle}
                              onChange={(e) =>
                                setEditingColTitle(e.target.value)
                              }
                              onBlur={() =>
                                handleRenameColumn(col.id, editingColTitle)
                              }
                              onKeyDown={(e) => {
                                if (e.key === "Enter")
                                  handleRenameColumn(col.id, editingColTitle);
                                if (e.key === "Escape") setEditingColId(null);
                              }}
                              className="text-sm font-semibold bg-transparent border-b border-primary outline-none w-full"
                            />
                          ) : (
                            <span
                              className="text-sm font-semibold text-foreground cursor-pointer truncate"
                              onDoubleClick={() => {
                                setEditingColId(col.id);
                                setEditingColTitle(col.title);
                              }}
                            >
                              {col.title}
                            </span>
                          )}
                          <span className="text-xs text-muted-foreground bg-background rounded-full w-5 h-5 flex items-center justify-center flex-shrink-0">
                            {col.cards.length}
                          </span>
                        </div>
                        <div className="flex items-center gap-1">
                          <button
                            onClick={() => setAddCardColId(col.id)}
                            className="p-1 rounded-lg hover:bg-background text-muted-foreground hover:text-foreground transition-colors"
                          >
                            <Icon
                              icon="solar:add-square-linear"
                              className="w-4 h-4"
                            />
                          </button>
                          <button
                            onClick={() => handleDeleteColumn(col.id)}
                            className="p-1 rounded-lg hover:bg-background text-muted-foreground hover:text-destructive transition-colors"
                          >
                            <Icon
                              icon="solar:trash-bin-minimalistic-linear"
                              className="w-4 h-4"
                            />
                          </button>
                        </div>
                      </div>

                      {/* Cards Drop Zone */}
                      <Droppable droppableId={col.id} type="CARD">
                        {(cardProvided, cardSnapshot) => (
                          <div
                            ref={cardProvided.innerRef}
                            {...cardProvided.droppableProps}
                            className={`min-h-[100px] rounded-xl transition-colors
                              ${cardSnapshot.isDraggingOver ? "bg-primary/5 ring-1 ring-primary/20" : ""}`}
                          >
                            {col.cards.map((card, cardIndex) => (
                              <KanbanCardItem
                                key={card.id}
                                card={card}
                                index={cardIndex}
                                columnId={col.id}
                                onDelete={handleDeleteCard}
                              />
                            ))}
                            {cardProvided.placeholder}
                          </div>
                        )}
                      </Droppable>

                      {/* Add Card Button */}
                      <button
                        onClick={() => setAddCardColId(col.id)}
                        className="mt-2 w-full flex items-center gap-2 px-3 py-2 rounded-xl text-sm text-muted-foreground hover:bg-background hover:text-foreground transition-colors"
                      >
                        <Icon
                          icon="solar:add-circle-linear"
                          className="w-4 h-4"
                        />
                        افزودن کارت
                      </button>
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>

      {/* Dialogs */}
      <AddCardDialog
        open={!!addCardColId}
        onClose={() => setAddCardColId(null)}
        onAdd={(card) => addCardColId && handleAddCard(addCardColId, card)}
      />
      <AddColumnDialog
        open={addColOpen}
        onClose={() => setAddColOpen(false)}
        onAdd={handleAddColumn}
      />
    </div>
  );
}
