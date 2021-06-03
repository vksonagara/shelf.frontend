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

const debouncedConsoleLog = _.debounce(
  async (lastContent, currentContent, noteId) => {
    if (lastContent != currentContent) {
      await notesApi.updateNoteContent({ noteId, content: currentContent });
    }
  },
  500
);

function NoteEditor() {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [htmlContentState, setHtmlContentState] = useState("");
  const { currentNoteId } = useSelector((state) => state.notes);
  const { currentFolderId } = useSelector((state) => state.folders);

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
          document
            .querySelector(".public-DraftEditor-content")
            .setAttribute("contenteditable", true);
        }
      });
    } else {
      setEditorState(EditorState.createEmpty());
    }
  }, [currentNoteId]);

  return (
    <div
      style={{
        padding: "1rem 0",
        overflow: "hidden",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Editor
        editorState={editorState}
        onEditorStateChange={onEditorStateChange}
        wrapperClassName="demo-wrapper"
        editorClassName="demo-editor"
        toolbarClassName="demo-toolbar"
      />
    </div>
  );
}
export default NoteEditor;
