import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import notesApi from "../../api/notes";
import { restoreArchiveNote } from "../../redux/notes";
import { getAllFolders } from "../../redux/folders";
import Modal from "./Modal/Modal";

function RestoreModal(prop) {
  const dispatch = useDispatch();
  const { folders, currentFolderId } = useSelector((state) => state.folders);
  const [currentOptionForRestore, setCurrentOptionForRestore] = useState(
    (folders[0] && folders[0].id) || ""
  );

  async function restoreNote() {
    const { data, error } = await notesApi.restoreArchivedNote({
      noteId: prop.show.id,
      folderId: currentOptionForRestore,
    });
    if (!error) {
      dispatch(restoreArchiveNote(prop.show.id));
      const { data: folderData, error: folderError } =
        await notesApi.getFolders();
      dispatch(getAllFolders(folderData));
    }
    prop.handleClose();
  }
  return (
    <Modal
      show={prop.show}
      handleClose={prop.handleClose}
      func={restoreNote}
      type="Restore"
      title="Select a folder to restore note"
    >
      <select
        value={currentOptionForRestore}
        onChange={(e) => {
          setCurrentOptionForRestore(e.target.value);
        }}
        className="w-full p-2"
      >
        {folders.map((folder) => {
          return <option value={folder.id}>{folder.name}</option>;
        })}
      </select>
    </Modal>
  );
}

export default RestoreModal;
