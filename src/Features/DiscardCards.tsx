import { useState } from "react";
import { Button, ListGroup } from "react-bootstrap";
import type { CityCard } from "../Game/Cards/CityCard";
import { MAX_ALLOWABLE_CARDS } from "../Game/Constants/Constants";
import { isCityCard } from "../Guards/guards";
import { useGame } from "../Hooks/useGame";
import useGameFlow from "../Hooks/useGameFlow";
import type { IPlayerCard } from "../Intefaces/IPlayerCard";

const DiscardCards = () => {
  const { currentPlayer } = useGame();
  const { postCardDraw } = useGameFlow();
  const [cardsToDiscard, setCardsToDiscard] = useState<IPlayerCard[]>([]);

  const currentCards =
    (currentPlayer?.playerCards.length ?? 0) - cardsToDiscard.length;

  const discard = async () => {
    await postCardDraw();
  };

  return (
    <>
      <ListGroup>
        {currentPlayer?.playerCards.map((playerCard) => (
          <ListGroup.Item
            key={`Discard_${playerCard.title}`}
            className={`user-select-none list-group-item ${cardsToDiscard.includes(playerCard) && "active"}`}
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
      <Button disabled={currentCards != MAX_ALLOWABLE_CARDS} onClick={discard}>
        Discard
      </Button>
    </>
  );
};

export default DiscardCards;
