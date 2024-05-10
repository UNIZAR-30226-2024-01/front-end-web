import '../../../../../../front-end-shared/css/Game/Chat/input-message.css';
import { useState } from 'react';
import GifPicker from 'gif-picker-react';
import React from 'react';
export const InputMessage = ({ sendMessage }) => {
  const [inputValue, setInputValue] = useState('');
  const [showGifPicker, setShowGifPicker] = useState(false);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputValue.trim() !== '') {
      sendMessage(inputValue);
      setInputValue('');
      // scroll to bottom of chat
    }
  };

  const gifClick = (url) => {
    sendMessage(url);
    setShowGifPicker(false);
  };

  return (
    <>
      <form className="input-message-container" onSubmit={handleSubmit}>
        {showGifPicker ? (
          <div className="gif-container">
            <GifPicker
              height="350px"
              width="398px"
              tenorApiKey={'AIzaSyBd-ORku2q-cF9g-rO5UUukLFRMUCAAmCs'}
              onGifClick={(i) => gifClick(i.url)}
            />
            <button className="button-chat close-gif " type="button" onClick={() => setShowGifPicker(false)}>
              Cerrar
            </button>
          </div>
        ) : (
          <>
            <button className="button-chat open-gif" type="button" onClick={() => setShowGifPicker(true)}>
              GIFs
            </button>
            <input
              className="input-message"
              type="text"
              value={inputValue}
              onChange={handleInputChange}
              placeholder="escribe aquí..."
            />
            <button className="button-chat" type="submit">
              Enviar
            </button>
          </>
        )}
      </form>
    </>
  );
};

export function Emoji() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="icon icon-tabler icons-tabler-outline icon-tabler-mood-smile"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" />
      <path d="M9 10l.01 0" />
      <path d="M15 10l.01 0" />
      <path d="M9.5 15a3.5 3.5 0 0 0 5 0" />
    </svg>
  );
}
