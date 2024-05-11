import { render, screen } from '@testing-library/react';
import { Carrusel } from '../components/Game/Turno/Carrusel.jsx';
import React from 'react';
import '@testing-library/jest-dom';

describe('Carrusel', () => {
  test('renders Carrusel component', () => {
    const mockOptions = ['option1', 'option2', 'option3'];
    const mockOnChange = jest.fn();
    const mockType = 'testType';

    render(<Carrusel options={mockOptions} onChange={mockOnChange} type={mockType} />);

    const elements = screen.getAllByText(mockOptions[0].toUpperCase());
    expect(elements.length).toBe(2);
  });
});