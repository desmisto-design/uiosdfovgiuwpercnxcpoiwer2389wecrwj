import { useState } from "react";
import { Author, Tag, Comic } from "../types";

interface AdminPanelProps {
  comics: Comic[];
  authors: Author[];
  tags: Tag[];
  onAddComic: (comic: Omit<Comic, "id">) => void;
  onUpdateComic: (comic: Comic) => void;
  onDeleteComic: (id: number) => void;
  onAddAuthor: (author: Omit<Author, "id">) => void;
  onUpdateAuthor: (author: Author) => void;
  onDeleteAuthor: (id: number) => void;
  onAddTag: (tag: Omit<Tag, "id">) => void;
  onUpdateTag: (tag: Tag) => void;
  onDeleteTag: (id: number) => void;
}

type Tab = "comics" | "authors" | "tags";

export function AdminPanel({
  comics,
  authors,
  tags,
  onAddComic,
  onUpdateComic,
  onDeleteComic,
  onAddAuthor,
  onUpdateAuthor,
  onDeleteAuthor,
  onAddTag,
  onUpdateTag,
  onDeleteTag,
}: AdminPanelProps) {
  const [activeTab, setActiveTab] = useState<Tab>("comics");

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-8">Панель управления</h1>

      <div className="flex gap-2 mb-6 border-b-2 border-border">
        <button
          onClick={() => setActiveTab("comics")}
          className={`px-6 py-3 border-b-4 transition-all font-medium ${
            activeTab === "comics"
              ? "border-primary text-primary bg-primary/10"
              : "border-transparent hover:border-muted-foreground hover:bg-accent"
          }`}
        >
          Комиксы
        </button>
        <button
          onClick={() => setActiveTab("authors")}
          className={`px-6 py-3 border-b-4 transition-all font-medium ${
            activeTab === "authors"
              ? "border-primary text-primary bg-primary/10"
              : "border-transparent hover:border-muted-foreground hover:bg-accent"
          }`}
        >
          Авторы
        </button>
        <button
          onClick={() => setActiveTab("tags")}
          className={`px-6 py-3 border-b-4 transition-all font-medium ${
            activeTab === "tags"
              ? "border-primary text-primary bg-primary/10"
              : "border-transparent hover:border-muted-foreground hover:bg-accent"
          }`}
        >
          Теги
        </button>
      </div>

      {activeTab === "comics" && (
        <ComicsManager
          comics={comics}
          authors={authors}
          tags={tags}
          onAdd={onAddComic}
          onUpdate={onUpdateComic}
          onDelete={onDeleteComic}
        />
      )}

      {activeTab === "authors" && (
        <AuthorsManager
          authors={authors}
          onAdd={onAddAuthor}
          onUpdate={onUpdateAuthor}
          onDelete={onDeleteAuthor}
        />
      )}

      {activeTab === "tags" && (
        <TagsManager
          tags={tags}
          onAdd={onAddTag}
          onUpdate={onUpdateTag}
          onDelete={onDeleteTag}
        />
      )}
    </div>
  );
}

