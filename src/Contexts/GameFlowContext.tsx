import { createContext, useRef, useState, type ReactElement } from "react";
import { City } from "../Game/City";
import {
  CUBE_ZOOM,
  DEFAULT_ZOOM,
  OUTBREAK_CUBE_THRESHOLD,
} from "../Game/Constants/Constants";
import type { Cube } from "../Game/Elements/Cube";
import { isEpidemicCard } from "../Guards/guards";
import getDisregardedCities from "../Helpers/GameFlowContextHelper";
import { useAlert } from "../Hooks/useAlert";
import useCamera from "../Hooks/useCamera";
import useGame from "../Hooks/useGame";
import type { ChildrenType } from "../Types/ChildrenType";

const useGameFlowContext = () => {
  const { setPosition } = useCamera();
  const { setAlert } = useAlert();
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
    cures,
  } = useGame();

  const [isGameOver, setIsGameOver] = useState(false);

  const currentCardCount = useRef(0);
  const [mustDiscardCards, setMustDiscardCards] = useState(false);

  const infectCities = async (disregardedCities: Set<string>) => {
    await setAlert("Infecting Cities...", "info");

    const rate = infectionMarker.infectionRate;

    for (let i = 0; i < rate; i++) {
      const nextCard = infectionCardContainer.current.draw();
      if (!nextCard) {
        await endGame("No more infection cards!");
        return;
      }

      if (disregardedCities.has(nextCard.city.name)) {
        await setAlert(
          `Infection prevented in ${nextCard.city.name}`,
          "success",
        );
        continue;
      }

      const cube = cubeContainer.current.getCube(nextCard.city.color);
      if (!cube) {
        await endGame("No more cubes of that color!");
        return;
      }

      // Check For Outbreak
      if (nextCard.city.GetCubeCount() >= OUTBREAK_CUBE_THRESHOLD) {
        await outbreak(nextCard.city, new Set(), disregardedCities);
        continue;
      }

      await setAlert(`Infecting ${nextCard.city.name}...`, "info");
      cubeContainer.current.removeCube(cube!);

      await positionAndPlaceCubeOnCity(nextCard.city, cube, CUBE_ZOOM, 1500);
    }
  };

  const epidemic = async () => {
    await setAlert("Epidemic...");

    // Increase
    setInfectionMarker((prevMarker) => {
      const newInfectionMarker = prevMarker.clone();
      newInfectionMarker.increaseRate();
      return newInfectionMarker;
    });

    // Infect
    const nextCard = infectionCardContainer.current.drawFromBottom();
    if (!nextCard) {
      await endGame("No more infection cards!");
      return;
    }

    const disregardCities = getDisregardedCities(players, cures);

    if (!disregardCities.has(nextCard.city.name)) {
      setPosition({
        coordinates: nextCard.city.coordinates,
        zoom: CUBE_ZOOM,
      });

      await new Promise((resolve) => setTimeout(resolve, 1000));

      for (let i = 0; i < 3; i++) {
        const cube = cubeContainer.current.getCube(nextCard.city.color);
        if (!cube) {
          await endGame("No more cubes of that color!");
          return;
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
    } else {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      await setAlert(`Epidemic evaded in ${nextCard.city.name}`, "success");
    }

    // Intensify
    infectionCardContainer.current.intensify();
  };

  const drawCards = async () => {
    for (let i = 0; i < 2; i++) {
      const playerCard = playerCardContainer.current.draw();
      if (!playerCard) {
        await endGame("No more player cards!");
        return 0;
      }

      if (isEpidemicCard(playerCard)) {
        await epidemic();
        continue;
      }

      currentCardCount.current += 1;

      setPlayers((prevPlayers) =>
        prevPlayers.map((player) => {
          if (player === currentPlayer) {
            player.addCard(playerCard);
            return player;
          }
          return player;
        }),
      );
    }
  };

  const endGame = async (message: string) => {
    await setAlert(message);
    await new Promise((resolve) => setTimeout(resolve, 3000));
    setIsGameOver(true);
  };

  const outbreak = async (
    outbrokenCity: City,
    citiesWithOutbreaks: Set<string>,
    disregardCities: Set<string>,
  ) => {
    if (disregardCities.has(outbrokenCity.name)) {
      await setAlert(`Outbreak evaded in ${outbrokenCity.name}`, "success");
      return;
    }

    if (citiesWithOutbreaks.has(outbrokenCity.name)) {
      const cube = cubeContainer.current.getCube(outbrokenCity.color);
      if (!cube) {
        await endGame("No more cubes of that color!");
        return;
      }

      cubeContainer.current.removeCube(cube!);

      await positionAndPlaceCubeOnCity(outbrokenCity, cube, CUBE_ZOOM, 1500);
    } else {
      await setAlert(`Outbreak in ${outbrokenCity.name}!`);

      // Need to outbreak
      citiesWithOutbreaks.add(outbrokenCity.name);

      setOutbreakMarker((prevMarker) => {
        const newOutbreakMarker = prevMarker.clone();
        newOutbreakMarker.triggerOutBreak();
        return newOutbreakMarker;
      });

      for (const connectingCity of outbrokenCity.connections) {
        const cube = cubeContainer.current.getCube(connectingCity.color);
        if (!cube) {
          await endGame("No more cubes of that color!");
          return;
        }

        // Check for chain outbreak
        if (connectingCity.GetCubeCount() >= OUTBREAK_CUBE_THRESHOLD) {
          await outbreak(connectingCity, citiesWithOutbreaks, disregardCities);
          continue;
        }

        cubeContainer.current.removeCube(cube!);

        await positionAndPlaceCubeOnCity(connectingCity, cube, CUBE_ZOOM, 1500);
      }
    }
  };

  const positionAndPlaceCubeOnCity = async (
    selectedCity: City,
    cube: Cube,
    zoom: number,
    timeout: number,
  ) => {
    setPosition({
      coordinates: selectedCity.coordinates,
      zoom,
    });

    await new Promise((resolve) => setTimeout(resolve, timeout));

    setCities((prevCities) =>
      prevCities.map((city) => {
        if (city.name === selectedCity.name) {
          city.placeCube(cube);
          return city;
        }
        return city;
      }),
    );

    await new Promise((resolve) => setTimeout(resolve, timeout));
  };

  const postCardDraw = async () => {
    setMustDiscardCards(false);

    const playerCount = players.length;
    const currentIndex = players.findIndex(
      (player) => player === currentPlayer,
    );

    const nextIndex = (currentIndex + 1) % playerCount;
    const nextPlayer = players[nextIndex];

    const disregardCities = getDisregardedCities(players, cures);
    await infectCities(disregardCities);

    setPosition({
      coordinates: nextPlayer.currentLocation.coordinates,
      zoom: DEFAULT_ZOOM,
    });

    setCurrentPlayer(nextPlayer);
  };

  return {
    currentCardCount,
    isGameOver,
    mustDiscardCards,
    setMustDiscardCards,
    drawCards,
    postCardDraw,
  };
};

export type UseGameFlowContextType = ReturnType<typeof useGameFlowContext>;

const initContextState: UseGameFlowContextType = {
  currentCardCount: {
    current: 0,
  },
  isGameOver: false,
  mustDiscardCards: false,
  setMustDiscardCards: () => {},
  drawCards: async () => {},
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
