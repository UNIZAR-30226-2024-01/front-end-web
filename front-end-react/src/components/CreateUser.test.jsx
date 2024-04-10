/* Este archivo de prueba realiza pruebas unitarias para el componente 
 * CreateUser de una aplicación React. Utiliza @testing-library/react y 
 * react-router-dom para renderizar el componente dentro de un MemoryRouter 
 * simulado. Se simulan eventos de cambio de valor en los campos de entrada
 * de nombre de usuario y contraseña, y se verifica que los elementos 
 * esperados estén presentes en el DOM. Luego, se simula un clic en el botón 
 * "Crear cuenta" y se espera que se ejecute una función asíncrona que
 * comprueba si el nombre de usuario se ha almacenado correctamente en 
 * sessionStorage después del clic. El bloque eslint-disable/no-undef se 
 * utiliza para deshabilitar temporalmente la regla eslint no-undef, 
 * probablemente debido al uso de variables no definidas en el archivo de prueba.
 */
import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, fireEvent, waitFor } from '@testing-library/react';
import CreateUser from './CreateUser';
import fetchMock from 'jest-fetch-mock';
import '@testing-library/jest-dom';


fetchMock.enableMocks();

/* eslint-disable no-undef */

test('renders CreateUser component', async () => {
  fetchMock.mockResponseOnce(JSON.stringify({}), { status: 200 });

  const { getByText, getByPlaceholderText } = render(
    <MemoryRouter>
      <CreateUser />
    </MemoryRouter>
  );

  expect(getByText('Crear una cuenta')).toBeInTheDocument();

  expect(getByText('Nombre de usuario')).toBeInTheDocument();
  fireEvent.change(getByPlaceholderText('username'), { target: { value: 'testuser' } });
  expect(getByText('Contraseña')).toBeInTheDocument();
  fireEvent.change(getByPlaceholderText('password'), { target: { value: 'testpassword' } });
  expect(getByText('Repite la contraseña')).toBeInTheDocument();
  fireEvent.change(getByPlaceholderText('repeat password'), { target: { value: 'testpassword' } });

  fireEvent.click(getByText('Crear cuenta'));

  await waitFor(() => {
    expect(sessionStorage.getItem('username')).toBe('testuser');
  });
});
/* eslint-enable no-undef */

