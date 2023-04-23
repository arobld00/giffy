const KEY = 'bSUN1U9OkKH88KxFlYYkv06soNfbozyQ'

export default async function getGifs ({ keyword = 'morty' } = {}) {
    const API = `https://api.giphy.com/v1/gifs/search?api_key=${ KEY }&q=${ keyword }&limit=50&offset=0&rating=g&lang=en`
    const response = await fetch(API)

    if (!response.ok) {
        const message = `An error has occured: ${response.status}`;
        throw new Error(message);
    }

    const gifs = await response.json()
    const { data = [] } = gifs
    
    if (Array.isArray(data)) {
        const gifs = data.map((image) => {
            const { images, id, title } = image
            const { url } = images.fixed_height_small
            return { 
                title: title.split('GIF')[0],
                url,
                id
            }
        })
        return gifs
    }
}