function ComicsManager({
  comics,
  authors,
  tags,
  onAdd,
  onUpdate,
  onDelete,
}: {
  comics: Comic[];
  authors: Author[];
  tags: Tag[];
  onAdd: (comic: Omit<Comic, "id">) => void;
  onUpdate: (comic: Comic) => void;
  onDelete: (id: number) => void;
}) {
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    authorId: authors[0]?.id || 1,
    coverImage: "",
    tagIds: [] as number[],
    issueNumber: 1,
    pages: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const pagesArray = formData.pages.split("\n").filter((p) => p.trim());

    if (editingId) {
      onUpdate({
        id: editingId,
        title: formData.title,
        authorId: formData.authorId,
        coverImage: formData.coverImage,
        tagIds: formData.tagIds,
        issueNumber: formData.issueNumber,
        pages: pagesArray,
      });
      setEditingId(null);
    } else {
      onAdd({
        title: formData.title,
        authorId: formData.authorId,
        coverImage: formData.coverImage,
        tagIds: formData.tagIds,
        issueNumber: formData.issueNumber,
        pages: pagesArray,
      });
      setIsAdding(false);
    }
    resetForm();
  };

  const resetForm = () => {
    setFormData({
      title: "",
      authorId: authors[0]?.id || 1,
      coverImage: "",
      tagIds: [],
      issueNumber: 1,
      pages: "",
    });
  };

  const handleEdit = (comic: Comic) => {
    setEditingId(comic.id);
    setFormData({
      title: comic.title,
      authorId: comic.authorId,
      coverImage: comic.coverImage,
      tagIds: comic.tagIds,
      issueNumber: comic.issueNumber,
      pages: comic.pages.join("\n"),
    });
    setIsAdding(true);
  };

  const handleCancel = () => {
    setIsAdding(false);
    setEditingId(null);
    resetForm();
  };

  const toggleTag = (tagId: number) => {
    setFormData((prev) => ({
      ...prev,
      tagIds: prev.tagIds.includes(tagId)
        ? prev.tagIds.filter((id) => id !== tagId)
        : [...prev.tagIds, tagId],
    }));
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2>Комиксы ({comics.length})</h2>
        {!isAdding && (
          <button
            onClick={() => setIsAdding(true)}
            className="px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 shadow-md hover:shadow-lg transition-all"
          >
            + Добавить комикс
          </button>
        )}
      </div>

      {isAdding && (
        <div className="bg-card border-2 border-primary/20 rounded-xl p-8 mb-6 shadow-lg">
          <h3 className="mb-6">
            {editingId ? "Редактировать комикс" : "Новый комикс"}
          </h3>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block mb-3 font-medium text-foreground">Название *</label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                required
                placeholder="Введите название комикса"
                className="w-full h-11 px-4 rounded-lg border-2 border-input bg-background focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all outline-none"
              />
            </div>

            <div>
              <label className="block mb-3 font-medium text-foreground">Автор *</label>
              <select
                value={formData.authorId}
                onChange={(e) =>
                  setFormData({ ...formData, authorId: Number(e.target.value) })
                }
                className="w-full h-11 px-4 rounded-lg border-2 border-input bg-background focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all outline-none"
              >
                {authors.map((author) => (
                  <option key={author.id} value={author.id}>
                    {author.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block mb-3 font-medium text-foreground">URL обложки *</label>
              <input
                type="url"
                value={formData.coverImage}
                onChange={(e) =>
                  setFormData({ ...formData, coverImage: e.target.value })
                }
                required
                placeholder="https://example.com/image.jpg"
                className="w-full h-11 px-4 rounded-lg border-2 border-input bg-background focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all outline-none"
              />
            </div>

            <div>
              <label className="block mb-3 font-medium text-foreground">Номер выпуска *</label>
              <input
                type="number"
                value={formData.issueNumber}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    issueNumber: Number(e.target.value),
                  })
                }
                required
                min="1"
                placeholder="1"
                className="w-full h-11 px-4 rounded-lg border-2 border-input bg-background focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all outline-none"
              />
            </div>

            <div>
              <label className="block mb-3 font-medium text-foreground">Теги</label>
              <div className="flex flex-wrap gap-3 p-4 bg-accent/30 rounded-lg border-2 border-dashed border-border">
                {tags.map((tag) => (
                  <button
                    key={tag.id}
                    type="button"
                    onClick={() => toggleTag(tag.id)}
                    className={`px-4 py-2 rounded-lg border-2 text-sm font-medium transition-all ${
                      formData.tagIds.includes(tag.id)
                        ? "bg-primary text-primary-foreground border-primary shadow-md scale-105"
                        : "bg-background border-input hover:bg-accent"
                    }`}
                  >
                    {tag.name}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block mb-3 font-medium text-foreground">
                Страницы (по одному URL на строку) *
              </label>
              <textarea
                value={formData.pages}
                onChange={(e) =>
                  setFormData({ ...formData, pages: e.target.value })
                }
                required
                rows={6}
                placeholder="https://example.com/page1.jpg&#10;https://example.com/page2.jpg&#10;https://example.com/page3.jpg"
                className="w-full px-4 py-3 rounded-lg border-2 border-input bg-background focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all outline-none font-mono text-sm"
              />
            </div>

            <div className="flex gap-3 pt-4">
              <button
                type="submit"
                className="px-8 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 shadow-md hover:shadow-lg transition-all font-medium"
              >
                {editingId ? "💾 Сохранить изменения" : "✨ Добавить комикс"}
              </button>
              <button
                type="button"
                onClick={handleCancel}
                className="px-8 py-3 border-2 border-input rounded-lg hover:bg-accent transition-all font-medium"
              >
                ❌ Отмена
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="space-y-2">
        {comics.map((comic) => {
          const author = authors.find((a) => a.id === comic.authorId);
          const comicTags = tags.filter((t) => comic.tagIds.includes(t.id));

          return (
            <div
              key={comic.id}
              className="bg-card border rounded-lg p-4 flex items-center justify-between"
            >
              <div className="flex items-center gap-4">
                <img
                  src={comic.coverImage}
                  alt={comic.title}
                  className="w-16 h-24 object-cover rounded"
                />
                <div>
                  <h3>{comic.title}</h3>
                  <p className="text-muted-foreground">
                    {author?.name} • Выпуск #{comic.issueNumber}
                  </p>
                  <div className="flex gap-1 mt-1">
                    {comicTags.map((tag) => (
                      <span
                        key={tag.id}
                        className="px-2 py-0.5 bg-accent text-xs rounded"
                      >
                        {tag.name}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              <div className="flex gap-3">
                <button
                  onClick={() => handleEdit(comic)}
                  className="px-4 py-2 border-2 border-input rounded-lg hover:bg-accent hover:border-primary transition-all font-medium"
                >
                  ✏️ Редактировать
                </button>
                <button
                  onClick={() => {
                    if (
                      confirm(`Удалить комикс "${comic.title}"?`)
                    ) {
                      onDelete(comic.id);
                    }
                  }}
                  className="px-4 py-2 border-2 border-destructive text-destructive rounded-lg hover:bg-destructive/10 transition-all font-medium"
                >
                  🗑️ Удалить
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function AuthorsManager({
  authors,
  onAdd,
  onUpdate,
  onDelete,
}: {
  authors: Author[];
  onAdd: (author: Omit<Author, "id">) => void;
  onUpdate: (author: Author) => void;
  onDelete: (id: number) => void;
}) {
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [formData, setFormData] = useState({ name: "", bio: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingId) {
      onUpdate({ id: editingId, ...formData });
      setEditingId(null);
    } else {
      onAdd(formData);
      setIsAdding(false);
    }
    setFormData({ name: "", bio: "" });
  };

  const handleEdit = (author: Author) => {
    setEditingId(author.id);
    setFormData({ name: author.name, bio: author.bio || "" });
    setIsAdding(true);
  };

  const handleCancel = () => {
    setIsAdding(false);
    setEditingId(null);
    setFormData({ name: "", bio: "" });
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2>Авторы ({authors.length})</h2>
        {!isAdding && (
          <button
            onClick={() => setIsAdding(true)}
            className="px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 shadow-md hover:shadow-lg transition-all"
          >
            + Добавить автора
          </button>
        )}
      </div>

      {isAdding && (
        <div className="bg-card border-2 border-primary/20 rounded-xl p-8 mb-6 shadow-lg">
          <h3 className="mb-6">
            {editingId ? "Редактировать автора" : "Новый автор"}
          </h3>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block mb-3 font-medium text-foreground">Имя *</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                required
                placeholder="Введите имя автора"
                className="w-full h-11 px-4 rounded-lg border-2 border-input bg-background focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all outline-none"
              />
            </div>

            <div>
              <label className="block mb-3 font-medium text-foreground">Биография (необязательно)</label>
              <textarea
                value={formData.bio}
                onChange={(e) =>
                  setFormData({ ...formData, bio: e.target.value })
                }
                rows={4}
                placeholder="Опишите автора..."
                className="w-full px-4 py-3 rounded-lg border-2 border-input bg-background focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all outline-none"
              />
            </div>

            <div className="flex gap-3 pt-4">
              <button
                type="submit"
                className="px-8 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 shadow-md hover:shadow-lg transition-all font-medium"
              >
                {editingId ? "💾 Сохранить изменения" : "✨ Добавить автора"}
              </button>
              <button
                type="button"
                onClick={handleCancel}
                className="px-8 py-3 border-2 border-input rounded-lg hover:bg-accent transition-all font-medium"
              >
                ❌ Отмена
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="space-y-2">
        {authors.map((author) => (
          <div
            key={author.id}
            className="bg-card border rounded-lg p-4 flex items-center justify-between"
          >
            <div>
              <h3>{author.name}</h3>
              {author.bio && (
                <p className="text-muted-foreground mt-1">{author.bio}</p>
              )}
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => handleEdit(author)}
                className="px-4 py-2 border-2 border-input rounded-lg hover:bg-accent hover:border-primary transition-all font-medium"
              >
                ✏️ Редактировать
              </button>
              <button
                onClick={() => {
                  if (confirm(`Удалить автора "${author.name}"?`)) {
                    onDelete(author.id);
                  }
                }}
                className="px-4 py-2 border-2 border-destructive text-destructive rounded-lg hover:bg-destructive/10 transition-all font-medium"
              >
                🗑️ Удалить
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function TagsManager({
  tags,
  onAdd,
  onUpdate,
  onDelete,
}: {
  tags: Tag[];
  onAdd: (tag: Omit<Tag, "id">) => void;
  onUpdate: (tag: Tag) => void;
  onDelete: (id: number) => void;
}) {
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [formData, setFormData] = useState({ name: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingId) {
      onUpdate({ id: editingId, ...formData });
      setEditingId(null);
    } else {
      onAdd(formData);
      setIsAdding(false);
    }
    setFormData({ name: "" });
  };

  const handleEdit = (tag: Tag) => {
    setEditingId(tag.id);
    setFormData({ name: tag.name });
    setIsAdding(true);
  };

  const handleCancel = () => {
    setIsAdding(false);
    setEditingId(null);
    setFormData({ name: "" });
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2>Теги ({tags.length})</h2>
        {!isAdding && (
          <button
            onClick={() => setIsAdding(true)}
            className="px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 shadow-md hover:shadow-lg transition-all"
          >
            + Добавить тег
          </button>
        )}
      </div>

      {isAdding && (
        <div className="bg-card border-2 border-primary/20 rounded-xl p-8 mb-6 shadow-lg">
          <h3 className="mb-6">
            {editingId ? "Редактировать тег" : "Новый тег"}
          </h3>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block mb-3 font-medium text-foreground">Название *</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                required
                placeholder="Введите название тега"
                className="w-full h-11 px-4 rounded-lg border-2 border-input bg-background focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all outline-none"
              />
            </div>

            <div className="flex gap-3 pt-4">
              <button
                type="submit"
                className="px-8 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 shadow-md hover:shadow-lg transition-all font-medium"
              >
                {editingId ? "💾 Сохранить изменения" : "✨ Добавить тег"}
              </button>
              <button
                type="button"
                onClick={handleCancel}
                className="px-8 py-3 border-2 border-input rounded-lg hover:bg-accent transition-all font-medium"
              >
                ❌ Отмена
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
        {tags.map((tag) => (
          <div
            key={tag.id}
            className="bg-card border-2 border-border rounded-lg p-4 flex items-center justify-between hover:border-primary/50 transition-all"
          >
            <span className="font-medium">{tag.name}</span>
            <div className="flex gap-2">
              <button
                onClick={() => handleEdit(tag)}
                className="p-2 hover:bg-accent rounded-lg border-2 border-transparent hover:border-primary transition-all"
                title="Редактировать"
              >
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
              </button>
              <button
                onClick={() => {
                  if (confirm(`Удалить тег "${tag.name}"?`)) {
                    onDelete(tag.id);
                  }
                }}
                className="p-2 hover:bg-destructive/10 text-destructive rounded-lg border-2 border-transparent hover:border-destructive transition-all"
                title="Удалить"
              >
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
