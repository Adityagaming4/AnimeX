'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { searchAnime } from '@/lib/api';
import { AnimeGrid } from '@/components/home/AnimeGrid'; // Changed from AnimeCarousel
import { Skeleton } from '@/components/ui/skeleton';
import { Anime } from '@/lib/types';

export default function SearchPage() {
  const searchParams = useSearchParams();
  const keyword = searchParams.get('keyword') || '';
  const [animes, setAnimes] = useState<Anime[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnimes = async () => {
      setLoading(true);
      const results = await searchAnime(keyword, 1); // Fetch all results for the keyword
      setAnimes(results);
      setLoading(false);
    };

    if (keyword) {
      fetchAnimes();
    } else {
      setAnimes([]);
      setLoading(false);
    }
  }, [keyword]); // Depend on keyword from URL

  return (
    <div className="container mx-auto px-4 md:px-6 py-8">
      <h1 className="text-3xl font-bold mb-8">Search Results for &quot;{keyword}&quot;</h1>
      {loading ? (
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {Array.from({ length: 12 }).map((_, i) => (
            <Skeleton key={i} className="w-full h-64" />
          ))}
        </div>
      ) : (
        animes.length > 0 ? (
          <AnimeGrid animes={animes} /> // Changed to AnimeGrid
        ) : (
          keyword.trim() !== '' && <p className="text-center text-muted-foreground">No results found for "{keyword}".</p>
        )
      )}
    </div>
  );
}