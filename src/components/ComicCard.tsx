import { ImageWithFallback } from "./figma/ImageWithFallback";

interface ComicCardProps {
  id: number;
  title: string;
  author: string;
  coverImage: string;
  genre: string;
  issueNumber: number;
  onClick: () => void;
}

export function ComicCard({
  title,
  author,
  coverImage,
  genre,
  issueNumber,
  onClick,
}: ComicCardProps) {
  return (
    <div
      className="overflow-hidden rounded-lg border bg-card cursor-pointer transition-all hover:scale-105 hover:shadow-xl"
      onClick={onClick}
    >
      <div className="relative aspect-[2/3]">
        <ImageWithFallback
          src={coverImage}
          alt={title}
          className="w-full h-full object-cover"
        />
        <span className="absolute top-2 right-2 px-2 py-1 rounded-md bg-black/80 text-white text-xs">
          #{issueNumber}
        </span>
      </div>
      <div className="p-4">
        <h3 className="line-clamp-1">{title}</h3>
        <p className="text-muted-foreground mt-1">{author}</p>
        <span className="inline-block mt-2 px-2 py-1 rounded-md border border-border text-xs">
          {genre}
        </span>
      </div>
    </div>
  );
}
