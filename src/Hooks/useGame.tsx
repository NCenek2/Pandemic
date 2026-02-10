import { useContext } from "react";
import { GameContext, type UseGameContextType } from "../Contexts/GameContext";

export const useGame = () => {
  return useContext<UseGameContextType>(GameContext);
};

export default useGame;
