import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from './App';
import { ThemeProvider } from 'react-bootstrap';
//parametrização do REDUXJ

import { Provider } from 'react-redux';
import { store } from './redux/store';


const container = document.getElementById('root');
const root = createRoot(container!);
root.render(
  <BrowserRouter>
    <ThemeProvider breakpoints={['xxxl', 'xxl', 'xl', 'lg', 'md', 'sm', 'xs', 'xxs']}>
      <Provider store={store}>
        <App />
      </Provider>
    </ThemeProvider>
  </BrowserRouter>);



