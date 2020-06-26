import React from 'react';

import { render, fireEvent, wait } from '@testing-library/react';
import { renderHook, act } from '@testing-library/react-hooks';
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

  it('should restore data from storage when auth inits', async () => {
    jest.spyOn(Storage.prototype, 'getItem').mockImplementation(key => {
      switch (key) {
        case '@goBarber:token':
          return 'token-123';
        case '@goBarber:user':
          return JSON.stringify({
            id: '123',
            name: 'Vincius',
            email: 'vinicius@gmail.com',
            avatar: null,
          });
        default:
          return null;
      }
    });

    const { result } = renderHook(() => useAuth(), {
      wrapper: AuthProvider,
    });

    expect(result.current.user.email).toEqual('vinicius@gmail.com');
  });

  it('should be able to signout', async () => {
    jest.spyOn(Storage.prototype, 'getItem').mockImplementation(key => {
      switch (key) {
        case '@goBarber:token':
          return 'token-123';
        case '@goBarber:user':
          return JSON.stringify({
            id: '123',
            name: 'Vincius',
            email: 'vinicius@gmail.com',
            avatar: null,
          });
        default:
          return null;
      }
    });

    const removeItemSpy = jest.spyOn(Storage.prototype, 'removeItem');

    const { result } = renderHook(() => useAuth(), {
      wrapper: AuthProvider,
    });

    act(() => {
      result.current.signOut();
    });

    // expect(removeItemSpy).toHaveBeenCalledTimes(2);
    expect(result.current.user).toBeUndefined();
  });

  it('should be able to update userData', async () => {
    const setItemSpy = jest.spyOn(Storage.prototype, 'setItem');

    const { result } = renderHook(() => useAuth(), {
      wrapper: AuthProvider,
    });

    const user = {
      id: '123',
      name: 'Vincius',
      email: 'vinicius@gmail.com',
      avatar: null,
      avatar_url: 'img.png',
    };

    act(() => {
      result.current.updateAvatar(user);
    });

    expect(setItemSpy).toHaveBeenCalledWith(
      '@goBarber:user',
      JSON.stringify(user),
    );

    expect(result.current.user).toEqual(user);
  });
});
