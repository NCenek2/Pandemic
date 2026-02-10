import CureStatuses from "../Components/CureStatues";
import MarkerContainer from "../Components/MarkerContainer";

const Header = () => {
  return (
    <header className="d-flex align-items-center justify-content-between">
      <h1>Pandemic</h1>

      <MarkerContainer />
      <CureStatuses suffix="_Header" />
    </header>
  );
};

export default Header;
