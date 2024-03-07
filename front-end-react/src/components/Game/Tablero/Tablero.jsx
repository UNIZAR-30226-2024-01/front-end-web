import { Celda } from "./Celda.jsx";
import { useState, useEffect } from "react";

export function Tablero () {

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

    return (
        <>
            <div className="tablero">
                {tablero.map((fila, i) => (
                    <div className="fila" key={i}>
                        {fila.map((celda, j) => (
                            // <div>holaa</div>, 
                            <Celda key={j} fil={i} col={j}/>
                        ))}
                    </div>
                ))}
            </div>
        </>
    ); 
}
