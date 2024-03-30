import { useState } from "react";
import "../../../../../front-end-shared/css/Game/Turno/Dados.css";

export function Dados({ buttonText, onEndRoll }) {
  const [diceResult, setDiceResult] = useState(12);

  const handleRollDice = () => {
    setDiceResult(Math.floor(Math.random() * 12) + 1);
    onEndRoll();
  };

  return (
    <div className="dados">
      <h1>{diceResult}</h1>
      <button onClick={handleRollDice}>{buttonText}</button>
    </div>
  );
}
