import { useDispatch, useSelector } from "react-redux";
import notesApi from "../../api/notes";
import { deleteFolder, getAllFolders } from "../../redux/folders";
import { deleteNote, getAllNotes, deleteArchiveNote } from "../../redux/notes";
import Modal from "./Modal/Modal";

function DeleteModal(prop) {
  const dispatch = useDispatch();
  const { folders, currentFolderId } = useSelector((state) => state.folders);
  const { notes } = useSelector((state) => state.notes);

  // Modal For Delete folder
  if (prop.for == "folder") {
    let currentFolderName = folders.filter((folder) => {
      if (folder.id == prop.show.id) {
        return folder.name;
      }
    });
    if (currentFolderName[0] && currentFolderName[0].name) {
      currentFolderName = currentFolderName[0].name;
    }
    async function deleteCurrentFolder() {
      const { data, error } = await notesApi.deletefolder(prop.show.id);
      if (!error) {
        dispatch(deleteFolder(prop.show.id));
        prop.handleClose();
      }
    }
    return (
      <Modal
        show={prop.show}
        handleClose={prop.handleClose}
        func={deleteCurrentFolder}
        type="Delete"
        title="Delete Folder"
      >
        Sure Want to Delete {currentFolderName}
      </Modal>
    );
  }

  // Modal for delete note
  else if (prop.for == "notes") {
    let currentNote = notes.filter((note) => {
      if (note.id == prop.show.id) {
        return note.title;
      }
    });
    if (currentNote[0] && currentNote[0].title) {
      currentNote = currentNote[0].title;
    }
    async function deleteCurrentNote() {
      const { data, error } = await notesApi.deleteNote(prop.show.id);
      if (!error) {
        dispatch(deleteNote(prop.show.id));
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
      <Modal
        show={prop.show}
        handleClose={prop.handleClose}
        func={deleteCurrentNote}
        type="Delete"
        title="Delete Note"
      >
        Sure Want to Delete {currentNote}
      </Modal>
    );
  }

  // Modal for delete archive note
  else if (prop.for == "archive") {
    let currentNote = notes.filter((note) => {
      if (note.id == prop.show._id) {
        return note.title;
      }
    });
    if (currentNote[0] && currentNote[0].title) {
      currentNote = currentNote[0].title;
    }
    async function deleteCurrentNote() {
      const { data, error } = await notesApi.deleteArchivedNote(prop.show.id);
      if (!error) {
        dispatch(deleteArchiveNote(prop.show.id));
        prop.handleClose();
      }
    }
    return (
      <Modal
        show={prop.show}
        handleClose={prop.handleClose}
        func={deleteCurrentNote}
        type="Delete"
        title="Delete Note"
      >
        Sure Want to Delete {currentNote}
      </Modal>
    );
  }
}

export default DeleteModal;
