import { useContext } from "react";
import {
  PlayerContext,
  type UsePlayerContextType,
} from "../Contexts/PlayerContext";

export const usePlayer = () => {
  return useContext<UsePlayerContextType>(PlayerContext);
};

export default usePlayer;
