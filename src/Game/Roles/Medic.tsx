import CardMapper from "../../Features/Roles/Mapper/CardMapper";
import CityMapper from "../../Features/Roles/Mapper/CityMapper";
import DiscoverCureMapper from "../../Features/Roles/Mapper/DiscoverCureMapper";
import EmptyMapper from "../../Features/Roles/Mapper/EmptyMapper";
import ShareKnowledgeMapper from "../../Features/Roles/Mapper/ShareKnowledgeMapper";
import type { IGameState } from "../../Intefaces/IGameState";
import type { IRole, RoleName } from "../../Intefaces/IRole";
import type { IRoleCommand } from "../../Intefaces/IRoleCommand";
import type { MapperType } from "../../Types/MapperType";
import {
  DEFAULT_ACTIONS_PER_TURN,
  DEFAULT_ALLOWABLE_CARDS,
} from "../Constants/Constants";
import { BuildResearchStationAction } from "./Actions/BuildResearchStationAction";
import { CharterFlightAction } from "./Actions/CharterFlightAction";
import { DirectFlightAction } from "./Actions/DirectFlightAction";
import { DiscoverCureAction } from "./Actions/DiscoverCureAction";
import { DriveOrFerryAction } from "./Actions/DriveOrFerryAction";
import { ShareKnowledgeAction } from "./Actions/ShareKnowledgeAction";
import { ShuttleFlightAction } from "./Actions/ShuttleFlightAction";
import { TreatDiseaseActionMedicAction } from "./Actions/TreatDiseaseMedicAction";
import { UseEventAction } from "./Actions/UseEventAction";
import { MedicTurnState } from "./TurnState/MedicTurnState";

export class Medic implements IRole, IRoleCommand {
  public name: RoleName = "Medic";
  private readonly _actions: MapperType;

  public actionCount: number = DEFAULT_ACTIONS_PER_TURN;
  public allowableCards: number = DEFAULT_ALLOWABLE_CARDS;

  private mediaTurnState: MedicTurnState = new MedicTurnState();

  public get actions(): MapperType {
    return this._actions;
  }
  constructor() {
    this._actions = {
      "Drive/Ferry": {
        action: new DriveOrFerryAction(),
        element: <CityMapper />,
      },
      "Direct Flight": {
        action: new DirectFlightAction(),
        element: <CityMapper />,
      },
      "Charter Flight": {
        action: new CharterFlightAction(),
        element: <CityMapper />,
      },
      "Build Research Station": {
        action: new BuildResearchStationAction(),
        element: <EmptyMapper />,
      },
      "Treat Disease": {
        action: new TreatDiseaseActionMedicAction(),
        element: <EmptyMapper />,
      },
      "Discover Cure": {
        action: new DiscoverCureAction(),
        element: <DiscoverCureMapper />,
      },
      "Share Knowledge": {
        action: new ShareKnowledgeAction(),
        element: <ShareKnowledgeMapper />,
      },
      "Shuttle Flight": {
        action: new ShuttleFlightAction(),
        element: <CityMapper />,
      },
      "Use Event": {
        action: new UseEventAction(),
        element: <CardMapper />,
      },
    };
  }

  onExecute(gameState: IGameState): void {
    this.mediaTurnState.OnExecute(gameState);
  }
  onUndo(gameState: IGameState): void {
    this.mediaTurnState.OnUndo(gameState);
  }
}
