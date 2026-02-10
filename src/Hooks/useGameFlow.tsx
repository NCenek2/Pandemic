import { useContext } from "react";
import {
  GameFlowContext,
  type UseGameFlowContextType,
} from "../Contexts/GameFlowContext";

export const useGameFlow = () => {
  return useContext<UseGameFlowContextType>(GameFlowContext);
};

export default useGameFlow;
