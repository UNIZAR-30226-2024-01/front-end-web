import { io } from 'socket.io-client';
import { BACKEND_URL } from './consts';

const URL = BACKEND_URL;

export const socketio = io(URL, {
  auth: {
    username: 'anonymous',
    group: '0',
    offset: obtenerFechaActual(),
  },
  autoConnect: false,

  transports: ['polling', 'websocket'],
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
  const horasZonaHoraria = ('0' + Math.abs(fecha.getTimezoneOffset() / 60)).slice(-2);

  return `${año}-${mes}-${dia} ${hora}:${minutos}:${segundos}.${milisegundos}${signoZonaHoraria}${horasZonaHoraria}`;
  //"2024-03-14 12:54:56.419369+01"
}

export const onConnect = () => {
  console.log('Connected to server');
};

export const onChatResponse = (username, message, serverOffset, timeStamp, character) => {
  const newMessage = {
    type: 'message',
    username: username,
    text: message,
    time: timeStamp,
    character: character,
  };
  // console.log("newMessage:", newMessage);
  socketio.auth.offset = serverOffset;

  return newMessage;
};

export const onChatTurn = (username) => {
  console.log(`Now is ${username}'s turn`);
};

export const onGameInfo = (data, setCharacters, setUsernames, setGuns, setRooms) => {
  // console.log("Available characters:", data);
  const { names, guns, rooms, available } = data;
  setCharacters(names);
  setUsernames(available);
  setGuns(guns);
  setRooms(rooms);
};

// export function onTurnoOwner(username, setTurnoOwner) {
//   console.log(`Now is ${username}'s turn`);
//   setTurnoOwner(username);
// }

export function onTurnoAsksFor(username_asking, character, gun, room, my_cards) {
  console.log(`${username_asking} is asking for ${character}, ${gun}, ${room}`);
  const has_card = my_cards.includes(character) || my_cards.includes(gun) || my_cards.includes(room);

  if (has_card) {
    console.log('I have a card');
  } else {
    console.log("I don't have a card");
  }

  socketio.emit('turno-has-card', has_card);
  return has_card;
  /*
  En función de lo que se devuelva: 
    - si es true se renderizará un componente como el de 'characterSection' 
      para elegir la carta a mostrar al jugador que pregunta con un temporizador
      donde si se cumple se enviará al azar una de las cartas que tiene el jugador
    - si es false no debe hacer nada, el jugador no tiene ninguna de las 
      cartas sobre las que se ha preguntado
*/
}

/**
 * Mensaje que se envía a todo el mundo pero solamente el jugador 'username_showed'
 * lo lee. Si nadie tiene cartas, se envía con "username_shower" vacío.
 */
export function onTurnoShowCards(username_showed, username_shower, character, gun, room) {
  console.log(`${username_shower} showed ${username_showed} ${character}, ${gun}, ${room}`);

  const i_am_being_showed = username_showed === socketio.auth.username;

  if (character === '' && gun === '' && room === '') {
    console.log('Nobody has cards');
    return '';
  } else if (i_am_being_showed) {
    // Devolver la carta que se pide (dos serán cadenas vacías
    // y una será la carta que se pide)
    const card = character + gun + room;
    return card;
  } else {
    // Devolver el dorso de la carta
    return 'back';
  }
  /*
  Valor de retorno:
    - "" : no se muestra ninguna carta
    - <carta> : se muestra la carta que se pide (para el jugador que pregunta)
    - "back" : se muestra la carta de dorso (para el resto de jugadores)
  */
}

export function onTurnoMovesTo(username, position) {
  console.log(`${username} moves to ${position}`);
}
