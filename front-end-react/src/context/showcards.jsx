import { createContext, useState /* , useEffect, useContext */ } from 'react';

export const ShowCardsContext = createContext();

export function ShowCardsProvider({ children }) {
  // selectCardsToShow: username_showed, username_shower, cards, cards_to_show
  const [hasToShow, setHasToShow] = useState(false);

  const [text, setText] = useState('');
  const [subtext, setSubtext] = useState('');
  const [isCardElection, setIsCardElection] = useState(false);
  const [selectCardsToShow, setSelectCardsToShow] = useState([]);
  const [blockCards, setBlockCards] = useState([]);

  const [onClickedCard, setOnClickedCard] = useState(() => {});

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
    const text = `${username_asking.toUpperCase()} ha preguntado:`;
    const subText = `¿ha sido ${cards[0]} con ${cards[1]} en ${cards[2]}?`;

    showStatic(text, subText, cards);
  };

  // Se muestra cuando se elige la carta a mostrar
  const showCardShowed = (username_showed, username_shower, card, cards_asked) => {
    const text =
      card[0] != '' ? `${username_shower} ha enseñado a ${username_showed}:` : `Nadie ha enseñado a ${username_showed}`;

    const subText = `¿ha sido ${cards_asked[0]} con ${cards_asked[1]} en ${cards_asked[2]}?`;
    showStatic(text, subText, card);
  };

  // my cards: las cartas de mi mano
  // cards_to_choose cartas por las que se pregunta
  const showCardElection = (username_asking, my_cards, cards_asked, onClickedCard) => {
    const text = `Elige una carta para mostrar a ${username_asking}:`;
    const subText = `¿ha sido ${cards_asked[0]} con ${cards_asked[1]} en ${cards_asked[2]}?`;
    const blocked_cards = my_cards.filter((card) => !cards_asked.includes(card));
    setText(text);
    setSubtext(subText);

    setBlockCards(blocked_cards);

    setOnClickedCard(() => onClickedCard);

    // Señalizar de alguna manera las cartas bloqueadas (black and white, opacity, etc.)

    setSelectCardsToShow(my_cards);
    setIsCardElection(true);
    setHasToShow(true);
  };

  return (
    <ShowCardsContext.Provider //🎃 revisar cuales sobran
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

        blockCards,
        setBlockCards,

        onClickedCard,
        setOnClickedCard,
      }}
    >
      {children}
    </ShowCardsContext.Provider>
  );
}
