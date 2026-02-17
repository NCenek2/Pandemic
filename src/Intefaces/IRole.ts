import type { MapperType } from "../Types/MapperType";

export type RoleName =
  | "Dispatcher"
  | "Medic"
  | "Quarantine Specialist"
  | "Researcher"
  | "Scientist"
  | "Operations Expert"
  | "Contingency Planner"
  | "Field Operative";

export interface IRole {
  name: RoleName;
  actions: MapperType;
  actionCount: number;
  allowableCards: number;
}
