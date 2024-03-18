import { infoHabitaciones } from "../../../../../../front-end-shared/infoTablero.js";
import '../../../../../../front-end-shared/css/Game/Tablero/Text.css'



export function Text ( {idx} ) {
    const className = 'room-name room-name-'+idx;
    const style = infoHabitaciones[idx-1].style
    const roomName = infoHabitaciones[idx-1].roomName
    return (
        <div className={className} style={style}>
            <p>{roomName}</p>
        </div>
    )
}