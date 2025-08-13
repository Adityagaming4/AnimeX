'use client';

import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import Image from 'next/image';
import { Anime } from "@/lib/types";
import { cn } from "@/lib/utils"; // helper for className merging

interface AnimeCardProps {
  anime: Anime;
  orientation?: 'vertical' | 'horizontal';
  size?: 'default' | 'small';
}

export function AnimeCard({
  anime,
  orientation = 'vertical',
  size = 'default'
}: AnimeCardProps) {
  const isHorizontal = orientation === 'horizontal';
  const isSmall = size === 'small';

  const imageWidth = isHorizontal ? (isSmall ? 180 : 240) : (isSmall ? 150 : 300);
  const imageHeight = isHorizontal ? (isSmall ? 120 : 140) : (isSmall ? 225 : 450);
  const imageAspectRatio = isHorizontal ? 'aspect-[3/2]' : 'aspect-[2/3]';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{
        scale: 1.05,
        rotateZ: 0.5,
        transition: { type: "spring", stiffness: 300 }
      }}
      className="w-full"
    >
      <Link href={`/anime/${anime.id}`} prefetch={false}>
        <div
          className={cn(
            "overflow-hidden rounded-xl relative group cursor-pointer",
            "bg-gradient-to-b from-zinc-900/50 to-zinc-950/90 backdrop-blur-md shadow-lg",
            "border border-zinc-800 hover:border-purple-500/50 transition-all"
          )}
        >
          <div className="relative">
            <Image
              src={anime.poster}
              alt={anime.title}
              width={imageWidth}
              height={imageHeight}
              className={cn(
                "w-full h-auto object-cover transition-transform duration-500 group-hover:scale-110",
                imageAspectRatio
              )}
              priority={size === "default"}
            />
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-90" />

            {/* Title & Badges */}
            <div className="absolute bottom-0 left-0 right-0 p-4 space-y-2">
              <h3 className="text-white font-bold truncate drop-shadow-md">
                {anime.title}
              </h3>
              <div className="flex items-center gap-2 flex-wrap">
                <Badge variant="secondary" className="bg-purple-500/80 hover:bg-purple-500">
                  {anime.type}
                </Badge>
                <Badge variant="outline" className="border-white/20 text-white/90">
                  Sub: {anime.episodes?.sub ?? 0}
                </Badge>
                <Badge variant="outline" className="border-white/20 text-white/90">
                  Dub: {anime.episodes?.dub ?? 0}
                </Badge>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
