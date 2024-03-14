import MrSoper from '../../../../front-end-shared/images/personajes_imagen/svg/MrSoper.svg'  
import MsFisica from '../../../../front-end-shared/images/personajes_imagen/svg/missFisica.svg'  
import MsIa from '../../../../front-end-shared/images/personajes_imagen/svg/missIA.svg'  
import MrProg from '../../../../front-end-shared/images/personajes_imagen/svg/MrProg.svg'  
import MsRedes from '../../../../front-end-shared/images/personajes_imagen/svg/missRedes.svg'  
import MrDiscreto from '../../../../front-end-shared/images/personajes_imagen/svg/mrDiscreto.svg'  
import cable from '../../../../front-end-shared/images/objetos_imagen/svg/CABLE.svg'
import disco from '../../../../front-end-shared/images/objetos_imagen/svg/DISCO.svg'
import router from '../../../../front-end-shared/images/objetos_imagen/svg/ROUTER.svg'
import suspenso from '../../../../front-end-shared/images/objetos_imagen/svg/SUSPENSO.svg'
import taza from '../../../../front-end-shared/images/objetos_imagen/svg/TAZA.svg'
import teclado from '../../../../front-end-shared/images/objetos_imagen/svg/TECLADO.svg'
import troyano from '../../../../front-end-shared/images/objetos_imagen/svg/TROYANO.svg'

import back from '../../../../front-end-shared/images/logo-no-back.svg'


export function GameItems( {player_name} ) {
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
        case 'CABLE':
            return <img src={cable} alt="Imagen del logo del objeto cable"/>
        case 'DISCO':
            return <img src={disco} alt="Imagen del logo del objeto disco"/>
        case 'ROUTER':
            return <img src={router} alt="Imagen del logo del objeto router"/>
        case 'SUSPENSO':
            return <img src={suspenso} alt="Imagen del logo del objeto suspenso"/>
        case 'TAZA':
            return <img src={taza} alt="Imagen del logo del objeto taza"/>
        case 'TECLADO':
            return <img src={teclado} alt="Imagen del logo del objeto teclado"/>
        case 'TROYANO':
            return <img src={troyano} alt="Imagen del logo del objeto troyano"/>
        case 'BACK':
            return <img src={back} alt="Imagen del logo la app"/>
        default:
            return <></>
    }
}
