//PASA

/*
 * Conjunto de test para el componente Dado:
 * COMPRUEBA:
 *        - que se renderiza
 *        - que se llama a finRoll cuando se completa el lanzamiento de los dados
 */

import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react'; 
import '@testing-library/jest-dom';

import { Dados } from '../components/Game/Turno/Dados';


describe('Dados Component', () => {
  test('Dados renders correctly', () => {
    const { getByText } = render(<Dados buttonText="Roll Dice" />);
    expect(getByText('Roll Dice')).toBeInTheDocument();
  });

  test('calls finRoll when dice roll is finished', async () => {
    const finRollMock = jest.fn();
    const { getByText } = render(<Dados buttonText="Roll Dice" finRoll={finRollMock} />);

    fireEvent.click(getByText('Roll Dice'));

    // Esperamos a que se complete el lanzamiento de los dados y se realice la llamada a finRoll
    await waitFor(() => {
      expect(finRollMock).toHaveBeenCalled();
    }, { timeout: 1500 }); // Establecemos un tiempo límite para esperar a que se complete la animación
  });
});

