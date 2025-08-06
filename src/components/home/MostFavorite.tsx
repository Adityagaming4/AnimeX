
import { Anime } from "@/lib/types";
import { AnimeCarousel } from "./AnimeCarousel";

interface MostFavoriteProps {
  mostFavorite: Anime[];
}

export function MostFavorite({ mostFavorite }: MostFavoriteProps) {
  return <AnimeCarousel animes={mostFavorite} title="Most Favorite" />;
}
