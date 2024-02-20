/* eslint-disable react/prop-types */
import { TableCell } from './TableCell'
import { useState } from 'react'

export const TableRow = ({ name }) => {
    
    const [tachado, setTachado] = useState(false)

    const handleClick = () => {
        setTachado(!tachado)
    }

    return (
        <tr>
            <td className="elemento" onClick={handleClick}>{name}</td>
            <TableCell state={tachado ? 1 : 0} />
            <TableCell state={tachado ? 1 : 0} />
            <TableCell state={tachado ? 1 : 0} />
            <TableCell state={tachado ? 1 : 0} />
            <TableCell state={tachado ? 1 : 0} />
            <TableCell state={tachado ? 1 : 0} />
            <TableCell state={tachado ? 1 : 0} />
        </tr>
    )
}
