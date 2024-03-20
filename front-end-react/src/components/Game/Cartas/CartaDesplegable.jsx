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
                <Carta player_name={getRandomObject()} hover={false}/>
                <Carta player_name={getRandomObject()} hover={false}/>
                <Carta player_name={getRandomObject()} hover={false}/>
                
                {/* <Carta player_name='soper' hover={false}/>
                <Carta player_name='fisica' hover={false}/>
                <Carta player_name='ia' hover={false}/>
                <Carta player_name='prog' hover={false}/>
                <Carta player_name='redes' hover={false}/>
                <Carta player_name='discreto' hover={false}/> */}

                {/* <Carta player_name='teclado' hover={false}/>
                <Carta player_name='cable' hover={false}/>
                <Carta player_name='disco' hover={false}/>
                <Carta player_name='taza' hover={false}/>
                <Carta player_name='troyano' hover={false}/>
                <Carta player_name='suspenso' hover={false}/> */}

                {/* <Carta player_name='cafeteria' hover={false}/>
                <Carta player_name='baños' hover={false}/>
                <Carta player_name='recepcion' hover={false}/>
                <Carta player_name='escaleras' hover={false}/>
                <Carta player_name='biblioteca' hover={false}/>
                <Carta player_name='laboratorio' hover={false}/>
                <Carta player_name='despacho' hover={false}/>
                <Carta player_name='aulanorte' hover={false}/>
                <Carta player_name='aulasur' hover={false}/> */}
        
            </div>
        </div>
    )
}


function getRandomObject() {
    const itemsPlayers = ['SOPER','FISICA','IA','PROG','REDES','DISCRETO']
    const itemsObjects = ['CABLE','DISCO','ROUTER','SUSPENSO','TAZA','TECLADO','TROYANO']
    const itemsPlaces = ['CAFETERIA','BAÑOS','RECEPCION','ESCALERAS','BIBLIOTECA','LABORATORIO','DESPACHO','AULANORTE','AULASUR']
    const items = [...itemsPlayers, ...itemsObjects, ...itemsPlaces]
    return items[Math.floor(Math.random() * items.length)]
}