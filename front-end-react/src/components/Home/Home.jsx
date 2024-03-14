import { ProgressBar } from "./ProgressBar"
import { useEffect, useState } from "react"

export function Home() {

    const [completed, setCompleted] = useState(100)
    const [rotate, setRotate] = useState(false)

    // Función de prueba para movimiento automático de la barra de progreso 
    useEffect(() => {
        if (!rotate) return;
        const interval = setInterval(() => setCompleted(
            (prevCompleted) => (prevCompleted >= 100 ? 0 : prevCompleted + 10)
        ), 800);
        return () => clearInterval(interval);
    }, [rotate]);

    const click = () => {
        setRotate((prevRotate) => !prevRotate)
    }

    const clickAdd = () => {
        setCompleted((prevCompleted) => (prevCompleted >= 100 ? 0 : prevCompleted + 10))
    }
    const clickSubtract = () => {
        setCompleted((prevCompleted) => (prevCompleted <= 0 ? 100 : prevCompleted - 10))
    }
  
    return (
        <div>
            <ProgressBar completed={completed}/>
            <div>
                <button onClick={click}>
                    {rotate ? 'Stop' : 'Start'}
                </button>
                <button onClick={clickAdd}>
                    Add 10
                </button>
                <button onClick={clickSubtract}>
                    Subtract 10
                </button>
            </div>
        </div>
    )
}
