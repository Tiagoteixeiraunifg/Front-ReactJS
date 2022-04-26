import React from 'react';
import reportWebVitals from './reportWebVitals';
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from './App';

ReactDOM.render(
  <BrowserRouter>
      <App />
  </BrowserRouter>,
  document.getElementById("root")
);

reportWebVitals();
