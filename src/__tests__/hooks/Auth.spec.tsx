import React from 'react';

import { render, fireEvent, wait } from '@testing-library/react';
import { renderHook } from '@testing-library/react-hooks';
import MockAdapter from 'axios-mock-adapter';
import { useAuth, AuthProvider } from '../../hooks/auth';
import api from '../../services/api';

const apiMock = new MockAdapter(api);

describe('Auth Hook', () => {
  beforeEach(() => {});

  it('should be able to sign in', async () => {
    const apiResponse = {
      user: {
        id: '123',
        name: 'Vincius',
        email: 'vinicius@gmail.com',
        avatar: null,
      },
      token: 'token-123',
    };
    apiMock.onPost('sessions').reply(200, apiResponse);

    const setItemSpy = jest.spyOn(Storage.prototype, 'setItem');

    const { result, waitForNextUpdate } = renderHook(() => useAuth(), {
      wrapper: AuthProvider,
    });

    result.current.signIn({
      email: 'vinicius@gmail.com',
      password: '123456',
    });

    await waitForNextUpdate();

    expect(setItemSpy).toHaveBeenCalledWith(
      '@goBarber:token',
      apiResponse.token,
    );
    expect(setItemSpy).toHaveBeenCalledWith(
      '@goBarber:user',
      JSON.stringify(apiResponse.user),
    );
    expect(result.current.user.email).toEqual('vinicius@gmail.com');
  });
});
