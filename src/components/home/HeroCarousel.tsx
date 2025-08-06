
'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Image from 'next/image';
import { Anime } from '@/lib/types';

interface HeroCarouselProps {
  spotlight: Anime[];
}

export function HeroCarousel({ spotlight = [] }: HeroCarouselProps) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (spotlight.length === 0) return;
    const timer = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % spotlight.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [spotlight.length]);

  if (spotlight.length === 0) {
    return <div className="relative h-[60vh] w-full bg-secondary"></div>;
  }

  const anime = spotlight[index];

  if (!anime) {
    return <div className="relative h-[60vh] w-full bg-secondary"></div>;
  }

  return (
    <div className="relative h-[60vh] w-full">
      <AnimatePresence initial={false}>
        <motion.div
          key={index}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          className="absolute inset-0"
        >
          <Image
            src={anime.poster}
            alt={anime.title}
            fill
            style={{ objectFit: "cover" }}
            className="z-0"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent z-10" />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-transparent to-transparent z-10" />
        </motion.div>
      </AnimatePresence>
      <div className="relative z-20 container mx-auto flex flex-col justify-end h-full pb-16">
        <motion.h1
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="text-4xl md:text-6xl font-bold text-white drop-shadow-lg"
        >
          {anime.title}
        </motion.h1>
        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.5 }}
          className="text-lg text-gray-300 mt-4 max-w-xl drop-shadow-lg"
        >
          {anime.alternativeTitle}
        </motion.p>
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.9, duration: 0.5 }}
          className="mt-8"
        >
          <Link href={`/anime/${anime.id}`} passHref>
            <Button size="lg" className="bg-primary text-primary-foreground">
              Watch Now
            </Button>
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
