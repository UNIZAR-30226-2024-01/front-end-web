import "../../../../../../front-end-shared/css/Game/Chat/message.css";

export function Message({ text, username, time }) {
  return (
    <li className="message">
      <section className="userAndTimeStamp">
        <p className="message-user">
          <strong>{username}</strong> como <em>MrSoper:</em>
        </p>
        <p className="chat-timeStamp"> {time} </p>
      </section>
      {text.startsWith("https://media.tenor.com") ? (
        <img height="150px" src={text} alt="gif" className="gif" />
      ) : (
        <p className="message-text">{text}</p>
      )}
    </li>
  );
}
