
import { Anime } from "@/lib/types";
import { AnimeGrid } from "./AnimeGrid";

interface NewAddedProps {
  newAdded: Anime[];
}

export function NewAdded({ newAdded }: NewAddedProps) {
  return (
    <section className="py-8">
      <h2 className="text-2xl font-bold mb-4">New Added</h2>
      <AnimeGrid animes={newAdded} />
    </section>
  );
}
