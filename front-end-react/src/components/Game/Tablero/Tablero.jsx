import '../../../../../../front-end-shared/css/Game/Tablero/Tablero.css'

import { Celda } from "./Celda.jsx";
import { Text } from "./Text.jsx";
import { useState, useEffect } from "react";

export function Tablero () {
    const [size, setSize] = useState('m');
    const [filas] = useState(24);
    const [columnas] = useState(24);
    const [tablero, setTablero] = useState([]);
    useEffect(() => {
        const newTablero = [];
        for (let i = 0; i < filas; i++) {
            const fila = [];
            for (let j = 0; j < columnas; j++) {
                // Initialize each cell with default properties
                // You can modify this to set up your rooms and players
                fila.push({ isRoom: false, roomName: '', hasPlayer: false });
            }
            newTablero.push(fila);
        }
        setTablero(newTablero);
    }, [filas, columnas]);

    const [rooms] = useState(10)

    return (
        <div className='tablero-body'>
            <div className="tablero">
                {tablero.map((fila, i) => (
                    <div className="fila" key={i}>
                        {fila.map((celda, j) => (
                            <Celda key={j} fil={i} col={j} tam={size}/>
                        ))}
                    </div>
                ))}
                <div className='texts'>
                    {
                        [...Array(rooms)].map((_, idx) => {
                            return (
                                <Text idx={idx+1} key={idx}/>
                            )
                        })
                    }
                </div>
            </div>
            <div className='tablero-container-button'>
                <button onClick={() => {setSize('s')}}>S</button>
                <button onClick={() => {setSize('m')}}>M</button>
                <button onClick={() => {setSize('l')}}>L</button>
            </div>
        </div>
    ); 
}
