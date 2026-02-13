import { Card } from "react-bootstrap";
import type { CityCard } from "../Game/Cards/CityCard";
import { isCityCard } from "../Guards/guards";
import useGame from "../Hooks/useGame";
import usePlayer from "../Hooks/usePlayer";
import type { IPlayerCard } from "../Intefaces/IPlayerCard";

const getCardColor = (playerCard: IPlayerCard) => {
  if (isCityCard(playerCard)) {
    const cityCard = playerCard as CityCard;

    if (cityCard.city.color === "Red") return "danger";
    if (cityCard.city.color === "Blue") return "primary";
    if (cityCard.city.color === "Yellow") return "warning";
    if (cityCard.city.color === "Black") return "dark";
  }

  return "success";
};

const Footer = () => {
  const { currentPlayer } = useGame();
  const { setSelectedCard } = usePlayer();

  return (
    <footer className="d-flex align-items-center justify-content-evenly wrap">
      {currentPlayer?.playerCards.map((playerCard) => (
        <Card
          key={`PlayerCard_${playerCard.title}`}
          style={{ cursor: "pointer" }}
          onClick={() => setSelectedCard(playerCard)}
          text={getCardColor(playerCard)}
        >
          <Card.Text>{playerCard.title}</Card.Text>
        </Card>
      ))}
    </footer>
  );
};

export default Footer;
