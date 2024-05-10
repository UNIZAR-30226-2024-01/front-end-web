//PASA

/*
 * Conjunto de test para el componente Temporizador:
 * COMPRUEBA:
 *        - que se renderiza
 *        - que se detiene en 0
 */

import { render, screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Temporizador } from '../components/Game/Turno/Temporizador';
import React from 'react';
import '@testing-library/jest-dom';


describe('Temporizador', () => {
  test('Temporizador renders correctly', () => {
    const tiempoInicial = 10;
    render(<Temporizador tiempo={tiempoInicial} />);
    
    expect(screen.getByText(tiempoInicial.toString())).toBeInTheDocument();
  });

  
  test('should stop at 0', async () => {
    render(<Temporizador tiempo={3} />);
    
    // Espera 4 segundos y verifica que el tiempo haya llegado a 0
    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 4000));
    });
    expect(screen.getByText('0')).toBeInTheDocument();
    
    // Espera 1 segundo más y verifica que el tiempo se mantiene a 0
    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 1000));
    });
    expect(screen.getByText('0')).toBeInTheDocument();
  }, 10000); //Para que no se ejecute infinitamente

});
