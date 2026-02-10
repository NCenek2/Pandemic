import DiscardCards from "./Features/DiscardCards";
import Footer from "./Features/Footer";
import Header from "./Features/Header";
import PandemicMap from "./Features/PandemicMap";
import ActionBase from "./Features/Roles/ActionBase";
import useGameFlow from "./Hooks/useGameFlow";

function App() {
  const { mustDiscardCards } = useGameFlow();

  return (
    <div className="d-flex flex-column">
      <Header />
      {mustDiscardCards ? (
        <DiscardCards />
      ) : (
        <>
          <PandemicMap />
          <ActionBase />
          <Footer />
        </>
      )}
    </div>
  );
}

// Place one cube on city equal to infection rate
// If city already has 3 cubes of that color, outbreak occurs
// Outbreak: place one cube on each connected city
// If any connected city already has 3 cubes of that color, chain reaction outbreak occurs
// Keep track of cities that have already had an outbreak this turn to prevent infinite loops

export default App;
