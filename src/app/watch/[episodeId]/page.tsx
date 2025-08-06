import { VideoPlayer } from '@/components/player/VideoPlayer';
import { EpisodeNavigation } from '@/components/player/EpisodeNavigation';
import { getEpisodes } from '@/lib/api'; // getStreamingUrl will be removed

export default async function WatchPage({
  params,
}: {
  params: Promise<{ episodeId: string }>
}) {
  const { episodeId } = await params;

  try {
    // Parse episode info
    const parts = episodeId.split('-episode-');
    const animeId = parts[0];
    const episodeNumber = parseInt(parts[1]);

    //  DIRECT API CALL - No proxy needed
    const streamResponse = await fetch(`http://localhost:3000/api/stream/${episodeId}/sub`);
    const streamData = await streamResponse.json();

    console.log('Direct API response:', streamData); // Debug

    // Fetch episodes for navigation
    const episodesData = await getEpisodes(animeId);

    return (
      <div className="flex flex-col md:flex-row">
        <div className="w-full md:w-3/4">
          <VideoPlayer stream={streamData} />
        </div>
        <div className="w-full md:w-1/4">
          <EpisodeNavigation
            episodes={episodesData || []}
            animeId={animeId}
            currentEpisode={episodeNumber}
          />
        </div>
      </div>
    );
  } catch (error) {
    console.error('Direct API call failed:', error);
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Error Loading Episode</h1>
          <p className="text-muted-foreground">Please try again later.</p>
        </div>
      </div>
    );
  }
}