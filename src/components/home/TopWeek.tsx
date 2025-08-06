
import { Anime } from "@/lib/types";
import { AnimeCarousel } from "./AnimeCarousel";

interface TopWeekProps {
  topWeek: Anime[];
}

export function TopWeek({ topWeek }: TopWeekProps) {
  return <AnimeCarousel animes={topWeek} title="Top This Week" />;
}
