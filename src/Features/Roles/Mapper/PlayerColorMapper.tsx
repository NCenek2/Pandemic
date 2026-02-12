import usePlayer from "../../../Hooks/usePlayer";

const PlayerColorMapper = () => {
  const { selectedPlayer, selectedColor } = usePlayer();
  return (
    <div className="d-flex justify-content-evenly align-items-center">
      <div>
        <h4>{selectedPlayer?.role.name ?? "No Player"}</h4>
      </div>
      <div>
        <h4>{selectedColor ?? "No Color"}</h4>
      </div>
    </div>
  );
};

export default PlayerColorMapper;
