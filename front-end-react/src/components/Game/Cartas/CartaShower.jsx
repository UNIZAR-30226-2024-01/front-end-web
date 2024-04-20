import '../../../../../../front-end-shared/css/Game/Cartas/CartaShower.css';
import { Carta } from './Carta';

export function CartaShower() {
  const text = 'javi.sin enseño una carta a rold'; // recuperar dinámicamente
  const cartas = ['SOPER' /* , "IA" */]; // recuperar de tus cartas
  return (
    <div className="carta-shower">
      <h1>{text}</h1>
      <div className="carta-shower-container">
        {cartas.map((carta, index) => (
          <div key={index} className="carta">
            <Carta player_name={carta} hover={false} />
          </div>
        ))}
      </div>
    </div>
  );
}
