
import { Anime } from "@/lib/types";
import { AnimeCard } from "@/components/anime/AnimeCard";

interface NewAddedProps {
  newAdded: Anime[];
}

export function NewAdded({ newAdded }: NewAddedProps) {
  return (
    <section className="py-8">
      <h2 className="text-2xl font-bold mb-4">New Added</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-4">
        {newAdded.slice(0, 9).map((anime) => (
          <AnimeCard key={anime.id} anime={anime} orientation="horizontal" size="small" />
        ))}
      </div>
    </section>
  );
}
