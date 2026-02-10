import { Marker } from "react-simple-maps";
import useGame from "../../Hooks/useGame";
import { usePlayer } from "../../Hooks/usePlayer";

type Numbers = 0 | 1 | 2 | 3;

const playerColors: Record<Numbers, string> = {
  0: "#ffe600",
  1: "#ffaa00",
  2: "#00FF00",
  3: "#00f2ff",
};

const PlayerMarkers = () => {
  const { players, currentPlayer } = useGame();
  const { setSelectedPlayer } = usePlayer();
  return players.map((player, index) => {
    const multiplier = 1;
    const xOffset =
      index % 2 == 0 || player === currentPlayer ? 0 : (index - 2) * multiplier;
    const yOffset =
      index % 2 != 0 || player === currentPlayer
        ? 0
        : (-index + 1) * multiplier;
    const currentLocation = player.currentLocation?.coordinates ?? [0, 0];
    const xCoord = currentLocation[0] + xOffset;
    const yCoord = currentLocation[1] + yOffset;

    return (
      <Marker
        key={`player-${index}`}
        coordinates={[xCoord, yCoord]}
        onClick={() => setSelectedPlayer(player)}
      >
        {/* City circle */}
        <circle r={2} fill={playerColors[index as Numbers]} strokeWidth={1} />
      </Marker>
    );
  });
};

export default PlayerMarkers;
