import React from 'react';

import { render, fireEvent } from '@testing-library/react';
import SignIn from '../../pages/SignIn';

const mockedHistoryPush = jest.fn();

jest.mock('react-router-dom', () => {
  return {
    useHistory: () => ({ push: mockedHistoryPush }),
    Link: ({ children }: { children: React.ReactNode }) => children,
  };
});

describe('SingIn Page', () => {
  it('should be able to sign in', () => {
    const { getByPlaceholderText } = render(<SignIn />);

    const emailField = getByPlaceholderText('E-mail');
    const paswwordField = getByPlaceholderText('Senha');
    const buttonElement = getByPlaceholderText('Entrar');

    fireEvent.change(emailField, {
      target: { value: 'vinicius@gmail.com' },
    });
    fireEvent.change(paswwordField, {
      target: { value: '123456' },
    });

    fireEvent.click(buttonElement);

    expect(mockedHistoryPush).toHaveBeenCalledWith('/dashboard');
  });
});
