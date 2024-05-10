import '../../../../../../front-end-shared/css/Game/Chat/chat.css';
import { useState, useEffect, useContext } from 'react';
import { MessageList } from './MessageList.jsx';
import { InputMessage } from './InputMessage.jsx';
import { Desplegable } from '../Desplegable.jsx';
// import { useCookies } from "react-cookie";
import React from 'react';
import { onConnect, onChatResponse, onChatTurn } from '../../../socketio.js';
import { DesplegablesContext } from '../../../context/desplegables.jsx';
import { SocketContext } from '../../../context/socket.jsx';

export function Chat() {
  // const [cookies] = useCookies(["username", "group"]);

  const [messages, setMessages] = useState([]);
  const { chatDesplegado, setChatDesplegado } = useContext(DesplegablesContext);
  const { socket } = useContext(SocketContext);
  const [unReadMessages, setUnReadMessages] = useState(0);

  const style = { left: `${chatDesplegado ? '0px' : '-425px'}` };

  const sendMessage = (message) => {
    socket.emit('chat-message', message);
  };

  const toggleChatDesplegado = () => {
    setChatDesplegado((prev) => !prev);
    setUnReadMessages(0);
  };

  useEffect(() => {
    if (!socket) return;
    const onChatResponseLocal = (
      username,
      message,
      serverOffset,
      timeStamp,
      character //<-- Add the appropriate character here (now empty string)
    ) => {
      const messageReceived = onChatResponse(username, message, serverOffset, timeStamp, character);
      setMessages((messages) => [...messages, messageReceived]);
      if (!chatDesplegado) {
        setUnReadMessages((prev) => prev + 1);
      } else {
        setUnReadMessages(0);
      }
    };


    socket.on('connect', onConnect);
    socket.on('chat-response', onChatResponseLocal);

    return () => {
      socket.off('connect', onConnect);
      socket.off('chat-response', onChatResponseLocal);
    };
  }, [socket, chatDesplegado]);

  const circleFill = unReadMessages > 0 ? 'flex' : 'none';
  const styleCircle = {
    display: circleFill,
  };

  return (
    <div className="chat-container" style={style}>
      <Desplegable left_initial={false} desplegado={chatDesplegado} setDesplegado={toggleChatDesplegado}>
        <div className="desplegable-circle-message " style={styleCircle}>
          <p>{unReadMessages > 9 ? '+9' : unReadMessages}</p>
        </div>
      </Desplegable>

      <MessageList messages={messages} />
      <div className="">
        <InputMessage sendMessage={sendMessage} />
      </div>
    </div>
  );
}
