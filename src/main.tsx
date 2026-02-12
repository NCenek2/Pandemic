import "bootstrap-icons/font/bootstrap-icons.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import App from "./App.tsx";
import { SetupProvider } from "./Contexts/SetupContext.tsx";
import Layout from "./Features/Layout.tsx";
import { LOST_GAME_URL, WON_GAME_URL } from "./Game/Constants/Constants.ts";
import "./index.css";
import EndGame from "./Pages/EndGame.tsx";
import GameWon from "./Pages/GameWon.tsx";
import StartupPage from "./Pages/StartupPage.tsx";

createRoot(document.getElementById("root")!).render(
  <SetupProvider>
    <BrowserRouter basename="/Pandemic">
      <Routes>
        <Route path="/" Component={StartupPage} />
        <Route path="/game" element={<Layout />}>
          <Route index Component={App} />
        </Route>
        <Route path={LOST_GAME_URL} element={<EndGame />} />
        <Route path={WON_GAME_URL} element={<GameWon />} />
      </Routes>
    </BrowserRouter>
  </SetupProvider>,
);

// Index means default child of a parent route
