import './Chat.css';
import { useState } from 'react'
import { MessageList } from './MessageList.jsx';
import { InputMessage } from './InputMessage.jsx';

export function Chat (){
    const [messages, setMessages] = useState([]);

    const sendMessage = (message) => {
        setMessages([...messages, message]);
    };

    return (
        <div className="chat-container">
            <MessageList messages={messages} />
            <div className="input-message-container">
                <InputMessage sendMessage={sendMessage} />
            </div>
        </div>
    );
};
