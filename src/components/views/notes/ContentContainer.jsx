import { useEffect, useState } from "react";
import { Form, InputGroup } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import notesApi from "../../../api/notes";
import { updateNote } from "../../../redux/notes";

function TitleInput() {
  const [isDisabled, setDisabled] = useState(true);
  const [isVisible, setVisible] = useState(true);
  const [titleInput, setTitleInput] = useState("");

  const dispatch = useDispatch();
  const { folders, currentFolderId } = useSelector((state) => state.folders);
  const { notes, currentNoteId, currentNoteTitle } = useSelector(
    (state) => state.notes
  );

  useEffect(() => {
    setTitleInput(currentNoteTitle || "");
  }, [currentNoteId]);

  function editNoteName() {
    setDisabled(false);
    setVisible(false);
  }
  function cancelEditNoteName() {
    setDisabled(true);
    setVisible(true);
  }
  async function saveNoteName() {
    // let newNoteName = document.querySelector(".note-name");
    const { data, error } = await notesApi.updateNoteTitle({
      noteId: currentNoteId,
      title: titleInput,
    });
    if (!error) {
      dispatch(updateNote({ id: currentNoteId, title: titleInput }));
    }
    setDisabled(true);
    setVisible(true);
  }
  return (
    <div
      style={{
        backgroundColor: "gray",
        width: "100%",
        padding: "1rem 2rem",
      }}
    >
      <div
        style={{
          backgroundColor: "rgb(0, 79, 154)",
          padding: "1rem 1rem",
          color: "black",
          width: "90%",
        }}
      >
        <InputGroup>
          <Form.Control
            plaintext
            disabled={isDisabled}
            // defaultValue={currentNoteTitle}
            value={titleInput}
            className="note-name"
            onChange={(e) => {
              setTitleInput(e.target.value);
            }}
          />
          <InputGroup.Prepend
            style={{
              cursor: "pointer",
            }}
            className={`${!isVisible && "hidden"}`}
            onClick={() => {
              editNoteName();
            }}
          >
            <InputGroup.Text>
              <i
                class="bi bi-pencil"
                style={{
                  color: "black",
                }}
              ></i>
            </InputGroup.Text>
          </InputGroup.Prepend>
          <InputGroup.Prepend
            style={{
              cursor: "pointer",
            }}
            className={`${isVisible && "hidden"}`}
            onClick={() => {
              saveNoteName();
            }}
          >
            <InputGroup.Text>
              <i class="bi bi-save" style={{}}></i>
            </InputGroup.Text>
          </InputGroup.Prepend>
          <InputGroup.Prepend
            style={{
              cursor: "pointer",
            }}
            className={`${isVisible && "hidden"}`}
            onClick={() => {
              cancelEditNoteName();
            }}
          >
            <InputGroup.Text>
              <i class="bi bi-x" style={{}}></i>
            </InputGroup.Text>
          </InputGroup.Prepend>
        </InputGroup>
      </div>
    </div>
  );
}

function ContentContainer() {
  return (
    <div
      style={{
        width: "100%",
      }}
    >
      <header
        style={{
          height: "80px",
          color: "white",
        }}
        className="bg-primary"
      >
        Header
      </header>
      <TitleInput />
    </div>
  );
}

export default ContentContainer;
