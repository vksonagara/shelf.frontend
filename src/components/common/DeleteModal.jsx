import { Modal, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import notesApi from "../../api/notes";
import { deleteFolder, getAllFolders } from "../../redux/folders";
import {
  deleteNote,
  resetNotes,
  getAllNotes,
  deleteArchiveNote,
} from "../../redux/notes";

function DeleteModal(prop) {
  const dispatch = useDispatch();
  const { folders, currentFolderId } = useSelector((state) => state.folders);
  const { notes, currentNoteId, currentNoteTitle } = useSelector(
    (state) => state.notes
  );
  if (prop.for == "folder") {
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
          <Modal.Title>Delete Folder</Modal.Title>
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
  } else if (prop.for == "notes") {
    let currentNote = notes.filter((note) => {
      if (note.id == prop.show.id) {
        return note.name;
      }
    });
    if (currentNote[0] && currentNote[0].name) {
      currentNote = currentNote[0].name;
    }
    async function deleteCurrentNote(id) {
      const { data, error } = await notesApi.deleteNote(id);
      if (!error) {
        dispatch(deleteNote(id));
        const { data: noteData, error: noteError } = await notesApi.getAllNotes(
          currentFolderId
        );
        if (!noteError) {
          dispatch(getAllNotes(noteData));
          const { data: folderData, error: folderError } =
            await notesApi.getFolders();
          dispatch(getAllFolders(folderData));
        }
        prop.handleClose();
      }
    }
    return (
      <Modal show={prop.show.value} onHide={prop.handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Delete Note</Modal.Title>
        </Modal.Header>
        <Modal.Body>Sure Wanna Delete {currentNote}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={prop.handleClose}>
            Cancel
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              deleteCurrentNote(prop.show.id);
            }}
          >
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    );
  } else if (prop.for == "archive") {
    let currentNote = notes.filter((note) => {
      if (note.id == prop.show.id) {
        return note.name;
      }
    });
    if (currentNote[0] && currentNote[0].name) {
      currentNote = currentNote[0].name;
    }
    async function deleteCurrentNote(id) {
      const { data, error } = await notesApi.deleteArchivedNote(id);
      if (!error) {
        dispatch(deleteArchiveNote(id));
        // const { data: noteData, error: noteError } =
        //   await notesApi.getAllArchivedNotes();
        // if (!noteError) {

        //   dispatch(getAllNotes(noteData));
        // }
        prop.handleClose();
      }
    }
    return (
      <Modal show={prop.show.value} onHide={prop.handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Delete Note</Modal.Title>
        </Modal.Header>
        <Modal.Body>Sure Wanna Delete {currentNote}, archive</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={prop.handleClose}>
            Cancel
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              deleteCurrentNote(prop.show.id);
            }}
          >
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

export default DeleteModal;
