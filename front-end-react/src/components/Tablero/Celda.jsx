import '../../../../../front-end-shared/css/Tablero.css'
import { infoTablero } from "../../../../../front-end-shared/infoTablero.js";
import { Door } from '../Icons.jsx';




export function Celda({fil, col}) {

    const infoCell = infoTablero[fil*24+col];

    let clase = '';
    if (infoCell?.isRoom) {
        clase = 'room room-' + infoCell.roomName;
    } else if (!(infoCell?.isWalkable)) {
        clase = 'invalid'
    }  else {
        clase = 'celda ' + ((fil % 2 === 0) ? ((col % 2 === 0 ? 'dark' : 'light')) : (col % 2 === 0 ? 'light' : 'dark'));
        if (infoCell?.isStartingCell) {
            clase += ' start start-' + infoCell.isStartingCell;
        }
    }


    return (
        <div className={clase}>           
            <div>
                {
                    infoCell?.isDoor ? <Door/> : null
                }
                {
                    infoCell?.isStartingCell ? 
                        <svg viewBox="0 0 100 100"><circle cx="50" cy="50" r="50" /> </svg> 
                    :
                        null
                }
            </div>
        </div>
    )
}