import { Anime, Episode } from './types';

const API_BASE = 'https://hi-anime-production.up.railway.app/api';

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

export const getMostFavoriteListData = async (page: number = 1) => {
  const res = await fetch(`${API_BASE}/list/most-favorite?page=${page}`);
  if (!res.ok) {
    throw new Error('Failed to fetch most favorite list data');
  }
  const result = await res.json();
  return result.response; // Data is under 'response' key
};

export const getMostPopularListData = async (page: number = 1) => {
  const res = await fetch(`${API_BASE}/list/most-popular?page=${page}`);
  if (!res.ok) {
    throw new Error('Failed to fetch most popular list data');
  }
  const result = await res.json();
  return result.response; // Assuming the list data is under a 'response' key
};

export const getTopAiringListData = async (page: number = 1) => {
  const res = await fetch(`${API_BASE}/list/top-airing?page=${page}`);
  if (!res.ok) {
    throw new Error('Failed to fetch top airing list data');
  }
  const result = await res.json();
  return result.response; // Assuming the list data is under a 'response' key
};

export const getRecentlyAddedListData = async (page: number = 1) => {
  const res = await fetch(`${API_BASE}/list/recently-added?page=${page}`);
  if (!res.ok) {
    throw new Error('Failed to fetch recently added list data');
  }
  const result = await res.json();
  return result.response; // Assuming the list data is under a 'response' key
};

