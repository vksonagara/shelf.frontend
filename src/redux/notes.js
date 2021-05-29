import { createSlice } from "@reduxjs/toolkit";

export const notesSlice = createSlice({
  name: "notes",
  initialState: { notes: [], currentNoteId: null, currentNoteTitle: null },
  reducers: {
    createNote: (state, action) => {
      const note = action.payload.note;
      const newNote = {
        title: note.title,
        id: note._id,
        updatedAt: note.updatedAt,
      };

      const { notes, currentNoteId, currentNoteTitle } = state;

      return {
        notes: [...notes, newNote],
        currentNoteId: newNote.id,
        currentNoteTitle: newNote.title,
      };
    },
    getAllNotes: (state, action) => {
      const notesArr = action.payload.notes;
      let notes = notesArr.map((note) => {
        return {
          title: note.title,
          id: note._id,
          updatedAt: note.updatedAt,
        };
      });
      return {
        notes,
        currentNoteId: (notes[0] && notes[0].id) || null,
        currentNoteTitle: (notes[0] && notes[0].title) || null,
      };
    },
    resetNotes: (state, action) => {
      return {
        notes: [], currentNoteId: null, currentNoteTitle: null,
      }
    },
    deleteNote: (state, action) =>{
      const deleteNote = action.payload;
      console.log(deleteNote);
      let { notes, currentNoteId, currentNoteTitle } = state;
      let newNotes = notes.filter((note) => {
        return note.id != deleteNote.id;
      });
      if (deleteNote.id == currentNoteId) {
        currentNoteId = (newNotes[0] && newNotes[0].id) || null;
        currentNoteTitle = (newNotes[0] && newNotes[0].title) || null;
      }

      return {
        notes: newNotes,
        currentNoteId,
        currentNoteTitle
      };
    },
    changeCurrentNote: (state, action) => {
      const note = action.payload;

      let { notes, currentNoteId, currentNoteTitle } = state;

      return {
        notes,
        currentNoteId: note.id,
        currentNoteTitle: note.title,
      };
    },
    updateNote: (state, action) => {
      const { id, title } = action.payload;
      let { notes, currentNoteId, currentNoteTitle } = state;
      let newNotes = notes.map((note) => {
        if (note.id == id) {
          return { ...note, title };
        }
        return note;
      });
      return {
        notes: newNotes,
        currentNoteId,
        currentNoteTitle: title,
      };
    },
  }
});

export const { createNote, getAllNotes, resetNotes, deleteNote, changeCurrentNote, updateNote} = notesSlice.actions;

export default notesSlice.reducer;
