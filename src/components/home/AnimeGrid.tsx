
import { Anime } from "@/lib/types";
import { AnimeCard } from "@/components/anime/AnimeCard";

interface AnimeGridProps {
  animes: Anime[];
}

export function AnimeGrid({ animes = [] }: AnimeGridProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
      {animes.map((anime) => (
        <AnimeCard key={anime.id} anime={anime} />
      ))}
    </div>
  );
}
