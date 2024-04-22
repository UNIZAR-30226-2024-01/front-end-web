import '../../../../../../front-end-shared/css/Game/Cartas/CartaShower.css';
import { Carta } from './Carta';
import { ShowCardsContext } from '../../../context/showcards';
import { useContext } from 'react';

export function CartaShower() {
  const { hasToShow, setHasToShow, text, subText, selectCardsToShow } = useContext(ShowCardsContext);
  console.log(selectCardsToShow);
  return (
    hasToShow && (
      <div className="carta-shower">
        <h1>{text}</h1>
        <h3>{subText}</h3>
        <div className="carta-shower-container">
          {selectCardsToShow.map((carta, index) => (
            <div style={carta === '' ? { opacity: 0 } : {}} key={index} className="carta">
              <Carta player_name={carta} hover={false} />
            </div>
          ))}
        </div>
        <button className="carta-shower-button" onClick={() => setHasToShow(false)}>
          Cerrar
        </button>
      </div>
    )
  );
}
