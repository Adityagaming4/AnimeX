
import { Episode } from "@/lib/types";
import Link from "next/link";
import { ScrollArea } from "@/components/ui/scroll-area";

interface EpisodeListProps {
  episodes: Episode[];
  animeId: string;
}

export function EpisodeList({ episodes, animeId }: EpisodeListProps) {
  return (
    <ScrollArea className="h-96">
      <div className="flex flex-col gap-2">
        {episodes.map((episode) => (
          <Link key={episode.id} href={`/watch/${animeId}-episode-${episode.episodeNumber}`} passHref>
            <div className="p-4 bg-secondary rounded-lg hover:bg-primary/20 cursor-pointer">
              <p className="font-semibold">Episode {episode.episodeNumber}</p>
              <p className="text-sm text-muted-foreground">{episode.title}</p>
            </div>
          </Link>
        ))}
      </div>
    </ScrollArea>
  );
}
