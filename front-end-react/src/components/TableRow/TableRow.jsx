/* eslint-disable react/prop-types */
import './TableRow.css'
import { TableCell } from '../TableCell/TableCell'
import { useState } from 'react'

export const TableRow = ({ name }) => {
    
    const [tachado, setTachado] = useState(false)
    const valor_inicio = tachado ? 1 : 0

    const handleClick = () => {
        console.log('click')
        setTachado(!tachado)
    }

    return (
        <tr>
            <td className="elemento" onClick={handleClick}>{name}</td>
            <TableCell state={valor_inicio} />
            <TableCell state={valor_inicio} />
            <TableCell state={valor_inicio} />
            <TableCell state={valor_inicio} />
            <TableCell state={valor_inicio} />
            <TableCell state={valor_inicio} />
            <TableCell state={valor_inicio} />
        </tr>
    )
}
