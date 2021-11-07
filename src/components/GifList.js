import React from 'react'
import Gif from './Gif'

export default function GifList({ gifs }) {
    return gifs.results.map((gif) => 
        <Gif 
            key={ gif.id } // React necesita una key unica para cuando se elimina evita volver a renderizarlo desde el principio
            { ...gif }
        />
  )
}