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
  subtitle?: string
}

export function AnimeCarousel({ animes, title, subtitle }: AnimeCarouselProps) {
  return (
    <section className="py-10 relative">
      {/* Section Header */}
      <div className="flex flex-col mb-6 px-2">
        <h2 className="text-3xl font-extrabold bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">
          {title}
        </h2>
        {subtitle && (
          <p className="text-sm text-muted-foreground mt-1">{subtitle}</p>
        )}
      </div>

      {/* Carousel */}
      <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
        className="w-full relative"
      >
        <CarouselContent className="gap-4">
          {animes.map((anime) => (
            <CarouselItem
              key={anime.id}
              className="basis-2/3 sm:basis-1/3 md:basis-1/4 lg:basis-1/6 group"
            >
              <div className="p-1 h-full transform transition-transform duration-300 group-hover:scale-105 group-hover:shadow-lg">
                <AnimeCard anime={anime} />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        {/* Floating arrows (inside Carousel to keep context) */}
        <CarouselPrevious className="absolute -left-4 top-1/2 -translate-y-1/2 bg-background/50 backdrop-blur-lg hover:bg-background transition rounded-full shadow-md" />
        <CarouselNext className="absolute -right-4 top-1/2 -translate-y-1/2 bg-background/50 backdrop-blur-lg hover:bg-background transition rounded-full shadow-md" />
      </Carousel>
    </section>
  )
}
