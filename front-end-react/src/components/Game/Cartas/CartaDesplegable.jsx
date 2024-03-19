import '../../../../../../front-end-shared/css/Game/Cartas/CartaDesplegable.css'
import { useState } from 'react'
import { Desplegable } from '../Desplegable'
import { Carta } from './Carta'



export function CartaDesplegable() {
    const [desplegable, setDesplegable] = useState(false)
    const style = { bottom: `${desplegable ? '0px' : '-300px' }`} 


    return (
        <div className='cartadesplegable-body' style={style}>
            <Desplegable left_initial={false} setStyle={setDesplegable}/>

            <div className='cartadesplegable-cart-container'>
                <Carta player_name='router'/>
                <Carta player_name='suspenso'/>
                <Carta player_name='teclado'/>

                <Carta player_name='back'/>
                <Carta player_name='back'/>
            </div>
        </div>
    )
}