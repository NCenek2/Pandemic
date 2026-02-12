import { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import CardListBox from "../../../Components/CardListBox";
import ExecuteButton from "../../../Components/ExecuteButton";
import PlayerListBox from "../../../Components/PlayerListBox";
import type { Player } from "../../../Game/Player";
import { useGame } from "../../../Hooks/useGame";
import usePlayer from "../../../Hooks/usePlayer";
import type { IPlayerCard } from "../../../Intefaces/IPlayerCard";

const ShareKnowledgeMapper = () => {
  const [show, setShow] = useState(true);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const { currentPlayer, players } = useGame();

  const [player1, setPlayer1] = useState<Player>(currentPlayer!);
  const [player1Card, setPlayer1Card] = useState<IPlayerCard | null>(null);
  const [player2, setPlayer2] = useState<Player>(currentPlayer!);
  const [player2Card, setPlayer2Card] = useState<IPlayerCard | null>(null);

  const { setUniqueData } = usePlayer();

  const reset = () => {
    setPlayer1(currentPlayer!);
    setPlayer2(currentPlayer!);
    setPlayer1Card(null);
    setPlayer2Card(null);
    setUniqueData(null);
  };

  useEffect(() => {
    setPlayer1Card(null);
  }, [player1]);

  useEffect(() => {
    setPlayer2Card(null);
  }, [player2]);

  useEffect(() => {
    setUniqueData({
      player1,
      player1Card,
      player2,
      player2Card,
    });
  }, [player1, player1Card, player2, player2Card]);

  return (
    <div className="d-flex flex-column align-items-center justify-content-center">
      <Button variant="primary" className="btn-xs" onClick={handleShow}>
        Share Knowledge
      </Button>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        fullscreen="fullscreen"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title> Share Knowledge</Modal.Title>
        </Modal.Header>
        <Modal.Body>Select Players and Card To Transfer</Modal.Body>
        <Modal.Body>
          <div className="d-flex flex-row justify-content-evenly gap-2">
            <div className="d-flex flex-column gap-2">
              <PlayerListBox
                players={players}
                selectedPlayer={player1}
                setState={setPlayer1}
                prefix="player1_"
              />
              <CardListBox
                playerCards={player1.playerCards}
                selectedCard={player1Card}
                setState={setPlayer1Card}
                prefix="player1Card_"
              />
            </div>
            <div className="d-flex flex-column gap-2">
              <PlayerListBox
                players={players}
                selectedPlayer={player2}
                setState={setPlayer2}
                prefix="player2_"
              />
              <CardListBox
                playerCards={player2.playerCards}
                selectedCard={player2Card}
                setState={setPlayer2Card}
                prefix="player2Card_"
              />
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <ExecuteButton onClick={reset} />
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ShareKnowledgeMapper;
