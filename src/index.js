import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BalancesContextProvider } from './context/BalancesContext';
import { AuthContextProvider } from './context/AuthContext';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <BalancesContextProvider>
        <App />
      </BalancesContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);


