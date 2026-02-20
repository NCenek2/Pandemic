import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import DiscardCards from "./Features/DiscardCards";
import Footer from "./Features/Footer";
import Header from "./Features/Header";
import PandemicMap from "./Features/PandemicMap";
import ActionBase from "./Features/Roles/ActionBase";
import {
  LOST_GAME_URL,
  MAX_OUTBREAKS,
  WON_GAME_URL,
} from "./Game/Constants/Constants";
import { useGame } from "./Hooks/useGame";
import useGameFlow from "./Hooks/useGameFlow";

function App() {
  const { outbreakMarker, cures, gameOver } = useGame();
  const { mustDiscardCards } = useGameFlow();
  const navigate = useNavigate();

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const isCtrlR =
        (event.ctrlKey && event.key.toLowerCase() === "r") ||
        (event.metaKey && event.key.toLowerCase() === "r");

      if (isCtrlR) {
        event.preventDefault(); // Stop browser reload
        navigate("/"); // Navigate to home route
        window.location.reload();
      }
    };

    // Attach event listener
    window.addEventListener("keydown", handleKeyDown);

    // Cleanup on unmount
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  useEffect(() => {
    for (const cure of cures) {
      if (!cure.cured) return;
    }

    navigate(WON_GAME_URL);
  }, [cures]);

  useEffect(() => {
    if (gameOver || outbreakMarker.outbreaks >= MAX_OUTBREAKS) {
      navigate(LOST_GAME_URL);
    }
  }, [outbreakMarker, gameOver]);

  return (
    <div className="d-flex flex-column">
      <Header />
      {mustDiscardCards ? (
        <>
          <PandemicMap />
          <DiscardCards />
        </>
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
