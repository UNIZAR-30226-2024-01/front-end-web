import '../../../../../../front-end-shared/css/Game/Turno/Dados.css';
import ReactDice from 'react-dice-complete';
import { useContext, useRef, useState } from 'react';
import { TurnoContext } from '../../../context/turno';
import React from 'react';
export function Dados({ buttonText }) {
  const reactDice = useRef(null);
  const [diceState, setDiceState] = useState(false);
  const [rolled, setRolled] = useState(false);

  const { setDados, setParteTurno } = useContext(TurnoContext);

  const rollDone = (totalValue, values) => {
    if (!diceState) {
      // console.log("falsos dados, no se hace nada");
      setDiceState(!diceState);
      return;
    }
    setDados(totalValue);
    setTimeout(() => {
      setParteTurno('elegir-casilla');
      setDados(undefined);
    }, 2500);
  };

  const rollAll = () => {
    setRolled(true);
    reactDice.current?.rollAll();
  };

  return (
    <div className="dados">
      <ReactDice
        defaultRoll={6}
        numDice={2}
        ref={reactDice}
        rollDone={rollDone}
        rollTime={1}
        disableIndividual={true}
        dotColor="#1315a2"
        faceColor="#fff"
        dieSize={100}
      />
      {!rolled && <button onClick={rollAll}>{buttonText}</button>}
    </div>
  );
}
