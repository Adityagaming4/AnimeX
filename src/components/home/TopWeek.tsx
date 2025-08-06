
import { Anime } from "@/lib/types";
import { AnimeGrid } from "./AnimeGrid";

interface TopWeekProps {
  topWeek: Anime[];
}

export function TopWeek({ topWeek }: TopWeekProps) {
  return (
    <section className="py-8">
      <h2 className="text-2xl font-bold mb-4">Top This Week</h2>
      <AnimeGrid animes={topWeek} />
    </section>
  );
}
