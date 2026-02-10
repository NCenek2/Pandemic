import { useContext } from "react";
import {
  AlertContext,
  type UseAlertContextType,
} from "../Contexts/AlertContext";

export const useAlert = () => {
  return useContext<UseAlertContextType>(AlertContext);
};
