import React from 'react';
import { render } from '@testing-library/react';
import { Tablero } from '../components/Game/Tablero/Tablero';
import { CeldasProvider } from '../context/Celdas';

test('renders Tablero component with correct number of cells and texts', () => {
  const { getAllByTestId } = render(
    <CeldasProvider>
      <Tablero />
    </CeldasProvider>
  );

  const cells = getAllByTestId(/^celda-/); 

  expect(cells.length).toBe(24 * 24);
});
