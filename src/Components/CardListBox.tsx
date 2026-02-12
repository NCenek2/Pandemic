import { ListGroup } from "react-bootstrap";
import type { CityCard } from "../Game/Cards/CityCard";
import { isCityCard } from "../Guards/guards";
import type { IPlayerCard } from "../Intefaces/IPlayerCard";

type CardListBoxProps = {
  prefix: string;
  selectedCard: IPlayerCard | null;
  playerCards: IPlayerCard[];
  setState: React.Dispatch<React.SetStateAction<IPlayerCard | null>>;
};

function CardListBox({
  prefix,
  selectedCard,
  playerCards,
  setState,
}: CardListBoxProps) {
  const changeActiveIndex = (playerCard: IPlayerCard): void => {
    setState(playerCard);
  };

  const getItemColor = (playerCard: IPlayerCard): string => {
    if (selectedCard === playerCard) return "-success";

    if (isCityCard(playerCard)) {
      const cityCard = playerCard as CityCard;
      if (cityCard.city.color === "Red") return "-danger";
      if (cityCard.city.color === "Blue") return "-info";
      if (cityCard.city.color === "Yellow") return "-warning";
      if (cityCard.city.color === "Black") return "-dark";
    }
    return "";
  };

  return (
    <ListGroup>
      {playerCards.map((playerCard, index) => (
        <ListGroup.Item
          key={`${prefix}${index}`}
          className={`user-select-none list-group-item${getItemColor(playerCard)}`}
          onClick={() => changeActiveIndex(playerCard)}
        >
          {`${playerCard.title}`} (
          {isCityCard(playerCard) && (playerCard as CityCard).city.color})
        </ListGroup.Item>
      ))}
    </ListGroup>
  );
}

export default CardListBox;
