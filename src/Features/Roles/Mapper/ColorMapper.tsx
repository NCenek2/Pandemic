import usePlayer from "../../../Hooks/usePlayer";

const ColorMapper = () => {
  const { selectedColor } = usePlayer();
  return (
    <div className="d-flex justify-content-center align-items-center">
      <h4>{selectedColor ?? "No Color"}</h4>
    </div>
  );
};

export default ColorMapper;
