import { Button } from "react-bootstrap";
import useGame from "../Hooks/useGame";
import { usePlayer } from "../Hooks/usePlayer";

type CureStatusesProps = {
  suffix: string;
};

const CureStatuses = ({ suffix }: CureStatusesProps) => {
  const { cures } = useGame();
  const { selectedColor, setSelectedColor } = usePlayer();

  const getVariant = (color: string) => {
    if (color === "Red")
      return color === selectedColor ? "danger" : "outline-danger";
    if (color === "Blue")
      return color === selectedColor ? "info" : "outline-info";
    if (color === "Yellow")
      return color === selectedColor ? "warning" : "outline-warning";
    if (color === "Black")
      return color === selectedColor ? "dark" : "outline-dark";
    return "success";
  };

  return (
    <div className="d-flex justify-content-center">
      {cures.map((cure) => (
        <Button
          key={`Cure_${cure.color}${suffix}`}
          className="me-2 btn-white btn-sm"
          variant={getVariant(cure.color)}
          onClick={() => setSelectedColor(cure.color)}
        >
          {cure.cured ? "\u2713" : "\u2717"}
        </Button>
      ))}
    </div>
  );
};

export default CureStatuses;
