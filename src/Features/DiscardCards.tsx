import { useState } from "react";
import { Button, ListGroup } from "react-bootstrap";
import type { CityCard } from "../Game/Cards/CityCard";
import { DEFAULT_ALLOWABLE_CARDS } from "../Game/Constants/Constants";
import { isCityCard } from "../Guards/guards";
import { useGame } from "../Hooks/useGame";
import useGameFlow from "../Hooks/useGameFlow";
import type { IPlayerCard } from "../Intefaces/IPlayerCard";

const DiscardCards = () => {
  const { currentPlayer, setPlayers, playerCardContainer } = useGame();
  const { postCardDraw } = useGameFlow();
  const [cardsToDiscard, setCardsToDiscard] = useState<IPlayerCard[]>([]);

  const currentCards =
    (currentPlayer?.playerCards.length ?? 0) - cardsToDiscard.length;

  const discard = async () => {
    setPlayers((prevPlayers) =>
      prevPlayers.map((player) => {
        if (player == currentPlayer) {
          for (const card of cardsToDiscard) {
            player.removeCard(card);
            playerCardContainer.current.moveToDiscard(card);
          }
          return player;
        }
        return player;
      }),
    );

    await postCardDraw();
  };

  const getItemColor = (playerCard: IPlayerCard): string => {
    if (cardsToDiscard.includes(playerCard)) return "-success";

    if (isCityCard(playerCard)) {
      const cityCard = playerCard as CityCard;
      if (cityCard.city.color === "Red") return "-danger";
      if (cityCard.city.color === "Blue") return "-primary";
      if (cityCard.city.color === "Yellow") return "-warning";
      if (cityCard.city.color === "Black") return "-dark";
    }
    return "";
  };

  return (
    <>
      <h3>{currentPlayer?.role.name}</h3>
      <ListGroup>
        {currentPlayer?.playerCards.map((playerCard) => (
          <ListGroup.Item
            key={`Discard_${playerCard.title}`}
            className={`user-select-none list-group-item${getItemColor(playerCard)}`}
            onClick={() => {
              if (cardsToDiscard.includes(playerCard)) {
                setCardsToDiscard(
                  cardsToDiscard.filter((card) => card !== playerCard),
                );
              } else {
                setCardsToDiscard([...cardsToDiscard, playerCard]);
              }
            }}
          >
            {playerCard.title} (
            {isCityCard(playerCard) && (playerCard as CityCard).city.color})
          </ListGroup.Item>
        ))}
      </ListGroup>
      <Button
        disabled={currentCards != DEFAULT_ALLOWABLE_CARDS}
        onClick={discard}
      >
        Discard
      </Button>
    </>
  );
};

export default DiscardCards;
