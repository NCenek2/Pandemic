// PandemicMap.tsx
import { ComposableMap, ZoomableGroup } from "react-simple-maps";
import useCamera from "../Hooks/useCamera";
import CityMarkers from "./Map/CityMarkers";
import Connections from "./Map/Connections";
import PlayerMarkers from "./Map/PlayerMarkers";
import WorldOutline from "./Map/WorldOutline";

// projectionConfig={{ scale: 250, center: [5, 20] }}
export default function PandemicMap() {
  const { position, setPosition } = useCamera();

  return (
    <ComposableMap
      projection="geoMercator"
      style={{
        height: "80vh",
        backgroundColor: "#000000", // Light blue background
      }}
      projectionConfig={{ scale: 250 }}
      viewBox="0 0 1000 400"
    >
      <ZoomableGroup
        center={position.coordinates}
        zoom={position.zoom}
        minZoom={1}
        maxZoom={6}
        onMoveEnd={(pos) => setPosition(pos)}
      >
        {/* World */}
        <WorldOutline />

        {/* Connections */}
        <Connections />

        {/* Cities */}
        <CityMarkers />

        {/* Players */}
        <PlayerMarkers />
      </ZoomableGroup>
    </ComposableMap>
  );
}
