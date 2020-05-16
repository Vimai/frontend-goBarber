import React from 'react';

import SingIn from './pages/SignIn';
import SingUn from './pages/SignUp';
import GlobalStyle from './styles/global';

import ToastContainer from './components/ToastContainer';
import { AuthProvider } from './hooks/AuthContext';

const App: React.FC = () => (
  <>
    <AuthProvider>
      <SingIn />
      {/* <SingUn /> */}
    </AuthProvider>
    <ToastContainer />
    <GlobalStyle />
  </>
);
export default App;
