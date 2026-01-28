export interface Category {
  id: number;
  name: string;
  children: Category[];
  parentId?: number | null;
  groupId?: number | null;
}

export interface CategoryNew {
  id: number;
  name: string;
  children: Category[];
}
