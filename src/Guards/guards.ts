import type { EventCard } from "../Game/Cards/EventCard";
import type { ICube } from "../Intefaces/ICube";
import type { IElement } from "../Intefaces/IElement";
import type { IEpidemic } from "../Intefaces/IEpidemic";
import type { IPlayerCard } from "../Intefaces/IPlayerCard";
import type { IResearchStation } from "../Intefaces/IResearchStation";

export function isEventCard(playerCard: IPlayerCard): playerCard is EventCard {
  return playerCard.kind == "event";
}

export function isResearchStation(
  element: IElement,
): element is IResearchStation {
  return element.kind == "research-station";
}

export function isCityCard(playerCard: IPlayerCard): playerCard is IPlayerCard {
  return playerCard.kind == "city";
}

export function isCube(element: IElement): element is ICube {
  return element.kind == "cube";
}

export function isEpidemicCard(card: IPlayerCard): card is IEpidemic {
  return card.kind == "epidemic";
}
