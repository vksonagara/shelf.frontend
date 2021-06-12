import _ from "lodash";
import { useCallback, useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import notesApi from "../../../api/notes";
import { updateNote } from "../../../redux/notes";
import DeleteModal from "../../common/DeleteModal";
import NoteEditor from "./NoteEditor";
import useWindowDimension from "../../../hooks/useWindowDimension";
import Skeleton from "react-loading-skeleton";

const saveNoteName = _.debounce(async (title, currentNoteId, dispatch) => {
  const { data, error } = await notesApi.updateNoteTitle({
    noteId: currentNoteId,
    title,
  });
  if (!error) {
    dispatch(updateNote({ id: currentNoteId, title }));
  }
}, 500);

function TitleInput() {
  const [titleInput, setTitleInput] = useState("");
  const [loading, setLoading] = useState(true);

  const dispatch = useDispatch();
  const { currentFolderId } = useSelector((state) => state.folders);
  const { currentNoteId, currentNoteTitle } = useSelector(
    (state) => state.notes
  );

  useEffect(() => {
    setLoading(true);
    setTitleInput(currentNoteTitle || "");
    setLoading(false);
  }, [currentNoteId]);

  const isDisabled = currentFolderId == "archive" && true;

  return (
    <div className="w-full flex justify-center">
      {loading ? (
        <Skeleton count={1} />
      ) : (
        <div className="w-full py-4 border border-gray-300 mt-2 px-4 mx-2">
          <input
            type="text"
            disabled={isDisabled}
            value={titleInput}
            onChange={async (e) => {
              setTitleInput(e.target.value);
              saveNoteName(e.target.value, currentNoteId, dispatch);
            }}
            id="noteTitle"
            className="text-xl outline-none border-b border-gray-300 w-full h-10 bg-gray-200 pl-2"
          />
        </div>
      )}
    </div>
  );
}

function ContentContainer() {
  const { currentFolderId } = useSelector((state) => state.folders);
  const { currentNoteId } = useSelector((state) => state.notes);

  // State for editor height
  const [editorHeight, setEditorHeight] = useState(0);
  const [editorWidth, setEditorWidth] = useState(0);

  // Reference for NodeEditor
  const windowDimension = useWindowDimension();
  const nodeEditorRef = useCallback(
    (node) => {
      if (node) {
        const editorClientRect = node.getBoundingClientRect();
        const editorHeightPx = windowDimension.height - editorClientRect.top;
        const editorWidthPx = windowDimension.width - editorClientRect.left;
        setEditorHeight(editorHeightPx);
        setEditorWidth(editorWidthPx);
      }
    },
    [windowDimension]
  );

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
      <header className="bg-primary-dark flex justify-between items-center text-white h-14 px-2">
        <div>
          <i
            className="bi bi-trash text-xl cursor-pointer"
            onClick={() => {
              currentFolderId == "archive"
                ? handleArchiveDeleteModalShow(currentNoteId)
                : handleDeleteModalShow(currentNoteId);
            }}
          ></i>
          {/* <i className="bi bi-download text-xl ml-4"></i> */}
        </div>

        {/* <div className="w-24 md:w-52 lg:w-80 relative">
          <input
            type="text"
            placeholder="Search..."
            className="w-full p-2 rounded-md text-gray-900 md:pr-10 focus:outline-none"
          />
          <div className="absolute right-3 top-2 z-40">
            <i className="bi bi-search text-xl text-black"></i>
          </div>
        </div> */}
      </header>
      <div className="bg-primary-darker">
        <TitleInput />
        <NoteEditor
          innerRef={nodeEditorRef}
          height={editorHeight}
          width={editorWidth}
        />
      </div>
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
