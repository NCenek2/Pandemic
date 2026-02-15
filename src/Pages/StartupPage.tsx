import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import ListBox from "../Components/Listbox";
import { Difficulty } from "../Enums/Difficulty";
import { PlayerCount } from "../Enums/PlayerCount";
import useSetup from "../Hooks/useSetup";

const StartupPage = () => {
  const { updatePlayerCount, updateDifficulty } = useSetup();

  return (
    <div className="d-flex flex-column gap-3 justify-content-center h-100 align-items-center">
      <h1>Welcome to Pandemic</h1>
      <div className="d-flex flex-row gap-3 ">
        <Card>
          <h2>Choose Difficulty</h2>
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
          <h2>Choose Player Count</h2>
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

      <Link to={"/game"} className="btn btn-primary">
        Start Game
      </Link>
    </div>
  );
};

export default StartupPage;
