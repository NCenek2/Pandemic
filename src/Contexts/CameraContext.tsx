import { createContext, useState, type ReactElement } from "react";
import { DEFAULT_ZOOM } from "../Game/Constants/Constants";
import type { ChildrenType } from "../Types/ChildrenType";

type CameraPosition = {
  coordinates: [number, number];
  zoom: number;
};

export type CameraState = {
  position: CameraPosition;
};

const initState: CameraState = {
  position: {
    coordinates: [-84.39, 33.75],
    zoom: DEFAULT_ZOOM,
  },
};

const useCameraContext = (initialState: CameraState) => {
  const [position, setPosition] = useState(initialState.position);
  return {
    position,
    setPosition,
  };
};

export type UseCameraContextType = ReturnType<typeof useCameraContext>;

const initContextState: UseCameraContextType = {
  position: initState.position,
  setPosition: () => {},
};

export const CameraContext =
  createContext<UseCameraContextType>(initContextState);

export const CameraProvider = ({ children }: ChildrenType): ReactElement => {
  return (
    <CameraContext.Provider value={useCameraContext(initState)}>
      {children}
    </CameraContext.Provider>
  );
};
