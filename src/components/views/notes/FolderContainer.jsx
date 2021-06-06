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

// // used Custom

// const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
//   <a
//     href=""
//     ref={ref}
//     onClick={(e) => {
//       e.preventDefault();
//       onClick(e);
//     }}
//   >
//     {/* Render custom icon here */}
//     <i
//       className="bi bi-three-dots-vertical"
//       style={{
//         color: "white",
//       }}
//     ></i>
//     {children}
//   </a>
// ));

// Folder Container component
function FolderContainer() {
  // State for create Folder modal
  const [showCreateModal, setCreateModal] = useState(false);
  const handleCreateModalClose = () => setCreateModal(false);
  const handleCreateModalShow = () => setCreateModal(true);

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

  // Redux state for folder
  const { folders, currentFolderId } = useSelector((state) => state.folders);

  // Redux State for notes
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
        backgroundColor: "rgb(29 50 70)",
      }}
      className="folder-container h-screen p-4 text-white flex flex-col"
    >
      {/* Folder Container Header  */}
      <div className="h-24 text-black ">
        <div className="flex items-center">
          <i class="bi bi-sort-down h-7 bg-white px-2 flex items-center"></i>
          <select className="bg-white h-7 focus:outline-none px-4">
            <option>Sort By</option>
            <option>Notes</option>
            <option>Created At</option>
          </select>
        </div>
        <p className="my-4 text-xs font-semibold text-white">Folders</p>
      </div>

      {/* folder container body  */}
      <div
        id="foldersContainer"
        className="m-4 overflow-y-auto"
        style={{
          height: "calc(100vh - 144px)",
        }}
      >
        <section
          className={`flex justify-between items-center mb-2 ${
            "archive" == currentFolderId ? "active-folder" : ""
          }`}
          style={{
            cursor: "pointer",
          }}
        >
          <div
            // Changing Redux State on Folder Change
            onClick={async () => {
              dispatch(changeCurrentFolder("archive"));
            }}
            className="flex items-center"
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
            <div id="div-custom-components"></div>

            <div>
              <div
                eventKey="1"
                onClick={() => {
                  // handleRenameModalShow(id);
                }}
              >
                Empty Archive
              </div>
            </div>
          </div>
        </section>
        {folders.map((folder) => {
          const { id } = folder;
          return (
            <section
              className={`flex justify-between items-center mb-2 ${
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
                className="flex items-center"
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
                <div id="div-custom-components"></div>

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
      <div className="flex items-center justify-center h-12">
        <div
          className="flex items-center cursor-pointer"
          // Showing Create Folder modal onclick
          onClick={() => {
            handleCreateModalShow();
          }}
        >
          <i className="bi bi-plus-circle mr-1 text-base"></i>
          <p className="mb-0 font-semibold text-sm">New Folder</p>
        </div>
      </div>
      {/* create folder modal  */}
      {/* <CreateFolderModal
        show={showCreateModal}
        handleClose={handleCreateModalClose}
        handleShow={handleCreateModalShow}
      /> */}
      {/* rename folder modal  */}
      {/* <RenameFolderModal
        show={showRenameModal}
        handleClose={handleRenameModalClose}
        handleShow={handleRenameModalShow}
      /> */}
      {/* <DeleteModal
        for="folder"
        show={showDeleteModal}
        handleClose={handleDeleteModalClose}
        handleShow={handleDeleteModalShow}
      /> */}
    </div>
  );
}

export default FolderContainer;
