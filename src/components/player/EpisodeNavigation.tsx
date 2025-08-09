'use client'

import Link from 'next/link'
import { ScrollArea } from '@/components/ui/scroll-area'
import { useEffect, useRef } from 'react'

interface Episode {
  episodeNumber: number
  title: string
  alternativeTitle?: string
  id: string
  isFiller: boolean
}

interface EpisodeNavigationProps {
  episodes: Episode[]
  animeId: string
  currentEpisode: number
}

export function EpisodeNavigation({ episodes, animeId, currentEpisode }: EpisodeNavigationProps) {
  const currentEpisodeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (currentEpisodeRef.current) {
      currentEpisodeRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      });
    }
  }, [currentEpisode]);

  if (!episodes || !Array.isArray(episodes) || episodes.length === 0) {
    return (
      <div className="w-full h-full p-4 bg-secondary rounded-lg">
        <p className="text-center text-muted-foreground">No episodes available</p>
      </div>
    );
  }

  return (
    <ScrollArea className="h-[calc(100vh-200px)] pr-4">
      <div className="flex flex-col gap-3">
        {episodes.map((episode) => {
          if (!episode || typeof episode.episodeNumber !== 'number') {
            return null;
          }
          
          const isCurrentEpisode = episode.episodeNumber === currentEpisode;
          
          return (
            <Link 
              key={episode.id || episode.episodeNumber} 
              href={`/watch/${animeId}-episode-${episode.episodeNumber}`}
              passHref
            >
              <div 
                ref={isCurrentEpisode ? currentEpisodeRef : null}
                className={`p-4 rounded-lg cursor-pointer transition-all duration-200 ease-in-out 
                  ${
                    isCurrentEpisode 
                      ? 'bg-primary text-primary-foreground shadow-lg transform scale-105' 
                      : 'bg-secondary hover:bg-secondary-foreground'
                  }`}
              >
                <p className="font-semibold text-lg">
                  Episode {episode.episodeNumber}
                </p>
                <p className="text-sm text-muted-foreground mt-1">
                  {episode.title || episode.alternativeTitle || 'Untitled'}
                </p>
              </div>
            </Link>
          );
        })}
      </div>
    </ScrollArea>
  );
}