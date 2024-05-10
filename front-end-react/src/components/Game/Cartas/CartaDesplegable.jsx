import '../../../../../../front-end-shared/css/Game/Cartas/CartaDesplegable.css';
import { useContext } from 'react';
import { Desplegable } from '../Desplegable';
import { Carta } from './Carta';
import { DesplegablesContext } from '../../../context/desplegables';
import { GameInfoContext } from '../../../context/gameinfo';
import React from 'react';
export function CartaDesplegable() {

  const { cartasDesplegado, setCartasDesplegado } = useContext(DesplegablesContext);

  const { cards } = useContext(GameInfoContext);

  const style = { bottom: `${cartasDesplegado ? '0px' : '-335px'}` };

  return (
    <div className="cartadesplegable-body" style={style}>
      <Desplegable left_initial={true} desplegado={cartasDesplegado} setDesplegado={setCartasDesplegado} />

      <div className="cartadesplegable-cart-container">
        {cards.map((card) => (
          <Carta key={card} player_name={card} hover={false} />
        ))}
      </div>
    </div>
  );
}
