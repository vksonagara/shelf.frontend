import FolderContainer from "./FolderContainer";
import NotesContainer from "./NotesContainer";

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
      {/* Notes Container  */}
    </div>
  );
}

export default NotesDashboard;
