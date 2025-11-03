import { useState } from "react";
import { ComicCard } from "./ComicCard";
import { ComicReader } from "./ComicReader";
import { Comic, Author, Tag } from "../types";

interface ComicsLibraryProps {
  comics: Comic[];
  authors: Author[];
  tags: Tag[];
}

export function ComicsLibrary({ comics, authors, tags }: ComicsLibraryProps) {
  const [selectedComic, setSelectedComic] = useState<Comic | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTagId, setSelectedTagId] = useState<number | null>(null);

  const allTags = [{ id: null, name: "Все жанры" }, ...tags.map(t => ({ id: t.id, name: t.name }))];

  const filteredComics = comics.filter((comic) => {
    const author = authors.find((a) => a.id === comic.authorId);
    const matchesSearch =
      comic.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      author?.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTag = selectedTagId === null || comic.tagIds.includes(selectedTagId);
    return matchesSearch && matchesTag;
  });

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b sticky top-0 bg-background/95 backdrop-blur z-10">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center gap-3 mb-6">
            <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
              />
            </svg>
            <h1>Библиотека комиксов</h1>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <svg
                className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
              <input
                type="text"
                placeholder="Поиск комиксов или авторов..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full h-9 pl-9 pr-3 rounded-md border border-input bg-background text-sm outline-none focus:ring-2 focus:ring-ring"
              />
            </div>

            <select
              value={selectedTagId ?? ""}
              onChange={(e) =>
                setSelectedTagId(e.target.value ? Number(e.target.value) : null)
              }
              className="h-9 px-3 rounded-md border border-input bg-background text-sm outline-none focus:ring-2 focus:ring-ring w-full sm:w-[180px]"
            >
              {allTags.map((tag) => (
                <option key={tag.id ?? "all"} value={tag.id ?? ""}>
                  {tag.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {filteredComics.length === 0 ? (
          <div className="text-center py-16 text-muted-foreground">
            Комиксы не найдены.
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
            {filteredComics.map((comic) => {
              const author = authors.find((a) => a.id === comic.authorId);
              const comicTags = tags.filter((t) => comic.tagIds.includes(t.id));

              return (
                <ComicCard
                  key={comic.id}
                  id={comic.id}
                  title={comic.title}
                  author={author?.name || "Unknown"}
                  coverImage={comic.coverImage}
                  genre={comicTags.map((t) => t.name).join(", ") || "Без жанра"}
                  issueNumber={comic.issueNumber}
                  onClick={() => setSelectedComic(comic)}
                />
              );
            })}
          </div>
        )}
      </main>

      <ComicReader
        comic={selectedComic}
        isOpen={!!selectedComic}
        onClose={() => setSelectedComic(null)}
      />
    </div>
  );
}
