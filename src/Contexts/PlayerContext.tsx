import {
  createContext,
  useEffect,
  useRef,
  useState,
  type ReactElement,
} from "react";
import { Color } from "../Enums/Color";
import { City } from "../Game/City";
import { TURNS_PER_ROUND } from "../Game/Constants/Constants";
import { Player } from "../Game/Player";
import useGame from "../Hooks/useGame";
import useGameFlow from "../Hooks/useGameFlow";
import type { IPlayerCard } from "../Intefaces/IPlayerCard";
import type { ChildrenType } from "../Types/ChildrenType";
import type { MapperItemType } from "../Types/MapperType";

export type PlayerState = {};

const usePlayerContext = () => {
  const game = useGame();
  const gameFlow = useGameFlow();
  const [hasChanged, setHasChanged] = useState(false);
  const [isValidAction, setIsValidAction] = useState(false);
  const [selectedPlayer, setSelectedPlayer] = useState<Player | null>(null);
  const [selectedCity, setSelectedCity] = useState<City | null>(null);
  const [selectedCard, setSelectedCard] = useState<IPlayerCard | null>(null);
  const [selectedColor, setSelectedColor] = useState<Color | null>(null);
  const [selectedAction, setSelectedAction] = useState<MapperItemType | null>(
    null,
  );
  const [uniqueData, setUniqueData] = useState<any>(null);

  const turnCount = useRef(0);

  const executeAction = () => {
    selectedAction?.action.Execute({
      ...game,
      executeAction,
      isValidAction,
      setIsValidAction,
      selectedAction,
      setSelectedAction,
      selectedPlayer,
      selectedCity,
      selectedCard,
      selectedColor,
      setSelectedPlayer,
      setSelectedCity,
      setSelectedColor,
      setSelectedCard,
      uniqueData,
      setUniqueData,
    });

    resetPlayer();
  };

  const resetPlayer = () => {
    setHasChanged((prev) => !prev);
    turnCount.current += 1;

    if (turnCount.current % TURNS_PER_ROUND === 0) {
      endTurn();
      gameFlow.endTurn();
    }
  };

  const endTurn = () => {
    setSelectedCard(null);
    setSelectedAction(null);
    setUniqueData(null);
  };

  const checkValidAction = () => {
    const validState =
      (game.currentPlayer != null &&
        selectedAction != null &&
        selectedAction.action.CanExecute({
          ...game,
          executeAction,
          isValidAction,
          setIsValidAction,
          selectedAction,
          setSelectedAction,
          selectedPlayer,
          selectedCity,
          selectedCard,
          selectedColor,
          setSelectedPlayer,
          setSelectedCity,
          setSelectedColor,
          setSelectedCard,
          uniqueData,
          setUniqueData,
        })) ??
      false;

    setIsValidAction(validState);
  };

  useEffect(() => {
    checkValidAction();
  }, [
    selectedCity,
    selectedPlayer,
    selectedCard,
    selectedColor,
    selectedAction,
    uniqueData,
    hasChanged,
  ]);

  return {
    executeAction,
    isValidAction,
    setIsValidAction,
    selectedAction,
    selectedPlayer,
    selectedCity,
    selectedCard,
    selectedColor,
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
  executeAction: () => {},
  isValidAction: false,
  setIsValidAction: () => {},
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
