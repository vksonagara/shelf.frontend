import React from "react";
import { useEffect, useState } from "react";
import { Form, InputGroup, Badge, Dropdown } from "react-bootstrap";
import notesApi from "../../../api/notes";
import {
  createNote,
  getAllNotes,
  resetNotes,
  deleteNote,
  changeCurrentNote,
  getAllArchivedNotes,
} from "../../../redux/notes";
import { useDispatch, useSelector } from "react-redux";
import { changeCurrentFolder, getAllFolders } from "../../../redux/folders";
import DeleteModal from "../../common/DeleteModal";
import RestoreModal from "../../common/Restoremodal";

const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
  <a
    href=""
    ref={ref}
    onClick={(e) => {
      e.preventDefault();
      onClick(e);
    }}
  >
    {/* Render custom icon here */}
    <i
      class="bi bi-three-dots-vertical"
      style={{
        color: "white",
      }}
    ></i>
    {children}
  </a>
));

function NoteList() {
  const dispatch = useDispatch();
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

  const [showMoveModal, setMoveModal] = useState({
    value: false,
    id: "",
  });
  const handleMoveModalClose = (id) =>
    setMoveModal({
      value: false,
      id: id,
    });
  const handleMoveModalShow = (id) =>
    setMoveModal({
      value: true,
      id: id,
    });
  return (
    <div
      id="notesContainer"
      style={{
        overflowY: "auto",
        height: "calc(100vh - 170px)",
      }}
    >
      {notes.map((note) => {
        const { id } = note;
        return (
          <section
            className={`notes ${id == currentNoteId ? "active-note" : ""}`}
          >
            <div
              onClick={() => {
                dispatch(changeCurrentNote(note));
              }}
            >
              <i class="bi bi-journal folder-icon"></i>
              <div>
                <p className="notes-para1">{note.title}</p>
                <p className="notes-para2">{note.updatedAt}</p>
              </div>
            </div>
            <Dropdown>
              <Dropdown.Toggle
                as={CustomToggle}
                id="dropdown-custom-components"
              ></Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item
                  eventKey="2"
                  onClick={() => {
                    handleDeleteModalShow(id);
                  }}
                >
                  Delete
                </Dropdown.Item>
                <Dropdown.Item
                  eventKey="2"
                  onClick={() => {
                    handleMoveModalShow(id);
                  }}
                >
                  Move
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </section>
        );
      })}
      <DeleteModal
        for="notes"
        show={showDeleteModal}
        handleClose={handleDeleteModalClose}
        handleShow={handleDeleteModalShow}
      />
      <RestoreModal
        show={showMoveModal}
        handleClose={handleMoveModalClose}
        handleShow={handleMoveModalShow}
      />
    </div>
  );
}

function ArchiveNoteList() {
  const dispatch = useDispatch();
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

  // State for delete modal
  const [showRestoreModal, setRestoreModal] = useState({
    value: false,
    id: "",
  });
  const handleRestoreModalClose = (id) =>
    setRestoreModal({
      value: false,
      id: id,
    });
  const handleRestoreModalShow = (id) =>
    setRestoreModal({
      value: true,
      id: id,
    });
  return (
    <div
      id="notesContainer"
      style={{
        overflowY: "auto",
        height: "calc(100vh - 120px)",
      }}
    >
      {notes.map((note) => {
        const { _id } = note;
        return (
          <section
            className={`notes ${_id == currentNoteId ? "active-note" : ""}`}
          >
            <div
              onClick={() => {
                dispatch(changeCurrentNote(note));
              }}
            >
              <i class="bi bi-journal folder-icon"></i>
              <div>
                <p className="notes-para1">{note.title}</p>
                <p className="notes-para2">{note.deletedAt}</p>
              </div>
            </div>
            <Dropdown>
              <Dropdown.Toggle
                as={CustomToggle}
                id="dropdown-custom-components"
              ></Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item
                  eventKey="2"
                  onClick={() => {
                    handleDeleteModalShow(_id);
                  }}
                >
                  Delete
                </Dropdown.Item>
                <Dropdown.Item
                  eventKey="2"
                  onClick={() => {
                    handleRestoreModalShow(_id);
                  }}
                >
                  Restore
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </section>
        );
      })}
      <DeleteModal
        for="archive"
        show={showDeleteModal}
        handleClose={handleDeleteModalClose}
        handleShow={handleDeleteModalShow}
      />
      <RestoreModal
        for="archive"
        show={showRestoreModal}
        handleClose={handleRestoreModalClose}
        handleShow={handleRestoreModalShow}
      />
    </div>
  );
}

