import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { persistor } from './store/store';
import store from './store/store'
import { ThemeProvider } from '@mui/material/styles';
import { createTheme } from '@mui/material';
import { DarkModeContextProvider } from "./context/darkModeContext";
import ProtectedRoute from './utils/ProtectedRoute';
import { CartProvider } from './CartContext';

const theme = createTheme();

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <BrowserRouter>
          <ThemeProvider theme={theme}>
            <DarkModeContextProvider>
              {/* <ProtectedRoute> */}
              <CartProvider>
                <App />
              </CartProvider>
              {/* </ProtectedRoute> */}
            </DarkModeContextProvider>
          </ThemeProvider>
        </BrowserRouter>
      </PersistGate>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
