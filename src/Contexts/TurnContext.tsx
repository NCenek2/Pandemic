import {
  createContext,
  useEffect,
  useRef,
  useState,
  type ReactElement,
} from "react";
import useGame from "../Hooks/useGame";
import useGameFlow from "../Hooks/useGameFlow";
import usePlayer from "../Hooks/usePlayer";
import type { ChildrenType } from "../Types/ChildrenType";

export type TurnState = {};

const useTurnContext = () => {
  const game = useGame();
  const { currentPlayer, setCurrentPlayer } = game;
  const player = usePlayer();
  const {
    selectedCity,
    selectedPlayer,
    selectedCard,
    selectedColor,
    selectedAction,
    previousAction,
    setPreviousAction,
    resetPlayerData,
    uniqueData,
  } = player;
  const { currentCardCount, drawCards, setMustDiscardCards, postCardDraw } =
    useGameFlow();

  const turnCount = useRef(0);
  const [isValidTurn, setIsValidTurn] = useState(false);
  const [turnExectued, setTurnExectued] = useState(false);

  const endTurn = async () => {
    setCurrentPlayer((pp) => {
      currentCardCount.current = pp!.playerCards.length;
      return pp;
    });

    await drawCards();

    // Check if player has too many cards
    if (currentCardCount.current > currentPlayer!.role.allowableCards) {
      setMustDiscardCards(true);
      return;
    }

    await postCardDraw();
  };

  const executeTurn = () => {
    selectedAction?.action.Execute({
      ...game,
      ...player,
    });

    checkEndTurn();
  };

  const checkEndTurn = async () => {
    setTurnExectued((prev) => !prev);
    turnCount.current += 1;

    if (turnCount.current % game.currentPlayer!.role.actionCount === 0) {
      resetPlayerData();
      await endTurn();
    } else {
      setPreviousAction(selectedAction);
    }
  };

  const undoTurn = () => {
    if (previousAction == null) return;

    turnCount.current -= 1;
    previousAction.action.Undo({
      ...game,
      ...player,
    });

    setPreviousAction(null);
  };

  const checkValidTurn = () => {
    const validState =
      (currentPlayer != null &&
        selectedAction != null &&
        selectedAction.action.CanExecute({
          ...game,
          ...player,
        })) ??
      false;

    setIsValidTurn(validState);
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
    checkValidTurn();
  }, [
    selectedCity,
    selectedPlayer,
    selectedCard,
    selectedColor,
    selectedAction,
    previousAction,
    uniqueData,
    turnExectued,
  ]);

  return {
    isValidTurn,
    executeTurn,
  };
};

export type UseTurnContextType = ReturnType<typeof useTurnContext>;

const initContextState: UseTurnContextType = {
  isValidTurn: false,
  executeTurn: () => {},
};

export const TurnContext = createContext<UseTurnContextType>(initContextState);

export const TurnProvider = ({ children }: ChildrenType): ReactElement => {
  return (
    <TurnContext.Provider value={useTurnContext()}>
      {children}
    </TurnContext.Provider>
  );
};
