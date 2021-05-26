import FolderContainer from "./FolderContainer";
import NotesContainer from "./NotesContainer";

// Dashboard for notes app
function NotesDashboard() {
  return (
    <div
      style={{
        position: "relative",
        left: "75px",
        display: "flex",
      }}
    >
      <FolderContainer />
      <NotesContainer />
    </div>
  );
}

export default NotesDashboard;
