import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import CreateFolderModal from "../../common/CreateFolderModal";
import notesApi from "../../../api/notes";
import { getAllFolders, changeCurrentFolder } from "../../../redux/folders";
import RenameFolderModal from "../../common/RenameFolderModal";
import DeleteModal from "../../common/DeleteModal";
import { Menu } from "@headlessui/react";
import CreateSkeleton from "../../common/Skeleton/CreateSkeleton";

// Folder Container component
function FolderContainer() {
  // State for create Folder modal
  const [showCreateModal, setCreateModal] = useState({
    value: false,
  });
  const handleCreateModalClose = () =>
    setCreateModal({
      value: false,
    });
  const handleCreateModalShow = () =>
    setCreateModal({
      value: true,
    });

  // State for Skeleton
  const [loading, setLoading] = useState(true);

  // State for rename folder modal
  const [showRenameModal, setRenameModal] = useState({
    value: false,
    id: "",
    name: "",
  });
  const handleRenameModalClose = ({ id, name }) =>
    setRenameModal({
      value: false,
      id,
      name,
    });
  const handleRenameModalShow = ({ id, name }) =>
    setRenameModal({
      value: true,
      id,
      name,
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

  // Using useEffect to get all folder data after rendor
  useEffect(() => {
    setLoading(true);
    notesApi.getFolders().then(({ error, data }) => {
      if (!error) {
        dispatch(getAllFolders(data));
      }
      setLoading(false);
    });
  }, []);

  return (
    <div className="folder-container h-screen p-4 text-white flex flex-col bg-primary-base">
      {/* Folder Container Header  */}
      <div className="h-20 text-black ">
        {/* <div className="flex items-center">
          <i class="bi bi-sort-down h-7 bg-white px-2 flex items-center"></i>
          <select className="bg-white h-7 focus:outline-none w-44">
            <option>Sort By</option>
            <option>Notes</option>
            <option>Created At</option>
          </select>
        </div> */}
        <p className="my-4 text-xs font-semibold text-white">Folders</p>
      </div>

      {/* folder container body  */}
      <div
        id="foldersContainer"
        className="overflow-y-auto"
        style={{
          height: "calc(100vh - 130px)",
        }}
      >
        {loading ? (
          <CreateSkeleton num={10} color="#522d52" highlightColor="#563056" />
        ) : (
          <>
            {/* Archive Folder  */}
            <section
              className={`flex justify-between items-center mb-2 py-2 relative ${
                currentFolderId == "archive" &&
                "bg-secondary-base px-2 rounded-md"
              }`}
              style={{
                cursor: "pointer",
              }}
            >
              <div
                className="flex items-center w-56" // Changing Redux State on Folder Change
                onClick={async () => {
                  dispatch(changeCurrentFolder("archive"));
                }}
              >
                <i
                  className={`bi bi-folder relative text-3xl  ${
                    currentFolderId == "archive"
                      ? "tex-white"
                      : "text-info-base"
                  }`}
                ></i>

                <div className="leading-4">
                  <p className="m-0 text-sm  ml-2">Archive</p>
                </div>
              </div>
              <Menu>
                <Menu.Button className="focus:outline-none">
                  <i className="bi bi-three-dots-vertical"></i>
                </Menu.Button>
                {/* <Menu.Items className="absolute right-0 top-8 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none py-1 z-20">
                  <Menu.Item>
                    <div className="text-gray-700 block px-4 py-2 text-sm hover:bg-gray-300">
                      Empty Archive
                    </div>
                  </Menu.Item>
                </Menu.Items> */}
              </Menu>
            </section>
            {/* Folder Created By User  */}
            {folders.map((folder) => {
              const { id } = folder;
              const { name } = folder;
              return (
                <section
                  className={`flex justify-between items-center mb-2 relative py-2 cursor-pointer ${
                    id == currentFolderId
                      ? "bg-secondary-base px-2 rounded-md"
                      : ""
                  }`}
                >
                  <div
                    onClick={() => {
                      dispatch(changeCurrentFolder(id));
                    }}
                    className="flex items-center"
                  >
                    <i
                      className={`bi bi-folder relative text-3xl  ${
                        currentFolderId == id ? "text-white" : "text-info-base"
                      }`}
                    >
                      <div
                        className="absolute bg-info-base text-xs right-0 text-center text-black rounded-full h-4 w-4 flex items-center justify-center "
                        style={{
                          top: "-5px",
                        }}
                      >
                        {folder.notesCount}
                      </div>
                    </i>

                    <div className="leading-4">
                      <p className=" overflow-ellipsis m-0 text-sm w-36 ml-2 whitespace-nowrap overflow-hidden">
                        {folder.name}
                      </p>
                      <p className=" m-0 ml-2 text-xs">{folder.updatedAt}</p>
                    </div>
                  </div>

                  <Menu>
                    <Menu.Button className="focus:outline-none">
                      <i className="bi bi-three-dots-vertical"></i>
                    </Menu.Button>
                    <Menu.Items className="absolute right-0 top-8 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none py-1 z-20">
                      <Menu.Item>
                        <div
                          className="text-gray-700 block px-4 py-2 text-sm hover:bg-gray-300"
                          onClick={() => {
                            handleRenameModalShow({ id, name });
                          }}
                        >
                          Rename
                        </div>
                      </Menu.Item>
                      <Menu.Item>
                        <div
                          className="text-gray-700 block px-4 py-2 text-sm hover:bg-gray-300"
                          onClick={() => {
                            handleDeleteModalShow(id);
                          }}
                        >
                          Delete
                        </div>
                      </Menu.Item>
                    </Menu.Items>
                  </Menu>
                </section>
              );
            })}
          </>
        )}
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
      <CreateFolderModal
        show={showCreateModal}
        handleClose={handleCreateModalClose}
        handleShow={handleCreateModalShow}
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
