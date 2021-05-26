import ContentContainer from "./ContentContainer";
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
      <ContentContainer />
    </div>
  );
}

export default NotesDashboard;
