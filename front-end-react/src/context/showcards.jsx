import { createContext, useState /* , useEffect, useContext */ } from 'react';

export const ShowCardsContext = createContext();

export function ShowCardsProvider({ children }) {
  // selectCardsToShow: username_showed, username_shower, cards, cards_to_show
  const [hasToShow, setHasToShow] = useState(false);

  const [text, setText] = useState('');
  const [subtext, setSubtext] = useState('');
  const [isCardElection, setIsCardElection] = useState(false);
  const [selectCardsToShow, setSelectCardsToShow] = useState([]);
  // const [blockCards, setBlockCards] = useState([]);

  const showStatic = (text, subtext, cards) => {
    setText(text);
    setSubtext(subtext);
    if (!cards) cards = [];
    console.log('to add ', cards);
    setSelectCardsToShow(cards);

    setIsCardElection(false);
    setHasToShow(true);
  };

  // Se muestra cuando se realiza una pregunta a un jugador
  const showQuestion = (username_asking, cards) => {
    const text = `${username_asking} ha preguntado:`;
    const subText = `¿ha sido ${cards[0]} con ${cards[1]} en ${cards[2]}?`;

    showStatic(text, subText, cards);
  };

  // Se muestra cuando se elige la carta a mostrar
  const showCardShowed = (username_showed, username_shower, card) => {
    const text = `${username_shower} ha enseñado a ${username_showed}:`;
    const subText = '';

    showStatic(text, subText, card);
  };

  const showCardElection = (text, cards) => {
    // setTextToShow(text);
    // setIsCardElection(true);
    // setSelectCardsToShow(cards);
    // setHasToShow(true);
  };

  return (
    <ShowCardsContext.Provider
      value={{
        showQuestion,
        showCardShowed,
        showCardElection,

        hasToShow,
        setHasToShow,

        text,
        setText,
        subtext,
        setSubtext,

        isCardElection,
        setIsCardElection,

        selectCardsToShow,
        setSelectCardsToShow,
        // blockCards,
        // setBlockCards,
      }}
    >
      {children}
    </ShowCardsContext.Provider>
  );
}
