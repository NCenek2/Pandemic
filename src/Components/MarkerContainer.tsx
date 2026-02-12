import useGame from "../Hooks/useGame";

const MarkerContainer = () => {
  const { outbreakMarker, infectionMarker } = useGame();
  // 0 1 2 Green
  // 3 4 5 Yellow
  // 6 7 Red
  
  const outbreakClassName = `bi bi-${outbreakMarker.outbreaks}-square-fill`;
  const outbreakColor =
    outbreakMarker.outbreaks < 3
      ? "#48b627"
      : outbreakMarker.outbreaks < 6
        ? "#81811c"
        : "#b63827";

  const infectionRateClassName = `bi bi-${infectionMarker.infectionRate}-circle`;
  return (
    <div className="d-flex  gap-3 align-items-center">
      <p>
        Outbreaks:{" "}
        <i className={outbreakClassName} style={{ color: outbreakColor }} />
      </p>
      <p>
        Infection Rate: <i className={infectionRateClassName} />{" "}
      </p>
    </div>
  );
};

export default MarkerContainer;
