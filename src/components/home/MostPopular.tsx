
import { Anime } from "@/lib/types";
import { AnimeGrid } from "./AnimeGrid";

interface MostPopularProps {
  mostPopular: Anime[];
}

export function MostPopular({ mostPopular }: MostPopularProps) {
  return (
    <section className="py-8">
      <h2 className="text-2xl font-bold mb-4">Most Popular</h2>
      <AnimeGrid animes={mostPopular} />
    </section>
  );
}
