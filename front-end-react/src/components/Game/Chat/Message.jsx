import "../../../../../../front-end-shared/css/Game/Chat/message.css";

export function Message({ text, username }) {
  return (
    <li className="message">
      <p className="message-user">
        <strong>{username}</strong> as MrSoper:
      </p>
      {text.startsWith("https://media.tenor.com") ? (
        <img height="150px" src={text} alt="gif" className="gif" />
      ) : (
        <p className="message-text">{text}</p>
      )}
    </li>
  );
}
