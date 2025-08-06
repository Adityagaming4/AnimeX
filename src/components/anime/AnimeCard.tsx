'use client';

import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import Image from 'next/image';
import { Anime } from "@/lib/types";

interface AnimeCardProps {
  anime: Anime;
}

export function AnimeCard({ anime }: AnimeCardProps) {
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
          <CardContent className="p-0">
            <div className="relative">
              <Image
                src={anime.poster}
                alt={anime.title}
                width={300}
                height={450}
                className="w-full h-auto object-cover aspect-[2/3]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <h3 className="text-lg font-bold text-white">{anime.title}</h3>
                <div className="flex items-center gap-2 mt-2">
                  <Badge variant="secondary">{anime.type}</Badge>
                  <Badge variant="outline">{`Sub: ${anime.episodes?.sub ?? 0}`}</Badge>
                  <Badge variant="outline">{`Dub: ${anime.episodes?.dub ?? 0}`}</Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </Link>
    </motion.div>
  );
}