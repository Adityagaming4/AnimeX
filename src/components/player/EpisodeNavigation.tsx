'use client'

import Link from 'next/link'
import { ScrollArea } from '@/components/ui/scroll-area'

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
  if (!episodes || !Array.isArray(episodes) || episodes.length === 0) {
    return (
      <div className="w-full h-full p-4">
        <p className="text-center text-muted-foreground">No episodes available</p>
      </div>
    );
  }

  return (
    <ScrollArea className="h-full">
      <div className="flex flex-col gap-2">
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
              <div className={`p-4 rounded-lg cursor-pointer ${
                isCurrentEpisode ? 'bg-primary/20' : 'bg-secondary'
              }`}>
                <p className="font-semibold">
                  Episode {episode.episodeNumber}
                </p>
                <p className="text-sm text-muted-foreground">
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