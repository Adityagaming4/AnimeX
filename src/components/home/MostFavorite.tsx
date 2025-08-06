
import { Anime } from "@/lib/types";
import { AnimeGrid } from "./AnimeGrid";

interface MostFavoriteProps {
  mostFavorite: Anime[];
}

export function MostFavorite({ mostFavorite }: MostFavoriteProps) {
  return (
    <section className="py-8">
      <h2 className="text-2xl font-bold mb-4">Most Favorite</h2>
      <AnimeGrid animes={mostFavorite} />
    </section>
  );
}