function Footer() {
  const dispatch = useDispatch();
  const { folders, currentFolderId } = useSelector((state) => state.folders);
  const { notes, currentNoteId } = useSelector((state) => state.notes);
  return (
    <div
      className="d-flex align-items-center justify-content-center"
      style={{
        height: "50px",
      }}
    >
      <div
        className="d-flex align-items-center"
        style={{
          cursor: "pointer",
        }}
        onClick={async () => {
          const { data, error } = await notesApi.createnote(currentFolderId);
          if (!error) {
            dispatch(createNote(data));

            const { data: folderData, error: folderError } =
              await notesApi.getFolders();

            if (!folderError) {
              dispatch(getAllFolders(folderData));
            }
          }
        }}
      >
        <i className="bi bi-plus-circle mr-1 icon-20"></i>
        <p
          className="mb-0"
          style={{
            fontSize: "14px",
            fontWeight: "600",
          }}
        >
          New Note
        </p>
      </div>
    </div>
  );
}

function NotesContainer() {
  const dispatch = useDispatch();
  const { folders, currentFolderId } = useSelector((state) => state.folders);
  const { notes, currentNoteId } = useSelector((state) => state.notes);

  function changeContainerState() {
    document.querySelector(".notes-container").classList.add("animation");
    document.querySelector(".folder-container").classList.add("animation");
    document
      .querySelector(".content-container")
      .classList.add("new-content-container");
    document.querySelector(".collapse-icon").style.display = "";
    document.querySelector(".demo-wrapper").classList.add("new-demo-wrapper");
  }

  useEffect(() => {
    if (currentFolderId == "archive") {
      notesApi.getAllArchivedNotes().then(({ error, data }) => {
        if (!error) {
          dispatch(getAllArchivedNotes(data));
        }
      });
    } else if (currentFolderId) {
      notesApi.getAllNotes(currentFolderId).then(({ error, data }) => {
        if (!error) {
          dispatch(getAllNotes(data));
        }
      });
    } else {
      dispatch(resetNotes());
    }
  }, [currentFolderId]);
  return (
    <div className="notes-container">
      {currentNoteId && (
        <i
          class="bi bi-caret-left-square icon-28"
          style={{
            position: "absolute",
            right: "-10px",
            color: "black",
            top: "40%",
          }}
          onClick={changeContainerState}
        ></i>
      )}
      {/* notes Container Header  */}
      <div
        style={{
          height: "90px",
        }}
      >
        <Form className="d-flex">
          <Form.Group
            controlId="exampleForm.SelectCustom"
            style={{
              margin: "0",
              width: "220px",
            }}
            className="d-flex justify-content-between align-items-center"
          >
            <InputGroup>
              <InputGroup.Prepend>
                <InputGroup.Text>
                  <i class="bi bi-sort-down"></i>
                </InputGroup.Text>
              </InputGroup.Prepend>
              <Form.Control
                as="select"
                custom
                className="input notes-container-sort"
                style={{
                  margin: "0",
                  width: "140px",
                }}
              >
                <option>Sort By</option>
                <option>Notes</option>
                <option>Created At</option>
              </Form.Control>
            </InputGroup>
          </Form.Group>
        </Form>
        <p
          style={{
            margin: "1rem 0",
            fontSize: "0.75rem",
            fontWeight: "600",
          }}
        >
          Notes
        </p>
      </div>
      {/* Notes container body  */}
      {(currentFolderId == "archive" && <ArchiveNoteList />) || <NoteList />}
      {/* notes container footer  */}
      {currentFolderId !== "archive" && <Footer />}
    </div>
  );
}

export default NotesContainer;
