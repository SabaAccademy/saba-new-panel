export interface KanbanCard {
  id: string;
  title: string;
  description?: string;
  priority: "عادی" | "متوسط" | "بالا" | "فوری";
  assignees: string[];
  image?: string;
  comments: number;
  links: number;
  tags?: string[];
}

export interface KanbanColumn {
  id: string;
  title: string;
  color: string;
  cards: KanbanCard[];
}
