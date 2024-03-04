import '../../../../../front-end-shared/css/Tarjeta/Tarjeta.css';


import { useState } from 'react'

import { TableRow } from './TableRow.jsx'
import { TableHead } from './TableHead.jsx'
import { TableHeaderCell } from './TableHeaderCell.jsx'
import { Desplegable } from '../Desplegable.jsx'


export function Tarjeta() {

    const [desplegable, setDesplegable] = useState(false)
    const style = { right: `${desplegable ? '0px' : '-354px' }`} 
    const max_chars = 4

    return (
        <div className="tarjeta" data-hidden="true" style={style}>
            <Desplegable left_initial={true} setStyle={setDesplegable}/>

            <table className="tabla">
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
                    <TableRow name="aulas norte" />
                    <TableRow name="aulas sur" />
                </tbody>
            </table>

            <span>&#169; 2024 - Desarrollado por Grace Hopper</span>
        </div>
    )
}
