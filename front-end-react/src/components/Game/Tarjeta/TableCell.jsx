import { useState, useEffect } from 'react';
import React from 'react';
export const TableCell = ({ idx, state, setEstado }) => {
  // console.log('idx:', idx, 'state:', state);
  const texts = ['', '❌', '✔', '❔'];
  const colors = ['#ffffff', '#995555', '#559955', '#555599'];

  const [text, setText] = useState(texts[state]);

  useEffect(() => {
    setText(texts[state]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state]);

  const handleClick = () => {
    setEstado(idx);
  };

  const style = {
    backgroundColor: colors[texts.indexOf(text)],
  };

  return (
    <td onClick={handleClick} style={style}>
      <p className={style.paragraph}>{text}</p>
    </td>
  );
};
