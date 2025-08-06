import { getAnimeDetails, getEpisodes } from "@/lib/api";
import { AnimeDetails } from "@/components/anime/AnimeDetails";
import { EpisodeList } from "@/components/anime/EpisodeList";

export default async function AnimeDetailsPage({
  params,
}: { 
  params: Promise<{ id: string }> 
}) {
  // ✅ Await params first
  const { id } = await params;

  const anime = await getAnimeDetails(id);
  const episodes = await getEpisodes(id);

  return (
    <div className="container mx-auto px-4 md:px-6 py-8">
      <AnimeDetails anime={anime} />
      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">Episodes</h2>
        <EpisodeList episodes={episodes} animeId={id} />
      </div>
    </div>
  );
}