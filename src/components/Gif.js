import React from 'react'

export default function Gif({ backgroundColor, id, title, url, source_tld }) {
    return (
        <tr key={id} style={{ backgroundColor }}>
            <td>
                <img alt={title} src={url} />
            </td>
            <td>
                {title}
            </td>
            <td>
                {source_tld}
            </td>
        </tr>
    )
}