import React from "react";
import { useEffect } from "react";
import { Form, InputGroup, Badge, Dropdown } from "react-bootstrap";
import notesApi from "../../../api/notes";
import {
  createNote,
  getAllNotes,
  resetNotes,
  deleteNote,
  changeCurrentNote
} from "../../../redux/notes";
import { useDispatch, useSelector } from "react-redux";
import { changeCurrentFolder, getAllFolders } from "../../../redux/folders";

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

function NotesContainer() {
  const dispatch = useDispatch();
  const { folders, currentFolderId } = useSelector((state) => state.folders);
  const { notes, currentNoteId } = useSelector((state) => state.notes);

  useEffect(() => {
    if (currentFolderId) {
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
    <div
      style={{
        backgroundColor: "rgb(47 86 123)",
        width: "400px",
        height: "100vh",
        padding: "1rem 1rem",
        color: "white",
        display: "flex",
        flexDirection: "column",
      }}
    >
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
                className="input"
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
            <section className={`notes ${
              id == currentNoteId ? "active-note" : ""
            }`}>
              <div  onClick={() => {
                  dispatch(changeCurrentNote(note));
                }}> 
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
                    onClick={async () => {
                      const { data, error } = await notesApi.deleteNote(id);
                      if (!error) {
                        dispatch(deleteNote(note));
                        const { data: folderData, error: folderError } =
                          await notesApi.getFolders();
                        if (!folderError) {
                          dispatch(getAllFolders(folderData));
                        }
                      }
                    }}
                  >
                    Delete
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </section>
          );
        })}
      </div>
      {/* notes container footer  */}
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
    </div>
  );
}

export default NotesContainer;
