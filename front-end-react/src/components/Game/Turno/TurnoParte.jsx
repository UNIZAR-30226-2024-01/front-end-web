import { useContext, useEffect } from "react";
import { TurnoContext } from "../../../context/turno";

export function TurnoParte({ turno2show, children }) {
  const { turnoParte } = useContext(TurnoContext);

  useEffect(() => {
    console.log("changed" + turnoParte);
  }, [turno2show]);

  console.log("TurnoParte", turnoParte, turno2show);

  return turnoParte == turno2show && turno2show != undefined ? children : null;
}
