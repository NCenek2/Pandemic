import { Card } from "react-bootstrap";
import RestartButton from "../Components/RestartButton";

const EndGame = () => {
  return (
    <div className="d-flex justify-content-center h-100 align-items-center">
      <Card border="danger" style={{ width: "18rem" }}>
        <Card.Header>Game Over</Card.Header>
        <Card.Body>
          <Card.Title>You failed...</Card.Title>
          <Card.Text>
            You have failed to save the world from the pandemic. As a result,
            the world has been plunged into chaos and despair. You will be
            remembered as the person who let the world burn. The consequences of
            your failure will be felt for generations to come. You will be given
            a chance to redeem yourself and try again. Refresh the page to start
            a new game and try to save the world from the pandemic.
          </Card.Text>
        </Card.Body>
        <Card.Footer>
          <RestartButton />
        </Card.Footer>
      </Card>
    </div>
  );
};

export default EndGame;
