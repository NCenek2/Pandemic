import { Outlet } from "react-router";
import { AlertProvider } from "../Contexts/AlertContext";
import { CameraProvider } from "../Contexts/CameraContext";
import { GameProvider } from "../Contexts/GameContext";
import { GameFlowProvider } from "../Contexts/GameFlowContext";
import { PlayerProvider } from "../Contexts/PlayerContext";
import { TurnProvider } from "../Contexts/TurnContext";
import Alert from "./Alert";

const Layout = () => {
  return (
    <AlertProvider>
      <CameraProvider>
        <GameProvider>
          <PlayerProvider>
            <GameFlowProvider>
              <TurnProvider>
                <Alert />
                <Outlet />
              </TurnProvider>
            </GameFlowProvider>
          </PlayerProvider>
        </GameProvider>
      </CameraProvider>
    </AlertProvider>
  );
};

export default Layout;
