export function useGifs({ data }) {
    const mappedGifs = data?.map((image) => {
      const { images, id, title, source_tld } = image
      const { url } = images.fixed_height_small
      return {
        title: title.split('GIF')[0],
        url,
        id,
        source_tld
      }
    })
  
    return { gifs : mappedGifs }
  }