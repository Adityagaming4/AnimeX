
import { Anime } from "@/lib/types";
import { AnimeGrid } from "./AnimeGrid";

interface TopMonthProps {
  topMonth: Anime[];
}

export function TopMonth({ topMonth }: TopMonthProps) {
  return (
    <section className="py-8">
      <h2 className="text-2xl font-bold mb-4">Top This Month</h2>
      <AnimeGrid animes={topMonth} />
    </section>
  );
}
