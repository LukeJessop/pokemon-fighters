import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "./App.css";
import "./Fighting/fighting.css";
import "./Gym/gym.css";
import "./Hospital/hospital.css";
import "./Pokemon/pokemon.css";
import "./Auth/auth.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import {BrowserRouter, HashRouter} from 'react-router-dom';
const Router = process.env.NODE_ENV === 'development' ? HashRouter : BrowserRouter


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Router>
      <App />
    </Router>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
