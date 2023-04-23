import React from 'react'

export default function Gif({ backgroundColor, id, title, url }) {
    return (
        <tr key={id} style={{ backgroundColor }}>
            <td>
                <img alt={title} src={url} />
            </td>
            <td>
                {title}
            </td>
        </tr>
    )
}