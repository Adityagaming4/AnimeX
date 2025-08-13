export interface Anime {
  title: string;
  alternativeTitle: string;
  japanese?: string;
  id: string;
  poster: string;
  rating?: string;
  type: string;
  episodes: { sub: number; dub: number; eps: number };
  synopsis?: string;
  synonyms?: string;
  aired?: { from: string; to: string };
  premiered?: string;
  duration: string;
  status?: string;
  MAL_score?: string;
  genres?: string[];
  studios?: string;
  producers?: string[];
  moreSeasons?: unknown[]; // You might want to define a more specific interface for this
  related?: unknown[]; // You might want to define a more specific interface for this
  mostPopular?: Anime[];
  recommended?: Anime[];
  trailerId?: string;
}

export interface Episode {
  episodeNumber: number;
  title: string;
  alternativeTitle?: string;
  id: string;
  isFiller: boolean;
  thumbnail?: string; // Added
  watched?: boolean;  // Added
  duration?: number;  // Added
}

export interface StreamingResponse {
  status: boolean;
  episodeId: string;
  language: "sub" | "dub";
  embedUrl: string;
  iframe: string;
}
