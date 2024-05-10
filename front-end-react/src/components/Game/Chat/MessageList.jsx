import '../../../../../../front-end-shared/css/Game/Chat/message-list.css';
import { useEffect, useRef } from 'react';
import { SpecialMessage } from './SpecialMessage';
import { Message } from './Message';
import React from 'react';
export const MessageList = ({ messages }) => {
  const chatRef = useRef(null);
  useEffect(() => {
    chatRef.current.scrollTop = chatRef.current.scrollHeight;
  }, [messages]);

  const style = {
    height: '100%',
  };

  return (
    <ul ref={chatRef} style={style} className="message-list">
      {messages.map((props, index) =>
        props.type == 'message' ? (
          <Message
            key={index}
            username={props.username}
            text={props.text}
            time={props.time}
            character={props.character}
          />
        ) : (
          // : <li className="notification" key={index}>{props.text}</li>
          <SpecialMessage key={index} props={props} />
        )
      )}
    </ul>
  );
};
