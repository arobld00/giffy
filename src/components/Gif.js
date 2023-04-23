import React from 'react'

export default function Gif({ id, title, url }) {
    return (
        <tr key={id}>
            <td>
                <img alt={title} src={url} />
            </td>
            <td>
                {title}
            </td>
        </tr>
  )
}