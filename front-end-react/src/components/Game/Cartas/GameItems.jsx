import MrSoper from '../../../../../../front-end-shared/images/personajes_imagen/svg/MrSoper.svg'  
import MsFisica from '../../../../../../front-end-shared/images/personajes_imagen/svg/missFisica.svg'  
import MsIa from '../../../../../../front-end-shared/images/personajes_imagen/svg/missIA.svg'  
import MrProg from '../../../../../../front-end-shared/images/personajes_imagen/svg/MrProg.svg'  
import MsRedes from '../../../../../../front-end-shared/images/personajes_imagen/svg/missRedes.svg'  
import MrDiscreto from '../../../../../../front-end-shared/images/personajes_imagen/svg/mrDiscreto.svg'  

import cable from '../../../../../../front-end-shared/images/objetos_imagen/svg/CABLE.svg'
import disco from '../../../../../../front-end-shared/images/objetos_imagen/svg/DISCO.svg'
import router from '../../../../../../front-end-shared/images/objetos_imagen/svg/ROUTER.svg'
import suspenso from '../../../../../../front-end-shared/images/objetos_imagen/svg/SUSPENSO.svg'
import taza from '../../../../../../front-end-shared/images/objetos_imagen/svg/TAZA.svg'
import teclado from '../../../../../../front-end-shared/images/objetos_imagen/svg/TECLADO.svg'
import troyano from '../../../../../../front-end-shared/images/objetos_imagen/svg/TROYANO.svg'

import cafeteria from '../../../../../../front-end-shared/images/lugares_imagen/svg/CAFETERIA.svg'
import baños from '../../../../../../front-end-shared/images/lugares_imagen/svg/BANIO.svg'
import recepcion from '../../../../../../front-end-shared/images/lugares_imagen/svg/RECEPCION.svg'
import escaleras from '../../../../../../front-end-shared/images/lugares_imagen/svg/ESCALERAS.svg'
import biblioteca from '../../../../../../front-end-shared/images/lugares_imagen/svg/BIBLIOTECA.svg'
import laboratorio from '../../../../../../front-end-shared/images/lugares_imagen/svg/LABORATORIO.svg'
import despacho from '../../../../../../front-end-shared/images/lugares_imagen/svg/DESPACHO.svg'
import aulanorte from '../../../../../../front-end-shared/images/lugares_imagen/svg/AULANORTE.svg'
import aulasur from '../../../../../../front-end-shared/images/lugares_imagen/svg/AULASUR.svg'

import back from '../../../../../../front-end-shared/images/logo-no-back.svg'

// const itemsPlayers = ['SOPER','FISICA','IA','PROG','REDES','DISCRETO']
// const itemsObjects = ['CABLE','DISCO','ROUTER','SUSPENSO','TAZA','TECLADO','TROYANO']
// const itemsPlaces = ['CAFETERIA','BAÑOS','RECEPCION','ESCALERAS','BIBLIOTECA','LABORATORIO','DESPACHO','AULANORTE','AULASUR']
// const items = [...itemsPlayers, ...itemsObjects, ...itemsPlaces]


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
        case 'CAFETERIA':
            return <img src={cafeteria} alt="Imagen del logo del lugar cafeteria"/>
        case 'BAÑOS':
            return <img src={baños} alt="Imagen del logo del lugar baños"/>
        case 'RECEPCION':
            return <img src={recepcion} alt="Imagen del logo del lugar recepcion"/>
        case 'ESCALERAS':
            return <img src={escaleras} alt="Imagen del logo del lugar escaleras"/>
        case 'BIBLIOTECA':
            return <img src={biblioteca} alt="Imagen del logo del lugar biblioteca"/>
        case 'LABORATORIO':
            return <img src={laboratorio} alt="Imagen del logo del lugar laboratorio"/>
        case 'DESPACHO':
            return <img src={despacho} alt="Imagen del logo del lugar despacho"/>
        case 'AULANORTE':
            return <img src={aulanorte} alt="Imagen del logo del lugar aulanorte"/>
        case 'AULASUR':
            return <img src={aulasur} alt="Imagen del logo del lugar aulasur"/>
        
        case 'BACK':
        default:
            return <img src={back} alt="Imagen del logo la app"/>
    }
}