import CardMapper from "../../Features/Roles/Mapper/CardMapper";
import CityMapper from "../../Features/Roles/Mapper/CityMapper";
import DiscoverCureMapper from "../../Features/Roles/Mapper/DiscoverCureMapper";
import EmptyMapper from "../../Features/Roles/Mapper/EmptyMapper";
import ShareKnowledgeMapper from "../../Features/Roles/Mapper/ShareKnowledgeMapper";
import type { IRole } from "../../Intefaces/IRole";
import type { MapperType } from "../../Types/MapperType";
import { BuildResearchStationAction } from "./Actions/BuildResearchStationAction";
import { CharterFlightAction } from "./Actions/CharterFlightAction";
import { DirectFlightAction } from "./Actions/DirectFlightAction";
import { DiscoverCureAction } from "./Actions/DiscoverCureAction";
import { DriveOrFerryAction } from "./Actions/DriveOrFerryAction";
import { ShareKnowledgeAction } from "./Actions/ShareKnowledgeAction";
import { ShuttleFlightAction } from "./Actions/ShuttleFlightAction";
import { TreatDiseaseActionMedicAction } from "./Actions/TreatDiseaseMedicAction";
import { UseEventAction } from "./Actions/UseEventAction";

export class Medic implements IRole {
  public name: string = "Medic";
  private readonly _actions: MapperType;

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
}
