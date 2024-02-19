import './Tarjeta.css'
import { TableRow } from '../TableRow/TableRow.jsx'
import { TableHead } from '../TableHead/TableHead.jsx'
import { useState } from 'react'

export function Tarjeta() {
    const [desplegable, setDesplegable] = useState(false)

    const style = { right: `${desplegable ? '0px' : '-20%' }`} 

    const toggleDesplegable = () => { setDesplegable(!desplegable) }


    return (
        <div id="tarjeta" data-hidden="true" style={style}>
            <div id="desplegable" onClick={toggleDesplegable}>
            {
            desplegable ?
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                </svg>
            :            
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
                </svg>
            }
            </div>

            <table id="tabla">
                <thead className="cabecera">
                    <tr>
                        <th /> <th /> <th /> <th /> <th /> <th /> <th /> <th />
                    </tr>
                </thead>
                <tbody id="table-body">
                    <TableHead title="Asesino" />
                    <TableRow name="mr SOPER" />
                    <TableRow name="miss REDES" />
                    <TableRow name="mr PROG" />
                    <TableRow name="miss FISICA" />
                    <TableRow name="mr DISCRETO" />
                    <TableRow name="miss IA" />
                    
                    <TableHead title="Arma" />
                    <TableRow name="teclado" />
                    <TableRow name="asfixiar con cable de red" />
                    <TableRow name="raton envenenado" />
                    <TableRow name="router afilado" />
                    <TableRow name="troyano" />
                    <TableRow name="lanzar cd" />

                    <TableHead title="Lugar" />
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
        </div>
    )
}
