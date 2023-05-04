import { useGifs } from "../hooks/useGifs";

const KEY = 'bSUN1U9OkKH88KxFlYYkv06soNfbozyQ'

export default async function getGifs({ keyword = 'morty' } = {}) {
  const API = `https://api.giphy.com/v1/gifs/search?api_key=${KEY}&q=${keyword}&limit=50&offset=0&rating=g&lang=en`
  const response = await fetch(API)

  if (!response.ok) {
    const message = `An error has occured: ${response.status}`;
    throw new Error(message);
  }

  const gifs = await response.json()
  const { data = [] } = gifs
  const { gifs : mappedGifs } = useGifs({ data })

  if (Array.isArray(data)) {
    return mappedGifs
  }
}