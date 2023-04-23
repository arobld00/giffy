import React from 'react'
import Gif from './Gif'

export default function GifList({ showColors, gifs }) {
    return (
        <table width='100%'>
            <thead>
                <tr>
                    <th>Gif</th>
                    <th>Title</th>
                    <th>Source</th>
                </tr>
            </thead>
            <tbody>
                {
                   gifs.map((gif, index) => {
                    const style = index % 2 === 0 ? 'transparent' : '#464D59'
                    const backgroundColor = showColors ? style : 'transparent'
                    return (
                        <Gif 
                        key={ gif.id } // React necesita una key unica para cuando se elimina evita volver a renderizarlo desde el principio
                        backgroundColor={ backgroundColor }
                        { ...gif }
                        />
                    )
                   }) 
                }
            </tbody>
        </table>
    )
}