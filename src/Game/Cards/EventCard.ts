import type { IEvent } from "../../Intefaces/IEvent";
import type { IPlayerCard } from "../../Intefaces/IPlayerCard";

export class EventCard implements IPlayerCard, IEvent {
  public readonly title: string;
  public readonly description: string;

  public readonly kind: "event" = "event";

  constructor(title: string, description: string) {
    this.title = title;
    this.description = description;
  }

  public Use(): void {}
  public Undo(): void {}
}
