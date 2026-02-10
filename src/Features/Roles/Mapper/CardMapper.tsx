import usePlayer from "../../../Hooks/usePlayer";

const CardMapper = () => {
  const { selectedCard } = usePlayer();
  return (
    <div className="d-flex justify-content-center align-items-center">
      <h4>{selectedCard?.title ?? "No Card"}</h4>
    </div>
  );
};

export default CardMapper;
