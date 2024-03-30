import "../../../../../front-end-shared/css/Game/Turno/Dados.css";
import ReactDice from "react-dice-complete";
import { useRef } from "react";

export function Dados({ buttonText, finRoll }) {
  const reactDice = useRef(null);

  const rollDone = (totalValue, values) => {
    console.log("individual die values array:", values);
    console.log("total dice value:", totalValue);
  };

  const rollAll = () => {
    reactDice.current?.rollAll();
    console.log("Tirando los dados");
    finRoll();
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
