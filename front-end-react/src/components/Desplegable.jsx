import { useState } from 'react'


export function Desplegable ({ izquieda_inicial, setStyle }) {

    const [izquierda, setIzquierda] = useState( izquieda_inicial) 

    const handleClick = () => {
        setIzquierda(!izquierda)
    }

    return (
        <div id="tarjeta" onClick={handleClick}>
        {
        izquierda ?
            <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
            </svg>
        :            
            <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
            </svg>
        }
        </div>
    )
}