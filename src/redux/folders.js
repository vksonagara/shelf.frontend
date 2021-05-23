import { createSlice } from "@reduxjs/toolkit";

export const foldersSlice = createSlice({
  name: "folders",
  initialState: { folders: [], currentFolderId: null },
  reducers: {
    getAllFolders: (state, action) => {
      const folderArr = action.payload.folders;
      let folders = folderArr.map((folder) => {
        return {
          name: folder.name,
          id: folder._id,
          updatedAt: folder.updatedAt,
          notesCount: folder.notesCount,
        };
      });
      return {
        folders,
        currentFolderId: (folders[0] && folders[0].id) || null,
      };
    },
    createFolder: (state, action) => {
      const folder = action.payload.folder;
      const newFolder = {
        name: folder.name,
        id: folder._id,
        updatedAt: folder.updatedAt,
        notesCount: folder.notesCount,
      };

      const { folders, currentFolderId } = state;

      return {
        folders: [...folders, newFolder],
        currentFolderId: newFolder.id,
      };
    },
    deleteFolder: (state, action) => {
      const id = action.payload;
      let { folders, currentFolderId } = state;
      let newFolders = folders.filter((folder) => {
        return folder.id != id;
      });
      if (id == currentFolderId) {
        currentFolderId = (newFolders[0] && newFolders[0].id) || null;
      }

      return {
        folders: newFolders,
        currentFolderId,
      };
    },
    changeCurrentFolder: (state, action) => {
      const id = action.payload;

      let { folders, currentFolderId } = state;

      return {
        folders,
        currentFolderId: id,
      };
    },
  },
});

export const { getAllFolders, createFolder, deleteFolder, changeCurrentFolder } =
  foldersSlice.actions;

export default foldersSlice.reducer;
