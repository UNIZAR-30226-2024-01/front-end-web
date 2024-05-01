import '../../../../../../front-end-shared/css/Game/Cartas/CartaShower.css';
import { Carta } from './Carta';
import { ShowCardsContext } from '../../../context/showcards';
import { useContext } from 'react';

export function CartaShower() {
  const { hasToShow, setHasToShow, text, subtext, selectCardsToShow, blockCards, isCardElection, onClickedCard } =
    useContext(ShowCardsContext);

  const onClickedCardLocal = (carta) => {
    onClickedCard(carta);
    setHasToShow(false);
  };

  const estilo = {
    padding: isCardElection ? '20px' : '',
  };
  return (
    hasToShow && (
      <div className="carta-shower" style={estilo}>
        <h1>{text}</h1>
        <h3>
          <em>{subtext}</em>
        </h3>
        <div className="carta-shower-container">
          {selectCardsToShow.map((carta, index) =>
            !isCardElection ? (
              <div style={carta === '' ? { opacity: 0, transition: 'none' } : {}} key={index} className="carta">
                <Carta player_name={carta} hover={false} />
              </div>
            ) : (
              <div
                onClick={() => onClickedCardLocal(carta)}
                key={index}
                className={blockCards.includes(carta) ? 'carta blocked' : 'carta not-blocked'}
              >
                <Carta player_name={carta} hover={false} />
              </div>
            )
          )}
        </div>
        {!isCardElection && (
          <button className="carta-shower-button" onClick={() => setHasToShow(false)}>
            Cerrar
          </button>
        )}
      </div>
    )
  );
}
