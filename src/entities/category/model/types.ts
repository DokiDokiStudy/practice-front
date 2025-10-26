export type Category = {
  id: number;
  name: string;
  children: Category[];
  parentId?: number | null;
  groupId?: number | null;
};
