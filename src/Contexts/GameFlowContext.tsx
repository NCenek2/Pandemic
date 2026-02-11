import { createContext, useRef, useState, type ReactElement } from "react";
import type { City } from "../Game/City";
import {
  CUBE_ZOOM,
  DEFAULT_ZOOM,
  LOST_GAME_URL,
  MAX_ALLOWABLE_CARDS,
  OUTBREAK_CUBE_THRESHOLD,
} from "../Game/Constants/Constants";
import { isEpidemicCard } from "../Guards/guards";
import { useAlert } from "../Hooks/useAlert";
import useCamera from "../Hooks/useCamera";
import useGame from "../Hooks/useGame";
import type { ChildrenType } from "../Types/ChildrenType";

const useGameFlowContext = () => {
  const { setPosition } = useCamera();
  const { setAlert } = useAlert();
  const currentCardCount = useRef(0);
  const {
    infectionMarker,
    infectionCardContainer,
    cubeContainer,
    playerCardContainer,
    setCities,
    setInfectionMarker,
    players,
    setPlayers,
    currentPlayer,
    setCurrentPlayer,
    setOutbreakMarker,
  } = useGame();

  const [mustDiscardCards, setMustDiscardCards] = useState(false);

  const infectCities = async () => {
    setAlert("Infecting Cities...");

    const rate = infectionMarker.infectionRate;
    for (let i = 0; i < rate; i++) {
      const nextCard = infectionCardContainer.current.draw();
      if (!nextCard) return gameOver();
      const cube = cubeContainer.current.getCube(nextCard.city.color);
      if (!cube) return gameOver();

      // Check For Outbreak
      if (nextCard.city.GetCubeCount() >= OUTBREAK_CUBE_THRESHOLD) {
        await outbreak(nextCard.city);
        continue;
      }

      cubeContainer.current.removeCube(cube!);

      setPosition({
        coordinates: nextCard.city.coordinates,
        zoom: CUBE_ZOOM,
      });

      await new Promise((resolve) => setTimeout(resolve, 1500));

      setCities((prevCities) =>
        prevCities.map((city) => {
          if (city.name === nextCard.city.name) {
            city.placeCube(cube);
            return city;
          }
          return city;
        }),
      );

      await new Promise((resolve) => setTimeout(resolve, 1500));
    }
  };

  const epidemic = async () => {
    setAlert("Epidemic...");

    // Increase
    setInfectionMarker((prevMarker) => {
      const newInfectionMarker = prevMarker.clone();
      newInfectionMarker.increaseRate();
      return newInfectionMarker;
    });

    // Infect
    const nextCard = infectionCardContainer.current.draw();
    if (!nextCard) return gameOver();

    setPosition({
      coordinates: nextCard.city.coordinates,
      zoom: CUBE_ZOOM,
    });

    await new Promise((resolve) => setTimeout(resolve, 1000));

    for (let i = 0; i < 3; i++) {
      const cube = cubeContainer.current.getCube(nextCard.city.color);
      if (!cube) return gameOver();

      if (nextCard.city.GetCubeCount() >= OUTBREAK_CUBE_THRESHOLD) {
        await outbreak(nextCard.city);
        continue;
      }

      cubeContainer.current.removeCube(cube!);

      setCities((prevCities) =>
        prevCities.map((city) => {
          if (city.name === nextCard.city.name) {
            city.placeCube(cube);
            return city;
          }
          return city;
        }),
      );

      await new Promise((resolve) => setTimeout(resolve, 500));
    }

    await new Promise((resolve) => setTimeout(resolve, 2000));

    // Intensify
    infectionCardContainer.current.intensify();
  };

  const drawCards = async (): Promise<void> => {
    for (let i = 0; i < 2; i++) {
      const playerCard = playerCardContainer.current.draw();
      if (!playerCard) {
        gameOver();
        return;
      }

      if (isEpidemicCard(playerCard)) {
        await epidemic();
        continue;
      }

      setPlayers((prevPlayers) =>
        prevPlayers.map((player) => {
          if (player === currentPlayer) {
            player.addCard(playerCard);
            currentCardCount.current = player.playerCards.length;
            return player;
          }
          return player;
        }),
      );
    }
  };

  const gameOver = () => {
    window.location.href = LOST_GAME_URL;
  };

  const outbreak = async (city: City) => {
    setAlert(`Outbreak in ${city.name}!`);

    setOutbreakMarker((prevMarker) => {
      const newOutbreakMarker = prevMarker.clone();
      newOutbreakMarker.triggerOutBreak();
      return newOutbreakMarker;
    });

    for (const connectingCity of city.connections) {
      const cube = cubeContainer.current.getCube(connectingCity.color);
      if (!cube) return gameOver();

      // Check for chain outbreak
      if (connectingCity.GetCubeCount() >= OUTBREAK_CUBE_THRESHOLD) {
        await outbreak(connectingCity);
        continue;
      }

      cubeContainer.current.removeCube(cube!);

      setPosition({
        coordinates: connectingCity.coordinates,
        zoom: CUBE_ZOOM,
      });

      await new Promise((resolve) => setTimeout(resolve, 1500));

      setCities((prevCities) =>
        prevCities.map((city) => {
          if (city.name === connectingCity.name) {
            city.placeCube(cube);
            return city;
          }
          return city;
        }),
      );

      await new Promise((resolve) => setTimeout(resolve, 1500));
    }
  };

  const endTurn = async () => {
    currentCardCount.current = currentPlayer!.playerCards.length;
    await drawCards();

    // Check Here
    if (currentCardCount.current > MAX_ALLOWABLE_CARDS) {
      setMustDiscardCards(true);
      return;
    }

    await postCardDraw();
  };

  const postCardDraw = async () => {
    setMustDiscardCards(false);

    const playerCount = players.length;
    const currentIndex = players.findIndex(
      (player) => player === currentPlayer,
    );

    const nextIndex = (currentIndex + 1) % playerCount;
    const nextPlayer = players[nextIndex];

    await infectCities();

    setPosition({
      coordinates: nextPlayer.currentLocation.coordinates,
      zoom: DEFAULT_ZOOM,
    });

    setCurrentPlayer(nextPlayer);
  };

  return {
    mustDiscardCards,
    setMustDiscardCards,
    endTurn,
    postCardDraw,
  };
};

export type UseGameFlowContextType = ReturnType<typeof useGameFlowContext>;

const initContextState: UseGameFlowContextType = {
  mustDiscardCards: false,
  setMustDiscardCards: () => {},
  endTurn: async () => {},
  postCardDraw: async () => {},
};

export const GameFlowContext =
  createContext<UseGameFlowContextType>(initContextState);

export const GameFlowProvider = ({ children }: ChildrenType): ReactElement => {
  return (
    <GameFlowContext.Provider value={useGameFlowContext()}>
      {children}
    </GameFlowContext.Provider>
  );
};
