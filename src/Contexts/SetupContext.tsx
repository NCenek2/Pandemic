import { createContext, useState, type ReactElement } from "react";
import { Difficulty } from "../Enums/Difficulty";
import { PlayerCount } from "../Enums/PlayerCount";
import { Game } from "../Game/Game";
import type { ChildrenType } from "../Types/ChildrenType";

export type SetupContext = {
  playerCount: PlayerCount;
  difficulty: Difficulty;
};

const initState: SetupContext = {
  playerCount: PlayerCount.Two,
  difficulty: Difficulty.Easy,
};

const useSetupContext = (initialState: SetupContext) => {
  const [difficulty, setDifficulty] = useState(initialState.difficulty);
  const [playerCount, setPlayerCount] = useState(initialState.playerCount);

  const updateDifficulty = (difficulty: Difficulty) => {
    Game.instance.setDifficulty(difficulty);
    setDifficulty(difficulty);
  };

  const updatePlayerCount = (playerCount: PlayerCount) => {
    Game.instance.setPlayerCount(playerCount);
    setPlayerCount(playerCount);
  };

  return {
    difficulty,
    updateDifficulty,
    playerCount,
    updatePlayerCount,
  };
};

export type UseSetupContextType = ReturnType<typeof useSetupContext>;

const initContextState: UseSetupContextType = {
  difficulty: initState.difficulty,
  playerCount: initState.playerCount,
  updateDifficulty: () => {},
  updatePlayerCount: () => {},
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
