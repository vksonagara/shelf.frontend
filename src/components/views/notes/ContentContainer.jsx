import { useEffect, useRef, useState } from "react";
import { Form, InputGroup, FormControl } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import notesApi from "../../../api/notes";
import { updateNote } from "../../../redux/notes";
import DeleteModal from "../../common/DeleteModal";
import NoteEditor from "./NoteEditor";

function TitleInput() {
  const [isDisabled, setDisabled] = useState(true);
  const [isVisible, setVisible] = useState(true);
  const [titleInput, setTitleInput] = useState("");

  const dispatch = useDispatch();
  const { folders, currentFolderId } = useSelector((state) => state.folders);
  const { notes, currentNoteId, currentNoteTitle } = useSelector(
    (state) => state.notes
  );
  const noteTitleRef = useRef(null);

  useEffect(() => {
    setTitleInput(currentNoteTitle || "");
  }, [currentNoteId]);

  function editNoteName() {
    setDisabled(false);
    setVisible(false);
    noteTitleRef.current.focus();
  }
  function cancelEditNoteName() {
    setDisabled(true);
    setVisible(true);
    setTitleInput(currentNoteTitle || "");
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
        width: "100%",
        // padding: "1rem 0",
      }}
    >
      <div
        style={{
          // backgroundColor: "rgb(0, 79, 154)",
          padding: "1rem 0",
          width: "80%",
          margin: "0 auto",
        }}
      >
        <InputGroup>
          <Form.Control
            plaintext
            disabled={isDisabled}
            value={titleInput}
            className="note-name"
            onChange={(e) => {
              setTitleInput(e.target.value);
            }}
            id="noteTitle"
            ref={noteTitleRef}
          />
          {currentFolderId !== "archive" && (
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
                  className="bi bi-pencil"
                  style={{
                    color: "black",
                  }}
                ></i>
              </InputGroup.Text>
            </InputGroup.Prepend>
          )}
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
              <i className="bi bi-save" style={{}}></i>
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
              <i className="bi bi-x" style={{}}></i>
            </InputGroup.Text>
          </InputGroup.Prepend>
        </InputGroup>
      </div>
    </div>
  );
}

function ContentContainer() {
  const { folders, currentFolderId } = useSelector((state) => state.folders);
  const { notes, currentNoteId } = useSelector((state) => state.notes);
  // State for delete modal
  const [showDeleteModal, setDeleteModal] = useState({
    value: false,
    id: "",
  });
  const handleDeleteModalClose = (id) =>
    setDeleteModal({
      value: false,
      id: id,
    });
  const handleDeleteModalShow = (id) =>
    setDeleteModal({
      value: true,
      id: id,
    });
  // state for archive modal
  const [showArchiveDeleteModal, setArchiveDeleteModal] = useState({
    value: false,
    id: "",
  });
  const handleArchiveDeleteModalClose = (id) =>
    setArchiveDeleteModal({
      value: false,
      id: id,
    });
  const handleArchiveDeleteModalShow = (id) =>
    setArchiveDeleteModal({
      value: true,
      id: id,
    });
  return (
    <div className="content-container">
      <header
        style={{
          padding: "0.5rem 0.5rem",
          color: "white",
        }}
        className="bg-primary d-flex justify-content-between align-items-center"
      >
        <div>
          <i
            className="bi bi-trash icon-20"
            onClick={() => {
              currentFolderId == "archive"
                ? handleArchiveDeleteModalShow(currentNoteId)
                : handleDeleteModalShow(currentNoteId);
            }}
          ></i>
          <i className="bi bi-download icon-20 ml-4"></i>
        </div>

        <InputGroup
          style={{
            width: "300px",
          }}
        >
          <FormControl type="text" placeholder="Search..." />
          <div
            style={{
              position: "absolute",
              right: "10px",
              top: "5px",
              zIndex: "9999",
            }}
          >
            <i
              className="bi bi-search icon-20"
              style={{
                color: "black",
              }}
            ></i>
          </div>
        </InputGroup>
      </header>
      <TitleInput />
      <NoteEditor />
      <DeleteModal
        for="notes"
        show={showDeleteModal}
        handleClose={handleDeleteModalClose}
        handleShow={handleDeleteModalShow}
      />
      <DeleteModal
        for="archive"
        show={showArchiveDeleteModal}
        handleClose={handleArchiveDeleteModalClose}
        handleShow={handleArchiveDeleteModalShow}
      />
    </div>
  );
}

export default ContentContainer;
