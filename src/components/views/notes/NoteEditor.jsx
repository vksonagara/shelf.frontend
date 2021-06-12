import _ from "lodash";
import draftToHtml from "draftjs-to-html";
import React, { useEffect, useState } from "react";
import { Editor } from "react-draft-wysiwyg";
import {
  EditorState,
  convertToRaw,
  ContentState,
  convertFromRaw,
} from "draft-js";
import htmlToDraft from "html-to-draftjs";
import "../../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import notesApi from "../../../api/notes";
import { useSelector } from "react-redux";
import Skeleton from "react-loading-skeleton";

const debouncedConsoleLog = _.debounce(
  async (lastContent, currentContent, noteId) => {
    if (lastContent != currentContent) {
      await notesApi.updateNoteContent({ noteId, content: currentContent });
    }
  },
  500
);

function NoteEditor({ innerRef, height, width }) {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [htmlContentState, setHtmlContentState] = useState("");
  const { currentNoteId } = useSelector((state) => state.notes);
  const { currentFolderId } = useSelector((state) => state.folders);

  // loader state
  const [loading, setLoading] = useState(true);

  function onEditorStateChange(editorState) {
    if (currentFolderId !== "archive") {
      const rawContentState = convertToRaw(editorState.getCurrentContent());
      const htmlContent = draftToHtml(rawContentState);
      setEditorState(editorState);
      debouncedConsoleLog(htmlContentState, htmlContent, currentNoteId);
      setHtmlContentState(htmlContent);
    }
  }

  useEffect(() => {
    setLoading(true);
    if (currentFolderId == "archive" && currentNoteId) {
      notesApi.getDetailOfArchivedNote(currentNoteId).then((data) => {
        if (data.data) {
          const blocksFromHtml = htmlToDraft(data.data.note.note[0].content);
          const { contentBlocks, entityMap } = blocksFromHtml;
          const contentState = ContentState.createFromBlockArray(
            contentBlocks,
            entityMap
          );
          const editorNewState = EditorState.createWithContent(contentState);
          setEditorState(editorNewState);
          setLoading(false);
          document
            .querySelector(".public-DraftEditor-content")
            .setAttribute("contenteditable", false);
        }
      });
    } else if (currentNoteId) {
      notesApi.getDetailOfNote(currentNoteId).then((data) => {
        if (data.data) {
          const blocksFromHtml = htmlToDraft(data.data.note.content);
          const { contentBlocks, entityMap } = blocksFromHtml;
          const contentState = ContentState.createFromBlockArray(
            contentBlocks,
            entityMap
          );
          const editorNewState = EditorState.createWithContent(contentState);
          setEditorState(editorNewState);
          setLoading(false);
          document
            .querySelector(".public-DraftEditor-content")
            .setAttribute("contenteditable", true);
        }
      });
    } else {
      setEditorState(EditorState.createEmpty());
      setLoading(false);
    }
  }, [currentNoteId]);

  return loading ? (
    <div
      className="w-full flex justify-center mt-2"
      ref={innerRef}
      style={{
        height: `${height}px`,
      }}
    >
      <Skeleton count={1} />
      <Skeleton height={`${height - 40}px`} width={`${width - 10}px`} />
    </div>
  ) : (
    <div
      className="w-full flex justify-center mt-2"
      ref={innerRef}
      style={{
        height: `${height}px`,
      }}
    >
      <div className="py-2 px-2 overflow-hidden flex justify-center border border-gray-300 w-full  mx-2 mb-2">
        <Editor
          editorState={editorState}
          onEditorStateChange={onEditorStateChange}
          wrapperClassName="demo-wrapper"
          editorClassName="demo-editor text-white"
          toolbarClassName="demo-toolbar bg-primary-dark"
        />
      </div>
    </div>
  );
}
export default NoteEditor;
