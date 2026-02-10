import { Outlet } from "react-router";
import { AlertProvider } from "../Contexts/AlertContext";
import { CameraProvider } from "../Contexts/CameraContext";
import { GameProvider } from "../Contexts/GameContext";
import { GameFlowProvider } from "../Contexts/GameFlowContext";
import { PlayerProvider } from "../Contexts/PlayerContext";
import Alert from "./Alert";

const Layout = () => {
  return (
    <AlertProvider>
      <CameraProvider>
        <GameProvider>
          <GameFlowProvider>
            <PlayerProvider>
              <Alert />
              <Outlet />
            </PlayerProvider>
          </GameFlowProvider>
        </GameProvider>
      </CameraProvider>
    </AlertProvider>
  );
};

export default Layout;
