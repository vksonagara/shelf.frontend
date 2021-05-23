import { configureStore } from '@reduxjs/toolkit';
import authReducer from "./auth";
import foldersReducer from "./folders"

export default configureStore({
    reducer: {
        auth: authReducer,
        folders: foldersReducer,
    },
});
