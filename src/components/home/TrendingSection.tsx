

import { Anime } from "@/lib/types";
import { AnimeCarousel } from "./AnimeCarousel";

interface TrendingSectionProps {
  trending: Anime[];
}

export function TrendingSection({ trending }: TrendingSectionProps) {
  return <AnimeCarousel animes={trending} title="Trending Now" />;
}

