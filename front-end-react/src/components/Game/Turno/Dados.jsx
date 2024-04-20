import "../../../../../../front-end-shared/css/Game/Turno/Dados.css";
import ReactDice from "react-dice-complete";
import { useContext, useRef, useState } from "react";
import { TurnoContext } from "../../../context/turno";

export function Dados({ buttonText, finRoll }) {
  const reactDice = useRef(null);
  const [diceState, setDiceState] = useState(false);

  const { setDados } = useContext(TurnoContext);

  const rollDone = (totalValue, values) => {
    if (!diceState) {
      // console.log("falsos dados, no se hace nada");
      setDiceState(!diceState);
      return;
    }
    setDados(totalValue);
    finRoll(totalValue);
  };

  const rollAll = () => {
    reactDice.current?.rollAll();
    console.log("Tirando los dados");
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
      <button onClick={rollAll}>{buttonText}</button>
    </div>
  );
}
