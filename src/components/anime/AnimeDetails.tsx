import { Anime } from "@/lib/types";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { AnimeCarousel } from "@/components/home/AnimeCarousel";
import { Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface AnimeDetailsProps {
  anime: Anime;
}

export function AnimeDetails({ anime }: AnimeDetailsProps) {
  return (
    <>
      <div className="relative w-full">
        {/* Trailer / Poster Hero */}
        <div className="relative w-full h-[450px] overflow-hidden rounded-lg">
          {anime.trailerId ? (
            <iframe
              src={`https://www.youtube.com/embed/${anime.trailerId}?autoplay=1&mute=1&controls=0&loop=1&playlist=${anime.trailerId}&modestbranding=1&playsinline=1`}
              title="Anime Trailer"
              frameBorder="0"
              allow="autoplay; fullscreen; picture-in-picture"
              className="absolute inset-0 w-full h-full object-cover"
            ></iframe>
          ) : (
            <Image
              src={anime.poster}
              alt={anime.title}
              fill
              className="object-cover"
              priority
            />
          )}

          {/* Cinematic Gradients */}
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent z-10" />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-transparent to-transparent z-10" />
        </div>

        {/* Anime Info */}
        <div className="container mx-auto px-4 md:px-6 py-8 relative z-20">
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
              {anime.alternativeTitle && (
                <p className="text-xl text-muted-foreground mt-2">
                  <span className="font-semibold">Alternative Title:</span>{" "}
                  {anime.alternativeTitle}
                </p>
              )}
              {anime.japanese && (
                <p className="text-xl text-muted-foreground mt-1">
                  <span className="font-semibold">Japanese:</span> {anime.japanese}
                </p>
              )}
              <div className="flex items-center gap-4 mt-4">
                {anime.type && (
                  <Badge variant="secondary" className="text-base px-3 py-1">
                    {anime.type}
                  </Badge>
                )}
                {anime.rating && (
                  <Badge variant="outline" className="text-base px-3 py-1">
                    {anime.rating}
                  </Badge>
                )}
                {anime.duration && (
                  <Badge variant="outline" className="text-base px-3 py-1">
                    {anime.duration}
                  </Badge>
                )}
              </div>
              {anime.episodes && (
                <div className="flex items-center gap-4 mt-2">
                  {anime.episodes.sub > 0 && (
                    <Badge variant="outline" className="text-base px-3 py-1">
                      Sub: {anime.episodes.sub}
                    </Badge>
                  )}
                  {anime.episodes.dub > 0 && (
                    <Badge variant="outline" className="text-base px-3 py-1">
                      Dub: {anime.episodes.dub}
                    </Badge>
                  )}
                  {anime.episodes.eps > 0 && (
                    <Badge variant="outline" className="text-base px-3 py-1">
                      Total Episodes: {anime.episodes.eps}
                    </Badge>
                  )}
                </div>
              )}
              {anime.synonyms && (
                <p className="text-base text-muted-foreground mt-2">
                  <span className="font-semibold">Synonyms:</span> {anime.synonyms}
                </p>
              )}
              {anime.aired && anime.aired.from && (
                <p className="text-base text-muted-foreground mt-1">
                  <span className="font-semibold">Aired:</span> {anime.aired.from}{" "}
                  {anime.aired.to ? `to ${anime.aired.to}` : ""}
                </p>
              )}
              {anime.premiered && (
                <p className="text-base text-muted-foreground mt-1">
                  <span className="font-semibold">Premiered:</span> {anime.premiered}
                </p>
              )}
              {anime.status && (
                <p className="text-base text-muted-foreground mt-1">
                  <span className="font-semibold">Status:</span> {anime.status}
                </p>
              )}
              {anime.MAL_score && (
                <div className="flex items-center gap-1 mt-1">
                  <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                  <span className="text-base text-muted-foreground font-bold">
                    MAL Score: {anime.MAL_score}
                  </span>
                </div>
              )}
              {anime.genres && anime.genres.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-1">
                  <span className="font-semibold text-base text-muted-foreground">
                    Genres:
                  </span>
                  {anime.genres.map((genre) => (
                    <Badge key={genre} variant="outline" className="text-base px-3 py-1">
                      {genre}
                    </Badge>
                  ))}
                </div>
              )}
              {anime.studios && (
                <p className="text-base text-muted-foreground mt-1">
                  <span className="font-semibold">Studios:</span> {anime.studios}
                </p>
              )}
              <div className="mt-8">
                <Link href={`/watch/${anime.id}-episode-1`} passHref>
                  <Button size="lg">Watch First Episode</Button>
                </Link>
              </div>
            </div>
          </div>

          {/* Carousels */}
          {anime.mostPopular && anime.mostPopular.length > 0 && (
            <div className="mt-8">
              <AnimeCarousel animes={anime.mostPopular} title="Most Popular" />
            </div>
          )}
          {anime.recommended && anime.recommended.length > 0 && (
            <div className="mt-8">
              <AnimeCarousel animes={anime.recommended} title="Recommended" />
            </div>
          )}
        </div>
      </div>
    </>
  );
}
