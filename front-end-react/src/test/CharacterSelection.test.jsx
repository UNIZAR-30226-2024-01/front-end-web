//PASA

/*
 * Conjunto de test para el componente CharacterSelection:
 * COMPRUEBA:
 *        - que se renderiza
 *        - no llama a onCharacterSelected cuando se selecciona un personaje ya escogido
 */


import React from "react";
import { render, fireEvent } from "@testing-library/react";
import { CharacterSelection } from "../components/Game/CharacterSelection";
import { SocketContext } from "../context/socket";
import { GameInfoContext } from "../context/gameinfo";
import '@testing-library/jest-dom';

// Mock SocketContext
const mockSocketContextValue = {
  socket: {
    emit: jest.fn(),
  },
};

const mockGameInfoContextValue = {
  usernames: ["", "", ""], 
  characters: ["Character 1", "Character 2", "Character 3"], 
};

const mockOnCharacterSelected = jest.fn();

describe("CharacterSelection", () => {
  test("CharacterSelection renders correctly", () => {
    const { getByText } = render(
      <CharacterSelection onCharacterSelected={mockOnCharacterSelected} />,
      {
        wrapper: ({ children }) => (
          <SocketContext.Provider value={mockSocketContextValue}>
            <GameInfoContext.Provider value={mockGameInfoContextValue}>
              {children}
            </GameInfoContext.Provider>
          </SocketContext.Provider>
        ),
      }
    );

    expect(getByText("Character 1")).toBeInTheDocument();
    expect(getByText("Character 2")).toBeInTheDocument();
    expect(getByText("Character 3")).toBeInTheDocument();
  });

  test("doesn't call onCharacterSelected when selecting an already taken character", () => {
    const { getByText } = render(
      <CharacterSelection onCharacterSelected={mockOnCharacterSelected} />,
      {
        wrapper: ({ children }) => (
          <SocketContext.Provider value={mockSocketContextValue}>
            <GameInfoContext.Provider
              value={{
                usernames: ["Player 1", "", ""], // Se ha tomado el primer personaje
                characters: ["Character 1", "Character 2", "Character 3"],
              }}
            >
              {children}
            </GameInfoContext.Provider>
          </SocketContext.Provider>
        ),
      }
    );
  
    fireEvent.click(getByText("Character 1")); // Hacer clic en un personaje ya tomado
  
    expect(mockOnCharacterSelected).not.toHaveBeenCalled();
  });
  
  test("does not select character when it is already taken", () => {
    const onCharacterSelected = jest.fn();
    const { getByText } = render(
      <CharacterSelection onCharacterSelected={onCharacterSelected} />,
      {
        wrapper: ({ children }) => (
          <SocketContext.Provider value={mockSocketContextValue}>
            <GameInfoContext.Provider
              value={{
                ...mockGameInfoContextValue,
                usernames: ["Player 1", "", ""], // El primer personaje está tomado
              }}
            >
              {children}
            </GameInfoContext.Provider>
          </SocketContext.Provider>
        ),
      }
    );

    const characterA = getByText("Character 1");
    fireEvent.click(characterA);

    expect(onCharacterSelected).not.toHaveBeenCalled();
  });


  
});
