import usePlayer from "../../../Hooks/usePlayer";

const CityCardMapper = () => {
  const { selectedCard, selectedCity } = usePlayer();
  return (
    <div className="d-flex justify-content-center align-items-center">
      <h4>{selectedCard?.title ?? "No Card"}</h4>
      <h4>{selectedCity?.name ?? "No City"}</h4>
    </div>
  );
};

export default CityCardMapper;
