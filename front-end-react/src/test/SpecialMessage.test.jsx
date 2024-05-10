import React from 'react';
import { render } from '@testing-library/react';
import { SpecialMessage } from '../components/Game/Chat/SpecialMessage';

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
  