import { createContext, useRef, useState, type ReactElement } from "react";
import { City } from "../Game/City";
import {
  CUBE_ZOOM,
  DEFAULT_ZOOM,
  MAX_ALLOWABLE_CARDS,
  OUTBREAK_CUBE_THRESHOLD,
} from "../Game/Constants/Constants";
import type { Cube } from "../Game/Elements/Cube";
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
    setGameOver,
  } = useGame();

  const [mustDiscardCards, setMustDiscardCards] = useState(false);

  const infectCities = async (disregardedCities: Set<string>) => {
    setAlert("Infecting Cities...");

    const rate = infectionMarker.infectionRate;

    for (let i = 0; i < rate; i++) {
      const nextCard = infectionCardContainer.current.draw();
      if (!nextCard) return gameOver();

      if (disregardedCities.has(nextCard.city.name)) {
        setAlert(`QS prevents infection in ${nextCard.city.name}`, "success");
        continue;
      }

      const cube = cubeContainer.current.getCube(nextCard.city.color);
      if (!cube) return gameOver();

      // Check For Outbreak
      if (nextCard.city.GetCubeCount() >= OUTBREAK_CUBE_THRESHOLD) {
        await outbreak(nextCard.city, new Set(), disregardedCities);
        continue;
      }

      cubeContainer.current.removeCube(cube!);

      await positionAndPlaceCubeOnCity(nextCard.city, cube, CUBE_ZOOM, 1500);
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
    const nextCard = infectionCardContainer.current.drawFromBottom();
    if (!nextCard) return gameOver();

    const disregardCities = getDisregardedCities();

    if (!disregardCities.has(nextCard.city.name)) {
      setPosition({
        coordinates: nextCard.city.coordinates,
        zoom: CUBE_ZOOM,
      });

      await new Promise((resolve) => setTimeout(resolve, 1000));

      for (let i = 0; i < 3; i++) {
        const cube = cubeContainer.current.getCube(nextCard.city.color);
        if (!cube) return gameOver();

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
      setAlert(`QS prevents epidemic in ${nextCard.city.name}`, "success");
    }

    // Intensify
    infectionCardContainer.current.intensify();
  };

  const getDisregardedCities = (): Set<string> => {
    const quarantineSpecialist = players.find(
      (player) => player.role.name === "Quarantine Specialist",
    );

    const disregardCities = new Set<string>();
    if (quarantineSpecialist) {
      disregardCities.add(quarantineSpecialist.currentLocation.name);
      for (const connectingCity of quarantineSpecialist.currentLocation
        .connections)
        disregardCities.add(connectingCity.name);
    }
    return disregardCities;
  };

  const drawCards = async (): Promise<void> => {
    for (let i = 0; i < 2; i++) {
      const playerCard = playerCardContainer.current.draw();
      if (!playerCard) {
        return gameOver();
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
    setGameOver(true);
  };

  const outbreak = async (
    outbrokenCity: City,
    citiesWithOutbreaks: Set<string>,
    disregardCities: Set<string>,
  ) => {
    if (disregardCities.has(outbrokenCity.name)) {
      setAlert(`QS prevents outbreak in ${outbrokenCity.name}`, "success");
      return;
    }

    setAlert(`Outbreak in ${outbrokenCity.name}!`);

    if (citiesWithOutbreaks.has(outbrokenCity.name)) {
      const cube = cubeContainer.current.getCube(outbrokenCity.color);
      if (!cube) return gameOver();

      cubeContainer.current.removeCube(cube!);

      await positionAndPlaceCubeOnCity(outbrokenCity, cube, CUBE_ZOOM, 1500);
    } else {
      // Need to outbreak
      citiesWithOutbreaks.add(outbrokenCity.name);

      setOutbreakMarker((prevMarker) => {
        const newOutbreakMarker = prevMarker.clone();
        newOutbreakMarker.triggerOutBreak();
        return newOutbreakMarker;
      });

      for (const connectingCity of outbrokenCity.connections) {
        const cube = cubeContainer.current.getCube(connectingCity.color);
        if (!cube) return gameOver();

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

  const endTurn = async () => {
    setCurrentPlayer((cp) => {
      currentCardCount.current = cp!.playerCards.length;
      return cp;
    });

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

    const disregardCities = getDisregardedCities();
    await infectCities(disregardCities);

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
