import { useEffect, useState } from "react";
import { Button, ListGroup, Modal } from "react-bootstrap";
import CureStatuses from "../../../Components/CureStatues";
import ExecuteButton from "../../../Components/ExecuteButton";
import type { CityCard } from "../../../Game/Cards/CityCard";
import { isCityCard } from "../../../Guards/guards";
import { useGame } from "../../../Hooks/useGame";
import usePlayer from "../../../Hooks/usePlayer";
import type { IPlayerCard } from "../../../Intefaces/IPlayerCard";

const DiscoverCureMapper = () => {
  const [show, setShow] = useState(true);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [selectedCards, setSelectedCards] = useState<IPlayerCard[]>([]);

  const { currentPlayer } = useGame();
  const { setUniqueData } = usePlayer();

  const reset = () => {
    setSelectedCards([]);
    setUniqueData(null);
  };

  const toggleActive = (card: IPlayerCard) => {
    const isActive = selectedCards.find(
      (selectedCard) => selectedCard.title === card.title,
    );
    if (isActive) {
      setSelectedCards((prevSelected) =>
        prevSelected.filter(
          (selectedCard) => selectedCard.title !== card.title,
        ),
      );
    } else {
      setSelectedCards((prevSelected) => [...prevSelected, card]);
    }
  };

  const getItemColor = (playerCard: IPlayerCard): string => {
    if (selectedCards.includes(playerCard)) return "-success";

    if (isCityCard(playerCard)) {
      const cityCard = playerCard as CityCard;
      if (cityCard.city.color === "Red") return "-danger";
      if (cityCard.city.color === "Blue") return "-primary";
      if (cityCard.city.color === "Yellow") return "-warning";
      if (cityCard.city.color === "Black") return "-dark";
    }
    return "";
  };

  useEffect(() => {
    setUniqueData(selectedCards);
  }, [selectedCards]);

  return (
    <div className="d-flex flex-column align-items-center justify-content-center">
      <Button variant="primary" className="btn-xs" onClick={handleShow}>
        Open
      </Button>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        fullscreen="fullscreen"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Discover Cure</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <CureStatuses suffix="_DiscoverCure" />
        </Modal.Body>
        <Modal.Body>Select Cards to Discard when you Discover Cure</Modal.Body>
        <Modal.Body>
          <ListGroup as="ul">
            {currentPlayer?.playerCards.map((card) => (
              <ListGroup.Item
                key={`DiscoverCure-${card.title}`}
                onClick={() => toggleActive(card)}
                className={`user-select-none list-group-item${getItemColor(card)}`}
              >
                {card.title} (
                {isCityCard(card) && (card as CityCard).city.color})
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Modal.Body>
        <Modal.Footer>
          <ExecuteButton onClick={reset} />
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default DiscoverCureMapper;
