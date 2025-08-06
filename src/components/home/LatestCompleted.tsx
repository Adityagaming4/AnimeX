
import { Anime } from "@/lib/types";
import { AnimeCarousel } from "./AnimeCarousel";

interface LatestCompletedProps {
  latestCompleted: Anime[];
}

export function LatestCompleted({ latestCompleted }: LatestCompletedProps) {
  return <AnimeCarousel animes={latestCompleted} title="Latest Completed" />;
}
