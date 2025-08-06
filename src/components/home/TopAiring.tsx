
import { Anime } from "@/lib/types";
import { AnimeCarousel } from "./AnimeCarousel";

interface TopAiringProps {
  topAiring: Anime[];
}

export function TopAiring({ topAiring }: TopAiringProps) {
  return <AnimeCarousel animes={topAiring} title="Top Airing" />;
}
