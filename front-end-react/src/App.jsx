import '../../../front-end-shared/css/App.css'
import {Tarjeta} from './components/Tarjeta/Tarjeta.jsx'
import {Chat} from './components/Chat/Chat.jsx'
import {Tablero} from './components/Tablero/Tablero.jsx'
// import { Carta } from './components/Carta.jsx'


function App() {
  
  return (
    <>
      <Tarjeta />
      <Chat />
      < Tablero />
      {/* <div className='cart-container'>
        <Carta player_name='soper'/>
        <Carta player_name='redes'/>
        <Carta player_name='prog'/>
        <Carta player_name='fisica'/>
        <Carta player_name='discreto'/>
        <Carta player_name='ia'/>
      </div> */}
    </>
  )
}

export default App
