'use client'

import { Anime } from "@/lib/types"
import { AnimeCard } from "@/components/anime/AnimeCard"
import { motion } from "framer-motion"

interface AnimeGridProps {
  animes: Anime[]
  title?: string
  subtitle?: string
}

export function AnimeGrid({ animes = [], title, subtitle }: AnimeGridProps) {
  return (
    <section className="py-10">
      {/* Optional Title */}
      {title && (
        <div className="mb-6 px-2">
          <h2 className="text-3xl font-extrabold bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
            {title}
          </h2>
          {subtitle && <p className="text-sm text-muted-foreground mt-1">{subtitle}</p>}
        </div>
      )}

      {/* Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {animes.map((anime, index) => (
          <motion.div
            key={anime.id}
            className="group"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: index * 0.03,
              duration: 0.3,
              ease: "easeOut",
            }}
          >
            <div className="transform transition-transform duration-300 group-hover:scale-[1.05] group-hover:shadow-lg rounded-lg overflow-hidden">
              <AnimeCard anime={anime} />
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
