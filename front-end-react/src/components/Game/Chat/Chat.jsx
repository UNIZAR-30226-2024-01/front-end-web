import "../../../../../../front-end-shared/css/Game/Chat/chat.css";
import { useState, useEffect } from "react";
import { MessageList } from "./MessageList.jsx";
import { InputMessage } from "./InputMessage.jsx";
import { Desplegable } from "../Desplegable.jsx";
import { useCookies } from "react-cookie";

import {
  socket,
  onConnect,
  onChatResponse,
  onChatTurn,
} from "../../../socketio.js";

export function Chat() {
  const [cookies] = useCookies(["username", "group"]);

  const [messages, setMessages] = useState([]);
  const [desplegable, setDesplegable] = useState(false);
  const style = { left: `${desplegable ? "0px" : "-425px"}` };

  const sendMessage = (message) => {
    console.log("Sending message:", message);
    socket.auth.username = cookies.username ?? "anonymous";
    socket.auth.group = cookies.group ?? "0";

    console.log("group :", socket.auth.group);
    socket.emit("chat message", message);
  };

  useEffect(() => {
    socket.auth.username = cookies.username ?? "anonymous";
    socket.auth.group = cookies.group ?? "0";
    socket.connect();

    const onChatResponseLocal = (username, message, serverOffset) => {
      const messageReceived = onChatResponse(username, message, serverOffset);
      setMessages((messages) => [...messages, messageReceived]);
    };

    const onChatTurnLocal = (username) => {
      return onChatTurn(username);
    };

    socket.on("connect", onConnect);
    socket.on("chat response", onChatResponseLocal);
    socket.on("chat turn", onChatTurnLocal);

    return () => {
      socket.off("connect", onConnect);
      socket.off("chat response", onChatResponseLocal);
      socket.off("chat turn", onChatTurnLocal);

      socket.disconnect();
    };
  }, []);

  return (
    <div className="chat-container" style={style}>
      <Desplegable left_initial={false} setStyle={setDesplegable} />

      <MessageList messages={messages} />
      <div className="">
        <InputMessage sendMessage={sendMessage} />
      </div>
    </div>
  );
}
