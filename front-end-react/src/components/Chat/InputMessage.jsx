import '../../../../../front-end-shared/css/Chat/input-message.css';
import { useState } from 'react'

export const InputMessage = ({ sendMessage }) => {
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputValue.trim() !== '') {
      sendMessage(inputValue);
      setInputValue('');
    }
  };

  return (
    <form className='input-message-container' onSubmit={handleSubmit}>
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        placeholder="escribe aquí..."
      />
      <button type="submit">Enviar</button>
    </form>
  );
}

