import usePlayer from "../../../Hooks/usePlayer";

const PlayerColorMapper = () => {
  const { selectedPlayer, selectedColor } = usePlayer();
  return (
    <div className="d-flex justify-content-center align-items-center">
      <h4>{selectedPlayer?.role.name ?? "No Player"}</h4>
      <h4>{selectedColor ?? "No Color"}</h4>
    </div>
  );
};

export default PlayerColorMapper;
