import {
  createContext,
  useRef,
  useState,
  type MutableRefObject,
  type ReactElement,
} from "react";
import { Color } from "../Enums/Color";
import { Difficulty } from "../Enums/Difficulty";
import { PlayerCount } from "../Enums/PlayerCount";
import { City } from "../Game/City";
import { CubeContainer } from "../Game/Containers/CubeContainer";
import { InfectionCardContainer } from "../Game/Containers/InfectionCardContainer";
import { PlayerCardContainer } from "../Game/Containers/PlayerCardContainer";
import { ResearchStationContainer } from "../Game/Containers/ResearchStationContainer";
import { Cure } from "../Game/Cure";
import { Game } from "../Game/Game";
import { InfectionMarker } from "../Game/Markers/InfectionMarker";
import { OutbreakMarker } from "../Game/Markers/OutbreakMarker";
import { Player } from "../Game/Player";
import type { ChildrenType } from "../Types/ChildrenType";

export type GameState = {
  currentPlayer: Player | null;
  infectionMarker: InfectionMarker;
  outbreakMarker: OutbreakMarker;
  cures: Cure[];
  playerCount: PlayerCount;
  difficulty: Difficulty;
};

const initState: GameState = {
  currentPlayer: null,
  infectionMarker: new InfectionMarker(),
  outbreakMarker: new OutbreakMarker(),
  cures: [
    new Cure(Color.Red),
    new Cure(Color.Black),
    new Cure(Color.Blue),
    new Cure(Color.Yellow),
  ],
  playerCount: PlayerCount.Four,
  difficulty: Difficulty.Easy,
};

type StateInitializerType = {
  cities: City[];
  researchContainer: ResearchStationContainer;
  infectionCardContainer: InfectionCardContainer;
  playerCardContainer: PlayerCardContainer;
  cubeContainer: CubeContainer;
  players: Player[];
};

function stateInitialzers(): StateInitializerType {
  const game = Game.instance;
  game.reset();
  game.setup();

  return {
    researchContainer: game.researchStationContainer,
    cities: game.cities,
    cubeContainer: game.cubeContainer,
    infectionCardContainer: game.infectionCardContainer,
    playerCardContainer: game.playerCardContainer,
    players: game.players,
  };
}

const useGameContext = (initialState: GameState) => {
  const [
    {
      cities: _cities,
      infectionCardContainer: _infectionCardContainer,
      playerCardContainer: _playerCardContainer,
      players: _players,
      researchContainer: _researchStationContainer,
      cubeContainer: _cubeContainer,
    },
  ] = useState(() => stateInitialzers());

  const [players, setPlayers] = useState(_players);
  const [currentPlayer, setCurrentPlayer] = useState(_players.at(0) ?? null);
  const [cities, setCities] = useState<City[]>(_cities);

  const [outbreakMarker, setOutbreakMarker] = useState(
    initialState.outbreakMarker,
  );
  const [infectionMarker, setInfectionMarker] = useState(
    initialState.infectionMarker,
  );

  const infectionCardContainer = useRef(_infectionCardContainer);
  const researchStationContainer = useRef(_researchStationContainer);
  const cubeContainer = useRef(_cubeContainer);
  const playerCardContainer = useRef(_playerCardContainer);

  const [cures, setCures] = useState(initialState.cures);

  const [gameOver, setGameOver] = useState(false);

  return {
    players,
    setPlayers,
    currentPlayer,
    setCurrentPlayer,
    cities,
    setCities,
    outbreakMarker,
    infectionMarker,
    cures,
    setCures,
    playerCardContainer,
    infectionCardContainer,
    researchStationContainer,
    cubeContainer,
    setInfectionMarker,
    setOutbreakMarker,
    gameOver,
    setGameOver,
  };
};

export type UseGameContextType = ReturnType<typeof useGameContext>;

const initContextState: UseGameContextType = {
  players: [],
  setPlayers: () => {},
  currentPlayer: null,
  setCurrentPlayer: () => {},
  cities: [],
  setCities: () => {},
  outbreakMarker: new OutbreakMarker(),
  infectionMarker: new InfectionMarker(),
  cures: [],
  setCures: () => {},
  playerCardContainer: {
    current: new PlayerCardContainer([]),
  } as MutableRefObject<PlayerCardContainer>,
  infectionCardContainer: {
    current: new InfectionCardContainer([]),
  } as MutableRefObject<InfectionCardContainer>,
  researchStationContainer: {
    current: new ResearchStationContainer(),
  } as MutableRefObject<ResearchStationContainer>,
  setInfectionMarker: () => {},
  setOutbreakMarker: () => {},
  cubeContainer: {
    current: new CubeContainer(),
  } as MutableRefObject<CubeContainer>,
  gameOver: false,
  setGameOver: () => {},
};

export const GameContext = createContext<UseGameContextType>(initContextState);

export const GameProvider = ({ children }: ChildrenType): ReactElement => {
  return (
    <GameContext.Provider value={useGameContext(initState)}>
      {children}
    </GameContext.Provider>
  );
};
