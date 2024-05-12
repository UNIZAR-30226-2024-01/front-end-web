import React from 'react';
import { render } from '@testing-library/react';
import { SpecialMessage } from '../components/Game/Chat/SpecialMessage';
import '@testing-library/jest-dom';

describe('SpecialMessage', () => {
  test('renders SpecialMessage component with correct content', () => {
      const props = {
        username: 'TestUser'
      };
    
      const { getByText } = render(<SpecialMessage props={props} />);
    
      const usernameStrongElement = getByText('TestUser').closest('strong');
      expect(usernameStrongElement).toBeTruthy();
    
      const preguntóElement = getByText(/preguntó:/i);
      expect(preguntóElement).toBeTruthy();
  });

  test('renders SpecialMessage component with specific who, what, and where', () => {
    const props = {
      username: 'TestUser',
    };
    const { getByText } = render(<SpecialMessage props={props} />);

    // Verificar que el nombre de usuario esté presente en el componente
    const usernameElement = getByText('TestUser');
    expect(usernameElement).toBeInTheDocument();

    // Verificar que las partes específicas del mensaje estén presentes en el componente
    expect(getByText(/preguntó:/i)).toBeInTheDocument();
    expect(getByText(/¿ha sido/i)).toBeInTheDocument();
    expect(getByText(/MrSoper/i)).toBeInTheDocument();
    expect(getByText(/con un/i)).toBeInTheDocument();
    expect(getByText(/cable de red/i)).toBeInTheDocument();
    expect(getByText(/en la/i)).toBeInTheDocument();
    expect(getByText(/cafeteria?/i)).toBeInTheDocument();
  });
});