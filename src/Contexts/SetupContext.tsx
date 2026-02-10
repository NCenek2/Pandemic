import { createContext, useState, type ReactElement } from "react";
import { Difficulty } from "../Enums/Difficulty";
import { PlayerCount } from "../Enums/PlayerCount";
import type { ChildrenType } from "../Types/ChildrenType";

export type SetupContext = {
  playerCount: PlayerCount;
  difficulty: Difficulty;
};

const initState: SetupContext = {
  playerCount: PlayerCount.One,
  difficulty: Difficulty.Easy,
};

const useSetupContext = (initialState: SetupContext) => {
  const [difficulty, setDifficulty] = useState(initialState.difficulty);
  const [playerCount, setPlayerCount] = useState(initialState.playerCount);

  return {
    difficulty,
    setDifficulty,
    playerCount,
    setPlayerCount,
  };
};

export type UseSetupContextType = ReturnType<typeof useSetupContext>;

const initContextState: UseSetupContextType = {
  difficulty: initState.difficulty,
  playerCount: initState.playerCount,
  setDifficulty: () => {},
  setPlayerCount: () => {},
};

export const SetupContext =
  createContext<UseSetupContextType>(initContextState);

export const SetupProvider = ({ children }: ChildrenType): ReactElement => {
  return (
    <SetupContext.Provider value={useSetupContext(initState)}>
      {children}
    </SetupContext.Provider>
  );
};
