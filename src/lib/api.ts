
import { Anime, Episode, StreamingResponse } from './types';

const API_BASE = 'http://localhost:3001/api';

export const getHomePageData = async () => {
  const res = await fetch(`${API_BASE}/home`);
  if (!res.ok) {
    throw new Error('Failed to fetch home page data');
  }
  const result = await res.json();
  return result.data;
};

export const searchAnime = async (keyword: string, page: number) => {
  const res = await fetch(`${API_BASE}/search?keyword=${keyword}&page=${page}`);
  if (!res.ok) {
    throw new Error('Failed to search anime');
  }
  const result = await res.json();
  return result.response;
};

export const getAnimeDetails = async (id: string): Promise<Anime> => {
  const res = await fetch(`${API_BASE}/anime/${id}`);
  if (!res.ok) {
    throw new Error('Failed to fetch anime details');
  }
  return res.json();
};

export const getEpisodes = async (id: string): Promise<Episode[]> => {
  const res = await fetch(`${API_BASE}/episodes/${id}`);
  if (!res.ok) {
    throw new Error('Failed to fetch episodes');
  }
  const result = await res.json();
  return result.episodes;
};


