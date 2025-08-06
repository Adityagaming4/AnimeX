
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
  const [isSynopsisExpanded, setIsSynopsisExpanded] = useState(false);

  useEffect(() => {
    if (spotlight.length === 0) return;
    const timer = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % spotlight.length);
      setIsSynopsisExpanded(false); // Reset expand state on slide change
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

  const toggleSynopsis = () => {
    setIsSynopsisExpanded(!isSynopsisExpanded);
  };

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
          className="text-4xl md:text-6xl font-bold text-white drop-shadow-lg will-change-transform"
        >
          {anime.title}
        </motion.h1>
        {anime.alternativeTitle && (
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="text-lg text-gray-300 mt-5 max-w-2xl drop-shadow-lg will-change-transform"
          >
            {anime.alternativeTitle}
          </motion.p>
        )}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.5 }}
          className="text-sm text-gray-300 mt-5 max-w-2xl drop-shadow-lg will-change-transform"
        >
          {anime.type && <span>{anime.type}</span>}
          {anime.aired?.from && anime.aired?.to && (
            <span> • Aired: {anime.aired.from} to {anime.aired.to}</span>
          )}
        </motion.div>
        {anime.synopsis && (
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.5 }}
            className="mt-6 mb-6 max-w-2xl drop-shadow-lg will-change-transform"
          >
            <p className={`text-base text-gray-300 ${isSynopsisExpanded ? '' : 'line-clamp-4'}`}>
              {anime.synopsis}
            </p>
            {anime.synopsis.length > 150 && ( // Adjust threshold as needed
              <Button variant="link" onClick={toggleSynopsis} className="p-0 h-auto text-primary-foreground mt-3">
                {isSynopsisExpanded ? 'Show Less' : 'Read More'}
              </Button>
            )}
          </motion.div>
        )}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.9, duration: 0.5 }}
          className="mt-12 will-change-transform"
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
