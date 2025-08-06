
import { Anime } from "@/lib/types";
import { AnimeGrid } from "./AnimeGrid";

interface TrendingSectionProps {
  trending: Anime[];
}

export function TrendingSection({ trending }: TrendingSectionProps) {
  return (
    <section className="py-8">
      <h2 className="text-2xl font-bold mb-4">Trending Now</h2>
      <AnimeGrid animes={trending} />
    </section>
  );
}
