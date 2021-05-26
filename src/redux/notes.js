import { createSlice } from "@reduxjs/toolkit";

export const notesSlice = createSlice({
  name: "notes",
  initialState: { notes: [], currentNoteId: null },
  reducers: {
    createNote: (state, action) => {
      const note = action.payload.note;
      console.log(note);
      const newNote = {
        title: note.title,
        id: note._id,
        updatedAt: note.updatedAt,
      };

      const { notes, currentNoteId } = state;

      return {
        notes: [...notes, newNote],
        currentNoteId: newNote.id,
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
      };
    },
    resetNotes: (state, action) => {
      return {
        notes: [], currentNoteId: null
      }
    }
  },
});

export const { createNote, getAllNotes, resetNotes} = notesSlice.actions;

export default notesSlice.reducer;
