import React, { useContext } from 'react'
import { GifContext } from '../App'

export default function Gif({ backgroundColor, index, id, title, url, source_tld }) {
    const handleRemove = useContext(GifContext);
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
            <td>
                <button onClick={() => { handleRemove(index) }}>Remove</button>
            </td>
        </tr>
    )
}