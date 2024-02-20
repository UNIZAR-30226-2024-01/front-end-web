import './Tarjeta.css'

import { useState } from 'react'

import { TableRow } from './TableRow.jsx'
import { TableHead } from './TableHead.jsx'
import { TableHeaderCell } from './TableHeaderCell.jsx'


export function Tarjeta() {
    const [desplegable, setDesplegable] = useState(false)

    const style = { right: `${desplegable ? '0px' : '-20%' }`} 
    const max_chars = 4

    const toggleDesplegable = () => {
        setDesplegable(!desplegable)
    }

    return (
        <div id="tarjeta" data-hidden="true" style={style}>
            <div id="desplegable" onClick={toggleDesplegable}>
            {
            desplegable ?
                <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                </svg>
            :            
                <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
                </svg>
            }
            </div>

            <table id="tabla">
                <thead className="cabecera">
                    <tr>
                        <th></th>
                        <TableHeaderCell max_chars={max_chars} text="hola" />
                        <TableHeaderCell max_chars={max_chars} />
                        <TableHeaderCell max_chars={max_chars} />
                        <TableHeaderCell max_chars={max_chars} />
                        <TableHeaderCell max_chars={max_chars} />
                        <TableHeaderCell max_chars={max_chars} />
                        <TableHeaderCell max_chars={max_chars} />
                    </tr>
                </thead>
                <tbody id="table-body">
                    <TableHead title="¿QUIÉN?" />
                    <TableRow name="mr SOPER" />
                    <TableRow name="miss REDES" />
                    <TableRow name="mr PROG" />
                    <TableRow name="miss FISICA" />
                    <TableRow name="mr DISCRETO" />
                    <TableRow name="miss IA" />
                    
                    <TableHead title="¿CON QUÉ?" />
                    <TableRow name="teclado" />
                    <TableRow name="asfixiar con cable de red" />
                    <TableRow name="raton envenenado" />
                    <TableRow name="router afilado" />
                    <TableRow name="troyano" />
                    <TableRow name="lanzar cd" />

                    <TableHead title="¿DÓNDE?" />
                    <TableRow name="cafeteria" />
                    <TableRow name="baños" />
                    <TableRow name="recepcion" />
                    <TableRow name="escaleras" />
                    <TableRow name="bibloteca" />
                    <TableRow name="laboratorio" />
                    <TableRow name="despacho" />
                    <TableRow name="aulas sur" />
                    <TableRow name="aulas norte" />
                </tbody>
            </table>

            <span>&#169; 2024 - Desarrollado por Grace Hopper</span>
        </div>
    )
}
