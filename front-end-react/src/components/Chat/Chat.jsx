import '../../../../../front-end-shared/css/Chat.css';
import { useState } from 'react'
import { MessageList } from './MessageList.jsx';
import { InputMessage } from './InputMessage.jsx';
import { Desplegable } from '../Desplegable.jsx';

export function Chat (){
    const [messages, setMessages] = useState([]);
    
    const [desplegable, setDesplegable] = useState(false)
    const style = { left: `${desplegable ? '0px' : '-425px' }`} 

    const sendMessage = (message) => {
        setMessages([...messages, message]);
    };


    return (
        <div className="chat-container" style={style}>
            <Desplegable left_initial={false} setStyle={setDesplegable}/>
            
            <MessageList messages={messages} />
            <InputMessage sendMessage={sendMessage} />
        </div>
    )
}
