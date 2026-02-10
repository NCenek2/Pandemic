import { Geographies, Geography } from "react-simple-maps";

const geoUrl = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

const WorldOutline = () => {
  return (
    <Geographies geography={geoUrl}>
      {({ geographies }: { geographies: any[] }) =>
        geographies.map((geo: any) => (
          <Geography
            key={geo.rsmKey}
            geography={geo}
            fill="#000000"
            stroke="#142e5494"
          />
        ))
      }
    </Geographies>
  );
};

export default WorldOutline;
