import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import './styles/index.css'
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import startI18n from './common/i18n'

const container = document.getElementById("root");
const root = createRoot(container);

startI18n()

root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);

serviceWorker.unregister();
