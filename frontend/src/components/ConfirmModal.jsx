import React from "react";
import { Button, Modal } from "react-bootstrap";

const ConfirmModal = ({
  modalTitle,
  modalBody,
  handleConfirm,
  show,
  handleClose,
}) => {
  return (
    <Modal show={show} onHide={handleClose} className="text-dark">
      <Modal.Header>
        <Modal.Title>{modalTitle}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{modalBody}</Modal.Body>
      <Modal.Footer>
        <form action="">
          <Button variant="danger" onClick={handleClose} className="me-2">
            Cancel
          </Button>
          <Button variant="secondary" onClick={handleConfirm} type="submit">
            Confirm
          </Button>
        </form>
      </Modal.Footer>
    </Modal>
  );
};

export default ConfirmModal;
