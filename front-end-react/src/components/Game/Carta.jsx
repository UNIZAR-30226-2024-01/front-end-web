// import '../../../../../front-end-shared/css/Carta.css'
import '../../../../../front-end-shared/css/Carta.css'
import { GameItems } from "../GameItems";

export function Carta( {player_name} ) {

    let styleImage 
    if (player_name === 'back') {
        styleImage = {
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'center'
        }
    }

    return (
        <div className="carta">
            <div className='image' style={styleImage}>
                <GameItems player_name={player_name}/>
                <GameItems player_name={player_name}/>
            </div>
            {
                player_name != 'back' 
                ? <h1>{player_name.toUpperCase()}</h1> 
                : null
            }
        </div>
    )
}
