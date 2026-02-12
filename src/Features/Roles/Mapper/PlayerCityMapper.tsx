import usePlayer from "../../../Hooks/usePlayer";

const PlayerCityMapper = () => {
  const { selectedPlayer, selectedCity } = usePlayer();
  return (
    <div className="d-flex justify-content-evenly align-items-center w-100">
      <div>
        <h4>{selectedPlayer?.role.name ?? "No Player"}</h4>
      </div>
      <div>
        <h4>{selectedCity?.name ?? "No City"}</h4>
      </div>
    </div>
  );
};

export default PlayerCityMapper;
