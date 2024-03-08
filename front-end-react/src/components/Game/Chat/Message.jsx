import '../../../../../../front-end-shared/css/Chat/message.css';


export function Message({ text, username }) {
    console.log('text',text, '   username', username);
    return (
        <li className='message'>
            <p className='message-user'><strong>{username}</strong> as MrSoper:</p>
            <p className='message-text'>{text}</p>
        </li>
    );
}