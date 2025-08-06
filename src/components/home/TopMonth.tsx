
import { Anime } from "@/lib/types";
import { AnimeCarousel } from "./AnimeCarousel";

interface TopMonthProps {
  topMonth: Anime[];
}

export function TopMonth({ topMonth }: TopMonthProps) {
  return <AnimeCarousel animes={topMonth} title="Top This Month" />;
}
