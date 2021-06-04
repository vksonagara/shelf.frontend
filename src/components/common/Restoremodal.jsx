import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import notesApi from "../../api/notes";
import { restoreArchiveNote, moveNote } from "../../redux/notes";
import { getAllFolders } from "../../redux/folders";

function RestoreModal(prop) {
  const dispatch = useDispatch();
  const { folders, currentFolderId } = useSelector((state) => state.folders);
  const { notes, currentNoteId, currentNoteTitle } = useSelector(
    (state) => state.notes
  );
  const [currentOptionForRestore, setCurrentOptionForRestore] = useState(
    (folders[0] && folders[0].id) || ""
  );
  const [currentOptionForMove, setCurrentOptionForMove] = useState(
    (folders[0] && folders[0].id != currentFolderId && folders[0].id) ||
      (folders[1] && folders[1].id != currentFolderId && folders[1].id) ||
      ""
  );
  useEffect(() => {
    setCurrentOptionForMove(
      (folders[1] && folders[0].id != currentFolderId && folders[0].id) ||
        (folders[0] && folders[0].id != currentFolderId && folders[0].id) ||
        ""
    );
  }, currentFolderId);

  if (prop.for == "archive") {
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
      <div show={prop.show.value} onHide={prop.handleClose} centered>
        <div closeButton>
          <div>Restore div</div>
        </div>
        <div>
          Please select a folder to restore
          <input
            as="select"
            custom
            className="input"
            value={currentOptionForRestore}
            onChange={(e) => {
              console.log(e.target.value);
              setCurrentOptionForRestore(e.target.value);
            }}
          />
          {folders.map((folder) => {
            return <option value={folder.id}>{folder.name}</option>;
          })}
        </div>
        <div>
          <button variant="secondary" onClick={prop.handleClose}>
            Cancel
          </button>
          <button
            variant="primary"
            onClick={() => {
              restoreNote();
            }}
          >
            Restore
          </button>
        </div>
      </div>
    );
  } else {
    async function moveNoteInOtherFolder() {
      const { data, error } = await notesApi.moveNote({
        noteId: prop.show.id,
        folderId: currentOptionForMove,
      });
      if (!error) {
        dispatch(moveNote(prop.show.id));
        const { data: folderData, error: folderError } =
          await notesApi.getFolders();
        dispatch(getAllFolders(folderData));
      }
      prop.handleClose();
    }
    return (
      <div show={prop.show.value} onHide={prop.handleClose} centered>
        <div closebutton>
          <div>Restore div</div>
        </div>
        <div>
          Please select a folder to restore
          <input
            as="select"
            custom
            className="input"
            value={currentOptionForMove}
            onChange={(e) => {
              setCurrentOptionForMove(e.target.value);
            }}
          />
          {folders.map((folder) => {
            if (folder.id != currentFolderId) {
              return <option value={folder.id}>{folder.name}</option>;
            }
          })}
        </div>
        <div>
          <button variant="secondary" onClick={prop.handleClose}>
            Cancel
          </button>
          <button
            variant="primary"
            onClick={() => {
              moveNoteInOtherFolder();
            }}
          >
            Restore
          </button>
        </div>
      </div>
    );
  }
}

export default RestoreModal;
