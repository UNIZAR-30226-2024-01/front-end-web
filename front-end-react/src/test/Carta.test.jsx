import React from "react";
import { render } from "@testing-library/react";
import { Carta } from "../components/Game/Cartas/Carta";
import '@testing-library/jest-dom';
//import { GameItems } from "../components/Game/Cartas/GameItems";


describe("Carta component", () => {
  test("renders correctly with player name", () => {
    const playerName = "MrSoper";
    const { getByText } = render(<Carta player_name={playerName} />);
    const playerNameElement = getByText(playerName.toUpperCase());
    expect(playerNameElement).toBeInTheDocument();
  });

  test("renders correctly without player name", () => {
    const { queryByText } = render(<Carta player_name="back" />);
    const playerNameElement = queryByText("BACK");
    expect(playerNameElement).toBeNull();
  });

  test("renders correctly with hover effect", () => {
    const { container } = render(<Carta player_name="MrSoper" />);
    const cartaElement = container.firstChild;
    expect(cartaElement).toHaveClass("carta carta-hover");
  });

  test("renders correctly without hover effect", () => {
    const { container } = render(<Carta player_name="MrSoper" hover={false} />);
    const cartaElement = container.firstChild;
    expect(cartaElement).toHaveClass("carta");
  });
});
