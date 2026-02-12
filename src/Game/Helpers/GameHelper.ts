import { PlayerCount } from "../../Enums/PlayerCount";
import { isCube, isResearchStation } from "../../Guards/guards";
import type { ICube } from "../../Intefaces/ICube";
import type { IPlayerCard } from "../../Intefaces/IPlayerCard";
import type { IResearchStation } from "../../Intefaces/IResearchStation";
import type { IRole } from "../../Intefaces/IRole";
import type { InfectionCard } from "../Cards/InfectionCard";
import type { City } from "../City";
import type { CubeContainer } from "../Containers/CubeContainer";
import type { PlayerCardContainer } from "../Containers/PlayerCardContainer";
import type { ResearchStationContainer } from "../Containers/ResearchStationContainer";
import type { Cure } from "../Cure";
import { Game } from "../Game";
import { Player } from "../Player";
import { ContinegencyPlanner } from "../Roles/ContinegencyPlanner";
import { Dispatcher } from "../Roles/Dispatcher";
import { Medic } from "../Roles/Medic";
import { OperationsExpert } from "../Roles/OperationsExpert";
import { QuarantineSpecialist } from "../Roles/QuarantineSpecialist";
import { Researcher } from "../Roles/Researcher";
import { Scientist } from "../Roles/Scientist";

export class GameHelper {
  public setup(): void {
    const game = Game.instance;
    let playerCount = 1;

    switch (game.playerCount) {
      case PlayerCount.One:
        playerCount = 1;
        break;
      case PlayerCount.Two:
        playerCount = 2;
        break;
      case PlayerCount.Three:
        playerCount = 3;
        break;
      case PlayerCount.Four:
        playerCount = 4;
        break;
    }

    let difficulty = game.difficulty;

    // Fuck It and Just Override Until we know whats going on
    playerCount = 2;
    difficulty = 4;
    console.log(playerCount, difficulty, "In GameHelper ");

    const cardsPerPlayer = -playerCount + 6;

    // Random Role Select
    const roles: IRole[] = [
      new ContinegencyPlanner(),
      new Dispatcher(),
      new Medic(),
      new OperationsExpert(),
      new QuarantineSpecialist(),
      new Researcher(),
      new Scientist(),
    ];

    const indecies = new Set<number>();

    while (indecies.size < playerCount) {
      indecies.add(Math.floor(Math.random() * roles.length));
    }

    // Player Setup
    for (const index of indecies) {
      const role = roles[index];

      const playerCards: IPlayerCard[] = [];
      for (let _ = 0; _ < cardsPerPlayer; _++) {
        const selectedCard = game.playerCardContainer.draw() as IPlayerCard;

        playerCards.push(selectedCard);
      }

      const player = new Player(playerCards, role, game.atlanta);
      game.players.push(player);
    }

    // Epidemic Card Addition
    game.playerCardContainer.addEpidemicCards(difficulty);

    // Infect Cities
    for (let infectionRound = 1; infectionRound < 4; infectionRound++) {
      for (let cubesToPlace = 3; cubesToPlace >= 1; cubesToPlace--) {
        const infectionCard =
          game.infectionCardContainer.draw() as InfectionCard;
        // console.log(
        //   `Placing ${cubesToPlace} Cubes on ${infectionCard.city.name}`,
        // );

        for (let cubeCount = cubesToPlace; cubeCount > 0; cubeCount--) {
          const cube = game.cubeContainer.getCube(
            infectionCard.city.color,
          ) as ICube;
          game.cubeContainer.removeCube(cube);
          infectionCard.city.placeCube(cube);
        }
      }
    }

    // Build Research Station
    const researchStation =
      game.researchStationContainer.getStation() as IResearchStation;
    game.atlanta.buildResearchStation(researchStation);

    // Set Player Location To Atlanta
    for (const player of game.players) {
      player.Move(game.atlanta);
    }
  }

  public reset(): void {
    const game = Game.instance;

    this.resetCubes(new Set<City>(), game.atlanta, game.cubeContainer);
    this.resetResearchStations(
      new Set<City>(),
      game.atlanta,
      game.researchStationContainer,
    );
    this.resetPlayers(game.players, game.playerCardContainer);

    game.playerCardContainer.reset();
    game.infectionCardContainer.reset();

    this.resetCures(game.cures);
    game.infectionMarker.reset();
    game.outbreakMarker.reset();

    game.playerCardContainer.removeEpidemicCards();
  }

  private resetResearchStations(
    explored: Set<City>,
    city: City,
    researchStationContainer: ResearchStationContainer,
  ): void {
    if (explored.has(city)) return;

    explored.add(city);

    for (const researchStation of city.elements.filter((element) =>
      isResearchStation(element),
    )) {
      const index = city.elements.indexOf(researchStation);
      if (index === -1) continue;
      city.elements.splice(index, 1);

      researchStationContainer.addStation(researchStation);
    }

    for (const connectedCity of city.connections) {
      this.resetResearchStations(
        explored,
        connectedCity,
        researchStationContainer,
      );
    }
  }

  private resetCures(cures: Cure[]): void {
    for (const cure of cures) cure.SetCuredStatus(false);
  }

  private resetPlayers(
    players: Player[],
    playerCardContainer: PlayerCardContainer,
  ): void {
    // Add Player Cards Back To Deck
    for (const player of players) {
      for (const playerCard of player.playerCards) {
        playerCardContainer.addCard(playerCard);
      }
    }
  }

  private resetCubes(
    explored: Set<City>,
    city: City,
    cubeContainer: CubeContainer,
  ): void {
    if (explored.has(city)) return;

    explored.add(city);

    for (const cube of city.elements.filter((element) => isCube(element))) {
      const index = city.elements.indexOf(cube);
      if (index === -1) continue;
      city.elements.splice(index, 1);

      cubeContainer.addCube(cube);
    }

    for (const connectedCity of city.connections) {
      this.resetCubes(explored, connectedCity, cubeContainer);
    }
  }
}
