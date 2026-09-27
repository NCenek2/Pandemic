import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import ListBox from "../Components/Listbox";
import { Difficulty } from "../Enums/Difficulty";
import { PlayerCount } from "../Enums/PlayerCount";
import useSetup from "../Hooks/useSetup";
import "./StartupPage.css";

const StartupPage = () => {
  const { updatePlayerCount, updateDifficulty } = useSetup();

  return (
    <div className="startup-page-container">
      <h1>Welcome to Pandemic</h1>
      <div className="startup-page-card-container">
        <Card>
          <h2>Difficulty</h2>
          <ListBox<Difficulty>
            prefix="difficulty_"
            displayItems={Object.keys(Difficulty).map(
              (k) => k as unknown as Difficulty,
            )}
            items={Object.values(Difficulty).map(
              (k) => k as unknown as Difficulty,
            )}
            onChange={updateDifficulty}
          />
        </Card>

        <Card>
          <h2>Players</h2>
          <ListBox<PlayerCount>
            prefix="count_"
            displayItems={Object.keys(PlayerCount).map(
              (k) => k as unknown as PlayerCount,
            )}
            items={Object.values(PlayerCount).map(
              (k) => k as unknown as PlayerCount,
            )}
            onChange={updatePlayerCount}
          />
        </Card>
      </div>

      <Link to={"/game"} className="btn btn-primary w-100">
        Start Game
      </Link>
    </div>
  );
};

export default StartupPage;
