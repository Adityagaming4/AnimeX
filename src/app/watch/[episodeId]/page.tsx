'use client';

import { VideoPlayer } from '@/components/player/VideoPlayer';
import { getEpisodes } from '@/lib/api';
import { Episode, StreamingResponse } from '@/lib/types';
import { useState, useEffect } from 'react';
import EpisodeInfoControls from '@/components/player/EpisodeInfoControls';
import EpisodeListSelector from '@/components/player/EpisodeListSelector';

interface ParamsPromise {
  episodeId: string;
}

export default function WatchPage({
  params,
}: {
  params: Promise<ParamsPromise>;
}) {
  const [episodeId, setEpisodeId] = useState<string | null>(null);
  const [streamType, setStreamType] = useState<'sub' | 'dub'>('sub');
  const [streamData, setStreamData] = useState<StreamingResponse | null>(null);
  const [episodesData, setEpisodesData] = useState<Episode[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    params.then(resolved => setEpisodeId(resolved.episodeId));
  }, [params]);

  useEffect(() => {
    if (!episodeId) return;

    const fetchEpisodeData = async () => {
      try {
        setError(null);
        const parts = episodeId.split('-episode-');
        const animeId = parts[0];
        const episodeNumber = parseInt(parts[1]);

        const fetchedEpisodes: Episode[] = await getEpisodes(animeId);
        setEpisodesData(fetchedEpisodes);

        const currentEpisode = fetchedEpisodes.find(
          (ep) => ep.episodeNumber === episodeNumber
        );

        if (!currentEpisode) {
          throw new Error('Episode not found');
        }

        const streamResponse = await fetch(`/api/stream/${currentEpisode.id}/${streamType}`);
        const data = await streamResponse.json();
        setStreamData(data);
      } catch (err: unknown) {
        console.error('Error fetching episode data:', err);
        setError(err instanceof Error ? err.message : 'Failed to load episode.');
      }
    };

    fetchEpisodeData();
  }, [episodeId, streamType]);

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen bg-gradient-to-b from-black via-zinc-900 to-black">
        <div className="text-center p-6 rounded-lg bg-secondary/50 shadow-lg backdrop-blur-md">
          <h1 className="text-3xl font-bold mb-2 text-red-400">⚠ Error Loading Episode</h1>
          <p className="text-gray-300">{error}</p>
        </div>
      </div>
    );
  }

  const parts = episodeId?.split('-episode-');
  const animeId = parts?.[0];
  const episodeNumber = parts ? parseInt(parts[1]) : 0;

  const currentEpisodeTitle = episodesData.find(
    (ep) => ep.episodeNumber === episodeNumber
  )?.title || `Episode ${episodeNumber}`;

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      {/* Video Player */}
      <div className="flex justify-center">
        <div className="w-full max-w-[1280px] bg-black rounded-xl shadow-2xl overflow-hidden border border-zinc-800">
          {!streamData ? (
            <div className="h-[480px] flex flex-col items-center justify-center text-zinc-300 gap-3">
              <div className="w-10 h-10 border-4 border-t-transparent border-purple-500 rounded-full animate-spin" />
              <p className="text-lg">Loading video...</p>
            </div>
          ) : (
            <VideoPlayer stream={streamData} />
          )}
        </div>
      </div>

      {/* Episode Info Controls */}
      {episodeId && animeId && (
        <EpisodeInfoControls
          episodeTitle={currentEpisodeTitle}
          streamType={streamType}
          setStreamType={setStreamType}
          animeId={animeId}
          currentEpisode={episodeNumber}
          episodes={episodesData}
        />
      )}

      {/* Episode List Selector */}
      {episodeId && animeId && (
        <EpisodeListSelector
          episodes={episodesData}
          animeId={animeId}
          currentEpisode={episodeNumber}
        />
      )}
    </div>
  );
}
