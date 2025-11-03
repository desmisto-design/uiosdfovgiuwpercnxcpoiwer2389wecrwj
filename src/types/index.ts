export interface Author {
  id: number;
  name: string;
  bio?: string;
}

export interface Tag {
  id: number;
  name: string;
}

export interface Comic {
  id: number;
  title: string;
  authorId: number;
  coverImage: string;
  tagIds: number[];
  issueNumber: number;
  pages: string[];
}
