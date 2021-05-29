import { configureStore } from '@reduxjs/toolkit';
import authReducer from "./auth";
import foldersReducer from "./folders"
import notesReducer from "./notes"

export default configureStore({
    reducer: {
        auth: authReducer,
        folders: foldersReducer,
        notes: notesReducer,
    },
});
