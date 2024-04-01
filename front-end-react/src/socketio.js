import { io } from "socket.io-client";
import { BACKEND_URL } from "./consts.js";

const URL = BACKEND_URL;

export const socketio = io(URL, {
  auth: {
    username: "anonymous",
    group: "0",
    offset: obtenerFechaActual(),
  },
  autoConnect: false,

  transports: ["polling", "websocket"],
});

function obtenerFechaActual() {
  const fecha = new Date();
  const año = fecha.getFullYear();
  const mes = ("0" + (fecha.getMonth() + 1)).slice(-2);
  const dia = ("0" + fecha.getDate()).slice(-2);
  const hora = ("0" + fecha.getHours()).slice(-2);
  const minutos = ("0" + fecha.getMinutes()).slice(-2);
  const segundos = ("0" + fecha.getSeconds()).slice(-2);
  const milisegundos = ("0" + fecha.getMilliseconds()).slice(-6); // Limitar a tres dígitos de precisión
  const zonaHorariaOffset = fecha.getTimezoneOffset();
  const signoZonaHoraria = zonaHorariaOffset > 0 ? "-" : "+";
  const horasZonaHoraria = (
    "0" + Math.abs(fecha.getTimezoneOffset() / 60)
  ).slice(-2);

  return `${año}-${mes}-${dia} ${hora}:${minutos}:${segundos}.${milisegundos}${signoZonaHoraria}${horasZonaHoraria}`;
  //"2024-03-14 12:54:56.419369+01"
}

export const onConnect = () => {
  console.log("Connected to server");
};

export const onChatResponse = (
  username,
  message,
  serverOffset,
  timeStamp,
  character
) => {
  const newMessage = {
    type: "message",
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

export const onAvailableCharacters = (data, setCharacters, setUsernames) => {
  // console.log("Available characters:", data);
  const { names, available } = data;
  setCharacters(names);
  setUsernames(available);
};
