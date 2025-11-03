import { ImageWithFallback } from "./figma/ImageWithFallback";
import { useState, useEffect } from "react";
import { Comic } from "../types";

interface ComicReaderProps {
  comic: Comic | null;
  isOpen: boolean;
  onClose: () => void;
}

export function ComicReader({ comic, isOpen, onClose }: ComicReaderProps) {
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    if (isOpen) {
      setCurrentPage(0);
    }
  }, [isOpen]);

  if (!comic || !isOpen) return null;

  const totalPages = comic.pages.length;

  const handleNextPage = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <>
      <div
        className="fixed inset-0 bg-black/50 z-50"
        onClick={onClose}
      />
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl h-[90vh] bg-background rounded-lg shadow-lg z-50 flex flex-col overflow-hidden mx-4">
        <div className="p-6 pb-4 border-b">
          <div className="flex items-start justify-between">
            <div>
              <h2>{comic.title}</h2>
              <p className="text-muted-foreground mt-1">
                Выпуск #{comic.issueNumber}
              </p>
            </div>
            <button
              onClick={onClose}
              className="h-8 w-8 rounded-md hover:bg-accent flex items-center justify-center"
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        <div className="flex-1 relative bg-black/5 flex items-center justify-center overflow-hidden">
          <ImageWithFallback
            src={comic.pages[currentPage]}
            alt={`Page ${currentPage + 1}`}
            className="max-h-full max-w-full object-contain"
          />
        </div>

        <div className="p-6 pt-4 flex items-center justify-between border-t">
          <button
            onClick={handlePrevPage}
            disabled={currentPage === 0}
            className="h-9 px-4 rounded-md border border-input bg-background hover:bg-accent disabled:opacity-50 disabled:pointer-events-none flex items-center gap-2"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Назад
          </button>

          <span className="text-muted-foreground">
            Страница {currentPage + 1} из {totalPages}
          </span>

          <button
            onClick={handleNextPage}
            disabled={currentPage === totalPages - 1}
            className="h-9 px-4 rounded-md border border-input bg-background hover:bg-accent disabled:opacity-50 disabled:pointer-events-none flex items-center gap-2"
          >
            Вперёд
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </>
  );
}
