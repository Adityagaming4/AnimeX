
import { Anime } from "@/lib/types";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface AnimeDetailsProps {
  anime: Anime;
}

export function AnimeDetails({ anime }: AnimeDetailsProps) {
  return (
    <div className="flex flex-col md:flex-row gap-8">
      <div className="w-full md:w-1/3">
        <Image
          src={anime.poster}
          alt={anime.title}
          width={300}
          height={450}
          className="w-full h-auto rounded-lg"
        />
      </div>
      <div className="w-full md:w-2/3">
        <h1 className="text-4xl font-bold">{anime.title}</h1>
        <p className="text-lg text-muted-foreground mt-2">{anime.alternativeTitle}</p>
        <div className="flex items-center gap-4 mt-4">
          <span className="text-sm">{anime.type}</span>
          <span className="text-sm">{anime.duration}</span>
        </div>
        <div className="mt-8">
          <Link href={`/watch/${anime.id}-episode-1`} passHref>
            <Button size="lg">Watch First Episode</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
