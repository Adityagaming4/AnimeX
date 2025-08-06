
import { Anime } from "@/lib/types";
import { AnimeGrid } from "./AnimeGrid";

interface TopAiringProps {
  topAiring: Anime[];
}

export function TopAiring({ topAiring }: TopAiringProps) {
  return (
    <section className="py-8">
      <h2 className="text-2xl font-bold mb-4">Top Airing</h2>
      <AnimeGrid animes={topAiring} />
    </section>
  );
}
