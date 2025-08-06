
import { Anime } from "@/lib/types";
import { AnimeCarousel } from "./AnimeCarousel";

interface NewAddedProps {
  newAdded: Anime[];
}

export function NewAdded({ newAdded }: NewAddedProps) {
  return <AnimeCarousel animes={newAdded} title="New Added" />;
}
