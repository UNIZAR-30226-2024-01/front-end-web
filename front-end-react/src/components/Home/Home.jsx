import { ProgressBar } from "./ProgressBar"
import { useEffect, useState } from "react"

export function Home() {

    const [completed, setCompleted] = useState(10)

    // Función de prueba para movimiento automático de la barra de progreso 
    // useEffect(() => {
    //     setInterval(() => setCompleted(Math.floor(Math.random() * 100) + 1), 500);
    // }, []);
  
    return (
        <div>
            <ProgressBar bgcolor="#ef6c00" completed={completed}/>
        </div>
    )
}
