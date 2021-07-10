import { useEffect, useState } from "react";
import Modal from "./Modal/Modal";
import { useDispatch, useSelector } from "react-redux";
import notesApi from "../../api/notes";
import { moveNote } from "../../redux/notes";
import { getAllFolders } from "../../redux/folders";

// Movemodal component

function MoveModal(prop) {
  const dispatch = useDispatch();
  const { folders, currentFolderId } = useSelector((state) => state.folders);
  const [currentOptionForMove, setCurrentOptionForMove] = useState(
    (folders[0] && folders[0].id != currentFolderId && folders[0].id) ||
      (folders[1] && folders[1].id != currentFolderId && folders[1].id) ||
      ""
  );
  useEffect(() => {
    setCurrentOptionForMove(
      (folders[0] && folders[0].id != currentFolderId && folders[0].id) ||
        (folders[1] && folders[1].id != currentFolderId && folders[1].id) ||
        ""
    );
  }, [currentFolderId]);

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
    <Modal
      show={prop.show}
      handleClose={prop.handleClose}
      func={moveNoteInOtherFolder}
      type="Move"
      title="Select a folder to move Note"
    >
      <select
        value={currentOptionForMove}
        onChange={(e) => {
          setCurrentOptionForMove(e.target.value);
        }}
        className="w-full p-2"
      >
        {folders.map((folder, index) => {
          if (folder.id != currentFolderId) {
            return (
              <option value={folder.id} key={index}>
                {folder.name}
              </option>
            );
          }
        })}
      </select>
    </Modal>
  );
}

export default MoveModal;
