import MrSoper from '../../../../front-end-shared/images/personajes_imagen/svg/MrSoper.svg'  
import MsFisica from '../../../../front-end-shared/images/personajes_imagen/svg/missFisica.svg'  
import MsIa from '../../../../front-end-shared/images/personajes_imagen/svg/missIA.svg'  
import MrProg from '../../../../front-end-shared/images/personajes_imagen/svg/MrProg.svg'  
import MsRedes from '../../../../front-end-shared/images/personajes_imagen/svg/missRedes.svg'  
import MrDiscreto from '../../../../front-end-shared/images/personajes_imagen/svg/mrDiscreto.svg'  


export function Player( {player_name} ) {
    switch (player_name.toUpperCase()) {
        case 'SOPER':
            return <img src={MrSoper} alt="Imagen del logo del personaje Mr Soper"/>
        case 'FISICA':
            return <img src={MsFisica} alt="Imagen del logo del personaje Miss Fisica"/>
        case 'IA':
            return <img src={MsIa} alt="Imagen del logo del personaje Miss IA"/>
        case 'PROG':
            return <img src={MrProg} alt="Imagen del logo del personaje Mr Prog"/>
        case 'REDES':
            return <img src={MsRedes} alt="Imagen del logo del personaje Miss Redes"/>
        case 'DISCRETO':
            return <img src={MrDiscreto} alt="Imagen del logo del personaje Mr Discreto"/>
        default:
            return <></>
    }
}
