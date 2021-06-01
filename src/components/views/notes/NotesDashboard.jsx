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
      {currentNoteId && currentFolderId && <ContentContainer />}
    </div>
  );
}

export default NotesDashboard;
