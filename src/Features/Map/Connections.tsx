import { Line } from "react-simple-maps";
import useGame from "../../Hooks/useGame";

const Connections = () => {
  const { cities } = useGame();
  return cities.flatMap((city) =>
    city.connections.map((conn) => {
      const target = cities.find((c) => c.name === conn.name);
      if (!target) return null;

      return (
        <Line
          key={`${city.name}-${conn.name}`}
          from={city.coordinates}
          to={target.coordinates}
          stroke="#276c37"
          strokeWidth={0.25}
        />
      );
    }),
  );
};

export default Connections;
