/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react'

export const TableCell = ({ state }) => {

    const texts = ['', '❌' , '✔' , '❔']
    const colors = ['#ffffff', '#995555', '#559955', '#555599']

    const [text, setText] = useState(texts[state])

    useEffect(() => {
        setText(texts[state]);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [state]);

    const handleClick = () => {
        const index = texts.indexOf(text)
        setText(texts[(index + 1) % texts.length])
    }

    const style = {
        backgroundColor: colors[texts.indexOf(text)]
    }

    return (
        <td onClick={handleClick} style={style}>
            {text}
        </td>
    )
}
