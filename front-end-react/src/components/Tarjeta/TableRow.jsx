/* eslint-disable react/prop-types */
import { TableCell } from './TableCell'
import { useState } from 'react'

export const TableRow = ({ name }) => {
    
    const [estado, setEstado] = useState(() => {
        return Array(7).fill(0);
    })

    const [estadoAnterior, setEstadoAnterior] = useState()

    const handleClick = () => {
        if (estado.every((value) => value === 1)) {
            setEstado(estadoAnterior)
            return
        }
        
        setEstadoAnterior(estado)        
        const nuevoEstado = Array(7).fill(1)
        setEstado(nuevoEstado)
    }

    const changeState = (index) => {
        const nuevoEstado = [...estado]
        nuevoEstado[index] = (nuevoEstado[index] + 1) % 4
        console.log(nuevoEstado)
        setEstado(nuevoEstado)
    }

    return (
        <tr>
            <td className="elemento" onClick={handleClick}>{name}</td>
            {
                estado.map((value, index) => {
                    return <TableCell key={index} state={value} idx={index} setEstado={changeState} />
                })
            }
        </tr>
    )
}
