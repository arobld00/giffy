import React from 'react'

export default function Gif({ title, url }) {
    return (
        <div>
            <h4>{ title }</h4>
            <img alt={ title } src={ url } />
        </div>
  )
}