import React from 'react'
import Gif from './Gif'

export default function GifList({ gifs }) {
    return (
        <table width='100%'>
            <thead>
                <tr>
                    <th>Gif</th>
                    <th>Title</th>
                </tr>
            </thead>
            <tbody>
                {
                   gifs.results.map((gif) => {
                    return (
                        <Gif 
                        key={ gif.id } // React necesita una key unica para cuando se elimina evita volver a renderizarlo desde el principio
                        { ...gif }
                        />
                    )
                   }) 
                }
            </tbody>
        </table>
    )
}