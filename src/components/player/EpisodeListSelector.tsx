'use client';

import React, { useState, useMemo, useEffect, useRef } from 'react';
import { Episode } from '@/lib/types';
import { useRouter } from 'next/navigation';
import { ScrollArea } from '@/components/ui/scroll-area';
import { CheckCircle2 } from 'lucide-react';

interface EpisodeListSelectorProps {
  episodes: Episode[];
  animeId: string;
  currentEpisode: number;
}

const EPISODES_PER_PAGE = 50;

const EpisodeListSelector: React.FC<EpisodeListSelectorProps> = ({
  episodes,
  animeId,
  currentEpisode,
}) => {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(0);
  const currentEpisodeRef = useRef<HTMLDivElement>(null);

  const totalPages = Math.ceil(episodes.length / EPISODES_PER_PAGE);

  const episodeRanges = useMemo(() => {
    return Array.from({ length: totalPages }, (_, i) => {
      const start = i * EPISODES_PER_PAGE + 1;
      const end = Math.min((i + 1) * EPISODES_PER_PAGE, episodes.length);
      return { label: `${start}-${end}`, index: i };
    });
  }, [episodes.length, totalPages]);

  const displayedEpisodes = useMemo(() => {
    const startIndex = currentPage * EPISODES_PER_PAGE;
    return episodes.slice(startIndex, startIndex + EPISODES_PER_PAGE);
  }, [episodes, currentPage]);

  useEffect(() => {
    const currentEpisodePage = Math.floor((currentEpisode - 1) / EPISODES_PER_PAGE);
    setCurrentPage(currentEpisodePage);

    if (currentEpisodeRef.current) {
      currentEpisodeRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, [currentEpisode]);

  const handleEpisodeClick = (epNum: number) => {
    router.push(`/watch/${animeId}-episode-${epNum}`);
  };

  return (
    <div className="bg-zinc-900 rounded-xl p-4 shadow-lg border border-zinc-800">
      {/* Header with Range Selector */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-4">
        <h3 className="text-2xl font-bold text-purple-300">Episodes</h3>
        {totalPages > 1 && (
          <select
            value={currentPage}
            onChange={(e) => setCurrentPage(parseInt(e.target.value))}
            className="bg-zinc-800 border border-zinc-700 text-zinc-200 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            {episodeRanges.map((range) => (
              <option key={range.index} value={range.index}>
                {range.label}
              </option>
            ))}
          </select>
        )}
      </div>

      {/* Episode Cards */}
      <ScrollArea className="h-[calc(100vh-250px)] pr-3">
        <div className="flex flex-col gap-4">
          {displayedEpisodes.map((ep) => {
            const isCurrent = ep.episodeNumber === currentEpisode;
            return (
              <div
                key={ep.id || ep.episodeNumber}
                ref={isCurrent ? currentEpisodeRef : null}
                onClick={() => handleEpisodeClick(ep.episodeNumber)}
                className={`group flex items-center gap-4 p-3 rounded-lg cursor-pointer transition-all duration-200
                  ${
                    isCurrent
                      ? 'bg-purple-600/20 border border-purple-500 shadow-[0_0_10px_rgba(168,85,247,0.5)]'
                      : 'bg-zinc-800 hover:bg-purple-500/10 border border-transparent hover:border-purple-400/50'
                  }`}
              >
                {/* Thumbnail */}
                <div className="relative w-24 h-14 rounded-md overflow-hidden flex-shrink-0">
                  {ep.thumbnail ? (
                    <img
                      src={ep.thumbnail}
                      alt={ep.title || `Episode ${ep.episodeNumber}`}
                      className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-200"
                    />
                  ) : (
                    <div className="bg-zinc-700 w-full h-full flex items-center justify-center text-zinc-400">
                      {ep.episodeNumber}
                    </div>
                  )}
                  {ep.watched && (
                    <CheckCircle2 className="absolute top-1 right-1 w-5 h-5 text-green-400" />
                  )}
                </div>

                {/* Episode Info */}
                <div className="flex flex-col">
                  <span
                    className={`font-semibold ${
                      isCurrent ? 'text-purple-300' : 'text-zinc-200'
                    }`}
                  >
                    Episode {ep.episodeNumber}
                  </span>
                  {ep.title && (
                    <span className="text-sm text-zinc-400 truncate max-w-[200px]">
                      {ep.title}
                    </span>
                  )}
                  {ep.duration && (
                    <span className="text-xs text-zinc-500">{ep.duration} min</span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </ScrollArea>
    </div>
  );
};

export default EpisodeListSelector;
