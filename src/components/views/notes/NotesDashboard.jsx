import ContentContainer from "./ContentContainer";
import FolderContainer from "./FolderContainer";
import NotesContainer from "./NotesContainer";
import { useSelector } from "react-redux";

// Dashboard for notes app
function NotesDashboard() {
  const { folders, currentFolderId } = useSelector((state) => state.folders);
  const { notes, currentNoteId } = useSelector((state) => state.notes);
  return (
    <div
      style={{
        position: "relative",
        display: "flex",
        width: "100%",
      }}
      className="notes-dashboard"
    >
      <FolderContainer />
      {currentFolderId && <NotesContainer />}
      {!currentFolderId && (
        <div
          className="d-flex align-items-center justify-content-center flex-column"
          style={{
            width: "77%",
          }}
        >
          <i class="bi bi-folder-plus icon-28"></i>
          <h5>Please Create a Folder</h5>
        </div>
      )}
      {currentFolderId && !currentNoteId && (
        <div
          className="d-flex align-items-center justify-content-center flex-column"
          style={{
            width: "59%",
          }}
        >
          <i class="bi bi-journal-plus icon-28"></i>
          <h5>Please Create a Note</h5>
        </div>
      )}
      {currentNoteId && currentFolderId && <ContentContainer />}
    </div>
  );
}

export default NotesDashboard;
