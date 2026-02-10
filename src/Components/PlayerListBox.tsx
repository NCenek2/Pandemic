import { ListGroup } from "react-bootstrap";
import type { Player } from "../Game/Player";

type PlayerListBoxProps = {
  prefix: string;
  selectedPlayer: Player;
  players: Player[];
  setState: React.Dispatch<React.SetStateAction<Player>>;
};

function PlayerListBox({
  prefix,
  selectedPlayer,
  players,
  setState,
}: PlayerListBoxProps) {
  const changeActivePlayer = (player: Player): void => {
    setState(player);
  };

  return (
    <ListGroup>
      {players.map((player, index) => (
        <ListGroup.Item
          key={`${prefix}${index}`}
          className={`user-select-none list-group-item ${player === selectedPlayer && "active"}`}
          onClick={() => changeActivePlayer(player)}
        >
          {`${player.role.name}`}
        </ListGroup.Item>
      ))}
    </ListGroup>
  );
}

export default PlayerListBox;
