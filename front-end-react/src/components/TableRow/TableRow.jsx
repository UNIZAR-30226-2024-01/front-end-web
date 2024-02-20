/* eslint-disable react/prop-types */
import './TableRow.css'
import { TableCell } from '../TableCell/TableCell'
import { useState } from 'react'

export const TableRow = ({ name }) => {
    
    const [tachado, setTachado] = useState(false)
    const valor_inicio = tachado ? 1 : 0

    const [selected, setSelected] = useState(false);

    const handleClick = () => {
        console.log('click')
        setTachado(!tachado)
        setSelected(!selected)
    }

    return (
        <tr>
            <td className="elemento" onClick={handleClick}>{name}</td>
            <TableCell state={selected ? 1 : 0} />
            <TableCell state={selected ? 1 : 0} />
            <TableCell state={selected ? 1 : 0} />
            <TableCell state={selected ? 1 : 0} />
            <TableCell state={selected ? 1 : 0} />
            <TableCell state={selected ? 1 : 0} />
            <TableCell state={selected ? 1 : 0} />
        </tr>
    )
}
