export interface Step {
  id: string;
  title: string;
  content: string;
}

export interface Chapter {
  id: string;
  title: string;
  steps: Step[];
}

export interface DocsCategory {
  id: string;
  title: string;
  chapters: Chapter[];
}
