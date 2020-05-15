import React, { createContext, useCallback } from 'react';
import api from '../services/api';

interface SingInCredentials {
  email: string;
  password: string;
}

interface AuthContextData {
  name: string;
  signIn(credencials: SingInCredentials): Promise<void>;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

const AuthProvider: React.FC = ({ children }) => {
  const signIn = useCallback(async ({ email, password }) => {
    const reponse = await api.post('sessions', {
      email,
      password,
    });
    console.log(reponse.data);
  }, []);

  return (
    <AuthContext.Provider value={{ name: 'vinicius', signIn }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
