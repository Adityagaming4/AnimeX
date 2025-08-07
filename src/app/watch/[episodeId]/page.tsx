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
    // Fetch episodes for navigation and to get the correct episode ID for streaming
    const episodesData = await getEpisodes(animeId);

    // Find the specific episode by episodeNumber
    const currentEpisodeData = episodesData.find(
      (ep) => ep.episodeNumber === episodeNumber
    );

    if (!currentEpisodeData) {
      throw new Error('Episode not found');
    }

    // Use the actual episode ID for streaming
    const streamResponse = await fetch(`https://hi-anime-production.up.railway.app/api/stream/${currentEpisodeData.id}/sub`);
    const streamData = await streamResponse.json();

    console.log('Direct API response:', streamData); // Debug

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