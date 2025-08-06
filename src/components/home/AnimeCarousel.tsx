
'use client'

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { Anime } from "@/lib/types"
import { AnimeCard } from "@/components/anime/AnimeCard"

interface AnimeCarouselProps {
  animes: Anime[]
  title: string
}

export function AnimeCarousel({ animes, title }: AnimeCarouselProps) {
  return (
    <section className="py-8">
      <h2 className="text-2xl font-bold mb-4">{title}</h2>
      <Carousel
        opts={{
          align: "start",
        }}
        className="w-full"
      >
        <CarouselContent>
          {animes.map((anime) => (
            <CarouselItem key={anime.id} className="basis-1/2 md:basis-1/4 lg:basis-1/6">
              <div className="p-1 h-full">
                <AnimeCard anime={anime} />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </section>
  )
}
