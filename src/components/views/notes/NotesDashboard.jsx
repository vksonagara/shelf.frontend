import ContentContainer from "./ContentContainer";
import FolderContainer from "./FolderContainer";
import NotesContainer from "./NotesContainer";
import { useSelector } from "react-redux";

// Dashboard for notes app
function NotesDashboard() {
  const { folders, currentFolderId } = useSelector((state) => state.folders);
  const { notes, currentNoteId } = useSelector((state) => state.notes);
  return (
    <div className="notes-dashboard relative flex w-full overflow-hidden h-screen">
      <FolderContainer />
      {currentFolderId && <NotesContainer />}
      {!currentFolderId && (
        <div
          className="flex items-center justify-center flex-col"
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
          className="flex items-center justify-center flex-col"
          style={{
            width: "59%",
          }}
        >
          <i class="bi bi-journal-plus icon-28"></i>
          <h5>No note selected</h5>
        </div>
      )}
      {currentNoteId && currentFolderId && <ContentContainer />}
    </div>
  );
}

export default NotesDashboard;
