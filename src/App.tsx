import { useState } from "react";
import { ComicsLibrary } from "./components/ComicsLibrary";
import { AdminPanel } from "./components/AdminPanel";
import { Comic, Author, Tag } from "./types";

const initialAuthors: Author[] = [
  { id: 1, name: "Alex Chen", bio: "Художник супергероев" },
  { id: 2, name: "Maria Rodriguez", bio: "Мастер экшн-комиксов" },
  { id: 3, name: "Yuki Tanaka", bio: "Создатель манги" },
  { id: 4, name: "James Morrison", bio: "Научная фантастика" },
  { id: 5, name: "Eleanor Price", bio: "Классические комиксы" },
  { id: 6, name: "Marcus Johnson", bio: "Мистика и детективы" },
];

const initialTags: Tag[] = [
  { id: 1, name: "Супергерои" },
  { id: 2, name: "Экшн" },
  { id: 3, name: "Манга" },
  { id: 4, name: "Научная фантастика" },
  { id: 5, name: "Классика" },
  { id: 6, name: "Мистика" },
];

const initialComics: Comic[] = [
  {
    id: 1,
    title: "Тёмный Страж",
    authorId: 1,
    coverImage:
      "https://images.unsplash.com/photo-1759863738666-7584248cdf7e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb21pYyUyMGJvb2slMjBjb3ZlcnxlbnwxfHx8fDE3NjIxOTIwODh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    tagIds: [1],
    issueNumber: 42,
    pages: [
      "https://images.unsplash.com/photo-1759863738666-7584248cdf7e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb21pYyUyMGJvb2slMjBjb3ZlcnxlbnwxfHx8fDE3NjIxOTIwODh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      "https://images.unsplash.com/photo-1658999167159-3f6659cace61?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdXBlcmhlcm8lMjBjb21pY3xlbnwxfHx8fDE3NjIxODE0MDZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      "https://images.unsplash.com/photo-1684086974613-7784a14e56cb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb21pYyUyMGJvb2slMjBhcnR8ZW58MXx8fHwxNzYyMTcwOTI3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    ],
  },
  {
    id: 2,
    title: "Стальные Герои",
    authorId: 2,
    coverImage:
      "https://images.unsplash.com/photo-1658999167159-3f6659cace61?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdXBlcmhlcm8lMjBjb21pY3xlbnwxfHx8fDE3NjIxODE0MDZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    tagIds: [2],
    issueNumber: 15,
    pages: [
      "https://images.unsplash.com/photo-1658999167159-3f6659cace61?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdXBlcmhlcm8lMjBjb21pY3xlbnwxfHx8fDE3NjIxODE0MDZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      "https://images.unsplash.com/photo-1684086974613-7784a14e56cb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb21pYyUyMGJvb2slMjBhcnR8ZW58MXx8fHwxNzYyMTcwOTI3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      "https://images.unsplash.com/photo-1759863738666-7584248cdf7e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb21pYyUyMGJvb2slMjBjb3ZlcnxlbnwxfHx8fDE3NjIxOTIwODh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    ],
  },
  {
    id: 3,
    title: "Лунные Хроники",
    authorId: 3,
    coverImage:
      "https://images.unsplash.com/photo-1588497859490-85d1c17db96d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYW5nYSUyMGNvbWljfGVufDF8fHx8MTc2MjIwNTA3MHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    tagIds: [3],
    issueNumber: 7,
    pages: [
      "https://images.unsplash.com/photo-1588497859490-85d1c17db96d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYW5nYSUyMGNvbWljfGVufDF8fHx8MTc2MjIwNTA3MHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      "https://images.unsplash.com/photo-1625000910270-81c3562056ba?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2aW50YWdlJTIwY29taWNzfGVufDF8fHx8MTc2MjIwNTA3MXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      "https://images.unsplash.com/photo-1531501410720-c8d437636169?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxncmFwaGljJTIwbm92ZWx8ZW58MXx8fHwxNzYyMjA1MDcxfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    ],
  },
  {
    id: 4,
    title: "Последний Рубеж",
    authorId: 4,
    coverImage:
      "https://images.unsplash.com/photo-1531501410720-c8d437636169?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxncmFwaGljJTIwbm92ZWx8ZW58MXx8fHwxNzYyMjA1MDcxfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    tagIds: [4],
    issueNumber: 23,
    pages: [
      "https://images.unsplash.com/photo-1531501410720-c8d437636169?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxncmFwaGljJTIwbm92ZWx8ZW58MXx8fHwxNzYyMjA1MDcxfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      "https://images.unsplash.com/photo-1759863738666-7584248cdf7e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb21pYyUyMGJvb2slMjBjb3ZlcnxlbnwxfHx8fDE3NjIxOTIwODh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      "https://images.unsplash.com/photo-1658999167159-3f6659cace61?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdXBlcmhlcm8lMjBjb21pY3xlbnwxfHx8fDE3NjIxODE0MDZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    ],
  },
  {
    id: 5,
    title: "Винтажные Истории",
    authorId: 5,
    coverImage:
      "https://images.unsplash.com/photo-1625000910270-81c3562056ba?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2aW50YWdlJTIwY29taWNzfGVufDF8fHx8MTc2MjIwNTA3MXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    tagIds: [5],
    issueNumber: 88,
    pages: [
      "https://images.unsplash.com/photo-1625000910270-81c3562056ba?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2aW50YWdlJTIwY29taWNzfGVufDF8fHx8MTc2MjIwNTA3MXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      "https://images.unsplash.com/photo-1588497859490-85d1c17db96d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYW5nYSUyMGNvbWljfGVufDF8fHx8MTc2MjIwNTA3MHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      "https://images.unsplash.com/photo-1684086974613-7784a14e56cb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb21pYyUyMGJvb2slMjBhcnR8ZW58MXx8fHwxNzYyMTcwOTI3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    ],
  },
  {
    id: 6,
    title: "Городские Легенды",
    authorId: 6,
    coverImage:
      "https://images.unsplash.com/photo-1684086974613-7784a14e56cb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb21pYyUyMGJvb2slMjBhcnR8ZW58MXx8fHwxNzYyMTcwOTI3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    tagIds: [6],
    issueNumber: 31,
    pages: [
      "https://images.unsplash.com/photo-1684086974613-7784a14e56cb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb21pYyUyMGJvb2slMjBhcnR8ZW58MXx8fHwxNzYyMTcwOTI3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      "https://images.unsplash.com/photo-1531501410720-c8d437636169?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxncmFwaGljJTIwbm92ZWx8ZW58MXx8fHwxNzYyMjA1MDcxfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      "https://images.unsplash.com/photo-1625000910270-81c3562056ba?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2aW50YWdlJTIwY29taWNzfGVufDF8fHx8MTc2MjIwNTA3MXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    ],
  },
];

type Page = "library" | "admin";

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>("library");
  const [comics, setComics] = useState<Comic[]>(initialComics);
  const [authors, setAuthors] = useState<Author[]>(initialAuthors);
  const [tags, setTags] = useState<Tag[]>(initialTags);

  // Comics handlers
  const handleAddComic = (comic: Omit<Comic, "id">) => {
    const newComic = { ...comic, id: Math.max(...comics.map((c) => c.id), 0) + 1 };
    setComics([...comics, newComic]);
  };

  const handleUpdateComic = (comic: Comic) => {
    setComics(comics.map((c) => (c.id === comic.id ? comic : c)));
  };

  const handleDeleteComic = (id: number) => {
    setComics(comics.filter((c) => c.id !== id));
  };

  // Authors handlers
  const handleAddAuthor = (author: Omit<Author, "id">) => {
    const newAuthor = {
      ...author,
      id: Math.max(...authors.map((a) => a.id), 0) + 1,
    };
    setAuthors([...authors, newAuthor]);
  };

  const handleUpdateAuthor = (author: Author) => {
    setAuthors(authors.map((a) => (a.id === author.id ? author : a)));
  };

  const handleDeleteAuthor = (id: number) => {
    setAuthors(authors.filter((a) => a.id !== id));
  };

  // Tags handlers
  const handleAddTag = (tag: Omit<Tag, "id">) => {
    const newTag = { ...tag, id: Math.max(...tags.map((t) => t.id), 0) + 1 };
    setTags([...tags, newTag]);
  };

  const handleUpdateTag = (tag: Tag) => {
    setTags(tags.map((t) => (t.id === tag.id ? tag : t)));
  };

  const handleDeleteTag = (id: number) => {
    setTags(tags.filter((t) => t.id !== id));
    // Remove tag from all comics
    setComics(
      comics.map((c) => ({
        ...c,
        tagIds: c.tagIds.filter((tagId) => tagId !== id),
      }))
    );
  };

  return (
    <div className="min-h-screen bg-background">
      <nav className="border-b bg-background">
        <div className="container mx-auto px-4">
          <div className="flex gap-1">
            <button
              onClick={() => setCurrentPage("library")}
              className={`px-4 py-3 border-b-2 transition-colors ${
                currentPage === "library"
                  ? "border-primary"
                  : "border-transparent hover:border-muted-foreground"
              }`}
            >
              Библиотека
            </button>
            <button
              onClick={() => setCurrentPage("admin")}
              className={`px-4 py-3 border-b-2 transition-colors ${
                currentPage === "admin"
                  ? "border-primary"
                  : "border-transparent hover:border-muted-foreground"
              }`}
            >
              Управление
            </button>
          </div>
        </div>
      </nav>

      {currentPage === "library" && (
        <ComicsLibrary comics={comics} authors={authors} tags={tags} />
      )}

      {currentPage === "admin" && (
        <AdminPanel
          comics={comics}
          authors={authors}
          tags={tags}
          onAddComic={handleAddComic}
          onUpdateComic={handleUpdateComic}
          onDeleteComic={handleDeleteComic}
          onAddAuthor={handleAddAuthor}
          onUpdateAuthor={handleUpdateAuthor}
          onDeleteAuthor={handleDeleteAuthor}
          onAddTag={handleAddTag}
          onUpdateTag={handleUpdateTag}
          onDeleteTag={handleDeleteTag}
        />
      )}
    </div>
  );
}
