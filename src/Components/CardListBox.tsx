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

  return (
    <ListGroup>
      {playerCards.map((playerCard, index) => (
        <ListGroup.Item
          key={`${prefix}${index}`}
          className={`user-select-none list-group-item ${selectedCard === playerCard && "active"}`}
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
