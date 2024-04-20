import { createContext, useState, useEffect, useContext } from 'react';
import { SocketContext } from './socket';

export const ShowCardsContext = createContext();

export function ShowCardsProvider({ children }) {
  // selectCardsToShow: username_showed, username_shower, cards, cards_to_show
  const { selectCardsToShow, setSelectCardsToShow } = useState([]);

  return (
    <ShowCardsContext.Provider
      value={{
        selectCardsToShow,
        setSelectCardsToShow,
      }}
    >
      {children}
    </ShowCardsContext.Provider>
  );
}
