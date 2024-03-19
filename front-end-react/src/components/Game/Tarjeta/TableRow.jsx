/* eslint-disable react/prop-types */
import { TableCell } from './TableCell'
import { useEffect, useState } from 'react'

export const TableRow = ({ name, initialState=null, handleChange, fila}) => {
    
    const [estado, setEstado] = useState(() => {
        if (initialState === "" | initialState === null) {
            return Array(7).fill(0)
        }
        return Object.values(initialState)
    })

    const [estadoAnterior, setEstadoAnterior] = useState(Array(7).fill(0))

    const handleClick = () => {
        if (estado.every((value) => value === 1)) {
            setEstado(estadoAnterior)
            return
        }
        
        setEstadoAnterior(estado)        
        const nuevoEstado = Array(7).fill(1)
        setEstado(nuevoEstado)

        handleChange(fila,nuevoEstado)
    }

    const changeState = (index) => {
        const nuevoEstado = [...estado]
        nuevoEstado[index] = (nuevoEstado[index] + 1) % 4
        setEstado(nuevoEstado)

        handleChange(fila,nuevoEstado)
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
