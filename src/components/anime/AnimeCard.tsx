
'use client';

import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import Image from 'next/image';
import { Anime } from "@/lib/types";

interface AnimeCardProps {
  anime: Anime;
  orientation?: 'vertical' | 'horizontal';
  size?: 'default' | 'small';
}

export function AnimeCard({ anime, orientation = 'vertical', size = 'default' }: AnimeCardProps) {
  const imageWidth = orientation === 'horizontal' ? (size === 'small' ? 180 : 200) : (size === 'small' ? 150 : 300);
  const imageHeight = orientation === 'horizontal' ? (size === 'small' ? 120 : 120) : (size === 'small' ? 225 : 450);
  const imageAspectRatio = orientation === 'horizontal' ? 'aspect-[3/2]' : 'aspect-[2/3]';
  const cardContentClasses = orientation === 'horizontal' ? 'p-3 flex items-center space-x-4' : 'p-0';
  const titleClasses = orientation === 'horizontal' ? 'text-sm font-semibold truncate' : 'text-lg font-bold text-white';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      whileHover={{ scale: 1.05 }}
      className="w-full"
    >
      <Link href={`/anime/${anime.id}`} prefetch={false}>
        <Card className="overflow-hidden">
          <CardContent className={cardContentClasses}>
            {orientation === 'vertical' ? (
              <div className="relative">
                <Image
                  src={anime.poster}
                  alt={anime.title}
                  width={imageWidth}
                  height={imageHeight}
                  className={`w-full h-auto object-cover ${imageAspectRatio}`}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <h3 className={titleClasses}>{anime.title}</h3>
                  <div className="flex items-center gap-2 mt-2">
                    <Badge variant="secondary">{anime.type}</Badge>
                    <Badge variant="outline">{`Sub: ${anime.episodes?.sub ?? 0}`}</Badge>
                    <Badge variant="outline">{`Dub: ${anime.episodes?.dub ?? 0}`}</Badge>
                  </div>
                </div>
              </div>
            ) : (
              <>
                <Image
                  src={anime.poster}
                  alt={anime.title}
                  width={imageWidth}
                  height={imageHeight}
                  className={`rounded-lg object-cover ${imageAspectRatio} shadow-md`}
                />
                <div className="flex-1">
                  <h3 className={titleClasses}>{anime.title}</h3>
                  <p className="text-xs text-gray-400">
                    {anime.type} • {anime.episodes?.eps ?? 0} Episodes
                  </p>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge variant="secondary" className="px-1 py-0 text-xs">{`Sub: ${anime.episodes?.sub ?? 0}`}</Badge>
                    <Badge variant="outline" className="px-1 py-0 text-xs">{`Dub: ${anime.episodes?.dub ?? 0}`}</Badge>
                  </div>
                </div>
              </>
            )}
          </CardContent>
        </Card>
      </Link>
    </motion.div>
  );
}
