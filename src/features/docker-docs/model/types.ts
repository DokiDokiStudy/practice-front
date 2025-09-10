export interface Step {
  id: string;
  title: string;
}

export interface Chapter {
  id: string;
  title: string;
  steps: Step[];
}

export interface DocsSection {
  id: string;
  title: string;
  chapters: Chapter[];
}

export interface Category {
  id: string;
  name: string;
  parentId: string | null;
  groupId: string | null;
}
