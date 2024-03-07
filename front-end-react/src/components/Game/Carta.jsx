import '../../../../front-end-shared/css/Carta.css'
import { Player } from "../Player";

export function Carta( {player_name} ) {
    
    return (
        <div className="carta">
            <div className='image'>
                <Player player_name={player_name}/>
                <Player player_name={player_name}/>
            </div>
            <h1>{player_name.toUpperCase()}</h1>
        </div>
    )

}