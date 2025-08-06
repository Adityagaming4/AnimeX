'use client';

import { useState, useEffect, useCallback } from 'react';
import { useSearchParams } from 'next/navigation';
import { searchAnime } from '@/lib/api';
import { AnimeCarousel } from '@/components/home/AnimeCarousel';
import { Skeleton } from '@/components/ui/skeleton';
import { Anime } from '@/lib/types';
import { Input } from '@/components/ui/input';

export default function SearchPage() {
  const searchParams = useSearchParams();
  const initialKeyword = searchParams.get('keyword') || '';
  const [searchQuery, setSearchQuery] = useState(initialKeyword);
  const [animes, setAnimes] = useState<Anime[]>([]);
  const [loading, setLoading] = useState(false);

  const debouncedSearch = useCallback(
    debounce(async (keyword: string) => {
      console.log("Searching for:", keyword); // Add this line
      if (keyword.trim() === '') {
        setAnimes([]);
        setLoading(false);
        return;
      }
      setLoading(true);
      const results = await searchAnime(keyword, 1);
      setAnimes(results);
      setLoading(false);
    }, 500), // Debounce for 500ms
    []
  );

  useEffect(() => {
    if (initialKeyword) {
      setSearchQuery(initialKeyword);
      debouncedSearch(initialKeyword);
    }
  }, [initialKeyword, debouncedSearch]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newKeyword = event.target.value;
    setSearchQuery(newKeyword);
    debouncedSearch(newKeyword);
  };

  return (
    <div className="container mx-auto px-4 md:px-6 py-8">
      <h1 className="text-3xl font-bold mb-8">Search Anime</h1>
      <div className="mb-8">
        <Input
          type="text"
          placeholder="Search for anime..."
          value={searchQuery}
          onChange={handleInputChange}
          className="w-full max-w-lg"
        />
      </div>
      {loading ? (
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {Array.from({ length: 12 }).map((_, i) => (
            <Skeleton key={i} className="w-full h-64" />
          ))}
        </div>
      ) : (
        animes.length > 0 ? (
          <AnimeCarousel animes={animes} title={`Results for "${searchQuery}"`} />
        ) : (
          searchQuery.trim() !== '' && <p className="text-center text-muted-foreground">No results found for "{searchQuery}".</p>
        )
      )}
    </div>
  );
}

// Debounce function
function debounce<T extends (...args: any[]) => void>(func: T, delay: number): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), delay);
  };
}