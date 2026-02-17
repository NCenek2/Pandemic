import type { MapperType } from "../Types/MapperType";

export type RoleAttributes = "COMMAND";

export type RoleName =
  | "Dispatcher"
  | "Medic"
  | "Quarantine Specialist"
  | "Researcher"
  | "Scientist"
  | "Operations Expert"
  | "Contingency Planner"
  | "Field Operative"
  | "Containment Specialist"
  | "Generalist"
  | "Archivist";

export interface IRole {
  name: RoleName;
  actions: MapperType;
  actionCount: number;
  allowableCards: number;
}
