import { useContext } from "react";
import { TurnoContext } from "../../../context/turno";

export function TurnoParte({ turno2show, children }) {
  const { turnoParte } = useContext(TurnoContext);

  //   useEffect(() => {
  //     console.log("TurnoParte iniciado");
  //   }, [turnoParte]);

  let show = false;
  turnoParte === turno2show ? (show = true) : (show = false);

  return show ? children : null;
}
