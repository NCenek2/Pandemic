import { useContext } from "react";
import {
  CameraContext,
  type UseCameraContextType,
} from "../Contexts/CameraContext";

export const useCamera = () => {
  return useContext<UseCameraContextType>(CameraContext);
};

export default useCamera;
