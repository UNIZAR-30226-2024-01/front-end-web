//PASA

/*
 * Conjunto de test para el componente Turno:
 * COMPRUEBA:
 *        - que se renderiza y que los valores de turnoOwner y parteTurno son correctos
 */
import React from "react";
import { render, fireEvent } from "@testing-library/react";
import { TurnoProvider, TurnoContext } from "../context/turno";
import { Turno } from "../components/Game/Turno/Turno.jsx";
import '@testing-library/jest-dom';

describe("TurnoContext", () => {
  test("Turno renders correctly and provide turnoOwner and parteTurno values", () => {
    const TestComponent = () => {
      const { turnoOwner, parteTurno, setParteTurno } = React.useContext(
        TurnoContext
      );

      return (
        <div>
          <div data-testid="turnoOwner">{turnoOwner}</div>
          <div data-testid="parteTurno">{parteTurno}</div>
          <button onClick={() => setParteTurno("es-tu-turno")}>
            Set parteTurno to 'es-tu-turno'
          </button>
        </div>
      );
    };

    const { getByTestId, getByText } = render(
      <TurnoProvider>
        <TestComponent />
      </TurnoProvider>
    );

    expect(getByTestId("turnoOwner").textContent).toBe("mr SOPER");
    expect(getByTestId("parteTurno").textContent).toBe("espera-resto");

    fireEvent.click(getByText("Set parteTurno to 'es-tu-turno'"));

    expect(getByTestId("parteTurno").textContent).toBe("es-tu-turno");
  });
});
