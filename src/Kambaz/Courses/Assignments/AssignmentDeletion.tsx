import { Modal, Button } from "react-bootstrap";

export default function AssignmentDeletion({ show, handleClose, dialogTitle, deleteAssignment}: {
 show: boolean; handleClose: () => void; dialogTitle: string; deleteAssignment: () => void; }) {

    return (
  <Modal show={show} onHide={handleClose}>
   <Modal.Header closeButton>
    <Modal.Title>{dialogTitle}</Modal.Title>
   </Modal.Header>
   <Modal.Body>
   </Modal.Body>
   <Modal.Footer>
    <Button variant="secondary" onClick={handleClose}> Cancel </Button>
    <Button variant="primary"
     onClick={() => {
      deleteAssignment();
      handleClose();
     }} > Confirm </Button>
   </Modal.Footer>
  </Modal>
);}
