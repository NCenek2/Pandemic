import { Dropdown } from "react-bootstrap";
import ExecuteButton from "../../Components/ExecuteButton";
import useGame from "../../Hooks/useGame";
import usePlayer from "../../Hooks/usePlayer";

const ActionBase = () => {
  const { selectedAction, setSelectedAction } = usePlayer();
  const game = useGame();
  const { currentPlayer } = game;

  return (
    <div className="d-flex justify-content-between">
      <div className="d-flex flex-column align-items-center">
        <h5>{currentPlayer?.role?.name}</h5>
        <Dropdown>
          <Dropdown.Toggle variant="dark" id="dropdown-basic">
            {selectedAction != null
              ? selectedAction.action.Name
              : "Select Action"}
          </Dropdown.Toggle>
          <Dropdown.Menu>
            {currentPlayer != null &&
              Object.entries(currentPlayer.role.actions).map(
                ([name, action]) => (
                  <Dropdown.Item
                    key={name}
                    className="dropdown-item"
                    onClick={() => setSelectedAction(action)}
                  >
                    {name}
                  </Dropdown.Item>
                ),
              )}
          </Dropdown.Menu>
        </Dropdown>
      </div>

      {currentPlayer != null &&
        selectedAction != null &&
        selectedAction.element}

      <ExecuteButton />
    </div>
  );
};

export default ActionBase;
