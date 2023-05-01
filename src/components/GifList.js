import React from 'react'
import Gif from './Gif'
import { SortBy } from '../App'

export default function GifList({ changeSorting, showColors, gifs }) {
  return (
    <table>
      <thead>
        <tr>
          <th>Gif</th>
          <th className='pointer' onClick={() => changeSorting(SortBy.TITLE)}>Title</th>
          <th className='pointer' onClick={() => changeSorting(SortBy.SOURCE)}>Source</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {
          gifs.map((gif, index) => {
            const style = index % 2 === 0 ? 'transparent' : '#464D59'
            const backgroundColor = showColors ? style : 'transparent'
            const props = { backgroundColor, ...gif }
            return (
              <Gif
                key={gif.id} // React necesita una key unica para cuando se elimina evita volver a renderizarlo desde el principio
                {...props}
              />
            )
          })
        }
      </tbody>
    </table>
  )
}