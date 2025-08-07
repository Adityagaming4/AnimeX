'use client'

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

interface SearchResult {
  id: string;
  title: string;
  poster: string;
  status: string;
  episodes: { sub: number; dub: number; eps: number };
  type: string;
}

export function LiveSearchBox() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  // Debounce search to avoid too many API calls
  useEffect(() => {
    if (query.length === 0) {
      setResults([]);
      setShowResults(false);
      return;
    }

    if (query.length < 2) return; // Only search after 2+ characters

    const timeoutId = setTimeout(async () => {
      setIsLoading(true);
      try {
        // Use your existing search endpoint
        const response = await fetch(`https://hi-anime-production.up.railway.app/api/search?keyword=${encodeURIComponent(query)}`);
        const data = await response.json();
        
        setResults(data.response || []);
        setShowResults(true);
      } catch (error) {
        console.error('Search error:', error);
        setResults([]);
      } finally {
        setIsLoading(false);
      }
    }, 300); // 300ms delay to avoid excessive API calls

    return () => clearTimeout(timeoutId);
  }, [query]);

  // Close results when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowResults(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      if (query.trim() !== '') {
        router.push(`/search?keyword=${encodeURIComponent(query)}`);
        setShowResults(false);
      }
    }
  };

  return (
    <div ref={searchRef} className="relative w-full max-w-md">
      {/* Search Input */}
      <div className="relative">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => query.length >= 2 && setShowResults(true)}
          onKeyDown={handleKeyDown}
          placeholder="Search anime..."
          className="w-full px-4 py-2 pr-10 bg-gray-800 text-white rounded-lg border border-gray-600 focus:border-blue-500 focus:outline-none"
        />
        {isLoading && (
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
            <div className="animate-spin w-4 h-4 border-2 border-white/30 border-t-white rounded-full"></div>
          </div>
        )}
      </div>

      {/* Live Search Results Dropdown */}
      {showResults && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-gray-800/90 border border-gray-600 rounded-lg shadow-lg max-h-96 overflow-hidden z-50">
          {results.length > 0 ? (
            <ul className="py-2 overflow-y-scroll pr-4 -mr-4">
              {results.slice(0, 8).map((anime) => ( // Limit to 8 results
                <li key={anime.id}>
                  <a
                    href={`/anime/${anime.id.split('?')[0]}`}
                    className="flex items-center px-4 py-2 hover:bg-gray-700 transition-colors"
                    onClick={() => setShowResults(false)}
                  >
                    <Image
                      src={anime.poster}
                      alt={anime.title}
                      width={40}
                      height={56}
                      className="object-cover rounded mr-3 flex-shrink-0"
                      loading="lazy"
                    />
                    <div>
                      <div className="text-white font-medium text-sm">{anime.title}</div>
                      <div className="text-gray-400 text-xs">
                        {anime.type} • {anime.episodes?.eps} episodes
                      </div>
                    </div>
                  </a>
                </li>
              ))}
            </ul>
          ) : query.length >= 2 && !isLoading ? (
            <div className="px-4 py-3 text-gray-400 text-sm">
              No anime found for &quot;{query}&quot;
            </div>
          ) : null}
        </div>
      )}
    </div>
  );
}