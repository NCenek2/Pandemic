import { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import PandemicMap from "./PandemicMap";

const CardSelect = () => {
  const [show, setShow] = useState(true);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Launch static backdrop modal
      </Button>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        fullscreen="fullscreen"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Modal title</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          I will not close if you click outside me. Do not even try to press
          escape key.
        </Modal.Body>
        <Modal.Footer>
          <PandemicMap />
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default CardSelect;
