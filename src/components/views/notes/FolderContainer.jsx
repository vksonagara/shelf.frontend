import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import CreateFolderModal from "../../common/CreateFolderModal";
import notesApi from "../../../api/notes";
import {
  getAllFolders,
  deleteFolder,
  changeCurrentFolder,
} from "../../../redux/folders";
import RenameFolderModal from "../../common/RenameFolderModal";
import DeleteModal from "../../common/DeleteModal";

// used Custom

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
      className="bi bi-three-dots-vertical"
      style={{
        color: "white",
      }}
    ></i>
    {children}
  </a>
));

function FolderContainer() {
  // State for create Folder modal
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // State for rename folder modal
  const [showRenameModal, setRenameModal] = useState({
    value: false,
    id: "",
  });
  const handleRenameModalClose = (id) =>
    setRenameModal({
      value: false,
      id: id,
    });
  const handleRenameModalShow = (id) =>
    setRenameModal({
      value: true,
      id: id,
    });

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

  const dispatch = useDispatch();
  const { folders, currentFolderId } = useSelector((state) => state.folders);
  const { notes, currentNoteId } = useSelector((state) => state.notes);

  // Using useEffect to get all folder data after rendor
  useEffect(() => {
    notesApi.getFolders().then(({ error, data }) => {
      if (!error) {
        dispatch(getAllFolders(data));
      }
    });
  }, []);
  return (
    <div
      style={{
        height: "100vh",
        padding: "1rem 1rem",
        backgroundColor: "rgb(29 50 70)",
        color: "white",
        display: "flex",
        flexDirection: "column",
      }}
      className="folder-container"
    >
      {/* Folder Container Header  */}
      <div
        style={{
          height: "90px",
        }}
      >
        <form>
          <div
            controlId="exampleForm.SelectCustom"
            style={{
              margin: "0",
            }}
            className="d-flex justify-content-between align-items-center"
          >
            <div>
              <div>
                <div>
                  <i class="bi bi-sort-down"></i>
                </div>
              </div>
              <select
                as="select"
                custom
                className="input folder-container-sort"
                style={{
                  margin: "0",
                }}
              >
                <option>Sort By</option>
                <option>Notes</option>
                <option>Created At</option>
              </select>
            </div>
          </div>
        </form>
        <p
          style={{
            margin: "1rem 0",
            fontSize: "0.75rem",
            fontWeight: "600",
          }}
        >
          Folders
        </p>
      </div>
      {/* folder container body  */}
      <div
        id="foldersContainer"
        style={{
          overflowY: "auto",
          height: "calc(100vh - 170px)",
        }}
      >
        <section
          className={`folder ${
            "archive" == currentFolderId ? "active-folder" : ""
          }`}
          style={{
            cursor: "pointer",
          }}
        >
          <div
            onClick={async () => {
              dispatch(changeCurrentFolder("archive"));
            }}
          >
            <i className="bi bi-folder folder-icon">
              <div className="badge"></div>
            </i>
            <div>
              <p className="folder-para1">Archive</p>
              <p className="folder-para2"></p>
            </div>
          </div>
          <div>
            <div as={CustomToggle} id="div-custom-components"></div>

            <div>
              <div
                eventKey="1"
                onClick={() => {
                  // handleRenameModalShow(id);
                }}
              >
                Delete All Archived notes
              </div>
              <div
                eventKey="1"
                onClick={() => {
                  // handleRenameModalShow(id);
                }}
              >
                Restore All Archived notes
              </div>
            </div>
          </div>
        </section>
        {folders.map((folder) => {
          const { id } = folder;
          return (
            <section
              className={`folder ${
                id == currentFolderId ? "active-folder" : ""
              }`}
              style={{
                cursor: "pointer",
              }}
            >
              <div
                onClick={() => {
                  dispatch(changeCurrentFolder(id));
                }}
              >
                <i className="bi bi-folder folder-icon">
                  <div className="badge">{folder.notesCount}</div>
                </i>
                <div>
                  <p className="folder-para1">{folder.name}</p>
                  <p className="folder-para2">{folder.updatedAt}</p>
                </div>
              </div>
              <div>
                <div as={CustomToggle} id="div-custom-components"></div>

                <div>
                  <div
                    eventKey="1"
                    onClick={() => {
                      handleRenameModalShow(id);
                    }}
                  >
                    Rename
                  </div>
                  <div
                    eventKey="2"
                    onClick={() => {
                      handleDeleteModalShow(id);
                    }}
                  >
                    Delete
                  </div>
                </div>
              </div>
            </section>
          );
        })}
      </div>

      {/* folder container footer  */}
      <div
        className="d-flex aligns-center justify-content-center"
        style={{
          height: "50px",
        }}
      >
        <div
          className="d-flex align-items-center"
          style={{
            cursor: "pointer",
          }}
          onClick={() => {
            handleShow();
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
            New Folder
          </p>
        </div>
      </div>
      {/* create folder modal  */}
      <CreateFolderModal
        show={show}
        handleClose={handleClose}
        handleShow={handleShow}
      />
      {/* rename folder modal  */}
      <RenameFolderModal
        show={showRenameModal}
        handleClose={handleRenameModalClose}
        handleShow={handleRenameModalShow}
      />
      <DeleteModal
        for="folder"
        show={showDeleteModal}
        handleClose={handleDeleteModalClose}
        handleShow={handleDeleteModalShow}
      />
    </div>
  );
}

export default FolderContainer;
