import "../../../../../../front-end-shared/css/Game/Chat/chat.css";
import { useState, useEffect, useContext } from "react";
import { MessageList } from "./MessageList.jsx";
import { InputMessage } from "./InputMessage.jsx";
import { Desplegable } from "../Desplegable.jsx";
// import { useCookies } from "react-cookie";

import { onConnect, onChatResponse, onChatTurn } from "../../../socketio.js";
import { DesplegablesContext } from "../../../context/desplegables.jsx";
import { SocketContext } from "../../../context/socket.jsx";

export function Chat() {
  // const [cookies] = useCookies(["username", "group"]);

  const [messages, setMessages] = useState([]);
  const { chatDesplegado, setChatDesplegado } = useContext(DesplegablesContext);
  const { socket } = useContext(SocketContext);

  const style = { left: `${chatDesplegado ? "0px" : "-425px"}` };

  const sendMessage = (message) => {
    socket.emit("chat-message", message);
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
      const messageReceived = onChatResponse(
        username,
        message,
        serverOffset,
        timeStamp,
        character
      );
      setMessages((messages) => [...messages, messageReceived]);
    };

    const onChatTurnLocal = (username) => {
      return onChatTurn(username);
    };

    socket.on("connect", onConnect);
    socket.on("chat-response", onChatResponseLocal);
    socket.on("chat turn", onChatTurnLocal);

    return () => {
      socket.off("connect", onConnect);
      socket.off("chat-response", onChatResponseLocal);
      socket.off("chat turn", onChatTurnLocal);
    };
  }, [socket]);

  return (
    <div className="chat-container" style={style}>
      <Desplegable
        left_initial={false}
        desplegado={chatDesplegado}
        setDesplegado={setChatDesplegado}
      />

      <MessageList messages={messages} />
      <div className="">
        <InputMessage sendMessage={sendMessage} />
      </div>
    </div>
  );
}
