import { Card } from "react-bootstrap";
import RestartButton from "../Components/RestartButton";

const GameWon = () => {
  return (
    <div className="d-flex justify-content-center h-100 align-items-center">
      <Card border="success" style={{ width: "18rem" }}>
        <Card.Header>Game Won</Card.Header>
        <Card.Body>
          <Card.Title>Congratulations!</Card.Title>
          <Card.Text>
            You have successfully cured all diseases and saved the world from
            the pandemic. Your strategic thinking, teamwork, and quick
            decision-making have paid off. The world is now safe thanks to your
            efforts. You should be proud of your accomplishment and the lives
            you have saved. Well done!
          </Card.Text>
        </Card.Body>
        <Card.Footer>
          <RestartButton />
        </Card.Footer>
      </Card>
    </div>
  );
};

export default GameWon;
