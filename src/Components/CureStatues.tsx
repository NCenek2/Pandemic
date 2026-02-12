import { Button } from "react-bootstrap";
import useGame from "../Hooks/useGame";
import { usePlayer } from "../Hooks/usePlayer";

type CureStatusesProps = {
  suffix: string;
};

const CureStatuses = ({ suffix }: CureStatusesProps) => {
  const { cures } = useGame();
  const { selectedColor, setSelectedColor } = usePlayer();

  const getVariant = (cured: boolean, color: string) => {
    if (color === selectedColor) {
      return cured ? "success" : "danger";
    } else {
      return cured ? "outline-success" : "outline-danger";
    }
  };

  return (
    <div className="d-flex justify-content-center">
      {cures.map((cure) => (
        <Button
          key={`Cure_${cure.color}${suffix}`}
          className="me-2 btn-white btn-sm"
          variant={getVariant(cure.cured, cure.color)}
          onClick={() => setSelectedColor(cure.color)}
        >
          {cure.color} {cure.cured}
        </Button>
      ))}
    </div>
  );
};

export default CureStatuses;
