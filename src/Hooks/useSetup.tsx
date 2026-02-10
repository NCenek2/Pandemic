import { useContext } from "react";
import {
  SetupContext,
  type UseSetupContextType,
} from "../Contexts/SetupContext";

export const useSetup = () => {
  return useContext<UseSetupContextType>(SetupContext);
};

export default useSetup;
