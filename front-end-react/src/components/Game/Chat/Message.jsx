import '../../../../../../front-end-shared/css/Game/Chat/message.css';
import { GameInfoContext } from '../../../context/gameinfo';
import { useContext } from 'react';
import React from 'react';
export function Message({ text, username, time }) {
  const { characters, usernames } = useContext(GameInfoContext);
  const character = characters[usernames.indexOf(username)];

  return (
    <li className="message">
      <section className="userAndTimeStamp">
        <p className="message-user">
          <strong>{username}</strong>
          {character && <em> como {character}</em>}
        </p>
        <p className="chat-timeStamp"> {time} </p>
      </section>
      {text.startsWith('https://media.tenor.com') ? (
        <img height="150px" src={text} alt="gif" className="gif" />
      ) : (
        <p className="message-text">{text}</p>
      )}
    </li>
  );
}
