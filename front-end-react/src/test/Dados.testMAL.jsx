/*import React from 'react';
import { render, fireEvent, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Dados } from '../components/Game/Turno/Dados';
import { TurnoContext } from '../context/turno';

jest.mock('react-dice-complete', () => {
  return jest.fn().mockImplementation(({ rollDone }) => {
    rollDone(12, [6, 6]);
    return <div>Dice</div>;
  });
});

describe('Dados Component', () => {
  const setDadosMock = jest.fn();
  const setParteTurnoMock = jest.fn();

  const turnoContextMock = {
    setDados: setDadosMock,
    setParteTurno: setParteTurnoMock,
  };

  test('renders correctly', () => {
    const { getByText } = render(
      <TurnoContext.Provider value={turnoContextMock}>
        <Dados buttonText="Roll Dice" />
      </TurnoContext.Provider>
    );
    expect(getByText('Roll Dice')).toBeInTheDocument();
  });

  it('triggers dice roll on button click', () => {
    const { getByText } = render(
      <TurnoContext.Provider value={turnoContextMock}>
        <Dados buttonText="Roll Dice" />
      </TurnoContext.Provider>
    );

    act(() => {
      fireEvent.click(getByText('Roll Dice'));
    });

    expect(setDadosMock).toHaveBeenCalledWith(12);
    expect(setParteTurnoMock).toHaveBeenCalledWith('elegir-casilla');
  });
});
*/
import { render, fireEvent, screen } from '@testing-library/react';
import { Dados } from '../components/Game/Turno/Dados.jsx';
import { TurnoContext } from '../context/turno.jsx';
import React from 'react';
import '@testing-library/jest-dom';

describe('Dados', () => {
  const mockSetDados = jest.fn();
  const mockSetParteTurno = jest.fn();

  beforeEach(() => {
    render(
      <TurnoContext.Provider value={{ setDados: mockSetDados, setParteTurno: mockSetParteTurno }}>
        <Dados buttonText="Roll" />
      </TurnoContext.Provider>
    );
  });

  test('renders Dados component', () => {
    expect(screen.getByRole('button', { name: /Roll/i })).toBeInTheDocument();
  });

  test('button click triggers dice roll', () => {
    fireEvent.click(screen.getByRole('button', { name: /Roll/i }));
    expect(mockSetDados).toHaveBeenCalled();
  });
});
