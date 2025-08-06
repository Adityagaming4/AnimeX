
import { Anime } from "@/lib/types";
import { AnimeCarousel } from "./AnimeCarousel";

interface MostPopularProps {
  mostPopular: Anime[];
}

export function MostPopular({ mostPopular }: MostPopularProps) {
  return <AnimeCarousel animes={mostPopular} title="Most Popular" />;
}
