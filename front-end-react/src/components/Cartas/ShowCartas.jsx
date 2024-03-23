import { Carta } from "../Game/Cartas/Carta";
import "./ShowCartas.css";

export function ShowCartas() {
  return (
    <div className="showcartas-container">
      {/* <Carta player_name='soper'/>
            <Carta player_name='fisica'/>
            <Carta player_name='ia'/>
            <Carta player_name='prog'/>
            <Carta player_name='redes'/>
            <Carta player_name='discreto'/> */}
      <Carta player_name="troyano" />
      <Carta player_name="taza" /> {/* fondo de asa de taza */}
      <Carta player_name="cable" /> {/* fondo en detalles */}
      <Carta player_name="disco" /> {/* nose si queda bien el haz */}
      <Carta player_name="router" />
      <Carta player_name="suspenso" />
      <Carta player_name="teclado" />
      <Carta player_name="back" />
      <Carta player_name="back" />
      <Carta player_name="back" />
      <Carta player_name="back" />
      <Carta player_name="back" />
    </div>
  );
}
