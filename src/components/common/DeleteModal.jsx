import { Modal, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import notesApi from "../../api/notes";
import { deleteFolder } from "../../redux/folders";

function DeleteModal(prop) {
  const dispatch = useDispatch();
  const { folders, currentFolderId } = useSelector((state) => state.folders);
  let currentFolderName = folders.filter((folder) => {
    if (folder.id == prop.show.id) {
      return folder.name;
    }
  });
  if (currentFolderName[0] && currentFolderName[0].name) {
    currentFolderName = currentFolderName[0].name;
  }
  async function deleteCurrentFolder(id) {
    console.log(id);
    const { data, error } = await notesApi.deletefolder(id);
    if (!error) {
      dispatch(deleteFolder(id));
      prop.handleClose();
    }
  }
  return (
    <Modal show={prop.show.value} onHide={prop.handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Modal heading</Modal.Title>
      </Modal.Header>
      <Modal.Body>Sure Wanna Delete {currentFolderName}</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={prop.handleClose}>
          Cancel
        </Button>
        <Button
          variant="primary"
          onClick={() => {
            deleteCurrentFolder(prop.show.id);
          }}
        >
          Delete
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default DeleteModal;
