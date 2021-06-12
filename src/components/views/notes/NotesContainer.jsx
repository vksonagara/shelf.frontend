import React from "react";
import { useEffect, useState } from "react";
import notesApi from "../../../api/notes";
import {
  createNote,
  getAllNotes,
  resetNotes,
  changeCurrentNote,
  getAllArchivedNotes,
} from "../../../redux/notes";
import { useDispatch, useSelector } from "react-redux";
import { getAllFolders } from "../../../redux/folders";
import DeleteModal from "../../common/DeleteModal";
import RestoreModal from "../../common/Restoremodal";
import { Menu } from "@headlessui/react";
import MoveModal from "../../common/MoveModal";
import Skeleton from "react-loading-skeleton";
import CreateSkeleton from "../../common/Skeleton/CreateSkeleton";

// NoteList Component
function NoteList({ loading, setLoading }) {
  const dispatch = useDispatch();

  // Redux state for notes
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

  // State for Move Modal
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
      className="overflow-y-auto"
      style={{
        height: "calc(100vh - 130px)",
      }}
    >
      {loading ? (
        <CreateSkeleton num={10} />
      ) : (
        <>
          {notes.map((note) => {
            const { id } = note;
            return (
              <section
                className={`flex justify-between items-center mb-2 relative py-2 cursor-pointer ${
                  id == currentNoteId ? "bg-tertiary-base rounded-md px-2" : ""
                }`}
              >
                <div
                  className="flex items-center"
                  onClick={() => {
                    dispatch(changeCurrentNote(note));
                  }}
                >
                  <i class="bi bi-journal text-3xl"></i>

                  <div className="leading-4">
                    <p className=" overflow-ellipsis m-0 text-sm w-36 ml-2 whitespace-nowrap overflow-hidden">
                      {note.title}
                    </p>
                    <p className=" m-0 ml-2 text-xs">{note.updatedAt}</p>
                  </div>
                </div>
                <Menu>
                  <Menu.Button className="focus:outline-none">
                    {!loading && <i className="bi bi-three-dots-vertical"></i>}
                  </Menu.Button>
                  <Menu.Items className="absolute right-0 top-8 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none py-1 z-20">
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
                    <Menu.Item>
                      <div
                        className="text-gray-700 block px-4 py-2 text-sm hover:bg-gray-300"
                        onClick={() => {
                          handleMoveModalShow(id);
                        }}
                      >
                        Move
                      </div>
                    </Menu.Item>
                  </Menu.Items>
                </Menu>
              </section>
            );
          })}
          <DeleteModal
            for="notes"
            show={showDeleteModal}
            handleClose={handleDeleteModalClose}
            handleShow={handleDeleteModalShow}
          />
          <MoveModal
            show={showMoveModal}
            handleClose={handleMoveModalClose}
            handleShow={handleMoveModalShow}
          />
        </>
      )}
    </div>
  );
}

// Archive Note list component
function ArchiveNoteList({ loading, setLoading }) {
  const dispatch = useDispatch();

  // Redux State for notes
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

  // State for restore modal
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
    <>
      {loading ? (
        <CreateSkeleton num={10} />
      ) : (
        <div
          id="notesContainer"
          className="overflow-y-auto"
          style={{
            height: "calc(100vh - 80px)",
          }}
        >
          {notes.map((note) => {
            const { _id } = note;
            return (
              <section
                className={`flex justify-between items-center mb-2 py-2 relative ${
                  _id == currentNoteId ? "bg-tertiary-base rounded-md px-2" : ""
                }`}
              >
                <div
                  onClick={() => {
                    dispatch(changeCurrentNote(note));
                  }}
                  className="flex items-center cursor-pointer"
                >
                  <i class="bi bi-journal text-3xl"></i>

                  <div className="leading-4">
                    <p className=" overflow-ellipsis m-0 text-sm w-36 ml-2 whitespace-nowrap overflow-hidden">
                      {note.title}
                    </p>
                    <p className=" m-0 ml-2 text-xs">{note.deletedAt}</p>
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
                          handleDeleteModalShow(_id);
                        }}
                      >
                        Delete
                      </div>
                    </Menu.Item>
                    <Menu.Item>
                      <div
                        className="text-gray-700 block px-4 py-2 text-sm hover:bg-gray-300"
                        onClick={() => {
                          handleRestoreModalShow(_id);
                        }}
                      >
                        Restore
                      </div>
                    </Menu.Item>
                  </Menu.Items>
                </Menu>
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
      )}
    </>
  );
}

function Footer() {
  const dispatch = useDispatch();
  const { currentFolderId } = useSelector((state) => state.folders);

  return (
    <div className="flex items-center justify-center h-12">
      <div
        className="flex items-center cursor-pointer"
        // Hitting createNote Api

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
        <i className="bi bi-plus-circle mr-1 text-base"></i>
        <p className="mb-0 font-semibold text-sm">New Note</p>
      </div>
    </div>
  );
}

function NotesContainer() {
  const dispatch = useDispatch();
  const { currentFolderId } = useSelector((state) => state.folders);
  const { currentNoteId } = useSelector((state) => state.notes);
  const [loading, setLoading] = useState(true);

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
    setLoading(true);
    if (currentFolderId == "archive") {
      notesApi.getAllArchivedNotes().then(({ error, data }) => {
        if (!error) {
          dispatch(getAllArchivedNotes(data));
        }
        setLoading(false);
      });
    } else if (currentFolderId) {
      notesApi.getAllNotes(currentFolderId).then(({ error, data }) => {
        if (!error) {
          dispatch(getAllNotes(data));
        }
        setLoading(false);
      });
    } else {
      dispatch(resetNotes());
    }
  }, [currentFolderId]);

  return (
    <div className="notes-container h-screen p-4 flex-col flex relative text-white bg-primary-dark">
      {currentNoteId && (
        <i
          className="bi bi-chevron-left absolute top-2/4   collapse-icon text-white bg-blue-600  text-sm h-8 w-8 flex justify-center items-center rounded-full cursor-pointer"
          style={{
            right: "-10px",
          }}
          onClick={changeContainerState}
        ></i>
      )}
      {/* notes Container Header  */}
      <div className="h-20 text-black ">
        {/* <div className="flex items-center">
          <i class="bi bi-sort-down h-7 bg-white px-2 flex items-center"></i>
          <select className="bg-white h-7 focus:outline-none w-44">
            <option>Sort By</option>
            <option>Created At</option>
          </select>
        </div> */}
        <p className="my-4 text-xs font-semibold text-white">Notes</p>
      </div>
      {/* Notes container body  */}
      {(currentFolderId == "archive" && (
        <ArchiveNoteList loading={loading} setLoading={setLoading} />
      )) || <NoteList loading={loading} setLoading={setLoading} />}
      {/* notes container footer  */}
      {currentFolderId !== "archive" && <Footer />}
    </div>
  );
}

export default NotesContainer;
