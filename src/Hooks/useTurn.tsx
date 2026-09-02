import { useContext } from "react";
import { TurnContext, type UseTurnContextType } from "../Contexts/TurnContext";

export const useTurn = () => {
  return useContext<UseTurnContextType>(TurnContext);
};

export default useTurn;
