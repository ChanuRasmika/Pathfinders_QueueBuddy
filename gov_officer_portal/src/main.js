import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import './index.css';
import GlobalStyle from './globalStyles.js';

import GovernmentLogin from "./Components/government-login.jsx";
import DasboardHome from "./Components/dashboard.jsx";


createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <GlobalStyle />
      <GovernmentLogin />
      <DasboardHome />
    </BrowserRouter>
  </StrictMode>
);
