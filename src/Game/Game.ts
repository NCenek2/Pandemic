import { Color } from "../Enums/Color";
import { Difficulty } from "../Enums/Difficulty";
import { PlayerCount } from "../Enums/PlayerCount";
import { Status } from "../Enums/Status";
import type { City } from "./City";
import { CubeContainer } from "./Containers/CubeContainer";
import { InfectionCardContainer } from "./Containers/InfectionCardContainer";
import { PlayerCardContainer } from "./Containers/PlayerCardContainer";
import { ResearchStationContainer } from "./Containers/ResearchStationContainer";
import { Cure } from "./Cure";
import { CityInitializer } from "./Helpers/CityInitializer";
import { GameHelper } from "./Helpers/GameHelper";
import { InfectionCardInitializer } from "./Helpers/InfectionCardInitializer";
import { PlayerCardHelper } from "./Helpers/PlayerCardHelper";
import { InfectionMarker } from "./Markers/InfectionMarker";
import { OutbreakMarker } from "./Markers/OutbreakMarker";
import { Player } from "./Player";

export class Game {
  private static _instance: Game | null = null;
  private _players: Player[];
  public get players(): Player[] {
    return this._players;
  }
  public currentPlayerTurn: Player | null = null;
  public readonly atlanta: City;
  public readonly cities: City[];
  public readonly cubeContainer: CubeContainer;
  public readonly researchStationContainer: ResearchStationContainer;
  public readonly playerCardContainer: PlayerCardContainer;
  public readonly infectionCardContainer: InfectionCardContainer;
  // public ActionHistory ActionHistory { get; init; }
  public readonly infectionMarker: InfectionMarker;
  public readonly outbreakMarker: OutbreakMarker;
  public readonly cures: Cure[];

  public difficulty: Difficulty = Difficulty.Easy;
  public playerCount: PlayerCount = PlayerCount.Two;

  public setDifficulty(difficulty: Difficulty): void {
    this.difficulty = difficulty;
  }

  public setPlayerCount(playerCount: PlayerCount): void {
    this.playerCount = playerCount;
  }

  private _status: Status;

  public get status(): Status {
    return this._status;
  }

  public static get instance(): Game {
    if (this._instance == null) {
      this._instance = new Game();
    }

    return this._instance;
  }

  private constructor() {
    this._players = [];

    //     ActionHistory = new ActionHistory(this);
    this.infectionMarker = new InfectionMarker();
    this.outbreakMarker = new OutbreakMarker();

    this.cures = [
      new Cure(Color.Red),
      new Cure(Color.Black),
      new Cure(Color.Blue),
      new Cure(Color.Yellow),
    ];

    this.researchStationContainer = new ResearchStationContainer();

    this.cities = new CityInitializer().createLayout();

    const infectionCards = new InfectionCardInitializer().createDeck(
      this.cities,
    );
    this.infectionCardContainer = new InfectionCardContainer(infectionCards);
    this.infectionCardContainer.shuffleCards();

    const playerCardHelper = new PlayerCardHelper();
    this.playerCardContainer = new PlayerCardContainer(
      playerCardHelper.createDeck(this.cities),
    );

    const foundCity = this.cities.filter((c) => c.name == "Atlanta")[0];
    this.atlanta = foundCity;
    this.playerCardContainer.shuffleCards();

    this.cubeContainer = new CubeContainer();

    this._status = Status.Playing;
  }

  public setup(): void {
    new GameHelper().setup();

    this.currentPlayerTurn = this.players.at(0) as Player;

    // this.playerCardContainer.printCards();

    console.log("Game Initialized...");
  }

  public reset(): void {
    this._status = Status.Playing;
    this.currentPlayerTurn = null;

    new GameHelper().reset();

    this._players = [];
  }
}
