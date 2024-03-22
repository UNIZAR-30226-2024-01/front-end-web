import { io } from 'socket.io-client';
import { BACKEND_URL } from '../../../consts';

const URL = BACKEND_URL;

export const socket = io(URL, {
    auth: {
        offset: obtenerFechaActual()
    },
    autoConnect: false,

    transports: ['polling', 'websocket']
});


 function obtenerFechaActual() {
    const fecha = new Date();
    const año = fecha.getFullYear();
    const mes = ('0' + (fecha.getMonth() + 1)).slice(-2);
    const dia = ('0' + fecha.getDate()).slice(-2);
    const hora = ('0' + fecha.getHours()).slice(-2);
    const minutos = ('0' + fecha.getMinutes()).slice(-2);
    const segundos = ('0' + fecha.getSeconds()).slice(-2);
    const milisegundos = ('0' + fecha.getMilliseconds()).slice(-6); // Limitar a tres dígitos de precisión
    const zonaHorariaOffset = fecha.getTimezoneOffset();
    const signoZonaHoraria = zonaHorariaOffset > 0 ? '-' : '+';
    const horasZonaHoraria = ('00');
  
    return `${año}-${mes}-${dia} ${hora}:${minutos}:${segundos}.${milisegundos}${signoZonaHoraria}${horasZonaHoraria}`;
    //"2024-03-14 12:54:56.419369+00"
  }