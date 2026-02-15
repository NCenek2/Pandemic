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

  const [previousAction, setPreviousAction] = useState<MapperItemType | null>(
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

  const resetPlayer = async () => {
    setHasChanged((prev) => !prev);
    turnCount.current += 1;

    if (turnCount.current % TURNS_PER_ROUND === 0) {
      endTurn();
      await gameFlow.endTurn();
    } else {
      setPreviousAction(selectedAction);
    }
  };

  const undoTurn = () => {
    if (previousAction == null) return;

    turnCount.current -= 1;
    previousAction.action.Undo({
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

    setPreviousAction(null);
  };

  const endTurn = () => {
    setPreviousAction(null);
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
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.key === "z") {
        undoTurn();
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [previousAction]);

  useEffect(() => {
    checkValidAction();
  }, [
    selectedCity,
    selectedPlayer,
    selectedCard,
    selectedColor,
    selectedAction,
    previousAction,
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
