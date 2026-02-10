import type { IResearchStation } from "../../Intefaces/IResearchStation";
import { ResearchStation } from "../Elements/ResearchStation";

export class ResearchStationContainer {
  private _researchStations: IResearchStation[];
  public get researchStations(): IResearchStation[] {
    return this._researchStations;
  }

  public get count(): number {
    return this._researchStations.length;
  }

  constructor() {
    this._researchStations = [];
    for (let i = 0; i < 6; i++)
      this._researchStations.push(new ResearchStation());
  }

  public addStation(researchStation: IResearchStation): boolean {
    if (
      this._researchStations.find((rs) => rs === researchStation) !== undefined
    )
      return false;

    this._researchStations.push(researchStation);
    return true;
  }

  public getStation(): IResearchStation | undefined {
    if (this.count == 0) return undefined;

    const researchStation = this._researchStations.shift();
    return researchStation;
  }
}
