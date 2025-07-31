import axios from 'axios';
import type { Artwork } from '../types/artwork';

export const fetchArtworks = async (page: number): Promise<{
  data: Artwork[];
  total: number;
}> => {
  // Add 1.5s delay
  await new Promise((resolve) => setTimeout(resolve, 500));

  const response = await axios.get(`https://api.artic.edu/api/v1/artworks?page=${page}`);
  const artworks = response.data.data.map((item: any) => ({
    id: item.id,
    title: item.title,
    place_of_origin: item.place_of_origin,
    artist_display: item.artist_display,
    inscriptions: item.inscriptions,
    date_start: item.date_start,
    date_end: item.date_end,
  }));
  return { data: artworks, total: response.data.pagination.total };
};
