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

  function onEditorStateChange(editorState) {
    console.log(editorState);
    const rawContentState = convertToRaw(editorState.getCurrentContent());
    const htmlContent = draftToHtml(rawContentState);
    setEditorState(editorState);
    debouncedConsoleLog(htmlContentState, htmlContent, currentNoteId);
    setHtmlContentState(htmlContent);
  }

  useEffect(() => {
    if (currentNoteId) {
      notesApi.getDetailOfNote(currentNoteId).then((data) => {
        const blocksFromHtml = htmlToDraft(data.data.note.content);
        const { contentBlocks, entityMap } = blocksFromHtml;
        const contentState = ContentState.createFromBlockArray(
          contentBlocks,
          entityMap
        );
        const editorNewState = EditorState.createWithContent(contentState);
        setEditorState(editorNewState);
      });
    } else {
      setEditorState(EditorState.createEmpty());
    }
  }, [currentNoteId]);

  return (
    <div
      style={{
        width: "70%",
        padding: "1rem 0",
        margin: "auto",
        maxHeight: "80vh !important",
        overflow: "hidden",
        // overflowY: "scroll",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Editor
        editorState={editorState}
        onEditorStateChange={onEditorStateChange}
        wrapperClassName="demo-wrapper"
        editorClassName="demo-editor"
      />
    </div>
  );
}
export default NoteEditor;
