import { Marker } from "react-simple-maps";
import type { Color } from "../../Enums/Color";
import useGame from "../../Hooks/useGame";
import usePlayer from "../../Hooks/usePlayer";

export const diseaseColors: Record<Color, string> = {
  Blue: "#0000ff72",
  Yellow: "#e8d31879",
  Black: "#000000ce",
  Red: "#ff00006b",
};

const CityMarkers = () => {
  const { cities } = useGame();
  const { setSelectedCity } = usePlayer();
  return cities.map((city) => (
    <Marker key={city.name} coordinates={city.coordinates}>
      {/* City circle */}

      <circle
        onClick={() => setSelectedCity(city)}
        r={5.5}
        fill={diseaseColors[city.color]}
        stroke={`${city.elements.filter((el) => el.kind === "research-station").length > 0 && "#ffffff"}`}
        strokeWidth={1}
      ></circle>

      <text
        y={-8}
        textAnchor="middle"
        fontSize={5}
        style={{ userSelect: "none", pointerEvents: "none" }}
        fill="#f0eeeb"
      >
        {city.name}{" "}
        {city.elements.reduce((acc: number, el) => {
          if (el.kind === "cube") {
            acc += 1;
          }
          return acc;
        }, 0)}
      </text>
    </Marker>
  ));
};

export default CityMarkers;
