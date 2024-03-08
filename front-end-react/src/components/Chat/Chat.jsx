import '../../../../../front-end-shared/css/Chat/chat.css';
import { useState, useEffect } from 'react'
import { MessageList } from './MessageList.jsx';
import { InputMessage } from './InputMessage.jsx';
import { Desplegable } from '../Desplegable.jsx';
// import { io } from 'https://cdn.socket.io/4.3.2/socket.io.esm.min.js';
import { socket } from './chat.js';



export function Chat (){
    const [messages, setMessages] = useState([]);
    const [desplegable, setDesplegable] = useState(false)
    const style = { left: `${desplegable ? '0px' : '-425px' }`} 

    const sendMessage = (message) => {
        console.log('Sending message:', message);
        socket.auth.username = sessionStorage.getItem('username') ?? 'anonymous';
        socket.auth.group = sessionStorage.getItem('game') ?? '0';
        console.log('group :', socket.auth.group);
        socket.emit('chat message', message);
    };

    useEffect(() => {
        socket.auth.username = sessionStorage.getItem('username') ?? 'anonymous';
        socket.auth.group = sessionStorage.getItem('group') ?? '0';
        socket.connect();

        const onConnect = () => {
            console.log('Connected to server');
        } 
    
        const onChatResponse = (username, message) => {
            console.log('Received message:', message);
            const messageToShow = `${username} sent: ${message}`
            setMessages((prevMessages) => [...prevMessages, messageToShow]);
        };
    
        socket.on('connect', onConnect);
        socket.on('chat response', onChatResponse);
    
        return () => {
          socket.off('connect', onConnect);
          socket.off('chat response', onChatResponse);
          socket.disconnect();
        };
      }, []);
    


    return (
        <div className="chat-container" style={style}>
            <Desplegable left_initial={false} setStyle={setDesplegable}/>
            
            <MessageList messages={messages} />
            <InputMessage sendMessage={sendMessage} />
        </div>
    )
}
