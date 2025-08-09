'use client';

import React from 'react';
import Link from 'next/link';
import { Episode } from '@/lib/types';
import { Button } from '@/components/ui/button';

interface EpisodeInfoControlsProps {
  episodeTitle: string;
  streamType: 'sub' | 'dub';
  setStreamType: (type: 'sub' | 'dub') => void;
  animeId: string;
  currentEpisode: number;
  episodes: Episode[];
}

const EpisodeInfoControls: React.FC<EpisodeInfoControlsProps> = ({
  episodeTitle,
  streamType,
  setStreamType,
  animeId,
  currentEpisode,
  episodes
}) => {
  const prevEp = episodes.find(ep => ep.episodeNumber === currentEpisode - 1);
  const nextEp = episodes.find(ep => ep.episodeNumber === currentEpisode + 1);

  return (
    <div className="bg-zinc-900/80 p-6 rounded-xl shadow-lg backdrop-blur-md border border-zinc-800">
      <h2 className="text-2xl font-bold text-purple-300 drop-shadow-md">{episodeTitle}</h2>

      <div className="flex flex-wrap items-center gap-4 mt-4">
        {/* Stream Type Selector */}
        <div className="flex gap-2">
          <Button
            variant={streamType === 'sub' ? 'default' : 'secondary'}
            className={`px-4 py-2 rounded-lg transition-colors ${streamType === 'sub' ? 'bg-purple-600 hover:bg-purple-500' : ''}`}
            onClick={() => setStreamType('sub')}
          >
            Sub
          </Button>
          <Button
            variant={streamType === 'dub' ? 'default' : 'secondary'}
            className={`px-4 py-2 rounded-lg transition-colors ${streamType === 'dub' ? 'bg-purple-600 hover:bg-purple-500' : ''}`}
            onClick={() => setStreamType('dub')}
          >
            Dub
          </Button>
        </div>

        {/* Navigation */}
        <div className="flex gap-2">
          {prevEp && (
            <Link href={`/watch/${animeId}-episode-${prevEp.episodeNumber}`}>
              <Button variant="outline" className="hover:bg-purple-500/20">
                ⬅ Prev
              </Button>
            </Link>
          )}
          {nextEp && (
            <Link href={`/watch/${animeId}-episode-${nextEp.episodeNumber}`}>
              <Button variant="outline" className="hover:bg-purple-500/20">
                Next ➡
              </Button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default EpisodeInfoControls;
