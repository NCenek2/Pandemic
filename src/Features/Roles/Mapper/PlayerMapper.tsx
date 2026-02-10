import usePlayer from "../../../Hooks/usePlayer";

const PlayerMapper = () => {
  const { selectedPlayer } = usePlayer();
  return (
    <div className="d-flex justify-content-center align-items-center">
      <h4>{selectedPlayer?.role.name ?? "No Player"}</h4>
    </div>
  );
};

export default PlayerMapper;
