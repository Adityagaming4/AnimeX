
import { Anime } from "@/lib/types";
import { AnimeGrid } from "./AnimeGrid";

interface LatestCompletedProps {
  latestCompleted: Anime[];
}

export function LatestCompleted({ latestCompleted }: LatestCompletedProps) {
  return (
    <section className="py-8">
      <h2 className="text-2xl font-bold mb-4">Latest Completed</h2>
      <AnimeGrid animes={latestCompleted} />
    </section>
  );
}
