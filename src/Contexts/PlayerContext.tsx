import { createContext, useState, type ReactElement } from "react";
import { Color } from "../Enums/Color";
import { City } from "../Game/City";
import { Player } from "../Game/Player";
import type { IPlayerCard } from "../Intefaces/IPlayerCard";
import type { ChildrenType } from "../Types/ChildrenType";
import type { MapperItemType } from "../Types/MapperType";

export type PlayerState = {};

const usePlayerContext = () => {
  const [selectedPlayer, setSelectedPlayer] = useState<Player | null>(null);
  const [selectedCity, setSelectedCity] = useState<City | null>(null);
  const [selectedCard, setSelectedCard] = useState<IPlayerCard | null>(null);
  const [selectedColor, setSelectedColor] = useState<Color | null>(null);
  const [selectedAction, setSelectedAction] = useState<MapperItemType | null>(
    null,
  );

  const [previousAction, setPreviousAction] = useState<MapperItemType | null>(
    null,
  );
  const [uniqueData, setUniqueData] = useState<any>(null);

  const resetPlayerData = () => {
    setPreviousAction(null);
    setSelectedCard(null);
    setSelectedAction(null);
    setUniqueData(null);
  };

  return {
    resetPlayerData,
    previousAction,
    selectedAction,
    selectedPlayer,
    selectedCity,
    selectedCard,
    selectedColor,
    setPreviousAction,
    setSelectedAction,
    setSelectedPlayer,
    setSelectedCity,
    setSelectedColor,
    setSelectedCard,
    uniqueData,
    setUniqueData,
  };
};

export type UsePlayerContextType = ReturnType<typeof usePlayerContext>;

const initContextState: UsePlayerContextType = {
  resetPlayerData: () => {},
  previousAction: null,
  setPreviousAction: () => {},
  selectedAction: null,
  setSelectedAction: () => {},
  selectedPlayer: null,
  selectedCity: null,
  selectedCard: null,
  selectedColor: null,
  setSelectedPlayer: () => {},
  setSelectedCity: () => {},
  setSelectedColor: () => {},
  setSelectedCard: () => {},
  uniqueData: null,
  setUniqueData: () => {},
};

export const PlayerContext =
  createContext<UsePlayerContextType>(initContextState);

export const PlayerProvider = ({ children }: ChildrenType): ReactElement => {
  return (
    <PlayerContext.Provider value={usePlayerContext()}>
      {children}
    </PlayerContext.Provider>
  );
};
