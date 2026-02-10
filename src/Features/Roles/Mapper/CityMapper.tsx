import usePlayer from "../../../Hooks/usePlayer";

const CityMapper = () => {
  const { selectedCity } = usePlayer();
  return (
    <div className="d-flex justify-content-center align-items-center">
      <h4>{selectedCity?.name ?? "No City"}</h4>
    </div>
  );
};

export default CityMapper;
