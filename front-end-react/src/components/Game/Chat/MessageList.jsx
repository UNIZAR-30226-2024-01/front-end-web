import '../../../../../../front-end-shared/css/Game/Chat/message-list.css';
import { Message } from './Message';
import { SpecialMessage } from './SpecialMessage';

export const MessageList = ({ messages }) => {
  return (
    <ul className='message-list'>
      {messages.map((props, index) => (

        props.type == 'message' 
        ? <Message key={index} username={props.username} text={props.text}/>
        // : <li className="notification" key={index}>{props.text}</li>
        : <SpecialMessage key={index} props={props}/> 
      ))}
    </ul>
  );
};
