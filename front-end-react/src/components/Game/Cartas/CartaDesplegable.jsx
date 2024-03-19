import '../../../../../../front-end-shared/css/Game/Cartas/CartaDesplegable.css'
import { useState } from 'react'
import { Desplegable } from '../Desplegable'
import { Carta } from './Carta'



export function CartaDesplegable() {
    const [desplegable, setDesplegable] = useState(false)
    const style = { bottom: `${desplegable ? '0px' : '-335px' }`} 


    return (
        <div className='cartadesplegable-body' style={style}>
            <Desplegable left_initial={true} setStyle={setDesplegable}/>

            <div className='cartadesplegable-cart-container'>
                <Carta player_name='redes' hover={false}/>
                <Carta player_name='despacho' hover={false}/>
                <Carta player_name='cable' hover={false}/>
                {/* <Carta player_name='back' hover={false}/>
                <Carta player_name='back' hover={false}/> */}
            </div>
        </div>
    )
}